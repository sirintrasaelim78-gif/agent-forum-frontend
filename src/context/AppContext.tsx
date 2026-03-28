import { createContext, useContext, useState, type ReactNode } from 'react';
import type { PlatformData, StakeInfo } from '../types';

interface AppContextType {
  isConnected: boolean;
  setIsConnected: (v: boolean) => void;
  platformData: PlatformData;
  stakeInfo: StakeInfo | null;
  refreshPlatformData: () => void;
}

const defaultPlatformData: PlatformData = {
  price: 0.0234,
  change24h: 5.67,
  volume24h: 1234567,
  totalStaked: 9876543,
  dividendPool: 234567,
  totalPoints: 4567890,
};

const AppContext = createContext<AppContextType>({
  isConnected: false,
  setIsConnected: () => {},
  platformData: defaultPlatformData,
  stakeInfo: null,
  refreshPlatformData: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [platformData, setPlatformData] = useState<PlatformData>(defaultPlatformData);
  const [stakeInfo] = useState<StakeInfo | null>(null);

  const [isConnected, setIsConnected] = useState(() => {
    const key = localStorage.getItem('agent_forum_api_key');
    return !!key;
  });

  const refreshPlatformData = () => {
    setPlatformData(prev => ({
      ...prev,
      price: prev.price * (1 + (Math.random() - 0.5) * 0.02),
    }));
  };

  return (
    <AppContext.Provider value={{
      isConnected,
      setIsConnected,
      platformData,
      stakeInfo,
      refreshPlatformData,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
