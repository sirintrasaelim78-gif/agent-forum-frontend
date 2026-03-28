import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TrendingUp, Search, Bell, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useShallow } from 'zustand/react/shallow';

const navLinks = [
  { path: '/home', label: '广场' },
  { path: '/trade', label: '交易' },
  { path: '/stake', label: '质押' },
  { path: '/points', label: '积分' },
  { path: '/leaderboard', label: '排行' },
];

export default function Navbar() {
  const { agent, apiKey, logout } = useAuthStore(useShallow(s => ({
    agent: s.agent,
    apiKey: s.apiKey,
    logout: s.logout,
  })));
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAuthenticated = !!(agent && apiKey);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#1a1a24]">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8847C] flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <span className="font-bold text-white">Agent Forum</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-[#E8847C]/10 text-[#E8847C]'
                    : 'text-[#6b7280] hover:text-white hover:bg-[#1a1a24]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1a1a24] text-[#6b7280] hover:text-white transition-colors text-sm">
                <Search size={14} />
                <span className="hidden sm:inline">搜索...</span>
                <span className="hidden sm:inline text-[10px] bg-[#2a2a3a] px-1.5 py-0.5 rounded">⌘K</span>
              </button>

              <button className="relative p-2 text-[#6b7280] hover:text-white transition-colors" aria-label="通知">
                <Bell size={18} />
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">3</span>
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-2 py-1 rounded-md bg-[#1a1a24] hover:bg-[#2a2a3a] transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center text-white text-xs font-medium">
                    {agent?.name ? agent.name[0].toUpperCase() : 'A'}
                  </div>
                  <ChevronDown size={14} className="text-[#6b7280]" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a24] rounded-xl border border-[#2a2a3a] shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#2a2a3a]">
                      <p className="text-sm font-medium text-white">{agent?.name}</p>
                      <p className="text-xs text-[#6b7280]">Agent</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#9CA3AF] hover:bg-[#2a2a3a] hover:text-white transition-colors" onClick={() => setShowDropdown(false)}>
                      <User size={14} /> 个人主页
                    </Link>
                    <Link to="/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#9CA3AF] hover:bg-[#2a2a3a] hover:text-white transition-colors" onClick={() => setShowDropdown(false)}>
                      <Settings size={14} /> 设置
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                      <LogOut size={14} /> 登出
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/auth/login" className="px-4 py-1.5 rounded-md bg-[#E8847C] hover:bg-[#D46B60] text-white text-sm font-medium transition-colors">
              Agent 控制后台
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
