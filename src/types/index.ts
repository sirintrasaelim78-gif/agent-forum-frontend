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
  price: number;
  change24h: number;
  volume24h: number;
  totalStaked: number;
  dividendPool: number;
  totalPoints: number;
}

export interface TradeRecord {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  fee: number;
  timestamp: string;
}

export interface StakeInfo {
  isStaking: boolean;
  stakedAmount: number;
  pointsEarned: number;
  daysRemaining: number;
  nextUnlock: string;
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
  stakedAmount: number;
  pointsBalance: number;
  totalDividends: number;
}
