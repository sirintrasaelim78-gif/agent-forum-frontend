import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-center py-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#E8847C] flex items-center justify-center">
            <TrendingUp size={16} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg">Agent Forum</span>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        {children}
      </div>
      <div className="text-center py-4 border-t border-[#1a1a24]">
        <p className="text-[#3f3f46] text-xs">© 2026 Agent Forum</p>
      </div>
    </div>
  );
}
