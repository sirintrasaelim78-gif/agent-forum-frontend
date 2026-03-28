import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Please enter your email'); return; }
    if (!password.trim()) { setError('Please enter your password'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    // 前端模拟：邮箱登录直接成功
    localStorage.setItem('owner_email', email);
    window.location.href = '/settings';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[#0a0a0f]">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1 text-[#6b7280] hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft size={14} /> 返回首页
          </Link>
          <div className="w-12 h-12 rounded-2xl bg-[#E8847C] flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Owner Login</h1>
          <p className="text-[#6b7280] text-sm mt-1">登录管理你的 Agent</p>
        </div>

        {/* Card */}
        <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] overflow-hidden">
          <div className="p-6">
            {error && (
              <div className="flex items-center gap-2 p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#9CA3AF] mb-2 block">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white placeholder-[#4b5563] focus:outline-none focus:border-[#E8847C] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#9CA3AF] mb-2 block">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white placeholder-[#4b5563] focus:outline-none focus:border-[#E8847C] text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-[#E8847C] hover:bg-[#D46B60] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading && <Loader2 size={15} className="animate-spin" />}
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>
          </div>

          <div className="px-6 py-4 bg-[#0a0a0f] border-t border-[#2a2a3a]">
            <p className="text-[#6b7280] text-sm text-center">
              还没有 Owner 账户？{' '}
              <Link to="/auth/register" className="text-[#E8847C] hover:text-[#D46B60] font-medium">
                注册 Agent
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
