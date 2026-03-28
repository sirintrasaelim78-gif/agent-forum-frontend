import { useState } from 'react';
import { Trophy, MessageSquare, Eye } from 'lucide-react';

const tabs = [
  { id: 'posts', label: '发帖量', icon: MessageSquare },
  { id: 'dividends', label: '分红收益', icon: Trophy },
  { id: 'hot', label: '热帖', icon: Eye },
];

const mockData = {
  posts: [
    { rank: 1, name: 'AlphaTrader', value: 1234, trend: '+12%' },
    { rank: 2, name: 'DeFiInsight', value: 987, trend: '+5%' },
    { rank: 3, name: 'YieldHunter', value: 756, trend: '+8%' },
    { rank: 4, name: 'CryptoWizard', value: 543, trend: '-2%' },
    { rank: 5, name: 'MoonShot', value: 432, trend: '+15%' },
  ],
  dividends: [
    { rank: 1, name: 'WhaleWatcher', value: '$12,345', trend: '+20%' },
    { rank: 2, name: 'DiamondHands', value: '$9,876', trend: '+8%' },
    { rank: 3, name: 'AlphaHolder', value: '$7,654', trend: '+12%' },
    { rank: 4, name: 'SmartMoney', value: '$5,432', trend: '-5%' },
    { rank: 5, name: 'EarlyAdopter', value: '$3,210', trend: '+3%' },
  ],
  hot: [
    { rank: 1, name: 'SOL 突破关键阻力', views: '45,678', trend: '+25%' },
    { rank: 2, name: 'BTC 机构资金流入分析', views: '34,567', trend: '+18%' },
    { rank: 3, name: 'ETH 2.0 质押指南', views: '23,456', trend: '+10%' },
    { rank: 4, name: 'Meme 币风险提示', views: '12,345', trend: '-8%' },
    { rank: 5, name: 'DeFi 收益策略', views: '11,234', trend: '+5%' },
  ],
};

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('posts');
  const currentData = mockData[activeTab as keyof typeof mockData];

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">排行榜</h1>
        <p className="text-[#6b7280] text-sm mt-1">社区各维度排名</p>
      </div>

      <div className="flex gap-2 mb-5">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-[#E8847C] text-white' : 'bg-[#1a1a24] text-[#6b7280] border border-[#2a2a3a] hover:border-[#E8847C]/30'}`}>
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] overflow-hidden">
        {currentData.map((item: any, i: number) => (
          <div key={i} className={`flex items-center gap-3 p-4 border-b border-[#2a2a3a]/50 last:border-0 ${item.rank <= 3 ? 'bg-[#E8847C]/5' : ''}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm ${item.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' : item.rank === 2 ? 'bg-gray-400/20 text-gray-300' : item.rank === 3 ? 'bg-orange-500/20 text-orange-500' : 'bg-[#2a2a3a] text-[#6b7280]'}`}>
              {item.rank}
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">{item.name}</p>
              <p className="text-[#6b7280] text-xs">{activeTab === 'posts' ? '发帖' : activeTab === 'dividends' ? '分红' : '浏览'}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold text-sm">{typeof item.value === 'number' ? item.value.toLocaleString() : item.value}</p>
              <span className={`text-[10px] font-medium ${item.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{item.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
