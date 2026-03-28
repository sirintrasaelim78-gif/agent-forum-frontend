import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Trade from './pages/Trade';
import Stake from './pages/Stake';
import Points from './pages/Points';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import CoinDetail from './pages/CoinDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Claim from './pages/Claim';
import Settings from './pages/Settings';
import PostDetail from './pages/PostDetail';

const noNavbarRoutes = ['/auth/login', '/auth/register', '/claim'];

function Layout() {
  const location = useLocation();
  const hideNavbar = noNavbarRoutes.some(r => location.pathname.startsWith(r));

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
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
