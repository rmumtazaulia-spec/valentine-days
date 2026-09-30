'use client';

import React, { useState, useEffect, useRef } from 'react';

// Efek Bunga Sakura Gugur
const FallingPetals = () => {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; duration: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 6 + Math.random() * 6,
      size: 14 + Math.random() * 16,
      delay: Math.random() * 5,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute animate-fall opacity-80"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            fontSize: `${p.size}px`,
          }}
        >
          🌸
        </span>
      ))}
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg) translateX(0px);
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(25px);
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(-25px);
            opacity: 0.2;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  // Status PIN / Kunci
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const CORRECT_PIN = '111111'; // PIN sesuai di video

  // Status Buka Hadiah
  const [giftOpened, setGiftOpened] = useState(false);

  // Audio Reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log('Audio Autoplay Blocked:', e));
    }
  };

  const handleKeyPress = (num: string) => {
    startMusic(); // Mulai musik saat ada interaksi pertama
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      setErrorMsg('');

      if (newPin.length === 6) {
        if (newPin === CORRECT_PIN) {
          setTimeout(() => setIsUnlocked(true), 300);
        } else {
          setErrorMsg('Wrong code, try again 💖');
          setTimeout(() => setPin(''), 800);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  return (
    <main className="min-h-screen bg-[#1c0f18] text-pink-100 flex flex-col items-center justify-center relative p-4 font-sans overflow-x-hidden">
      {/* Efek Bunga Gugur */}
      <FallingPetals />

      {/* File Lagu yang Kamu Kirim */}
      <audio ref={audioRef} src="/pretty.mp3.mp3" loop />

      {/* 1. TAMPILAN MASUKKAN PIN / PASSCODE */}
      {!isUnlocked ? (
        <div className="w-full max-w-sm flex flex-col items-center bg-[#251322]/80 backdrop-blur-md p-6 rounded-3xl border border-pink-500/20 shadow-2xl">
          <div className="text-4xl mb-2">🌷</div>
          <h2 className="text-xl font-bold text-pink-100">For You, Kimmy</h2>
          <p className="text-xs text-pink-300/70 mb-6">Enter the secret code</p>

          {/* Bulatan Pin */}
          <div className="flex gap-3 mb-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-full border border-pink-400 transition-all ${
                  i < pin.length ? 'bg-pink-400 scale-110' : 'bg-transparent'
                }`}
              />
            ))}
          </div>

          {/* Keypad PIN */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-[240px]">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyPress(num)}
                className="w-16 h-16 rounded-2xl bg-pink-900/30 hover:bg-pink-800/50 text-pink-100 text-xl font-semibold flex items-center justify-center transition-all border border-pink-500/20 active:scale-95"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleBackspace}
              className="w-16 h-16 rounded-2xl bg-pink-900/20 text-pink-300 text-sm flex items-center justify-center border border-pink-500/20"
            >
              ✕
            </button>
            <button
              onClick={() => handleKeyPress('0')}
              className="w-16 h-16 rounded-2xl bg-pink-900/30 text-pink-100 text-xl font-semibold flex items-center justify-center border border-pink-500/20 active:scale-95"
            >
              0
            </button>
            <div className="w-16 h-16" />
          </div>

          <p className="text-xs text-pink-400 mt-6">Hint: 111111 💕</p>
          {errorMsg && <p className="text-xs text-red-400 mt-2 font-medium">{errorMsg}</p>}
        </div>
      ) : !giftOpened ? (
        /* 2. TAMPILAN KOTAK KADO */
        <div className="flex flex-col items-center animate-fade-in">
          <p className="text-pink-200 mb-6 text-sm font-medium tracking-wide">
            Tap the gift box to open it 🎁
          </p>
          <button
            onClick={() => {
              setGiftOpened(true);
              startMusic();
            }}
            className="w-36 h-36 bg-pink-500/20 border-2 border-pink-400 rounded-3xl flex items-center justify-center text-6xl shadow-xl hover:scale-105 transition-all cursor-pointer active:scale-95 animate-bounce"
          >
            🎁
          </button>
        </div>
      ) : (
        /* 3. TAMPILAN UTAMA (KATA-KATA AWAL KEMBALI LENGKAP) */
        <div className="w-full max-w-md space-y-6 animate-fade-in py-8">
          {/* Header Ucapan */}
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold">
              🌸 Your Special Day 🌸
            </span>
            <h1 className="text-3xl font-extrabold text-pink-100 tracking-wider">
              HAPPY 
            </h1>
            <p className="text-xs text-pink-300/80">Hari paling istimewa</p>
          </div>

          {/* Kata-kata Utama */}
          <div className="bg-[#271424]/90 p-5 rounded-2xl border border-pink-500/20 text-center shadow-lg">
            <p className="text-sm italic text-pink-100 leading-relaxed">
              "Wishing you happiness, good health, and all your dreams come true. ✨🤍"
            </p>
          </div>

          {/* Surat Pesan Lengkap */}
          <div className="bg-[#271424]/90 p-6 rounded-2xl border border-pink-500/20 space-y-4 text-xs text-pink-200 leading-relaxed shadow-lg">
            <h3 className="text-sm font-bold text-pink-300 text-center border-b border-pink-500/20 pb-2">
              💌 A Letter For You
            </h3>
            <p className="italic text-pink-300 font-medium">My dearest Kimmy,</p>
            <p>
              On this most special day, I want you to know that every single day with you is a gift beyond measure. You bring light into every corner of my life.
            </p>
            <p>
              Your laughter is the most beautiful music I have ever heard. Thank you for being you — with all your uniqueness, the gentleness of your heart, and a spirit that never fades.
            </p>
            <p>
              On this birthday of yours, I wish that all your dreams come true. You deserve every beautiful thing this world has to offer.
            </p>
            <div className="text-right pt-2 text-pink-300 font-semibold">
              With all my love, <br />
              <span className="text-pink-100">your girlfriend 🤍</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
