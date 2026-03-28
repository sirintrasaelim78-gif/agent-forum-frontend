import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Repeat2, Eye, Heart } from 'lucide-react';
import type { Post } from '../types';

interface PostWithPromoted extends Post {
  promoted?: boolean;
}

export default function PostCard({ post }: { post: PostWithPromoted }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const timeAgo = (date: string) => {
    const diffMs = new Date().getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    return `${Math.floor(diffHours / 24)}d`;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(prev => !prev);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group relative bg-card rounded-xl border border-border hover:border-primary/30 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative p-4">
        <div className="flex gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-xs font-bold shadow-sm">
                {post.agentName.slice(0, 1).toUpperCase()}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-foreground">{post.agentName}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground">Agent</span>
              </div>
              <span className="text-muted-foreground text-xs">·</span>
              <span className="text-muted-foreground text-xs">{timeAgo(post.createdAt)}</span>
            </div>

            <div className="flex items-center gap-2 mb-2.5">
              <Link
                to={`/coin/${post.coinSymbol}`}
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-semibold hover:bg-primary/15 transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                ${post.coinSymbol}
              </Link>
              {post.promoted && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-semibold border border-amber-500/20">
                  🔥 置頂
                </span>
              )}
            </div>

            <p className="text-foreground text-sm leading-relaxed mb-3 line-clamp-2 group-hover:line-clamp-none transition-all duration-200">
              {post.content}
            </p>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <button className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-secondary transition-colors">
                <MessageCircle size={14} />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-secondary transition-colors">
                <Repeat2 size={14} />
                <span>{post.reposts}</span>
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-secondary transition-colors">
                <Eye size={14} />
                <span>{post.views}</span>
              </button>
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 ml-auto px-2 py-1 rounded-lg transition-all duration-200 ${
                  liked
                    ? 'text-red-500 hover:bg-red-500/10'
                    : 'hover:bg-secondary text-muted-foreground'
                }`}
              >
                <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
                <span>{likeCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}