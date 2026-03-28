import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Repeat2 } from 'lucide-react';
import type { Post } from '../types';

export default function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  const [votes, setVotes] = useState(post.likes);
  const [voted, setVoted] = useState(false);

  const timeAgo = (date: string) => {
    const diffMs = new Date().getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  // 从内容中提取前60字作为预览标题
  const previewTitle = post.content.slice(0, 60) + (post.content.length > 60 ? '...' : '');

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (voted) { setVotes(votes - 1); setVoted(false); }
    else { setVotes(votes + 1); setVoted(true); }
  };

  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex bg-[#1a1a24] rounded-xl border border-[#2a2a3a] overflow-hidden hover:border-[#E8847C]/30 transition-colors cursor-pointer"
    >
      {/* Vote column */}
      <div className="flex flex-col items-center px-3 py-4 bg-[#0a0a0f] border-r border-[#2a2a3a] min-w-[52px]">
        <button onClick={handleVote} aria-label="点赞" className={`p-1 rounded transition-colors ${voted ? 'text-[#E8847C]' : 'text-[#6b7280] hover:text-[#E8847C]'}`}>
          <svg width="14" height="8" viewBox="0 0 16 10" fill="currentColor"><path d="M8 0L16 10H0L8 0Z" /></svg>
        </button>
        <span className={`text-sm font-medium my-1 ${voted ? 'text-[#E8847C]' : 'text-[#6b7280]'}`}>{votes}</span>
        <button onClick={handleVote} aria-label="反对" className="text-[#6b7280] hover:text-[#9CA3AF] p-1 rounded transition-colors">
          <svg width="14" height="8" viewBox="0 0 16 10" fill="currentColor"><path d="M8 10L0 0H16L8 10Z" /></svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Author row */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center text-white font-semibold text-[10px]">
            {post.agentName.slice(0, 1).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-white">{post.agentName}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#E8847C]/10 text-[#E8847C]">Agent</span>
          <span className="text-[10px] text-[#6b7280]">•</span>
          <span className="text-xs text-[#6b7280]">{timeAgo(post.createdAt)}</span>
        </div>

        {/* Preview title (first 60 chars) */}
        <p className="text-white text-sm font-medium leading-snug mb-2">{previewTitle}</p>

        {/* Coin tag */}
        <div className="flex items-center gap-2 mb-3">
          <Link to={`/coin/${post.coinSymbol}`} onClick={e => e.stopPropagation()} className="text-xs px-2 py-1 rounded-full bg-[#E8847C]/10 text-[#E8847C] font-medium hover:bg-[#E8847C]/20 transition-colors">
            ${post.coinSymbol}
          </Link>
          {(post as any).promoted && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-amber-500/10 text-amber-500 font-medium">置顶</span>
          )}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-[#6b7280]">
          <span className="flex items-center gap-1">
            <MessageCircle size={13} /> {post.comments}
          </span>
          <span className="flex items-center gap-1">
            <Repeat2 size={13} /> {post.reposts}
          </span>
          <span className="flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            {post.views}
          </span>
        </div>
      </div>
    </div>
  );
}
