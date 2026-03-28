import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';

const generateCurveData = () => {
  const data = [];
  for (let i = 0; i <= 100; i++) {
    const price = 0.01 + (i / 100) * (2 - 0.01) * (i / 100);
    data.push({ supply: i, price: price.toFixed(4) });
  }
  return data;
};

export default function Trade() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const curveData = generateCurveData();
  const currentPrice = 0.0234;

  const handleTrade = () => {
    // TODO: Integrate with real trading API
    console.log(`${activeTab === 'buy' ? '买入' : '卖出'}功能模拟`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-20 pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">平台币交易</h1>
        <p className="text-[#6b7280] text-sm mt-1">基于 Bonding Curve 定价机制</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-5">
          <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-[#E8847C]" /> 价格曲线
          </h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curveData}>
                <XAxis dataKey="supply" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ background: '#0a0a0f', border: '1px solid #2a2a3a', borderRadius: '8px', color: '#fff' }} formatter={(value) => [`$${Number(value).toFixed(4)}`, '价格']} />
                <Line type="monotone" dataKey="price" stroke="#E8847C" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-[#0a0a0f] rounded-lg p-3">
              <p className="text-[#6b7280] text-xs">当前价格</p>
              <p className="text-white font-semibold">${currentPrice.toFixed(4)}</p>
            </div>
            <div className="bg-[#0a0a0f] rounded-lg p-3">
              <p className="text-[#6b7280] text-xs">初始价格</p>
              <p className="text-white font-semibold">$0.0100</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-5">
          <div className="flex bg-[#0a0a0f] rounded-full p-1 mb-5">
            {['买入', '卖出'].map((label, i) => (
              <button key={label} onClick={() => setActiveTab(i === 0 ? 'buy' : 'sell')}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === (i === 0 ? 'buy' : 'sell') ? (i === 0 ? 'bg-green-500 text-white' : 'bg-red-400 text-white') : 'text-[#6b7280]'}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#9CA3AF] mb-2 block">数量 (平台币)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-white placeholder-[#4b5563] focus:outline-none focus:border-[#E8847C]" />
            </div>

            <div className="flex items-center gap-2 text-xs text-[#6b7280] bg-[#0a0a0f] rounded-lg p-3">
              <AlertCircle size={13} className="text-[#E8847C]" />
              <span>Bonding Curve 费率：成交后扣除 2% 手续费</span>
            </div>

            <button onClick={handleTrade}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${activeTab === 'buy' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-400 hover:bg-red-500 text-white'}`}>
              {activeTab === 'buy' ? '买入' : '卖出'}
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-[#2a2a3a]">
            <h3 className="text-sm text-[#6b7280] mb-3">交易历史</h3>
            {[
              { type: '买入', amount: '1,000', price: '$0.0234', time: '2分钟前' },
              { type: '卖出', amount: '500', price: '$0.0232', time: '5分钟前' },
              { type: '买入', amount: '2,000', price: '$0.0228', time: '10分钟前' },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#2a2a3a]/50 last:border-0">
                <span className={`text-xs px-2 py-0.5 rounded ${r.type === '买入' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{r.type}</span>
                <span className="text-white text-sm">{r.amount}</span>
                <span className="text-[#6b7280] text-xs">{r.price}</span>
                <span className="text-[#6b7280] text-xs">{r.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
