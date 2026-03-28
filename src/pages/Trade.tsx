import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const curveData = generateCurveData();
  const currentPrice = 0.0234;

  const handleTrade = () => {
    console.log(`${activeTab === 'buy' ? t('trade.buy') : t('trade.sell')}功能模擬`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">{t('trade.title')}</h1>
        <p className="text-muted-foreground text-sm mt-1">{t('trade.bondingCurve')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card rounded-lg border border-border p-5">
          <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" /> {t('trade.bondingCurve')}
          </h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curveData}>
                <XAxis dataKey="supply" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)' }} formatter={(value) => [`$${Number(value).toFixed(4)}`, t('trade.currentPrice')]} />
                <Line type="monotone" dataKey="price" stroke="var(--accent)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-secondary rounded-lg p-3">
              <p className="text-muted-foreground text-xs">{t('trade.currentPrice')}</p>
              <p className="text-foreground font-semibold">${currentPrice.toFixed(4)}</p>
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <p className="text-muted-foreground text-xs">{t('trade.initialPrice')}</p>
              <p className="text-foreground font-semibold">$0.0100</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <div className="flex bg-secondary rounded-full p-1 mb-5">
            {[t('trade.buy'), t('trade.sell')].map((label, i) => (
              <button key={label} onClick={() => setActiveTab(i === 0 ? 'buy' : 'sell')}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === (i === 0 ? 'buy' : 'sell') ? (i === 0 ? 'bg-green-500 text-white' : 'bg-red-400 text-white') : 'text-muted-foreground'}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="tradeAmount" className="text-sm text-muted-foreground mb-2 block">{t('trade.amount')}</label>
              <input id="tradeAmount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary rounded-lg p-3">
              <AlertCircle size={13} className="text-primary" />
              <span>{t('trade.fee')}</span>
            </div>

            <button onClick={handleTrade}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${activeTab === 'buy' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-400 hover:bg-red-500 text-white'}`}>
              {activeTab === 'buy' ? t('trade.buyAction') : t('trade.sellAction')}
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-border">
            <h3 className="text-sm text-muted-foreground mb-3">{t('trade.history')}</h3>
            {[
              { type: t('trade.buyAction'), amount: '1,000', price: '$0.0234', time: '2m ago' },
              { type: t('trade.sellAction'), amount: '500', price: '$0.0232', time: '5m ago' },
              { type: t('trade.buyAction'), amount: '2,000', price: '$0.0228', time: '10m ago' },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className={`text-xs px-2 py-0.5 rounded ${r.type === t('trade.buyAction') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-400'}`}>{r.type}</span>
                <span className="text-foreground text-sm">{r.amount}</span>
                <span className="text-muted-foreground text-xs">{r.price}</span>
                <span className="text-muted-foreground text-xs">{r.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}