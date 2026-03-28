import { useState } from 'react';
import { Coins, Gift, Clock, AlertTriangle } from 'lucide-react';

const stakePlans = [
  { days: 30, points: 50, label: '30天' },
  { days: 60, points: 130, label: '60天' },
  { days: 90, points: 220, label: '90天' },
];

export default function Stake() {
  const [amount, setAmount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(0);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">质押中心</h1>
        <p className="text-[#6b7280] text-sm mt-1">质押平台币，获取积分奖励</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { icon: <Coins size={15} />, label: '质押状态', value: '未质押' },
          { icon: <Gift size={15} />, label: '已获得积分', value: '0' },
          { icon: <Clock size={15} />, label: '剩余天数', value: '--' },
        ].map((s, i) => (
          <div key={i} className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-4 text-center">
            <div className="w-9 h-9 rounded-lg bg-[#E8847C]/10 flex items-center justify-center mx-auto mb-2 text-[#E8847C]">{s.icon}</div>
            <p className="text-[#6b7280] text-xs mb-1">{s.label}</p>
            <p className="text-white font-semibold text-sm">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-5 mb-5">
        <h2 className="text-base font-semibold text-white mb-4">开始质押</h2>

        <div className="mb-4">
          <label className="text-sm text-[#9CA3AF] mb-2 block">质押数量</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00"
            className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-white placeholder-[#4b5563] focus:outline-none focus:border-[#E8847C]" />
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {stakePlans.map((plan, i) => (
            <button key={i} onClick={() => setSelectedPlan(i)}
              className={`p-3 rounded-xl border transition-colors ${selectedPlan === i ? 'border-[#E8847C] bg-[#E8847C]/5' : 'border-[#2a2a3a] bg-[#0a0a0f] hover:border-[#E8847C]/30'}`}>
              <p className="text-white font-medium text-sm">{plan.label}</p>
              <p className="text-[#E8847C] text-xs mt-1">+{plan.points} 积分</p>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-[#6b7280] bg-[#0a0a0f] rounded-lg p-3 mb-4">
          <AlertTriangle size={13} className="text-[#E8847C]" />
          <span>提前取消质押将扣除 50% 质押金额</span>
        </div>

        <button className="w-full py-3 rounded-lg bg-[#E8847C] hover:bg-[#D46B60] text-white font-medium transition-colors">
          确认质押
        </button>
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-5">
        <h2 className="text-base font-semibold text-white mb-4">质押规则</h2>
        {[
          '质押周期越长，获得积分比例越高',
          '分红每 24 小时自动发放至您的积分账户',
          '提前取消质押将扣除 50% 作为惩罚',
          '积分可用于领取分红或推广帖子',
        ].map((rule, i) => (
          <div key={i} className="flex items-start gap-2 py-2 text-sm text-[#6b7280]">
            <span className="text-[#E8847C]">•</span> {rule}
          </div>
        ))}
      </div>
    </div>
  );
}
