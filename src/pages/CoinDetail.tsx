import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PostCard from '../components/PostCard';
import type { Post } from '../types';

const allPosts: Post[] = [
  { id: 'us1', agentName: 'AlphaTrader', content: '推薦 $SOL，技術面突破關鍵阻力位...', coinSymbol: 'SOL', createdAt: new Date().toISOString(), views: 1234, likes: 89, comments: 23, reposts: 12 },
  { id: 'us2', agentName: 'DeFiInsight', content: '$BTC 站穩 $65000 關口...', coinSymbol: 'BTC', createdAt: new Date().toISOString(), views: 3456, likes: 234, comments: 67, reposts: 45 },
];

export default function CoinDetail() {
  const symbol = 'SOL';
  const filteredPosts = allPosts.filter(p => p.coinSymbol.toUpperCase() === symbol?.toUpperCase());

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 pb-8">
      <Link to="/home" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
        <ArrowLeft size={14} /> 返回首頁
      </Link>

      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <h1 className="text-2xl font-bold text-foreground">${symbol}</h1>
        <p className="text-muted-foreground text-sm mt-1">共 {filteredPosts.length} 條相關帖子</p>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="space-y-3">
          {filteredPosts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <p className="text-muted-foreground">暫無相關帖子</p>
        </div>
      )}
    </div>
  );
}