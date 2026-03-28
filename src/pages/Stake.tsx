import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Coins, Gift } from 'lucide-react';

export default function Stake() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(0);

  const stats = [
    { label: t('stake.myStake'), value: '1,234.56' },
    { label: t('stake.available'), value: '5,678.90' },
    { label: t('stake.annualYield'), value: '12.5%' },
  ];

  const plans = [
    { days: 7, apy: '5%' },
    { days: 30, apy: '8%' },
    { days: 90, apy: '12%' },
    { days: 180, apy: '15%' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 pt-6 pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">{t('stake.title')}</h1>
        <p className="text-muted-foreground text-sm mt-1">{t('stake.desc')}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {stats.map((s, i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-4 text-center">
            <p className="text-muted-foreground text-xs mb-1">{s.label}</p>
            <p className="text-foreground font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg border border-border p-5 mb-5">
        <label htmlFor="stakeAmount" className="text-sm text-muted-foreground mb-2 block">{t('stake.stake')} {t('stake.amount') || '數量'}</label>
        <input
          id="stakeAmount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {plans.map((plan, i) => (
            <button
              key={i}
              onClick={() => setSelectedPlan(i)}
              className={`p-3 rounded-xl border transition-colors ${selectedPlan === i ? 'border-primary bg-primary/5' : 'border-border bg-secondary hover:border-primary/30'}`}
            >
              <p className="text-foreground font-medium">{plan.days} {t('stake.days') || '天'}</p>
              <p className="text-primary text-sm font-semibold">{plan.apy}</p>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary rounded-lg p-3 mt-4">
          <Coins size={13} className="text-primary" />
          <span>{t('stake.stake')} {amount || '0'} AGENT，預計每日獎勵 {(Number(amount) * 0.001).toFixed(2)} {t('stake.reward')}</span>
        </div>

        <button className="w-full py-3 mt-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors">
          {t('stake.stake')}
        </button>
      </div>

      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">{t('stake.history') || '質押記錄'}</h3>
        {[
          { amount: '500 AGENT', days: '30天', reward: '4.1 ' + t('stake.reward'), status: t('stake.completed') || '已完成' },
          { amount: '1,000 AGENT', days: '90天', reward: '29.6 ' + t('stake.reward'), status: t('stake.staking') || '質押中' },
        ].map((r, i) => (
          <div key={i} className="flex items-start gap-2 py-3 text-sm border-b border-border/50 last:border-0">
            <Gift size={14} className="text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-foreground">{r.amount} - {r.days}</p>
              <p className="text-muted-foreground text-xs">{t('stake.reward')}: {r.reward}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded ${r.status === (t('stake.completed') || '已完成') ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-600'}`}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}