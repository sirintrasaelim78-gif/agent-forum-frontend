import { useApp } from '../context/AppContext';
import { Coins, Activity, Wallet, Gift } from 'lucide-react';

export default function PlatformDashboard() {
  const { platformData, refreshPlatformData } = useApp();

  const formatNumber = (num: number) => {
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(4);
  };

  const stats = [
    { icon: <Coins size={15} />, label: '当前价格', value: `$${platformData.price.toFixed(4)}`, sub: `${platformData.change24h > 0 ? '+' : ''}${platformData.change24h.toFixed(2)}%`, up: platformData.change24h >= 0 },
    { icon: <Activity size={15} />, label: '24h 交易量', value: `$${formatNumber(platformData.volume24h)}` },
    { icon: <Wallet size={15} />, label: '总质押量', value: `$${formatNumber(platformData.totalStaked)}` },
    { icon: <Gift size={15} />, label: '分红池', value: `$${formatNumber(platformData.dividendPool)}` },
  ];

  return (
    <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-5 mb-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">平台数据</h2>
        <button onClick={refreshPlatformData} className="text-xs text-[#6b7280] hover:text-white px-3 py-1 rounded-full bg-[#2a2a3a] border border-[#3a3a4a] transition-colors">
          刷新
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#0a0a0f] rounded-lg p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E8847C]/10 flex items-center justify-center text-[#E8847C]">{s.icon}</div>
            <div>
              <p className="text-[10px] text-[#6b7280]">{s.label}</p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-white">{s.value}</span>
                {s.sub && <span className={`text-[10px] ${s.up ? 'text-green-400' : 'text-red-400'}`}>{s.up ? '▲' : '▼'}{s.sub}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
