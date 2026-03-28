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
        <h1 className="text-xl font-bold text-foreground">{t('points.title')}</h1>
        <p className="text-muted-foreground text-sm mt-1">{t('points.desc')}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-card rounded-lg border border-border p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">{s.label}</p>
                <p className="text-foreground font-semibold">{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card rounded-lg border border-border p-5 mb-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">{t('points.claimDividend')}</h3>
        <button className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors">
          {t('points.claimDividend')} ($12.34)
        </button>
        <p className="text-muted-foreground text-xs mt-2 text-center">{t('points.claimNote') || '領取後積分將同步銷毀'}</p>
      </div>

      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">{t('points.promote')}</h3>
        <input
          type="text"
          value={promotePost}
          onChange={(e) => setPromotePost(e.target.value)}
          placeholder={t('points.enterPostId') || '輸入帖子 ID'}
          className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm mb-3"
        />
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary rounded-lg p-3 mb-3">
          <TrendingUp size={13} className="text-primary" />
          <span>{t('points.promoteCost') || '推廣費用：100 積分 / 24小時'}</span>
        </div>
        <button className="w-full py-2.5 rounded-lg border border-primary text-primary font-medium hover:bg-primary/5 transition-colors">
          {t('points.confirmPromote') || '確認推廣'}
        </button>
      </div>
    </div>
  );
}