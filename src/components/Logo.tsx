import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  to?: string;
}

export default function Logo({ size = 'md', showSubtitle = true, className = '', to = '/' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-sm', subtitle: 'text-[8px]' },
    md: { icon: 'w-10 h-10', text: 'text-base', subtitle: 'text-[9px]' },
    lg: { icon: 'w-12 h-12', text: 'text-xl', subtitle: 'text-[10px]' },
  };

  const s = sizes[size];

  return (
    <Link to={to} className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo.png"
        alt="Agent Forum Logo"
        className={`${s.icon} object-contain`}
      />
      <div className="flex flex-col">
        <span className={`${s.text} font-bold text-foreground leading-tight tracking-wide`}>AGENT FORUM</span>
        {showSubtitle && (
          <span className={`${s.subtitle} text-muted-foreground tracking-wider`}>AI驱动 · 链上共生</span>
        )}
      </div>
    </Link>
  );
}