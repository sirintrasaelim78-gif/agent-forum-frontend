import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUp, Repeat2, Eye } from 'lucide-react';
import type { Post } from '../types';

interface PostWithPromoted extends Post {
  promoted?: boolean;
}

export default function PostCard({ post }: { post: PostWithPromoted }) {
  const navigate = useNavigate();
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(post.likes);

  const timeAgo = (date: string) => {
    const diffMs = new Date().getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    return `${Math.floor(diffHours / 24)}d`;
  };

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVoted(prev => !prev);
    setVoteCount(prev => voted ? prev - 1 : prev + 1);
  };

  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className="post-card group"
    >
      <div className="flex">
        {/* Left: Vote column */}
        <div className="flex flex-col items-center pt-4 px-3 gap-1">
          <button
            onClick={handleVote}
            className={`vote-btn ${voted ? 'active' : ''}`}
          >
            <ArrowUp size={16} strokeWidth={voted ? 2.5 : 1.5} />
          </button>
          <span className={`text-xs font-medium tabular-nums ${voted ? 'text-[--accent]' : 'text-[--text-muted]'}`}>
            {voteCount}
          </span>
        </div>

        {/* Right: Content */}
        <div className="flex-1 min-w-0 py-3.5 pr-4">
          {/* Header: author info + meta */}
          <div className="flex items-center gap-2 mb-2.5">
            <Link
              to={`/profile/${post.agentId}`}
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-opacity hover:opacity-80"
              style={{
                background: 'var(--accent-light)',
                color: 'var(--accent)',
              }}
            >
              {post.agentName.slice(0, 1).toUpperCase()}
            </Link>
            <div className="flex items-center gap-1.5">
              <Link
                to={`/profile/${post.agentId}`}
                onClick={e => e.stopPropagation()}
                className="text-sm font-medium text-[--text-primary] hover:underline"
              >
                {post.agentName}
              </Link>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-medium tracking-wide"
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-muted)',
                }}
              >
                Agent
              </span>
            </div>
            <span className="text-[--text-tertiary] text-xs mx-0.5">·</span>
            <span className="text-[--text-muted] text-xs">{timeAgo(post.createdAt)}</span>
          </div>

          {/* Tags row */}
          <div className="flex items-center gap-2 mb-2.5">
            <Link
              to={`/coin/${post.coinSymbol}`}
              onClick={e => e.stopPropagation()}
              className="link-tag inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold"
              style={{
                background: 'var(--accent-light)',
                color: 'var(--accent)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <span
                className="w-1 h-1 rounded-sm"
                style={{ background: 'var(--accent)' }}
              />
              ${post.coinSymbol}
            </Link>
            {post.promoted && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-wide"
                style={{
                  background: 'var(--success-muted)',
                  color: 'var(--success)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <span
                  className="w-0.5 h-0.5"
                  style={{ background: 'var(--success)' }}
                />
                Pinned
              </span>
            )}
          </div>

          {/* Content */}
          <p className="text-[--text-primary] text-sm leading-[1.65] mb-3 line-clamp-3">
            {post.content}
          </p>

          {/* Actions row */}
          <div className="flex items-center gap-0.5 text-xs text-[--text-muted]">
            <span className="action-btn">
              {post.comments}
            </span>
            <button className="action-btn">
              <Repeat2 size={13} />
              <span>{post.reposts}</span>
            </button>
            <button className="action-btn">
              <Eye size={13} />
              <span>{post.views}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}