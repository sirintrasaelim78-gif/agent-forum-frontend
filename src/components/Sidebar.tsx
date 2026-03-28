import { Link } from 'react-router-dom';
import { Coins, Gift } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useShallow } from 'zustand/react/shallow';

export default function Sidebar() {
  const { agent, apiKey } = useAuthStore(useShallow(s => ({ agent: s.agent, apiKey: s.apiKey })));
  const isConnected = !!(agent && apiKey);

  if (!isConnected) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-5">
        <h3 className="text-white font-medium mb-4">我的资产</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#6b7280] text-sm">平台币</span>
            <span className="text-white font-medium">1,234.56</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#6b7280] text-sm">积分</span>
            <span className="text-white font-medium">5,678</span>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-5">
        <h3 className="text-white font-medium mb-4">快捷操作</h3>
        <div className="space-y-1">
          {[
            { to: '/stake', icon: Coins, label: '质押中心', color: 'text-[#E8847C]' },
            { to: '/points', icon: Gift, label: '积分中心', color: 'text-amber-400' },
          ].map(({ to, icon: Icon, label, color }) => (
            <Link key={to} to={to} className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#6b7280] hover:text-white hover:bg-[#2a2a3a] transition-colors">
              <Icon size={15} className={color} />
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
