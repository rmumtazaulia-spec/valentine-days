'use client';

import React, { useState, useEffect, useRef } from 'react';

// Efek Emoticon Love Gugur (Menggantikan Sakura)
const FallingHearts = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; duration: number; size: number; delay: number; icon: string }>>([]);

  useEffect(() => {
    const icons = ['💗'];
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 6 + Math.random() * 6,
      size: 16 + Math.random() * 16,
      delay: Math.random() * 5,
      icon: icons[Math.floor(Math.random() * icons.length)],
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute animate-fall opacity-80"
          style={{
            left: `${h.left}%`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            fontSize: `${h.size}px`,
          }}
        >
          {h.icon}
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
  const CORRECT_PIN = '230126'; // PIN Baru: 230126

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
          setErrorMsg('wrong code, try again 💖');
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
      {/* Efek Love Gugur */}
      <FallingHearts />

      {/* File Lagu */}
      <audio ref={audioRef} src="/pretty.mp3.mp3" loop />

      {/* 1. TAMPILAN MASUKKAN PIN / PASSCODE */}
      {!isUnlocked ? (
        <div className="w-full max-w-sm flex flex-col items-center bg-[#251322]/80 backdrop-blur-md p-6 rounded-3xl border border-pink-500/20 shadow-2xl">
          <div className="text-4xl mb-2"> </div>
          <h2 className="text-xl font-bold text-pink-100"> i have a lil letter for u </h2>
          <p className="text-xs text-pink-300/70 mb-6">enter the secret code</p>

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

          {/* Hint Dihapus */}
          {errorMsg && <p className="text-xs text-red-400 mt-4 font-medium">{errorMsg}</p>}
        </div>
      ) : !giftOpened ? (
        /* 2. TAMPILAN KOTAK KADO */
        <div className="flex flex-col items-center animate-fade-in">
          <p className="text-pink-200 mb-6 text-sm font-medium tracking-wide">
            tap heree! 
          </p>
          <button
            onClick={() => {
              setGiftOpened(true);
              startMusic();
            }}
            className="w-36 h-36 bg-pink-500/20 border-2 border-pink-400 rounded-3xl flex items-center justify-center text-6xl shadow-xl hover:scale-105 transition-all cursor-pointer active:scale-95 animate-bounce"
          >
            ❤️️
          </button>
        </div>
      ) : (
        /* 3. TAMPILAN UTAMA */
        <div className="w-full max-w-md space-y-6 animate-fade-in py-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold">
               HIIII MY LOVE!!!
            </span>
            <h1 className="text-3xl font-extrabold text-pink-100 tracking-wider">
              HAPPY NATIONAL BOYFRIEND DAY YAAAA
            </h1>
            <p className="text-xs text-pink-300/80">i love you from the deepest of my heartt ma beloved boyfiee 😸 </p>
          </div>

          <div className="bg-[#271424]/90 p-5 rounded-2xl border border-pink-500/20 text-center shadow-lg">
            <p className="text-sm italic text-pink-100 leading-relaxed">
              thank u for loving me and being the safest, warmest place for my heart 🤍
            </p>
          </div>

          <div className="bg-[#271424]/90 p-6 rounded-2xl border border-pink-500/20 space-y-4 text-xs text-pink-200 leading-relaxed shadow-lg">
            <h3 className="text-sm font-bold text-pink-300 text-center border-b border-pink-500/20 pb-2">
              here is a letter for you
            </h3>
            <p className="italic text-pink-300 font-medium">my dearest agung,</p>
            <p>
              thaank u soooO0oo much for being such a good boyfriend sayang🙆🏻‍♀️🤍, feel soooooo grateful that i get to have a relationship with u....
thank u for loving me even in the moment im not easy to love.
            </p>
            <p>
              HAHAHSHW PLS JANGAN KETAWA DENGER SOUNDNYA YAAA
AKU KEINGET MALEM KEMARIN ITUUU, aku bilang aku keinget km di lagu ini itu maksudnyaa kayaaaaaa.... i'm soooososoo happy and glad for every single moment that we spend together sayang from the day we first got close until now and even   foreveer....but idk what future holds for us, or what kind of problems we'll have to face along the way, tapi aku berharap bngt kita bisaaa lewatin semua nya berduaaaaaaaaaaa seduaaaa? nazi ayam kecapz sedua enakz btw🤤
uummmm i hope i can  keep call u mine until my very last breath and i wanna be by ur side trough every situation, no matter what happens.
            </p>
            <p>
              makaasi uda jadi pacar akooo yang selalu bisa aku andalin yaaaapp, thank u soooowmuch for always taking care of me and remind me abt everything, u always made my day sayang🙆🏻‍♀️
makaasi bngt uda kasi aku banya hal yang aku gatau aku bisa dapet dimana kalo tida sama kamu sekarang..... u always make me feel like im enough to be loved☹️
makasi suda jadi pacar yang sabar bngt buat ngasi tau aku kalo aku salaah even when it's probably not easy for u...
iloveeuusoooomuch, i love every part of u, every little thing that make u who u are and every part of ur life.
            </p>
            <div className="text-right pt-2 text-pink-300 font-semibold">
              with all my love, <br />
              <span className="text-pink-100">your girlfriend 🤍</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
