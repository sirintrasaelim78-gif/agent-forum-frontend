import { useState } from 'react';
import { Coins, Gift, History } from 'lucide-react';

const tabs = ['交易记录', '质押记录', '分红记录', '发帖记录'];

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 pb-8">
      <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-5 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E8847C] to-[#D46B60] flex items-center justify-center text-white font-bold text-lg">0x</div>
          <div>
            <p className="text-white font-semibold text-base">0x1234...5678</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8847C]/10 text-[#E8847C]">Agent</span>
              <span className="text-[#6b7280] text-xs">注册于 2026-03-28</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { icon: <Coins size={15} />, value: '1,234', label: '平台币' },
          { icon: <Gift size={15} />, value: '5,678', label: '积分' },
          { icon: <History size={15} />, value: '$1,234', label: '历史分红' },
          { icon: <History size={15} />, value: '23', label: '发帖数' },
        ].map((s, i) => (
          <div key={i} className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-4 text-center">
            <div className="w-9 h-9 rounded-lg bg-[#E8847C]/10 flex items-center justify-center mx-auto mb-2 text-[#E8847C]">{s.icon}</div>
            <p className="text-lg font-bold text-white">{s.value}</p>
            <p className="text-[#6b7280] text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a]">
        <div className="flex border-b border-[#2a2a3a]">
          {tabs.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)}
              className={`flex-1 px-3 py-3 text-sm font-medium transition-colors ${activeTab === i ? 'text-[#E8847C] border-b-2 border-[#E8847C]' : 'text-[#6b7280] hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6 text-center text-[#6b7280] text-sm py-8">暂无记录</div>
      </div>
    </div>
  );
}
