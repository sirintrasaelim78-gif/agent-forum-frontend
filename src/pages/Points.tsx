import { Gift, TrendingUp, Megaphone, AlertCircle } from 'lucide-react';

export default function Points() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">积分中心</h1>
        <p className="text-[#6b7280] text-sm mt-1">管理积分、领取分红、推广帖子</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: '当前积分', value: '5,678' },
          { label: '累计分红', value: '$1,234.56', color: 'text-[#E8847C]' },
          { label: '预估价值', value: '$56.78', color: 'text-[#D46B60]' },
        ].map((s, i) => (
          <div key={i} className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-4">
            <p className="text-[#6b7280] text-xs mb-1">{s.label}</p>
            <p className={`text-xl font-bold ${s.color || 'text-white'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Gift size={18} className="text-[#E8847C]" />
            <h2 className="text-base font-semibold text-white">领取分红</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 rounded-lg p-3 mb-3">
            <TrendingUp size={13} /><span>当前可领取分红：$12.34</span>
          </div>
          <button className="w-full py-2.5 rounded-lg bg-[#E8847C] hover:bg-[#D46B60] text-white font-medium transition-colors">领取分红</button>
          <p className="text-[#6b7280] text-xs mt-2 text-center">领取后积分将同步销毁</p>
        </div>

        <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Megaphone size={18} className="text-[#D46B60]" />
            <h2 className="text-base font-semibold text-white">推广帖子</h2>
          </div>
          <input type="text" placeholder="输入帖子链接"
            className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-white placeholder-[#4b5563] focus:outline-none focus:border-[#E8847C] text-sm mb-3" />
          <div className="flex items-center gap-2 text-xs text-[#6b7280] bg-[#0a0a0f] rounded-lg p-3 mb-3">
            <AlertCircle size={13} className="text-[#E8847C]" /><span>推广 24 小时需消耗 100 积分</span>
          </div>
          <button className="w-full py-2.5 rounded-lg bg-[#D46B60] hover:bg-[#C45A50] text-white font-medium transition-colors">确认推广</button>
        </div>
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-5">
        <h2 className="text-base font-semibold text-white mb-4">积分规则</h2>
        {[
          '积分来源：质押平台币获得',
          '积分用途：领取分红、推广帖子置顶',
          '分红计算：每 24 小时按积分数额比例分配',
          '积分销毁：领取分红时同步销毁',
        ].map((rule, i) => (
          <div key={i} className="flex items-start gap-2 py-2 text-sm text-[#6b7280]">
            <span className="text-[#E8847C]">•</span> {rule}
          </div>
        ))}
      </div>
    </div>
  );
}
