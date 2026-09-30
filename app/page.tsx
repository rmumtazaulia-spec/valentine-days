'use client';

import React, { useState, useRef } from 'react';

export default function Home() {
  const SECRET_PIN = "230126";
  const [inputPin, setInputPin] = useState("");
  const [step, setStep] = useState<'pin' | 'gift' | 'main'>('pin');
  const [flowerMsg, setFlowerMsg] = useState("");
  const [jarMsg, setJarMsg] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const jarMessages = [
    "Tawamu selalu bisa membuat hari yang buruk terasa lebih ringan.",
    "Kamu selalu tahu cara membuat aku tersenyum.",
    "Keberadaanmu adalah hal terindah di hidupku.",
    "Terima kasih sudah menjadi boyfriend terbaik buat aku!"
  ];

  const pressNum = (num: string) => {
    if (inputPin.length < 6) {
      setInputPin((prev) => prev + num);
    }
  };

  const clearPin = () => setInputPin("");

  const checkPin = () => {
    if (inputPin === SECRET_PIN) {
      setStep('gift');
    } else {
      alert('Wrong code, try again 💕');
      clearPin();
    }
  };

  const openGift = () => {
    setStep('main');
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const kocokToples = () => {
    const randomMsg = jarMessages[Math.floor(Math.random() * jarMessages.length)];
    setJarMsg(randomMsg);
  };

  return (
    <main className="min-h-screen bg-[#0d0614] text-white flex items-center justify-center p-4 font-sans">
      <audio ref={audioRef} src="/pretty.mp3" loop />

      {/* 1. PASSCODE / PIN LOCK SCREEN */}
      {step === 'pin' && (
        <div className="w-full max-w-sm bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center shadow-2xl">
          <div className="text-3xl mb-2">🌹</div>
          <h1 className="text-2xl font-bold mb-1">heawwoo agung</h1>
          <p className="text-xs text-pink-300/70 mb-6">Enter the secret code</p>
          
          {/* Dots Display */}
          <div className="flex justify-center gap-3 mb-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full border border-pink-400/50 transition-all ${
                  i < inputPin.length ? 'bg-pink-400 border-pink-400' : ''
                }`}
              />
            ))}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto text-lg font-semibold mb-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                onClick={() => pressNum(num)}
                className="h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-pink-500/20 active:scale-95 transition"
              >
                {num}
              </button>
            ))}
            <button onClick={clearPin} className="h-12 rounded-2xl bg-white/5 border border-white/10 text-xs hover:bg-red-500/20 active:scale-95 transition">✕</button>
            <button onClick={() => pressNum('0')} className="h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-pink-500/20 active:scale-95 transition">0</button>
            <button onClick={checkPin} className="h-12 rounded-2xl bg-white/5 border border-white/10 text-xs hover:bg-green-500/20 active:scale-95 transition">↵</button>
          </div>
        </div>
      )}

      {/* 2. GIFT BOX MODAL */}
      {step === 'gift' && (
        <div className="text-center">
          <p className="text-sm text-pink-300 mb-6">Tap the gift box to open it 🎁</p>
          <div
            onClick={openGift}
            className="cursor-pointer text-8xl transition-transform transform hover:scale-110 active:scale-95 duration-300 animate-bounce"
          >
            🎁
          </div>
        </div>
      )}

      {/* 3. MAIN SURPRISE CONTENT */}
      {step === 'main' && (
        <div className="w-full max-w-md space-y-8 my-8">
          
          {/* Header Greeting */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl text-center space-y-2">
            <span className="text-xs tracking-widest text-pink-400 uppercase font-semibold">✨ YAYYYYY ✨</span>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
              HAPPY NATIONAL BOYFRIEND
            </h1>
            <p className="text-sm text-pink-200 font-semibold">iloveeusooooo0Ooomuch</p>
            <p className="text-xs text-gray-300 italic">"tysm for being the best bf for me"</p>
          </div>

          {/* Digital Bouquet */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl text-center space-y-4">
            <h2 className="text-xl font-semibold text-pink-200">A Digital Bouquet for You 🌸</h2>
            <p className="text-[11px] text-gray-400">Touch each flower to reveal its message</p>
            <div className="flex justify-center gap-4 text-3xl my-4">
              <span onClick={() => setFlowerMsg('🌸 Kamu adalah orang terindah yang pernah aku kenal.')} className="cursor-pointer hover:scale-125 transition">🌸</span>
              <span onClick={() => setFlowerMsg('🌷 Terima kasih sudah selalu hadir dan mencerahkan hariku.')} className="cursor-pointer hover:scale-125 transition">🌷</span>
              <span onClick={() => setFlowerMsg('🌻 Semoga senyummu selalu mekar setiap hari.')} className="cursor-pointer hover:scale-125 transition">🌻</span>
              <span onClick={() => setFlowerMsg('🌹 Kamu pantas mendapatkan semua kebahagiaan di dunia.')} className="cursor-pointer hover:scale-125 transition">🌹</span>
            </div>
            {flowerMsg && (
              <div className="text-xs bg-pink-500/10 border border-pink-500/20 p-3 rounded-xl text-pink-200">
                {flowerMsg}
              </div>
            )}
          </div>

          {/* Letter For You */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-3">
            <h2 className="text-xl font-semibold text-pink-200 text-center">A Letter For You 💌</h2>
            <p className="text-xs text-gray-300 leading-relaxed italic">
              "Untuk seseorang yang paling manis dan paling tampan.<br/><br/>
              On this special day, I want you to know how much you mean to me. Terima kasih telah membawa warna dan kebahagiaan di setiap hariku. I will always be here for you, today, tomorrow, and forever."
            </p>
            <p className="text-right text-xs font-semibold text-pink-300">- With all my love 🤍</p>
          </div>

          {/* Photo Memories */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl text-center space-y-4">
            <h2 className="text-xl font-semibold text-pink-200">Our Photo Memories 📸</h2>
            <div className="p-3 bg-white text-gray-800 rounded-2xl shadow-lg transform -rotate-2 hover:rotate-0 transition duration-300">
              <img src="/1.jpeg" alt="Memories" className="w-full h-56 object-cover rounded-xl mb-2" />
              <p className="text-xs text-gray-600 font-serif">iloveeusooooo0Ooomuch 💕</p>
            </div>
          </div>

          {/* Reasons I'm Grateful for You (Shake Jar) */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl text-center space-y-4">
            <h2 className="text-xl font-semibold text-pink-200">Reasons I'm Grateful for You 🫙</h2>
            <div onClick={kocokToples} className="cursor-pointer inline-block text-5xl hover:rotate-12 transition transform active:scale-95">
              🫙
            </div>
            <p className="text-[11px] text-gray-400">Tekan/Kocok toples untuk mengambil pesan</p>
            {jarMsg && (
              <div className="text-xs bg-purple-500/10 border border-purple-500/20 p-3 rounded-xl text-purple-200">
                {jarMsg}
              </div>
            )}
          </div>

        </div>
      )}

    </main>
  );
}
