import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-[#e7e4ea] selection:bg-[#ec63ff]/30 overflow-x-hidden relative" style={{ backgroundColor: '#08080a', fontFamily: 'Manrope, sans-serif' }}>
      <style>{`
        .premium-mesh {
          background-color: #08080a;
          background-image:
            radial-gradient(at 0% 0%, hsla(300, 100%, 15%, 0.25) 0px, transparent 50%),
            radial-gradient(at 50% 0%, hsla(188, 100%, 15%, 0.2) 0px, transparent 50%),
            radial-gradient(at 100% 0%, hsla(48, 100%, 20%, 0.25) 0px, transparent 50%),
            radial-gradient(at 50% 50%, hsla(300, 100%, 10%, 0.3) 0px, transparent 50%);
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 z-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(47, 217, 244, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 0% 0%, rgba(236, 99, 255, 0.08) 0%, transparent 40%), radial-gradient(ellipse at 100% 0%, rgba(254, 208, 27, 0.08) 0%, transparent 40%)' }}></div>

      {/* Header */}
      <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-black/60 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="text-xl font-black tracking-tighter text-fuchsia-500 drop-shadow-[0_0_10px_rgba(217,70,239,0.5)] font-['Space_Grotesk'] cursor-pointer" onClick={() => navigate('/feed')}>
          QUACKBOOK
        </div>
        <button onClick={() => navigate('/points')} className="text-sm text-zinc-400 hover:text-white transition-colors font-['Space_Grotesk']">
          ← Back
        </button>
      </header>

      <main className="relative pt-24 pb-24 px-6 max-w-3xl mx-auto z-10">
        <h1 className="text-4xl font-black text-white mb-2 font-['Space_Grotesk']">Privacy Policy</h1>
        <p className="text-sm text-zinc-500 mb-10">Last updated: March 31, 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">1. Information We Collect</h2>
            <p className="text-zinc-400 leading-relaxed">We collect information you provide directly, including but not limited to: account information, content you post, transaction data, and communication preferences. We also automatically collect certain technical data when you use our platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">2. How We Use Your Information</h2>
            <p className="text-zinc-400 leading-relaxed">We use collected information to provide, maintain, and improve our services, process transactions, send you updates and marketing communications, and ensure platform security. We never sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">3. Data Security</h2>
            <p className="text-zinc-400 leading-relaxed">We implement industry-standard encryption and security measures to protect your data. Multi-sig validation protocols safeguard all financial operations. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">4. Cookies & Tracking</h2>
            <p className="text-zinc-400 leading-relaxed">We use cookies and similar tracking technologies to maintain session state, analyze platform usage, and personalize your experience. You can control cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">5. Third-Party Services</h2>
            <p className="text-zinc-400 leading-relaxed">Our platform may integrate third-party services. These services have their own privacy policies governing their use of your information. We encourage you to review their policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">6. Your Rights</h2>
            <p className="text-zinc-400 leading-relaxed">You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time. Contact us to exercise these rights.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">7. Changes to This Policy</h2>
            <p className="text-zinc-400 leading-relaxed">We may update this Privacy Policy periodically. Significant changes will be communicated via email or prominent notices on the platform. Continued use of the platform constitutes acceptance of updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">8. Contact Us</h2>
            <p className="text-zinc-400 leading-relaxed">For privacy-related inquiries, please reach out to our data protection team. We respond to all legitimate requests within 30 days.</p>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-16 pt-8 border-t border-white/10 flex gap-8 text-sm">
          <a onClick={() => navigate('/terms')} className="text-zinc-500 hover:text-fuchsia-400 transition-colors cursor-pointer">Terms of Service</a>
          <a onClick={() => navigate('/privacy')} className="text-fuchsia-400 transition-colors cursor-pointer">Privacy Policy</a>
        </div>
      </main>
    </div>
  );
}
