import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Coins, Activity, Wallet, Gift, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function PlatformDashboard() {
  const { t } = useTranslation();
  const { platformData, refreshPlatformData } = useApp();

  const formatNumber = (num: number) => {
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(4);
  };

  const stats = [
    {
      icon: Coins,
      label: t('platform.currentPrice'),
      value: `$${platformData.price.toFixed(4)}`,
      sub: `${platformData.change24h > 0 ? '+' : ''}${platformData.change24h.toFixed(2)}%`,
      up: platformData.change24h >= 0,
    },
    { icon: Activity, label: t('platform.volume24h'), value: `$${formatNumber(platformData.volume24h)}` },
    { icon: Wallet, label: t('platform.totalStaked'), value: `$${formatNumber(platformData.totalStaked)}` },
    { icon: Gift, label: t('platform.dividendPool'), value: `$${formatNumber(platformData.dividendPool)}` },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-sm font-semibold tracking-wide"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('home.platformData')}
        </h2>
        <button
          onClick={refreshPlatformData}
          className="text-xs px-2.5 py-1 rounded-md transition-colors font-medium"
          style={{
            color: 'var(--text-muted)',
            background: 'var(--bg-tertiary)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.background = 'var(--card-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.background = 'var(--bg-tertiary)';
          }}
        >
          {t('common.refresh')}
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
              }}
            >
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--accent-light)' }}
              >
                <Icon size={15} style={{ color: 'var(--accent)' }} />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="text-[10px] truncate tracking-wide"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {s.label}
                </p>
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-sm font-semibold whitespace-nowrap tabular-nums"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {s.value}
                  </span>
                  {s.sub && (
                    <span
                      className="flex items-center gap-0.5 text-[10px] whitespace-nowrap tabular-nums"
                      style={{ color: s.up ? 'var(--success)' : 'var(--danger)' }}
                    >
                      {s.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                      {s.sub}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}