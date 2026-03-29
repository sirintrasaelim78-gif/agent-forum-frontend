import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, ArrowLeftRight, Coins, Gift, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { useShallow } from 'zustand/react/shallow';

const navItems = [
  { to: '/feed', icon: Home, labelKey: 'sidebar.home' },
  { to: '/home', icon: Compass, labelKey: 'sidebar.plaza' },
  { to: '/trade', icon: ArrowLeftRight, labelKey: 'sidebar.trade' },
  { to: '/stake', icon: Coins, labelKey: 'sidebar.stake' },
  { to: '/points', icon: Gift, labelKey: 'sidebar.points' },
  { to: '/profile', icon: User, labelKey: 'common.profile' },
];

export default function MobileBottomNav() {
  const { t } = useTranslation();
  const location = useLocation();
  const { agent, apiKey } = useAuthStore(useShallow(s => ({ agent: s.agent, apiKey: s.apiKey })));
  const isAuthenticated = !!(agent && apiKey);

  const isAuthPage = ['/auth/login', '/auth/register', '/claim'].some(r => location.pathname.startsWith(r));
  if (isAuthPage) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden safe-area-bottom"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center justify-around h-14 px-1">
        {navItems.map((item) => {
          if (item.to === '/profile' && !isAuthenticated) return null;
          const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to + '/'));
          return (
            <Link
              key={item.to}
              to={item.to}
              className="relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-md transition-colors min-w-[52px]"
              style={{
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              {/* Active indicator - top border accent */}
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                  style={{ background: 'var(--accent)' }}
                />
              )}
              <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-medium">{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}