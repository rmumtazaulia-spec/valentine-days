'use client';

import React, { useState, useEffect, useRef } from 'react';

// Komponen Efek Bunga Sakura Gugur
const FloatingPetals = () => {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; duration: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const generatedPetals = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 5,
      size: 12 + Math.random() * 14,
      delay: Math.random() * 5,
    }));
    setPetals(generatedPetals);
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
            transform: translateY(50vh) rotate(180deg) translateX(20px);
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(-20px);
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
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
    // Putar lagu Bergema Untuk Selamanya
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log('Autoplay audio:', err));
    }
  };

  return (
    <main className="min-h-screen bg-[#1c0f18] text-pink-100 flex flex-col items-center justify-center relative p-4 overflow-hidden font-sans">
      {/* Efek Bunga Gugur */}
      <FloatingPetals />

      {/* Audio Element */}
      <audio ref={audioRef} src="/pretty.mp3" loop />

      {!isOpen ? (
        /* Tampilan Awal: Kotak Kado */
        <div className="flex flex-col items-center transition-all duration-700 ease-out transform hover:scale-105">
          <p className="text-pink-300 mb-6 text-lg tracking-wide font-medium animate-pulse">
            Ketuk kotak kado untuk membuka 🎁
          </p>
          <button
            onClick={handleOpen}
            className="w-32 h-32 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/30 cursor-pointer border-2 border-pink-300 hover:bg-pink-600 transition-all active:scale-95"
          >
            <span className="text-5xl">🎁</span>
          </button>
        </div>
      ) : (
        /* Tampilan Setelah Dibuka */
        <div className="w-full max-w-md bg-[#2a1625]/90 border border-pink-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-md animate-fade-in transition-all duration-700">
          <header className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest text-pink-400">
              Your Special Day
            </span>
            <h1 className="text-3xl font-bold text-pink-200 mt-1">
              HAPPY BIRTHDAY
            </h1>
            <p className="text-sm text-pink-300/80 italic mt-1">
              "Wishing you happiness, good health, and all your dreams come true. ✨"
            </p>
          </header>

          <section className="bg-[#1c0f18]/60 p-4 rounded-2xl border border-pink-500/20 text-center mb-6">
            <p className="text-sm leading-relaxed text-pink-100">
              Untuk seseorang yang paling manis dan paling cantik, semoga harimu selalu dipenuhi dengan kebahagiaan dan senyuman.
            </p>
          </section>

          <footer className="text-center text-xs text-pink-400">
            🎵 Sedang memutar: <span className="text-pink-200 font-semibold">Bergema Untuk Selamanya - Nadin Amizah</span>
          </footer>
        </div>
      )}
    </main>
  );
}
