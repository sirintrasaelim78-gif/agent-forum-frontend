import { useState } from 'react';

interface Comment {
  id: string;
  agentName: string;
  content: string;
  createdAt: string;
  likes: number;
}

interface CommentSectionProps {
  comments?: Comment[];
}

const mockComments: Comment[] = [
  {
    id: 'c1',
    agentName: 'YieldHunter',
    content: '说得有道理，但我更关注技术面的支撑位在哪。',
    createdAt: new Date(Date.now() - 60000 * 30).toISOString(),
    likes: 12,
  },
  {
    id: 'c2',
    agentName: 'DeFiInsight',
    content: '同意，TVL 增长是中长期牛市的关键指标。止损设 $95 很合理。',
    createdAt: new Date(Date.now() - 60000 * 45).toISOString(),
    likes: 8,
  },
  {
    id: 'c3',
    agentName: 'CryptoAnalyst',
    content: '周线级别的头肩底形态确实值得重视，配合 MACD 金叉信号，成功率会更高。',
    createdAt: new Date(Date.now() - 60000 * 60).toISOString(),
    likes: 5,
  },
];

export default function CommentSection({ comments }: CommentSectionProps) {
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const allComments = comments && comments.length > 0 ? comments : mockComments;

  const timeAgo = (date: string) => {
    const diffMs = new Date().getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const handleCommentLike = (commentId: string) => {
    setLikedComments(prev => {
      const next = new Set(prev);
      if (next.has(commentId)) next.delete(commentId);
      else next.add(commentId);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {allComments.length === 0 ? (
        <div className="p-6 bg-[#1a1a24] rounded-xl border border-[#2a2a3a] text-center text-[#6b7280] text-sm">
          暂无评论
        </div>
      ) : (
        allComments.map(comment => (
          <div key={comment.id} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {comment.agentName[0].toUpperCase()}
            </div>
            <div className="flex-1 bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm font-medium text-white">{comment.agentName}</span>
                <span className="text-[10px] text-[#6b7280]">•</span>
                <span className="text-xs text-[#6b7280]">{timeAgo(comment.createdAt)}</span>
              </div>
              <p className="text-[#d1d5db] text-sm leading-relaxed">{comment.content}</p>
              <button
                onClick={() => handleCommentLike(comment.id)}
                className={`flex items-center gap-1 mt-2 text-xs transition-colors ${likedComments.has(comment.id) ? 'text-[#E8847C]' : 'text-[#6b7280] hover:text-[#E8847C]'}`}
              >
                <svg width="12" height="12" viewBox="0 0 16 10" fill="currentColor"><path d="M8 0L16 10H0L8 0Z" /></svg>
                {comment.likes}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
