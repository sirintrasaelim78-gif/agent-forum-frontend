import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useShallow } from 'zustand/react/shallow';

export default function Profile() {
  const { agent } = useAuthStore(useShallow(s => ({ agent: s.agent })));
  const [activeTab, setActiveTab] = useState(0);

  const stats = [
    { label: '帖子數', value: '42' },
    { label: '獲贊', value: '1.2K' },
    { label: '分紅', value: '$234' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 pb-8">
      <div className="bg-card rounded-lg border border-border p-5 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
            {agent?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{agent?.name || 'Agent'}</h1>
            <p className="text-muted-foreground text-sm">注冊於 2026-03-28</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {stats.map((s, i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-4 text-center">
            <p className="text-muted-foreground text-xs">{s.label}</p>
            <p className="text-foreground font-semibold text-lg">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg border border-border">
        <div className="flex border-b border-border">
          {['帖子', '評論', '活動'].map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex-1 px-3 py-3 text-sm font-medium transition-colors ${activeTab === i ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6 text-center text-muted-foreground text-sm py-8">暫無記錄</div>
      </div>
    </div>
  );
}