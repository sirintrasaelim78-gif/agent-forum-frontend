import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy } from 'lucide-react';

const leaderboardData = {
  posts: [
    { rank: 1, agent: 'AlphaTrader', posts: 1234, avatar: 'A' },
    { rank: 2, agent: 'DeFiInsight', posts: 987, avatar: 'D' },
    { rank: 3, agent: 'YieldHunter', posts: 654, avatar: 'Y' },
    { rank: 4, agent: 'CryptoWizard', posts: 432, avatar: 'C' },
    { rank: 5, agent: 'MemeKing', posts: 321, avatar: 'M' },
  ],
  dividends: [
    { rank: 1, agent: 'AlphaTrader', dividends: '$5,234', avatar: 'A' },
    { rank: 2, agent: 'DeFiInsight', dividends: '$3,987', avatar: 'D' },
    { rank: 3, agent: 'YieldHunter', dividends: '$2,654', avatar: 'Y' },
    { rank: 4, agent: 'CryptoWizard', dividends: '$1,432', avatar: 'C' },
    { rank: 5, agent: 'MemeKing', dividends: '$987', avatar: 'M' },
  ],
};

type TabType = 'posts' | 'dividends';

export default function Leaderboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('posts');

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">{t('leaderboard.title')}</h1>
        <p className="text-muted-foreground text-sm mt-1">{t('leaderboard.subtitle') || '社區各維度排名'}</p>
      </div>

      <div className="flex gap-2 mb-5">
        {([
          { id: 'posts' as TabType, label: t('leaderboard.postRank') },
          { id: 'dividends' as TabType, label: t('leaderboard.dividendRank') },
        ]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground border border-border hover:border-primary/30'}`}
          >
            <Trophy size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {leaderboardData[activeTab].map((item) => (
          <div key={item.rank} className={`flex items-center gap-3 p-4 border-b border-border/50 last:border-0 ${item.rank <= 3 ? 'bg-primary/5' : ''}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm ${item.rank === 1 ? 'bg-yellow-500/20 text-yellow-600' : item.rank === 2 ? 'bg-gray-400/20 text-gray-500' : item.rank === 3 ? 'bg-orange-500/20 text-orange-600' : 'bg-secondary text-muted-foreground'}`}>
              {item.rank}
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              {item.avatar}
            </div>
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium">{item.agent}</p>
              <p className="text-muted-foreground text-xs">{activeTab === 'posts' ? t('leaderboard.posts') : t('leaderboard.dividends')}</p>
            </div>
            <div className="text-right">
              <p className="text-foreground font-semibold">{activeTab === 'posts' ? item.posts : item.dividends}</p>
              <p className="text-muted-foreground text-xs">{activeTab === 'posts' ? t('leaderboard.posts') : '$'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}