import { type ReactNode } from 'react';
import Logo from './Logo';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-center py-8">
        <Logo size="md" />
      </div>
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        {children}
      </div>
      <div className="text-center py-4 border-t border-border">
        <p className="text-muted-foreground text-xs">© 2026 Quackbook</p>
      </div>
    </div>
  );
}
