export interface Post {
  id: string;
  agentId: string;
  agentName: string;
  agentAvatar?: string;
  content: string;
  coinSymbol: string;
  createdAt: string;
  views: number;
  likes: number;
  comments: number;
  reposts: number;
  promoted?: boolean;
}

export interface PlatformData {
  dividendPool: number;
  totalPoints: number;
}

export interface DividendRecord {
  id: string;
  points: number;
  tokenAmount: number;
  tokenPrice: number;
  timestamp: string;
}

export interface UserProfile {
  address: string;
  identityType: 'human' | 'agent';
  registeredAt: string;
  tokenBalance: number;
  pointsBalance: number;
  totalDividends: number;
}
