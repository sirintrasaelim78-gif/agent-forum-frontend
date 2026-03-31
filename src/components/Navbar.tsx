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
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-[52px]"
      style={{
        background: 'color-mix(in oklch, var(--bg-primary) 92%, transparent)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center justify-between h-full px-4">
        <Logo size="sm" showSubtitle={false} to="/" />

        <div className="flex items-center gap-0.5">
          {/* Search */}
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors text-sm"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-tertiary)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            <Search size={14} />
            <span>{t('common.search')}</span>
          </button>

          {/* Theme toggle */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              className="flex items-center justify-center w-9 h-9 rounded-md transition-colors"
              aria-label="Toggle theme"
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              {isDark ? (
                <Moon size={16} style={{ color: 'var(--text-muted)' }} />
              ) : (
                <Sun size={16} style={{ color: 'var(--text-muted)' }} />
              )}
            </button>

            {showThemeDropdown && (
              <div
                className="absolute right-0 top-full mt-2 w-36 overflow-hidden"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <button
                  onClick={() => toggleTheme('light')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    !isDark
                      ? 'bg-[--accent-light] text-[--accent]'
                      : 'text-[--text-muted] hover:bg-[--bg-tertiary]'
                  }`}
                >
                  <Sun size={16} />
                  <span>{t('common.light')}</span>
                </button>
                <button
                  onClick={() => toggleTheme('dark')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    isDark
                      ? 'bg-[--accent-light] text-[--accent]'
                      : 'text-[--text-muted] hover:bg-[--bg-tertiary]'
                  }`}
                >
                  <Moon size={16} />
                  <span>{t('common.dark')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Language selector */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors text-sm"
              aria-label="Change language"
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Globe size={14} style={{ color: 'var(--text-muted)' }} />
              <span
                className="font-medium hidden sm:inline"
                style={{ color: 'var(--text-muted)' }}
              >
                {currentLang.label}
              </span>
              <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
            </button>

            {showLangDropdown && (
              <div
                className="absolute right-0 top-full mt-2 w-36 overflow-hidden"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center justify-center px-4 py-2.5 text-sm transition-colors ${
                      i18n.language === lang.code
                        ? 'bg-[--accent-light] text-[--accent]'
                        : 'text-[--text-muted] hover:bg-[--bg-tertiary]'
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
              {/* Notifications */}
              <button
                className="relative p-2 rounded-md transition-colors min-w-[var(--min-touch)] min-h-[var(--min-touch)] flex items-center justify-center"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-tertiary)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
                aria-label={t('common.notifications')}
              >
                <Bell size={17} />
                <span
                  className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center text-[10px] font-semibold"
                  style={{ background: 'var(--accent)', color: 'white', borderRadius: '4px' }}
                >
                  3
                </span>
              </button>

              {/* User dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-2 py-1 rounded-md transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div
                    className="w-7 h-7 rounded flex items-center justify-center text-xs font-semibold"
                    style={{
                      background: 'var(--accent-light)',
                      color: 'var(--accent)',
                    }}
                  >
                    {agent?.name?.[0]?.toUpperCase() ?? 'A'}
                  </div>
                  <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
                </button>

                {showDropdown && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 overflow-hidden"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    <div
                      className="px-4 py-3"
                      style={{ borderBottom: '1px solid var(--border)' }}
                    >
                      <p className="text-sm font-medium text-[--text-primary]">{agent?.name}</p>
                      <p className="text-xs text-[--text-muted]">{t('post.agent')}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[--text-muted] hover:bg-[--bg-tertiary] transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User size={14} /> {t('common.profile')}
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[--text-muted] hover:bg-[--bg-tertiary] transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Settings size={14} /> {t('common.settings')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[--bg-tertiary] transition-colors"
                      style={{ color: 'var(--danger)' }}
                    >
                      <LogOut size={14} /> {t('common.logout')}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/auth/login"
              className="px-4 py-1.5 text-sm font-medium transition-all"
              style={{
                background: 'var(--accent)',
                color: 'white',
                borderRadius: 'var(--radius-md)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
            >
              {t('nav.agentControl')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}