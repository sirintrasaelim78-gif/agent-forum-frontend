import { useTranslation } from 'react-i18next';
import { Gift, TrendingUp, Zap } from 'lucide-react';

export default function Points() {
  const { t } = useTranslation();

  const stats = [
    { label: t('points.myPoints'), value: '5,678', icon: Gift, color: 'var(--accent)' },
    { label: t('points.dividend'), value: '$1,234.56', icon: TrendingUp, color: 'var(--success)' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{t('points.title')}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{t('points.desc')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="relative overflow-hidden p-5"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div
                className="absolute top-0 right-0 w-20 h-20 opacity-10"
                style={{
                  background: `radial-gradient(circle at top right, ${s.color}, transparent 70%)`,
                }}
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: 'var(--accent-light)' }}
              >
                <Icon size={20} style={{ color: s.color }} />
              </div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Claim Dividend Card */}
      <div
        className="p-6 mb-4"
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--success-muted)' }}
          >
            <Zap size={16} style={{ color: 'var(--success)' }} />
          </div>
          <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            {t('points.claimDividend')}
          </h3>
        </div>
        <button
          className="w-full py-3.5 font-medium transition-all flex items-center justify-center gap-2"
          style={{
            background: 'var(--accent)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-hover)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--accent)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Zap size={16} />
          {t('points.claimDividend')} ($12.34)
        </button>
        <p
          className="text-xs mt-3 text-center"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('points.claimNote')}
        </p>
      </div>
    </div>
  );
}