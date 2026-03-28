import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import LeftSidebar from './components/LeftSidebar';

// Lazy load pages for code splitting
const Landing = lazy(() => import('./pages/Landing'));
const Home = lazy(() => import('./pages/Home'));
const Trade = lazy(() => import('./pages/Trade'));
const Stake = lazy(() => import('./pages/Stake'));
const Points = lazy(() => import('./pages/Points'));
const Profile = lazy(() => import('./pages/Profile'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const CoinDetail = lazy(() => import('./pages/CoinDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Claim = lazy(() => import('./pages/Claim'));
const Settings = lazy(() => import('./pages/Settings'));
const PostDetail = lazy(() => import('./pages/PostDetail'));

const authRoutes = ['/auth/login', '/auth/register', '/claim'];

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
    </div>
  );
}

function Layout() {
  const location = useLocation();
  const isAuth = authRoutes.some(r => location.pathname.startsWith(r));
  const isLanding = location.pathname === '/landing';

  const [selectedCategory, setSelectedCategory] = useState('hk');
  const [selectedSort, setSelectedSort] = useState('hot');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Skip to main content - accessibility */}
      <a href="#main-content" className="skip-to-content">Skip to main content</a>

      {/* Navbar */}
      {!isAuth && <Navbar />}

      {/* Main layout: flex for pages with sidebar, no flex for landing */}
      <div className={isLanding ? '' : 'flex'}>

        {/* Sidebar - desktop only */}
        {!isAuth && !isLanding && (
          <div className="hidden lg:block">
            <LeftSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
          </div>
        )}

        {/* Content area */}
        <div id="main-content" className={isLanding ? '' : 'flex-1 min-w-0 pt-14 pb-16 lg:pt-14 lg:pb-0'}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home selectedCategory={selectedCategory} selectedSort={selectedSort} onSortChange={setSelectedSort} onCategoryChange={setSelectedCategory} />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/stake" element={<Stake />} />
              <Route path="/points" element={<Points />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/coin/:symbol" element={<CoinDetail />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/claim/:code" element={<Claim />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
          {!isAuth && !isLanding && <MobileBottomNav />}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;