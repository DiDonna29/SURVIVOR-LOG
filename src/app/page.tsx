"use client";

import React from 'react';
import { ThemeProvider, useTheme } from '@/components/survival/theme-provider';
import { LanguageProvider, useLanguage } from '@/components/survival/language-provider';
import { InventoryList } from '@/components/survival/inventory-list';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Languages, Skull } from 'lucide-react';

function Dashboard() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Header Táctico */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b-8 border-foreground">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-primary animate-pulse">
            <Skull className="w-8 h-8" />
            <span className="font-mono text-xs font-bold tracking-[0.4em]">SYSTEM_STATUS: ACTIVE</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter leading-none">
            {t.title}
          </h1>
          <p className="font-headline text-xl opacity-40 uppercase tracking-widest">
            {t.subtitle}
          </p>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="tactic-border rounded-none h-12 px-4 uppercase text-xs font-bold font-headline"
          >
            <Languages className="w-4 h-4 mr-2" />
            {language}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleTheme}
            className="tactic-border rounded-none h-12 px-4 uppercase text-xs font-bold font-headline"
          >
            {theme === 'light' ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
            {theme === 'light' ? t.actions.themeNight : t.actions.themeDay}
          </Button>
        </div>
      </header>

      <main>
        <InventoryList />
      </main>

      <footer className="pt-24 opacity-20 text-[10px] font-mono uppercase tracking-[0.5em] text-center">
        [ END OF LOG // PROTOCOL 00-Z ]
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Dashboard />
      </LanguageProvider>
    </ThemeProvider>
  );
}