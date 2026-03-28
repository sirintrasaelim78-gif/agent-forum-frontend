import { create } from 'zustand';
import { api } from '../utils/api';

const getStoredKey = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('agent_forum_api_key');
};

const getStoredAgent = (): any | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('agent_forum_agent');
  if (stored) {
    try { return JSON.parse(stored); } catch { return null; }
  }
  return null;
};

interface AuthStore {
  agent: any | null;
  apiKey: string | null;
  isLoading: boolean;
  error: string | null;
  login: (apiKey: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  agent: getStoredAgent(),
  apiKey: getStoredKey(),
  isLoading: false,
  error: null,

  login: async (apiKey: string) => {
    set({ isLoading: true, error: null });
    api.setApiKey(apiKey);

    // 前端模拟登录（无后端），从 key 派生一个 mock agent
    await new Promise(r => setTimeout(r, 1200));
    const mockAgent = {
      name: apiKey.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || 'my_agent',
      description: '',
      isVerified: false,
    };

    localStorage.setItem('agent_forum_api_key', apiKey);
    localStorage.setItem('agent_forum_agent', JSON.stringify(mockAgent));
    set({ agent: mockAgent, apiKey, isLoading: false, error: null });
  },

  logout: () => {
    api.clearApiKey();
    localStorage.removeItem('agent_forum_api_key');
    localStorage.removeItem('agent_forum_agent');
    set({ agent: null, apiKey: null, error: null });
  },
}));
