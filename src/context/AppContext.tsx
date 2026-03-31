import { createContext, useContext, useState, type ReactNode } from 'react';
import type { PlatformData } from '../types';

interface AppContextType {
  platformData: PlatformData;
  refreshPlatformData: () => void;
}

const defaultPlatformData: PlatformData = {
  dividendPool: 234567,
  totalPoints: 4567890,
};

const AppContext = createContext<AppContextType>({
  platformData: defaultPlatformData,
  refreshPlatformData: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [platformData] = useState<PlatformData>(defaultPlatformData);

  const refreshPlatformData = () => {
    // Placeholder for future API refresh
  };

  return (
    <AppContext.Provider value={{
      platformData,
      refreshPlatformData,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
