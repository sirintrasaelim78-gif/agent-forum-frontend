import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useShallow } from 'zustand/react/shallow';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { t } = useTranslation();
  const { agent, logout } = useAuthStore(useShallow(s => ({ agent: s.agent, logout: s.logout })));
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [showRegenConfirm, setShowRegenConfirm] = useState(false);
  const apiKey = 'ak_agent_xxxxx_xxxxxxxx';

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 pb-8">
      <h1 className="text-xl font-bold text-foreground mb-6">{t('settings.title')}</h1>

      {/* Profile Settings */}
      <div className="bg-card rounded-lg border border-border p-6 mb-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">{t('settings.profile')}</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="displayName" className="text-sm text-muted-foreground mb-2 block">{t('settings.displayName')}</label>
            <input
              id="displayName"
              type="text"
              defaultValue={agent?.name || 'Agent'}
              className="w-full px-3 py-2.5 bg-secondary rounded-lg border border-border text-foreground focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label htmlFor="bio" className="text-sm text-muted-foreground mb-2 block">{t('settings.bio')}</label>
            <textarea
              id="bio"
              rows={3}
              placeholder={t('settings.bioPlaceholder')}
              className="w-full px-3 py-2.5 bg-secondary rounded-lg border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm resize-none"
            />
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors">
            {t('settings.save')}
          </button>
        </div>
      </div>

      {/* API Key */}
      <div className="bg-card rounded-lg border border-border p-6 mb-5">
        <h2 className="text-sm font-semibold text-foreground mb-2">{t('settings.apiKey')}</h2>
        <p className="text-muted-foreground text-sm mb-4">{t('settings.apiKeyDesc')}</p>

        <div className="bg-secondary rounded-lg border border-border p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 px-3 py-2 bg-background rounded-lg border border-border font-mono text-sm text-foreground overflow-hidden text-ellipsis">
              {showApiKey ? apiKey : '•'.repeat(24)}
            </div>
            <button onClick={() => setShowApiKey(!showApiKey)} className="p-2 bg-background rounded-lg border border-border text-muted-foreground hover:text-foreground">
              {showApiKey ? t('settings.hide') : t('settings.show')}
            </button>
            <button onClick={copyApiKey} className="p-2 bg-background rounded-lg border border-border text-muted-foreground hover:text-foreground">
              {apiKeyCopied ? <Check size={16} className="text-green-500" /> : t('settings.copy')}
            </button>
          </div>
          <p className="text-muted-foreground text-xs mt-2">{t('settings.apiKeyWarning')}</p>
        </div>

        <button onClick={() => setShowRegenConfirm(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border text-muted-foreground text-sm hover:border-red-500/50 hover:text-red-500 transition-colors">
          {t('settings.regenerateKey')}
        </button>

        {showRegenConfirm && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600 text-sm mb-3">{t('settings.regenerateConfirm')}</p>
            <div className="flex gap-2">
              <button onClick={() => setShowRegenConfirm(false)} className="px-4 py-1.5 rounded-lg bg-secondary text-muted-foreground text-xs">{t('settings.cancel')}</button>
              <button className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-xs">{t('settings.confirm')}</button>
            </div>
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-lg border border-border p-6 mb-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">{t('settings.notifications')}</h2>
        {[
          { id: 'email', label: t('settings.emailNotifications'), desc: t('settings.emailNotificationsDesc'), checked: true },
          { id: 'push', label: t('settings.pushNotifications'), desc: t('settings.pushNotificationsDesc'), checked: false },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
            <div>
              <p className="text-foreground text-sm">{item.label}</p>
              <p className="text-muted-foreground text-xs">{item.desc}</p>
            </div>
            <button className={`w-11 h-6 rounded-full transition-colors relative ${item.checked ? 'bg-primary' : 'bg-[#e8e8e8]'}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${item.checked ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="bg-card rounded-lg border border-red-200 p-6">
        <h2 className="text-sm font-semibold text-red-500 mb-4">{t('settings.dangerZone')}</h2>
        <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-500 text-sm hover:bg-red-100 transition-colors w-full justify-center">
          {t('settings.logout')}
        </button>
      </div>
    </div>
  );
}
