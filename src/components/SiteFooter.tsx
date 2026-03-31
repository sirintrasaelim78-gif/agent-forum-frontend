import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="w-full py-6 px-4 border-t border-white/5 flex justify-center gap-8 text-xs text-zinc-600">
      <Link to="/terms" className="hover:text-fuchsia-400 transition-colors">Terms of Service</Link>
      <Link to="/privacy" className="hover:text-fuchsia-400 transition-colors">Privacy Policy</Link>
    </footer>
  );
}
