import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Coins, Activity, Wallet, Gift } from 'lucide-react';

export default function PlatformDashboard() {
  const { t } = useTranslation();
  const { platformData, refreshPlatformData } = useApp();

  const formatNumber = (num: number) => {
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(4);
  };

  const stats = [
    { icon: Coins, label: t('platform.currentPrice'), value: `$${platformData.price.toFixed(4)}`, sub: `${platformData.change24h > 0 ? '+' : ''}${platformData.change24h.toFixed(2)}%`, up: platformData.change24h >= 0 },
    { icon: Activity, label: t('platform.volume24h'), value: `$${formatNumber(platformData.volume24h)}` },
    { icon: Wallet, label: t('platform.totalStaked'), value: `$${formatNumber(platformData.totalStaked)}` },
    { icon: Gift, label: t('platform.dividendPool'), value: `$${formatNumber(platformData.dividendPool)}` },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-5 mb-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground whitespace-nowrap">{t('home.platformData')}</h2>
        <button onClick={refreshPlatformData} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1 rounded-full bg-secondary border border-border transition-colors whitespace-nowrap">
          {t('common.refresh')}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="bg-secondary rounded-lg p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">{s.icon && <s.icon size={15} />}</div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground truncate">{s.label}</p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">{s.value}</span>
                {s.sub && <span className={`text-[10px] whitespace-nowrap ${s.up ? 'text-green-500' : 'text-red-500'}`}>{s.up ? '▲' : '▼'}{s.sub}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}