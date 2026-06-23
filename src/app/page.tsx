
"use client";

import React from 'react';
import { ThemeProvider, useTheme } from '@/components/survival/theme-provider';
import { LanguageProvider, useLanguage } from '@/components/survival/language-provider';
import { InventoryList } from '@/components/survival/inventory-list';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Languages, Skull, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function Dashboard() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-6 py-12 lg:py-20 space-y-12 overflow-x-hidden">
      {/* Header Táctico */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-10 border-b-[12px] border-foreground">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3 text-primary animate-pulse">
            <Skull className="w-10 h-10" />
            <span className="font-code text-sm font-black tracking-[0.5em]">SYSTEM_VERSION_1.5 // ANTI_SLOP</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-headline font-black tracking-tighter leading-[0.85] uppercase">
            {t.title}
          </h1>
          <p className="font-headline text-2xl opacity-50 uppercase tracking-[0.2em] font-light">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="tactic-border rounded-none h-14 px-6 uppercase text-sm font-black font-headline hover:bg-foreground hover:text-background"
          >
            <Languages className="w-5 h-5 mr-3" />
            {language}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleTheme}
            className="tactic-border rounded-none h-14 px-6 uppercase text-sm font-black font-headline hover:bg-foreground hover:text-background"
          >
            {theme === 'light' ? <Moon className="w-5 h-5 mr-3" /> : <Sun className="w-5 h-5 mr-3" />}
            {theme === 'light' ? t.actions.themeNight : t.actions.themeDay}
          </Button>
        </div>
      </header>

      {/* Production Notice */}
      <Alert className="tactic-border bg-primary/5 border-primary/40 rounded-none border-2">
        <AlertCircle className="h-5 w-5 text-primary" />
        <AlertTitle className="font-headline font-black uppercase text-xs tracking-widest mb-1">Status Report</AlertTitle>
        <AlertDescription className="font-body text-xs uppercase opacity-70">
          Operación local activa. Todos los datos se almacenan en el caché de la terminal actual. No se requiere conexión a la red central.
        </AlertDescription>
      </Alert>

      <main className="relative">
        <InventoryList />
      </main>

      <footer className="pt-32 pb-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-full h-px bg-foreground/10" />
          <p className="opacity-20 text-[10px] font-mono uppercase tracking-[0.8em] text-center">
            [ END OF LOG // PROTOCOL 00-Z // TASTE_SKILL_ENABLED ]
          </p>
        </div>
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
