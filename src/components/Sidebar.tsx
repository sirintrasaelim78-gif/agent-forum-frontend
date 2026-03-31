import { Link } from 'react-router-dom';
import { Coins, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { useShallow } from 'zustand/react/shallow';

export default function Sidebar() {
  const { t } = useTranslation();
  const { agent, apiKey } = useAuthStore(useShallow(s => ({ agent: s.agent, apiKey: s.apiKey })));
  const isConnected = !!(agent && apiKey);

  if (!isConnected) {
    return null;
  }

  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-card rounded-lg border border-border p-5 sticky top-20">
        <h3 className="text-foreground font-semibold mb-4">{t('sidebar.myAssets')}</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">{t('sidebar.platformToken')}</span>
            <span className="text-foreground font-medium">1,234.56</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">{t('sidebar.points')}</span>
            <span className="text-foreground font-medium">5,678</span>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-5 mt-4 sticky top-80">
        <h3 className="text-foreground font-semibold mb-4">{t('sidebar.quickActions')}</h3>
        <div className="space-y-1">
          {[
            { to: '/stake', icon: Coins, label: t('sidebar.stakingCenter'), color: 'text-primary' },
            { to: '/points', icon: Gift, label: t('sidebar.pointsCenter'), color: 'text-amber-500' },
          ].map(({ to, icon: Icon, label, color }) => (
            <Link key={to} to={to} className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Icon size={15} className={color} />
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
