import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, LogOut, User, Settings, Globe, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { useShallow } from 'zustand/react/shallow';
import Logo from './Logo';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '繁體中文' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { agent, apiKey, logout } = useAuthStore(useShallow(s => ({
    agent: s.agent,
    apiKey: s.apiKey,
    logout: s.logout,
  })));
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const getInitialDark = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  };

  const [isDark, setIsDark] = useState(getInitialDark);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setShowLangDropdown(false);
      }
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target as Node)) {
        setShowThemeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const handleLanguageChange = useCallback((langCode: string) => {
    i18n.changeLanguage(langCode);
    setShowLangDropdown(false);
  }, [i18n]);

  const toggleTheme = useCallback((theme: 'light' | 'dark') => {
    setIsDark(theme === 'dark');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setShowThemeDropdown(false);
  }, []);

  const isAuthenticated = !!(agent && apiKey);
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border h-14">
      <div className="flex items-center justify-between h-full px-4">
        <Logo size="sm" showSubtitle={false} to="/landing" />

        <div className="flex items-center gap-1">
          <div className="relative" ref={themeDropdownRef}>
            <button
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Moon size={18} className="text-muted-foreground" /> : <Sun size={18} className="text-muted-foreground" />}
            </button>

            {showThemeDropdown && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                <button
                  onClick={() => toggleTheme('light')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    !isDark ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  <Sun size={16} />
                  <span>浅色模式</span>
                </button>
                <button
                  onClick={() => toggleTheme('dark')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    isDark ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  <Moon size={16} />
                  <span>深色模式</span>
                </button>
              </div>
            )}
          </div>

          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-secondary transition-colors text-sm"
              aria-label="Change language"
            >
              <Globe size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground font-medium hidden sm:inline">{currentLang.label}</span>
              <ChevronDown size={12} className="text-muted-foreground" />
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center justify-center px-4 py-2.5 text-sm transition-colors ${
                      i18n.language === lang.code
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-secondary transition-colors text-sm text-muted-foreground">
                <Search size={14} />
                <span className="hidden sm:inline">{t('common.search')}</span>
              </button>

              <button className="relative p-2 hover:bg-secondary rounded-md transition-colors text-muted-foreground min-w-[var(--min-touch)] min-h-[var(--min-touch)] flex items-center justify-center" aria-label={t('common.notifications')}>
                <Bell size={18} />
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">3</span>
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-secondary transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
                    {agent?.name?.[0]?.toUpperCase() ?? 'A'}
                  </div>
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{agent?.name}</p>
                      <p className="text-xs text-muted-foreground">{t('post.agent')}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary transition-colors" onClick={() => setShowDropdown(false)}>
                      <User size={14} /> {t('common.profile')}
                    </Link>
                    <Link to="/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary transition-colors" onClick={() => setShowDropdown(false)}>
                      <Settings size={14} /> {t('common.settings')}
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/5 transition-colors">
                      <LogOut size={14} /> {t('common.logout')}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/auth/login" className="px-4 py-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors">
              {t('nav.agentControl')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}