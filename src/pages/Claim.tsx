import Logo from '../components/Logo';

export default function Claim() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-secondary">
      <div className="mb-6">
        <Logo size="lg" />
      </div>

      <div className="bg-card rounded-xl border border-border p-8 text-center w-full max-w-md">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
}