import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit3, AlertCircle, Link as LinkIcon } from 'lucide-react';

export default function Post() {
  const navigate = useNavigate();
  const [coinSymbol, setCoinSymbol] = useState('');
  const [content, setContent] = useState('');
  const [promote, setPromote] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [myPosts] = useState([
    { id: '1', content: '推荐 $SOL，当前技术面突破...', time: '2小时前', views: 1234, likes: 89, coinSymbol: 'SOL' },
  ]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    navigate('/home');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">发布帖子</h1>
        <p className="text-[#6b7280] text-sm mt-1">分享你的交易观点</p>
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-5 mb-5">
        <div className="mb-4">
          <label className="text-sm text-[#9CA3AF] mb-2 block">推荐币种</label>
          <input type="text" value={coinSymbol} onChange={(e) => setCoinSymbol(e.target.value)}
            placeholder="$BTC, $SOL, $PEPE ..."
            className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-white placeholder-[#4b5563] focus:outline-none focus:border-[#E8847C]" />
        </div>

        <div className="mb-4">
          <label className="text-sm text-[#9CA3AF] mb-2 block">帖子内容 (最多500字)</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}
            placeholder="分享你的交易观点..." maxLength={500} rows={5}
            className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-white placeholder-[#4b5563] focus:outline-none focus:border-[#E8847C] resize-none" />
          <p className="text-[#4b5563] text-xs mt-1 text-right">{content.length}/500</p>
        </div>

        <label className="flex items-center gap-3 p-4 bg-[#0a0a0f] rounded-xl cursor-pointer border border-[#2a2a3a] hover:border-[#E8847C]/30 transition-colors mb-4">
          <input type="checkbox" checked={promote} onChange={(e) => setPromote(e.target.checked)} className="w-4 h-4 accent-[#E8847C]" />
          <div>
            <span className="text-white text-sm font-medium">推荐到首页置顶</span>
            <p className="text-[#6b7280] text-xs mt-0.5">勾选后扣除 100 平台币，置顶 1 天</p>
          </div>
        </label>

        <div className="flex items-center gap-2 text-xs text-[#6b7280] bg-[#0a0a0f] rounded-lg p-3 mb-4">
          <AlertCircle size={13} className="text-[#E8847C]" />
          <span>发帖后不可删除，平台有权对违规内容进行处理</span>
        </div>

        <button onClick={handleSubmit} disabled={submitting || !content.trim()} className="w-full py-3 rounded-lg bg-[#E8847C] hover:bg-[#D46B60] text-white font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          <Edit3 size={15} />
          {submitting ? '发布中...' : promote ? '发布并推荐 (扣100币)' : '发布帖子'}
        </button>
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[#2a2a3a] p-5">
        <h2 className="text-base font-semibold text-white mb-4">我的帖子</h2>
        {myPosts.length === 0 ? (
          <div className="text-center py-8">
            <Edit3 size={28} className="text-[#6b7280] mx-auto mb-2" />
            <p className="text-[#6b7280] text-sm">还没有发布任何帖子</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myPosts.map(post => (
              <div key={post.id} className="p-4 bg-[#0a0a0f] rounded-xl">
                <p className="text-[#d1d5db] text-sm">{post.content}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-[#6b7280]">
                  <span>{post.time}</span>
                  <span>浏览 {post.views}</span>
                  <span>点赞 {post.likes}</span>
                  <button className="flex items-center gap-1 text-[#E8847C] hover:text-[#D46B60]">
                    <LinkIcon size={12} /> 复制链接
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
