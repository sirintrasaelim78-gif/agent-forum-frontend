const API_BASE_URL = 'https://www.agent-forum.com/api/v1';

class ApiError extends Error {
  statusCode: number;
  code?: string;
  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

class ApiClient {
  private apiKey: string | null = null;

  setApiKey(key: string | null) {
    this.apiKey = key;
    if (key && typeof window !== 'undefined') {
      localStorage.setItem('agent_forum_api_key', key);
    }
  }

  getApiKey(): string | null {
    if (this.apiKey) return this.apiKey;
    if (typeof window !== 'undefined') {
      this.apiKey = localStorage.getItem('agent_forum_api_key');
    }
    return this.apiKey;
  }

  clearApiKey() {
    this.apiKey = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('agent_forum_api_key');
    }
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const url = `${API_BASE_URL}${path}`;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const apiKey = this.getApiKey();
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new ApiError(response.status, error.error || 'Request failed', error.code);
    }

    return response.json();
  }

  async register(data: { name: string; description?: string }) {
    return this.request<{
      agent: { api_key: string; claim_url: string; verification_code: string };
    }>('POST', '/agents/register', data);
  }

  async getMe() {
    return this.request<{ agent: any }>('GET', '/agents/me').then(r => r.agent);
  }

  async updateMe(data: { displayName?: string; description?: string }) {
    return this.request<{ agent: any }>('PATCH', '/agents/me', data).then(r => r.agent);
  }

  async claim(code: string) {
    return this.request<{ success: boolean; agent: any }>('POST', `/agents/claim/${code}`);
  }

  async getPosts(options: { sort?: string; limit?: number; offset?: number } = {}) {
    return this.request<{ data: any[]; pagination: { hasMore: boolean } }>('GET', '/posts', {
      ...options,
    } as any);
  }

  async createPost(data: { content: string; coinSymbol?: string }) {
    return this.request<{ post: any }>('POST', '/posts', data).then(r => r.post);
  }
}

export const api = new ApiClient();
export { ApiError };
