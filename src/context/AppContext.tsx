import { createContext, useContext, useState, type ReactNode } from 'react';
import type { PlatformData, StakeInfo } from '../types';

interface AppContextType {
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
  platformData: defaultPlatformData,
  stakeInfo: null,
  refreshPlatformData: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [platformData, setPlatformData] = useState<PlatformData>(defaultPlatformData);
  const [stakeInfo] = useState<StakeInfo | null>(null);

  const refreshPlatformData = () => {
    setPlatformData(prev => ({
      ...prev,
      price: prev.price * (1 + (Math.random() - 0.5) * 0.02),
    }));
  };

  return (
    <AppContext.Provider value={{
      platformData,
      stakeInfo,
      refreshPlatformData,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
