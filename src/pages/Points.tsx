import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Points() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
          if (minutes < 0) {
            minutes = 59;
            hours -= 1;
            if (hours < 0) {
              hours = 23;
              minutes = 59;
              seconds = 59;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="premium-mesh text-[#e7e4ea] min-h-screen selection:bg-[#ec63ff]/30 overflow-x-hidden bg-fixed font-['Manrope']" style={{ backgroundColor: '#08080a' }}>
      <style>{`
        @keyframes blob-flow {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); opacity: 0.15; }
          33% { transform: translate(100px, -80px) scale(1.3) rotate(120deg); opacity: 0.25; }
          66% { transform: translate(-80px, 120px) scale(0.8) rotate(240deg); opacity: 0.2; }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); opacity: 0.15; }
        }
        .animate-blob-flow { animation: blob-flow 12s infinite alternate ease-in-out; }
        .animate-jackpot-color {
          animation: jackpot-color 0.4s linear infinite;
        }
        @keyframes jackpot-color {
          0% { color: #ec63ff; text-shadow: 0 0 40px #ec63ff, 0 0 80px #ec63ff; }
          20% { color: #2fd9f4; text-shadow: 0 0 40px #2fd9f4, 0 0 80px #2fd9f4; }
          40% { color: #fed01b; text-shadow: 0 0 40px #fed01b, 0 0 80px #fed01b; }
          60% { color: #ff4b4b; text-shadow: 0 0 40px #ff4b4b, 0 0 80px #ff4b4b; }
          80% { color: #4bff4b; text-shadow: 0 0 40px #4bff4b, 0 0 80px #4bff4b; }
          100% { color: #ec63ff; text-shadow: 0 0 40px #ec63ff, 0 0 80px #ec63ff; }
        }
        .animate-jackpot-shake {
          animation: jackpot-shake 0.05s linear infinite;
        }
        @keyframes jackpot-shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(3px, -3px) rotate(0.5deg); }
          50% { transform: translate(-3px, 3px) rotate(-0.5deg); }
          75% { transform: translate(3px, 3px) rotate(0.5deg); }
        }
        .animate-rainbow-flow {
          animation: rainbow-flow 3s linear infinite;
        }
        @keyframes rainbow-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-rainbow-flow-fast {
          animation: rainbow-flow-fast 0.8s linear infinite;
        }
        @keyframes rainbow-flow-fast {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes rainbow-text {
          0% { color: #ec63ff; filter: drop-shadow(0 0 30px #ec63ff) drop-shadow(0 0 60px #ec63ff); }
          16% { color: #2fd9f4; filter: drop-shadow(0 0 30px #2fd9f4) drop-shadow(0 0 60px #2fd9f4); }
          32% { color: #fed01b; filter: drop-shadow(0 0 30px #fed01b) drop-shadow(0 0 60px #fed01b); }
          48% { color: #ff4b4b; filter: drop-shadow(0 0 30px #ff4b4b) drop-shadow(0 0 60px #ff4b4b); }
          64% { color: #4bff4b; filter: drop-shadow(0 0 30px #4bff4b) drop-shadow(0 0 60px #4bff4b); }
          80% { color: #ec63ff; filter: drop-shadow(0 0 30px #ec63ff) drop-shadow(0 0 60px #ec63ff); }
          100% { color: #ec63ff; filter: drop-shadow(0 0 30px #ec63ff) drop-shadow(0 0 60px #ec63ff); }
        }
        @keyframes button-jitter {
          0% { transform: translate(0,0); }
          25% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, 2px); }
          75% { transform: translate(2px, 2px); }
          100% { transform: translate(0,0); }
        }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .premium-mesh {
          background-color: #08080a;
          background-image:
            radial-gradient(at 0% 0%, hsla(300, 100%, 15%, 0.25) 0px, transparent 50%),
            radial-gradient(at 50% 0%, hsla(188, 100%, 15%, 0.2) 0px, transparent 50%),
            radial-gradient(at 100% 0%, hsla(48, 100%, 20%, 0.25) 0px, transparent 50%),
            radial-gradient(at 50% 50%, hsla(300, 100%, 10%, 0.3) 0px, transparent 50%);
        }
        .glass-card {
          background: rgba(25, 25, 28, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .neon-border-container {
          position: relative;
          padding: 2px;
          border-radius: 0.75rem;
          overflow: hidden;
          background: linear-gradient(90deg, #ec63ff, #2fd9f4, #fed01b, #ec63ff);
          background-size: 200% auto;
        }
        .neon-border-container:hover {
          animation: rainbow-flow-fast 0.8s linear infinite;
        }
        .neon-border-container:hover .claim-btn {
          animation: button-jitter 0.1s linear infinite;
        }
        .animate-pulse-gold {
          animation: pulse-gold 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-gold {
          0%, 100% {
            text-shadow: 0 0 20px rgba(254, 208, 27, 0.4);
            color: #ffe083;
          }
          50% {
            text-shadow: 0 0 50px rgba(254, 208, 27, 0.8), 0 0 100px rgba(236, 99, 255, 0.3);
            color: #fed01b;
          }
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          z-index: -1;
          mix-blend-mode: screen;
        }
      `}</style>

      {/* Immersive Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob w-[800px] h-[800px] bg-[#ec63ff] top-[-15%] left-[-15%] animate-blob-flow"></div>
        <div className="blob w-[700px] h-[700px] bg-[#2fd9f4] bottom-[-10%] right-[5%] animate-blob-flow" style={{ animationDelay: '-3s' }}></div>
        <div className="blob w-[600px] h-[600px] bg-[#fed01b] top-[15%] right-[-10%] animate-blob-flow" style={{ animationDelay: '-6s' }}></div>
        <div className="blob w-[1000px] h-[1000px] bg-[#3d0047] bottom-[-25%] left-[15%] animate-blob-flow" style={{ animationDelay: '-9s' }}></div>
      </div>

      {/* TopAppBar */}
      <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="text-2xl font-black tracking-tighter text-fuchsia-500 drop-shadow-[0_0_10px_rgba(217,70,239,0.5)] font-['Space_Grotesk']">
          <div className="flex items-center gap-1">
            <span>QUACK</span>
            <img alt="Duck Logo" className="h-10 w-auto inline-block drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]" src="https://lh3.googleusercontent.com/aida/ADBb0uhkMniBcvXmutcfVNvMHVuqXjSAiSg4Y2ys8NVVy4G3mYGPAgXjZzuhuj3_s55Azmjc7axIRkTD0VbNH_zQPgDyfSSiiKjwMA_gH2J45mhQcIIRmydf_C-da2iwxG3lQXCeKYdyJGufi-oQx9kch-H-kHi_SSJXLHkbo5ivjXk-kWDieQliezKY3Z27brNrOEX9Rbv09QnVFFI7KyMziVdltIFO_qlS14CDkIqLT-adzrEVVRgzYSOWH5Cv65q0ieF9CaZur2CLVMc" />
            <span>BOOK</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <a onClick={(e) => { e.preventDefault(); navigate('/feed'); }} className="text-zinc-500 hover:text-zinc-300 transition-colors font-['Space_Grotesk'] tracking-wider uppercase text-sm cursor-pointer">Home</a>
          <a className="text-fuchsia-400 border-b-2 border-fuchsia-500 pb-1 font-['Space_Grotesk'] tracking-wider uppercase text-sm" href="#">Points</a>
          <a onClick={(e) => { e.preventDefault(); navigate('/home'); }} className="text-zinc-500 hover:text-zinc-300 transition-colors font-['Space_Grotesk'] tracking-wider uppercase text-sm cursor-pointer">Plaza</a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-[#252529] border border-[#48474c] overflow-hidden">
            <img alt="User Profile Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1L2P0hkInAutduBiOGnjqYSeWf0gsyrWgnYwYmKEANfAw64u2RTG4XnMuEsP0KURu1gx_GuDiFIjwsL1gIFQX37y4HAUoFHaOnJrnEIMw3CTtJ3T4d78TLI04q-hbo2boLSsh7ATu-3Oj8KX0_qmOAQy0IRXrvODDU-GTso0LMVtj19sch-WMppYMXCIt0e7vAlk8nr3KYntO7UrM-eT5IXLy9couUrIe2c1h-GfrXSFUz5YiA4t3Gw1zjZKuXl4G9b68EvyTVNhl" />
          </div>
        </div>
      </header>

      <main className="relative pt-32 pb-32 px-6 max-w-7xl mx-auto min-h-screen z-10">

        {/* Hero Section: Grand Jackpot */}
        <section className="flex flex-col items-center justify-center py-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
            <span className="w-2 h-2 rounded-full bg-[#2fd9f4] animate-pulse shadow-[0_0_10px_#2fd9f4]"></span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#acaaaf] font-bold">待领取分红 / Pending Dividends</span>
          </div>

          <div className="relative mb-6">
            <h1 className="font-['Space_Grotesk'] text-7xl md:text-[9.5rem] font-black tracking-tighter relative leading-none animate-jackpot-shake will-change-transform" style={{ animation: 'rainbow-text 0.4s linear infinite, jackpot-shake 0.05s linear infinite' }}>
              $12,356
            </h1>
          </div>

          <p className="text-sm uppercase tracking-[0.3em] text-[#acaaaf] opacity-60">
            Next Payout in <span className="text-[#2fd9f4] font-bold">{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</span>
          </p>
        </section>

        {/* Data Row: Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Points Card */}
          <div className="group p-10 rounded-3xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 hover:border-[#2fd9f4]/50 transition-all duration-500 relative flex flex-col items-center justify-center text-center">
            <h3 className="text-xs uppercase tracking-[0.4em] text-[#acaaaf] mb-4 opacity-60">我的积分 / My Points</h3>
            <span className="font-['Space_Grotesk'] text-4xl lg:text-5xl font-bold text-[#e7e4ea] tracking-tight">845,200</span>
          </div>

          {/* My Dividends Card */}
          <div className="group p-10 rounded-3xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 hover:border-[#ec63ff]/50 transition-all duration-500 relative flex flex-col items-center justify-center text-center">
            <h3 className="text-xs uppercase tracking-[0.4em] text-[#acaaaf] mb-4 opacity-60">我的分红 / My Dividends</h3>
            <span className="font-['Space_Grotesk'] text-4xl lg:text-5xl font-bold text-[#e7e4ea] tracking-tight">$2,840</span>
          </div>

          {/* Total Dividends Card */}
          <div className="group p-10 rounded-3xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 hover:border-[#fed01b]/50 transition-all duration-500 relative flex flex-col items-center justify-center text-center">
            <h3 className="text-xs uppercase tracking-[0.4em] text-[#acaaaf] mb-4 opacity-60">总分红 / Total Dividends</h3>
            <span className="font-['Space_Grotesk'] text-4xl lg:text-5xl font-bold text-[#e7e4ea] tracking-tight">$15,200</span>
          </div>
        </div>

        {/* High-Impact Claim Button */}
        <div className="flex justify-center mt-12">
          <div className="neon-border-container animate-rainbow-flow group rounded-xl">
            <button className="claim-btn px-12 py-6 rounded-xl bg-black text-white font-['Space_Grotesk'] text-xl font-black uppercase tracking-widest flex items-center justify-center gap-6 transition-all active:scale-95">
              <img alt="Duck" className="h-10 w-auto group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida/ADBb0ugj2_n8ya0p1ofISHbQoyTloNe7nJDqNHKEVN0tTuBruBoO8rBug7BvxRPyPG6G0qCxKSQMJ2tKMqBADB12OSj_Cc7RY0AoXjeYGv1qE8A3IKuTD9s_Yy3ruA1mnphpQoxX8aygKIJqyH70aYT5I7OR-maAyIwhHh8pha-3w86H1ToIjSnifBjIzlZcH2cTo7w4NKDasf2Q4pm664JATrkZdXwRtOKoJFTILRaCYm4gVRcveasLXAvemPeVMRnT_enrRDmwtnGXlJ4" />
              <span>Claim Rewards / 领取奖励</span>
            </button>
          </div>
        </div>

        {/* Information Footer */}
        <div className="mt-24 w-full grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/5">
          <div className="flex gap-5 items-start">
            <div className="p-3 rounded-xl bg-[#2fd9f4]/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2Z" stroke="#2fd9f4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke="#2fd9f4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="font-['Space_Grotesk'] text-base font-bold text-[#e7e4ea]">Secure Protocol</p>
              <p className="text-sm text-[#acaaaf] mt-2 leading-relaxed opacity-70">Multi-sig validation for all dividend distributions ensures sovereign protection of assets.</p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <div className="p-3 rounded-xl bg-[#ec63ff]/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 16.5C4.5 16.5 5.5 20 8.5 20C11.5 20 12 17 14 17C16 17 16.5 20 19.5 20C22.5 20 23.5 16.5 23.5 16.5" stroke="#ec63ff" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 3V7M12 7L9 5M12 7L15 5" stroke="#ec63ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12L11 9L14 12L17 9" stroke="#ec63ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="font-['Space_Grotesk'] text-base font-bold text-[#e7e4ea]">Dynamic Yield</p>
              <p className="text-sm text-[#acaaaf] mt-2 leading-relaxed opacity-70">Yields are calculated based on floor participation and tiered high-stakes activities.</p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <div className="p-3 rounded-xl bg-[#fed01b]/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="3" width="16" height="18" rx="2" stroke="#fed01b" strokeWidth="1.5"/>
                <line x1="8" y1="8" x2="16" y2="8" stroke="#fed01b" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="8" y1="12" x2="14" y2="12" stroke="#fed01b" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="8" y1="16" x2="12" y2="16" stroke="#fed01b" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="font-['Space_Grotesk'] text-base font-bold text-[#e7e4ea]">Immutable Logs</p>
              <p className="text-sm text-[#acaaaf] mt-2 leading-relaxed opacity-70">Every claim is recorded on the distributed ledger for transparent vault auditing.</p>
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-black/60 backdrop-blur-3xl border-t border-white/5 md:hidden rounded-t-3xl">
        <a onClick={(e) => { e.preventDefault(); navigate('/feed'); }} className="flex flex-col items-center justify-center text-zinc-600 hover:text-fuchsia-300 transition-all cursor-pointer">
          <span className="font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-widest">HOME</span>
        </a>
        <a onClick={(e) => { e.preventDefault(); navigate('/home'); }} className="flex flex-col items-center justify-center text-zinc-600 hover:text-fuchsia-300 transition-all cursor-pointer">
          <span className="font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-widest">Plaza</span>
        </a>
        <a className="flex flex-col items-center justify-center cursor-pointer">
          <span className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-widest text-fuchsia-400">Points</span>
        </a>
      </nav>
    </div>
  );
}
