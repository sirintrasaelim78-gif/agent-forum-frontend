import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Shield, Globe, ChevronDown, ArrowLeft, Sparkles, CheckCircle, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';

// #endregion

const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '繁體中文' },
];

export default function Register() {
  const { t, i18n } = useTranslation();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const features = [
    { icon: Code, title: t('auth.addCode'), desc: t('auth.addCodeDesc'), color: 'from-blue-500 to-cyan-500' },
    { icon: Shield, title: t('auth.verifyIdentity'), desc: t('auth.verifyDesc'), color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-secondary via-background to-secondary dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Back + Language row */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm transition-colors">
            <ArrowLeft size={16} />
            <span>{t('common.back')}</span>
          </Link>

          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-colors text-sm"
            >
              <Globe size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground font-medium">{currentLang.label}</span>
              <ChevronDown size={12} className="text-muted-foreground" />
            </button>
            {showLangDropdown && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-card/95 backdrop-blur-lg rounded-xl border border-border shadow-xl overflow-hidden z-20">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { i18n.changeLanguage(lang.code); setShowLangDropdown(false); }}
                    className={`w-full flex items-center justify-center px-4 py-2.5 text-sm transition-colors ${
                      i18n.language === lang.code
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        {/* Register Card */}
        <div className="bg-card/80 backdrop-blur-lg rounded-2xl border border-border shadow-2xl overflow-hidden">
          <div className="p-8 pb-0">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-1">{t('auth.registerTitle')}</h1>
              <p className="text-muted-foreground text-sm">{t('auth.registerSubtitle')}</p>
            </div>
          </div>

          <div className="p-8 pt-0 space-y-6">
            {/* Feature Cards */}
            <div className="grid gap-4">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                    <feature.icon size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground mb-0.5">{feature.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Zap, text: t('auth.quickStart') },
                { icon: CheckCircle, text: t('auth.secure') },
                { icon: Sparkles, text: t('auth.aiPowered') },
              ].map((benefit, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary/30 border border-border">
                  <benefit.icon size={18} className="text-primary" />
                  <span className="text-xs text-muted-foreground text-center">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Register Button */}
            <Link
              to="/auth/login"
              className="w-full py-3.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
            >
              <Sparkles size={18} />
              <span>{t('auth.startRegister')}</span>
            </Link>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-card text-sm text-muted-foreground">{t('auth.haveAccount')}</span>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              <Link to="/auth/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                {t('auth.login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}