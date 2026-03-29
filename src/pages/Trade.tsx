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
        <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{t('trade.title')}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{t('trade.bondingCurve')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Chart card */}
        <div
          className="p-5"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <h2
            className="text-base font-semibold mb-4 flex items-center gap-2"
            style={{ color: 'var(--text-primary)' }}
          >
            <TrendingUp size={18} style={{ color: 'var(--accent)' }} />
            {t('trade.bondingCurve')}
          </h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curveData}>
                <XAxis dataKey="supply" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                  }}
                  formatter={(value) => [`$${Number(value).toFixed(4)}`, t('trade.currentPrice')]}
                />
                <Line type="monotone" dataKey="price" stroke="var(--accent)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div
              className="p-3 rounded-lg"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('trade.currentPrice')}</p>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>${currentPrice.toFixed(4)}</p>
            </div>
            <div
              className="p-3 rounded-lg"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('trade.initialPrice')}</p>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>$0.0100</p>
            </div>
          </div>
        </div>

        {/* Trade card */}
        <div
          className="p-5"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          {/* Buy/Sell tabs */}
          <div
            className="flex p-1 mb-5"
            style={{
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            {[t('trade.buy'), t('trade.sell')].map((label, i) => {
              const tab = i === 0 ? 'buy' : 'sell';
              const isActive = activeTab === tab;
              return (
                <button
                  key={label}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-2 text-sm font-medium transition-colors"
                  style={{
                    background: isActive ? (tab === 'buy' ? 'var(--success)' : 'var(--danger)') : 'transparent',
                    color: isActive ? 'white' : 'var(--text-muted)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="tradeAmount"
                className="text-sm mb-2 block"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('trade.amount')}
              </label>
              <input
                id="tradeAmount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 transition-colors"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              />
            </div>

            <div
              className="flex items-center gap-2 text-xs p-3 rounded-lg"
              style={{
                background: 'var(--bg-tertiary)',
                color: 'var(--text-muted)',
              }}
            >
              <AlertCircle size={13} style={{ color: 'var(--accent)' }} />
              <span>{t('trade.fee')}</span>
            </div>

            <button
              onClick={handleTrade}
              className="w-full py-3 font-medium transition-colors"
              style={{
                background: activeTab === 'buy' ? 'var(--success)' : 'var(--danger)',
                color: 'white',
                borderRadius: 'var(--radius-md)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              {activeTab === 'buy' ? t('trade.buyAction') : t('trade.sellAction')}
            </button>
          </div>

          {/* Trade history */}
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <h3 className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>{t('trade.history')}</h3>
            {[
              { type: t('trade.buyAction'), amount: '1,000', price: '$0.0234', time: '2m ago' },
              { type: t('trade.sellAction'), amount: '500', price: '$0.0232', time: '5m ago' },
              { type: t('trade.buyAction'), amount: '2,000', price: '$0.0228', time: '10m ago' },
            ].map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none' }}
              >
                <span
                  className="text-xs px-2 py-0.5 rounded font-medium"
                  style={{
                    background: r.type === t('trade.buyAction') ? 'var(--success-muted)' : 'var(--danger-muted)',
                    color: r.type === t('trade.buyAction') ? 'var(--success)' : 'var(--danger)',
                  }}
                >
                  {r.type}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{r.amount}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{r.price}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{r.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}