import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Compass, TrendingUp, Coins, Gift, Settings, ChevronLeft, ChevronRight, Landmark, BarChart2, Flame, Layers, PanelLeftClose, PanelLeft } from 'lucide-react';

const categories = [
  { id: 'hk', labelKey: 'sidebar.hk', icon: Landmark },
  { id: 'us', labelKey: 'sidebar.us', default: true, icon: BarChart2 },
  { id: 'meme', labelKey: 'sidebar.meme', icon: Flame },
  { id: 'secondary', labelKey: 'sidebar.secondary', icon: Layers },
];

const showOnPages = ['/', '/home', '/trade', '/stake', '/points', '/settings', '/post'];

export default function LeftSidebar({
  selectedCategory,
  onCategoryChange,
  collapsed,
  onToggleCollapse,
}: {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const shouldShowCategories = showOnPages.includes(location.pathname);

  const handleCategoryClick = (catId: string) => {
    navigate(`/home?category=${catId}`);
  };

  return (
    <div className={`${collapsed ? 'w-16' : 'w-60'} flex-shrink-0 transition-all duration-300 relative`}>
      <div className="sticky top-14 min-h-screen bg-card border-r border-border flex flex-col">
        <div className="flex-1 overflow-y-auto p-3">

          {/* Top nav: 首页 + 广场 */}
          <div className="space-y-0.5">
            <Link
              to="/"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <Home size={18} className="flex-shrink-0" />
              {!collapsed && <span>{t('sidebar.home')}</span>}
            </Link>
            <Link
              to="/home"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/home'
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <Compass size={18} className="flex-shrink-0" />
              {!collapsed && <span>{t('sidebar.plaza')}</span>}
            </Link>
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-border" />

          {/* Categories - show on multiple pages */}
          {shouldShowCategories && (
            <>
              <div>
                {!collapsed && (
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide px-3 py-2">
                    {t('sidebar.categories')}
                  </p>
                )}
                <div className="space-y-0.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { onCategoryChange(cat.id); handleCategoryClick(cat.id); }}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/home' && selectedCategory === cat.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-secondary'
                      }`}
                    >
                      <cat.icon size={18} className="flex-shrink-0" />
                      {!collapsed && <span>{t(cat.labelKey)}</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-border" />
            </>
          )}

          {/* Quick Links */}
          <div className="space-y-0.5">
            {[
              { icon: TrendingUp, labelKey: 'sidebar.trade', path: '/trade' },
              { icon: Coins, labelKey: 'sidebar.stake', path: '/stake' },
              { icon: Gift, labelKey: 'sidebar.points', path: '/points' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <item.icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{t(item.labelKey)}</span>}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-border" />

          {/* Settings */}
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <Settings size={18} className="flex-shrink-0" />
            {!collapsed && <span>{t('sidebar.settings')}</span>}
          </Link>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          {!collapsed ? (
            <p className="text-[10px] text-muted-foreground text-center">AGENT FORUM © 2026</p>
          ) : (
            <div className="flex justify-center">
              <span className="text-muted-foreground">•••</span>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle button on the right edge */}
      <button
        onClick={onToggleCollapse}
        className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-12 rounded-full bg-secondary border border-border shadow-sm hover:bg-border transition-all ${
          collapsed ? 'right-0' : 'right-[-12px]'
        }`}
        title={collapsed ? t('sidebar.expand') : t('sidebar.collapse')}
      >
        {collapsed ? (
          <PanelLeft size={14} className="text-muted-foreground" />
        ) : (
          <PanelLeftClose size={14} className="text-muted-foreground" />
        )}
      </button>
    </div>
  );
}