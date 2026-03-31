import { useNavigate } from 'react-router-dom';

export default function TermsOfService() {
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
        <h1 className="text-4xl font-black text-white mb-2 font-['Space_Grotesk']">Terms of Service</h1>
        <p className="text-sm text-zinc-500 mb-10">Last updated: March 31, 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">1. Acceptance of Terms</h2>
            <p className="text-zinc-400 leading-relaxed">By accessing and using QUACKBOOK, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. These terms constitute a legally binding agreement between you and QUACKBOOK.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">2. Description of Service</h2>
            <p className="text-zinc-400 leading-relaxed">QUACKBOOK provides a decentralized forum platform with integrated points and dividends. Our services include content posting, community engagement, and participation rewards.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">3. User Eligibility</h2>
            <p className="text-zinc-400 leading-relaxed">Users must be at least 18 years old and have full legal capacity to enter into these terms. By using our platform, you represent that you meet these eligibility requirements.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">4. User Conduct</h2>
            <p className="text-zinc-400 leading-relaxed mb-3">You agree to:</p>
            <ul className="list-disc list-inside text-zinc-400 leading-relaxed space-y-1">
              <li>Comply with all applicable laws and regulations</li>
              <li>Not post illegal, harmful, or offensive content</li>
              <li>Not attempt to manipulate the points or reward system</li>
              <li>Not interfere with platform operations or security</li>
              <li>Maintain the confidentiality of your account credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">5. Points & Dividends</h2>
            <p className="text-zinc-400 leading-relaxed">Points are earned through platform participation. Dividends are distributed based on platform activity and community contribution. All mechanics are governed by algorithmic calculations. Past performance does not guarantee future results.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">6. Intellectual Property</h2>
            <p className="text-zinc-400 leading-relaxed">User-generated content remains the property of the respective creators. QUACKBOOK retains ownership of the platform, trademarks, and proprietary technology. You grant us a license to use your content for platform operation.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">7. Disclaimer of Warranties</h2>
            <p className="text-zinc-400 leading-relaxed">Our platform is provided "as is" and "as available" without warranties of any kind. We do not guarantee uninterrupted access, error-free operation, or specific outcomes from using our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">8. Limitation of Liability</h2>
            <p className="text-zinc-400 leading-relaxed">To the maximum extent permitted by law, QUACKBOOK shall not be liable for indirect, incidental, special, or consequential damages arising from your use of the platform or services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">9. Indemnification</h2>
            <p className="text-zinc-400 leading-relaxed">You agree to indemnify and hold harmless QUACKBOOK and its team from any claims, damages, or expenses arising from your violation of these terms or your wrongful conduct.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">10. Modifications to Terms</h2>
            <p className="text-zinc-400 leading-relaxed">We reserve the right to modify these terms at any time. Material changes will be communicated via platform notices. Continued use after modifications constitutes acceptance of updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">11. Governing Law</h2>
            <p className="text-zinc-400 leading-relaxed">These terms shall be governed by applicable laws. Any disputes shall be resolved through arbitration or courts of competent jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-fuchsia-400 mb-3 font-['Space_Grotesk']">12. Contact</h2>
            <p className="text-zinc-400 leading-relaxed">For questions regarding these Terms of Service, please contact our team through official platform channels.</p>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-16 pt-8 border-t border-white/10 flex gap-8 text-sm">
          <a onClick={() => navigate('/terms')} className="text-fuchsia-400 transition-colors cursor-pointer">Terms of Service</a>
          <a onClick={() => navigate('/privacy')} className="text-zinc-500 hover:text-fuchsia-400 transition-colors cursor-pointer">Privacy Policy</a>
        </div>
      </main>
    </div>
  );
}
