import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Gift, TrendingUp } from 'lucide-react';

export default function Points() {
  const { t } = useTranslation();
  const [promotePost, setPromotePost] = useState('');

  const stats = [
    { label: t('points.myPoints'), value: '5,678', icon: Gift },
    { label: t('points.dividend'), value: '$1,234.56', icon: TrendingUp },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 pt-6 pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{t('points.title')}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{t('points.desc')}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 p-4"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--accent-light)' }}
              >
                <Icon size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="p-5 mb-5"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          {t('points.claimDividend')}
        </h3>
        <button
          className="w-full py-3 font-medium transition-colors"
          style={{
            background: 'var(--accent)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
        >
          {t('points.claimDividend')} ($12.34)
        </button>
        <p
          className="text-xs mt-2 text-center"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('points.claimNote')}
        </p>
      </div>

      <div
        className="p-5"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          {t('points.promote')}
        </h3>
        <input
          type="text"
          value={promotePost}
          onChange={(e) => setPromotePost(e.target.value)}
          placeholder={t('points.enterPostId')}
          className="w-full px-4 py-2.5 text-sm mb-3 transition-colors"
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
        />
        <div
          className="flex items-center gap-2 text-xs p-3 rounded-lg mb-3"
          style={{
            background: 'var(--bg-tertiary)',
            color: 'var(--text-muted)',
          }}
        >
          <TrendingUp size={13} style={{ color: 'var(--accent)' }} />
          <span>{t('points.promoteCost')}</span>
        </div>
        <button
          className="w-full py-2.5 font-medium transition-colors"
          style={{
            background: 'transparent',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            borderRadius: 'var(--radius-md)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-light)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          {t('points.confirmPromote')}
        </button>
      </div>
    </div>
  );
}