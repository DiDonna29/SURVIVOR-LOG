
"use client";

import React from 'react';
import { ThemeProvider, useTheme } from '@/components/survival/theme-provider';
import { LanguageProvider, useLanguage } from '@/components/survival/language-provider';
import { InventoryList } from '@/components/survival/inventory-list';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Languages, ShieldAlert, Terminal, Info } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

function Dashboard() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Header section with status readouts */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-4 border-foreground">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <ShieldAlert className="w-6 h-6" />
            <span className="font-code text-xs font-bold tracking-[0.2em] uppercase">
              System Active: {theme === 'light' ? 'SURFACE' : 'STEALTH'}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-headline tracking-tighter leading-none">
            {t.title}
          </h1>
          <p className="font-headline text-lg opacity-60 flex items-center gap-2 uppercase">
            <span className="w-12 h-px bg-foreground/20" />
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="rounded-none tactical-border h-10 px-3 uppercase text-xs font-code"
          >
            <Languages className="w-4 h-4 mr-2" />
            {language}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleTheme}
            className="rounded-none tactical-border h-10 px-3 uppercase text-xs font-code"
            title={theme === 'light' ? t.themeNight : t.themeDay}
          >
            {theme === 'light' ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
            {theme === 'light' ? 'STEALTH' : 'VISIBILITY'}
          </Button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <InventoryList />
        </div>
        <aside className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <Alert className="rounded-none tactical-border bg-card border-primary/50">
              <Terminal className="h-4 w-4 text-primary" />
              <AlertTitle className="font-headline text-primary uppercase text-xs tracking-widest">
                {t.notices.protocol}
              </AlertTitle>
              <AlertDescription className="text-xs opacity-80 font-body">
                {t.notices.protocolDesc}
              </AlertDescription>
            </Alert>

            <Alert className="rounded-none tactical-border bg-card border-foreground/30">
              <Info className="h-4 w-4 text-foreground" />
              <AlertTitle className="font-headline uppercase text-xs tracking-widest">
                {t.notices.purpose}
              </AlertTitle>
              <AlertDescription className="text-xs opacity-80 font-body">
                {t.notices.purposeDesc}
              </AlertDescription>
            </Alert>
          </div>

          <div className="p-6 bg-primary/5 border border-primary/20 font-body text-sm space-y-4">
            <h3 className="font-headline text-primary">Protocol 7-B</h3>
            <p className="opacity-70 italic text-xs">
              "A silent inventory is a secure inventory. Do not disclose stockpile locations to unverified scouts."
            </p>
            <div className="flex gap-2">
              <div className="h-2 flex-1 bg-primary/20" />
              <div className="h-2 flex-1 bg-primary/40" />
              <div className="h-2 flex-1 bg-primary/60" />
              <div className="h-2 flex-1 bg-primary" />
            </div>
          </div>
        </aside>
      </main>

      <footer className="pt-12 border-t border-border flex flex-col items-center gap-2 opacity-30 text-[10px] font-code uppercase tracking-widest">
        <span>© 2024 Dead Drop Loot Systems</span>
        <span>Secure Protocol 1029.A.4</span>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen transition-colors duration-500">
          <Dashboard />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
