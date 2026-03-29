import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useShallow } from 'zustand/react/shallow';
import { AtSign } from 'lucide-react';

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
    <div
      className="transition-all duration-200"
    >
      <div
        onClick={() => setExpanded(true)}
        className="flex items-start gap-3 cursor-text"
      >
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5"
          style={{
            background: 'var(--accent-light)',
            color: 'var(--accent)',
          }}
        >
          {agent?.name?.[0]?.toUpperCase() ?? 'A'}
        </div>

        <div className="flex-1 min-w-0">
          {!expanded ? (
            <div
              className="px-3 py-2 rounded-md transition-colors"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              说点什么...
            </div>
          ) : (
            <div className="space-y-3">
              {/* Symbol input + content */}
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={coinSymbol}
                  onChange={e => setCoinSymbol(e.target.value.toUpperCase())}
                  onClick={e => e.stopPropagation()}
                  placeholder="$Symbol"
                  className="w-20 text-xs px-2 py-1 font-semibold transition-colors"
                  style={{
                    background: 'var(--accent-light)',
                    color: 'var(--accent)',
                    border: '1px solid transparent',
                    borderRadius: 'var(--radius-sm)',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'transparent'}
                />
              </div>

              <textarea
                autoFocus
                value={content}
                onChange={e => setContent(e.target.value)}
                onClick={e => e.stopPropagation()}
                placeholder="分享你的观点..."
                className="w-full resize-none text-sm transition-colors min-h-[80px]"
                style={{
                  color: 'var(--text-primary)',
                  background: 'transparent',
                }}
                rows={4}
              />

              {/* Action bar */}
              <div
                className="flex items-center justify-between pt-3"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <div className="relative">
                  <button
                    onClick={e => { e.stopPropagation(); setShowCoinPicker(!showCoinPicker); }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-colors"
                    style={{
                      background: coinSymbol ? 'var(--accent-light)' : 'var(--bg-tertiary)',
                      color: coinSymbol ? 'var(--accent)' : 'var(--text-muted)',
                    }}
                    onMouseEnter={(e) => {
                      if (!coinSymbol) e.currentTarget.style.background = 'var(--bg-primary)';
                    }}
                    onMouseLeave={(e) => {
                      if (!coinSymbol) e.currentTarget.style.background = 'var(--bg-tertiary)';
                    }}
                  >
                    <AtSign size={12} />
                    {coinSymbol ? `$${coinSymbol}` : '添加代币'}
                  </button>
                  {showCoinPicker && (
                    <div
                      className="absolute left-0 top-full mt-2 p-1.5 z-20 min-w-[140px]"
                      style={{
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-lg)',
                      }}
                    >
                      {popularCoins.map(coin => (
                        <button
                          key={coin}
                          onClick={e => {
                            e.stopPropagation();
                            setCoinSymbol(coin);
                            setShowCoinPicker(false);
                          }}
                          className="block w-full text-left px-3 py-2 text-xs rounded transition-colors"
                          style={{ color: 'var(--text-secondary)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--bg-tertiary)';
                            e.currentTarget.style.color = 'var(--text-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                          }}
                        >
                          ${coin}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setExpanded(false);
                      setContent('');
                      setCoinSymbol('');
                    }}
                    className="px-3 py-1.5 rounded-md text-xs transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--bg-tertiary)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }}
                  >
                    取消
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); handleSubmit(); }}
                    disabled={!content.trim()}
                    className="px-4 py-1.5 rounded-md text-xs font-medium transition-all"
                    style={{
                      background: content.trim() ? 'var(--accent)' : 'var(--bg-tertiary)',
                      color: content.trim() ? 'white' : 'var(--text-muted)',
                      cursor: content.trim() ? 'pointer' : 'not-allowed',
                    }}
                    onMouseEnter={(e) => {
                      if (content.trim()) e.currentTarget.style.background = 'var(--accent-hover)';
                    }}
                    onMouseLeave={(e) => {
                      if (content.trim()) e.currentTarget.style.background = 'var(--accent)';
                    }}
                  >
                    发布
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}