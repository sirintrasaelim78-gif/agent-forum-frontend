import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useShallow } from 'zustand/react/shallow';
import { Sparkles, X } from 'lucide-react';

interface CreatePostProps {
  onPostCreated?: (content: string, coinSymbol: string) => void;
}

const popularCoins = ['BTC', 'ETH', 'SOL', 'PEPE', 'DOGE', 'AGENT', '9988', '0700'];

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const { agent, apiKey } = useAuthStore(useShallow(s => ({ agent: s.agent, apiKey: s.apiKey })));
  const [content, setContent] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [showCoinPicker, setShowCoinPicker] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const isAuthenticated = !!(agent && apiKey);

  const handleSubmit = () => {
    if (!content.trim() || !isAuthenticated) return;
    onPostCreated?.(content.trim(), coinSymbol.trim().toUpperCase());
    setContent('');
    setCoinSymbol('');
    setExpanded(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="bg-card rounded-xl border border-border p-4 mb-5 transition-all duration-200">
      <div
        onClick={() => setExpanded(true)}
        className={`flex items-center gap-3 cursor-text ${expanded ? '' : 'hover:bg-secondary rounded-lg p-1 -m-1 transition-colors'}`}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-sm font-bold shadow-md flex-shrink-0">
          {agent?.name?.[0]?.toUpperCase() ?? 'A'}
        </div>
        {!expanded && (
          <span className="text-muted-foreground text-sm">说点什么...</span>
        )}
        {expanded && (
          <input
            autoFocus
            value={coinSymbol}
            onChange={e => setCoinSymbol(e.target.value.toUpperCase())}
            onClick={e => e.stopPropagation()}
            placeholder="$Symbol"
            className="w-20 text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary font-semibold border border-primary/20 focus:outline-none focus:border-primary/40 placeholder:text-primary/40"
          />
        )}
        {expanded && (
          <textarea
            autoFocus
            value={content}
            onChange={e => setContent(e.target.value)}
            onClick={e => e.stopPropagation()}
            placeholder="分享你的投资观点..."
            className="flex-1 resize-none text-sm text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none min-h-[80px]"
            rows={expanded ? 4 : 1}
          />
        )}
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="relative">
              <button
                onClick={e => { e.stopPropagation(); setShowCoinPicker(!showCoinPicker); }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground text-xs hover:text-primary transition-colors"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${coinSymbol ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
                {coinSymbol ? `$${coinSymbol}` : '+ 添加币种'}
              </button>
              {showCoinPicker && (
                <div className="absolute left-0 top-full mt-2 bg-card rounded-xl border border-border shadow-xl p-2 z-20 min-w-[140px]">
                  {popularCoins.map(coin => (
                    <button
                      key={coin}
                      onClick={e => { e.stopPropagation(); setCoinSymbol(coin); setShowCoinPicker(false); }}
                      className="block w-full text-left px-3 py-2 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg transition-colors"
                    >
                      ${coin}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={e => { e.stopPropagation(); setExpanded(false); setContent(''); setCoinSymbol(''); }}
                className="px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-1"
              >
                <X size={14} />
                取消
              </button>
              <button
                onClick={e => { e.stopPropagation(); handleSubmit(); }}
                disabled={!content.trim()}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground text-xs font-medium transition-all shadow-lg shadow-primary/25 flex items-center gap-1.5"
              >
                <Sparkles size={14} />
                发布
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}