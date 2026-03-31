import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Compass, Coins, Gift, Settings, Landmark, BarChart2, Flame, ArrowUpRight, PanelLeftClose, PanelLeft } from 'lucide-react';

const categories = [
  { id: 'hk', labelKey: 'sidebar.hk', icon: Landmark },
  { id: 'us', labelKey: 'sidebar.us', default: true, icon: BarChart2 },
  { id: 'meme', labelKey: 'sidebar.meme', icon: Flame },
  { id: 'spot', labelKey: 'sidebar.spot', icon: Coins },
  { id: 'futures', labelKey: 'sidebar.futures', icon: ArrowUpRight },
];

const showOnPages = ['/feed', '/home', '/points', '/settings', '/post', '/profile', '/coin'];

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
  const shouldShowCategories = showOnPages.some(path => location.pathname === path || location.pathname.startsWith(path + '/'));

  const handleCategoryClick = (catId: string) => {
    navigate(`/home?category=${catId}`);
  };

  return (
    <div
      className="flex-shrink-0 transition-all duration-200 overflow-hidden sticky top-0 h-screen"
      style={{
        width: collapsed ? '56px' : '220px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
      }}
    >
      <div
        className="pt-14 h-full flex flex-col overflow-y-auto"
        style={{ background: 'var(--bg-secondary)' }}
      >
        {/* Collapse toggle */}
        <div className="flex items-center px-3 pt-3" style={{ justifyContent: collapsed ? 'center' : 'flex-end' }}>
          <button
            onClick={onToggleCollapse}
            className="action-btn"
            title={collapsed ? t('sidebar.expand') : t('sidebar.collapse')}
          >
            {collapsed ? (
              <PanelLeft size={15} />
            ) : (
              <PanelLeftClose size={15} />
            )}
          </button>
        </div>

        {/* Navigation section */}
        <div className="px-2 mt-1">
          {!collapsed && (
            <p
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-2"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {t('sidebar.navigate')}
            </p>
          )}
          <div className="flex flex-col">
            {[
              { icon: Home, labelKey: 'sidebar.home', path: '/feed' },
              { icon: Compass, labelKey: 'sidebar.plaza', path: '/home' },
            ].map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item relative ${isActive ? 'active' : ''}`}
                >
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                  )}
                  <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                  {!collapsed && <span>{t(item.labelKey)}</span>}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Categories section */}
        {shouldShowCategories && (
          <>
            <div className="px-2 mt-4">
              <div
                className="mx-2 mb-1"
                style={{ height: '1px', background: 'var(--border)' }}
              />
              {!collapsed && (
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-2"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {t('sidebar.categories')}
                </p>
              )}
              <div className="flex flex-col">
                {categories.map((cat) => {
                  const isActive = location.pathname === '/home' && selectedCategory === cat.id;
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { onCategoryChange(cat.id); handleCategoryClick(cat.id); }}
                      className={`nav-item relative w-full text-left ${isActive ? 'active' : ''}`}
                    >
                      {isActive && (
                        <span
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                          style={{ background: 'var(--accent)' }}
                        />
                      )}
                      <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                      {!collapsed && <span>{t(cat.labelKey)}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Quick links section */}
        <div className="px-2 mt-4">
          <div
            className="mx-2 mb-1"
            style={{ height: '1px', background: 'var(--border)' }}
          />
          {!collapsed && (
            <p
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-2"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {t('sidebar.features')}
            </p>
          )}
          <div className="flex flex-col">
            {[
              { icon: Gift, labelKey: 'sidebar.points', path: '/points' },
            ].map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item relative ${isActive ? 'active' : ''}`}
                >
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                  )}
                  <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                  {!collapsed && <span>{t(item.labelKey)}</span>}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Settings */}
        <div className="px-3 pb-3">
          <div
            className="mb-2"
            style={{ height: '1px', background: 'var(--border)' }}
          />
          <Link
            to="/settings"
            className="nav-item"
            style={{ color: 'var(--text-muted)' }}
          >
            <Settings size={15} strokeWidth={1.5} />
            {!collapsed && <span>{t('sidebar.settings')}</span>}
          </Link>
        </div>

        {/* Footer */}
        <div
          className="px-3 py-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {!collapsed ? (
            <div className="flex items-center justify-center gap-2">
              {/* Pixel grid accent */}
              <div className="flex gap-px">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-0.5 h-0.5 rounded-full"
                    style={{ background: 'var(--accent)', opacity: 0.5 - i * 0.15 }}
                  />
                ))}
              </div>
              <p className="text-[10px] tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
                QUACKBOOK © 2026
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              {/* Minimal pixel logo mark */}
              <div className="flex gap-px">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-0.5 h-0.5 rounded-full"
                    style={{ background: 'var(--accent)', opacity: 0.6 - i * 0.15 }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
