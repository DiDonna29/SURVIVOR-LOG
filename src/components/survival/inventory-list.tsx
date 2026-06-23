
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from './language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, CheckSquare, Square, Plus, Package, Hammer, HeartPulse, ShieldCheck, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type ItemCategory = 'food' | 'tools' | 'medicine';

interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  found: boolean;
}

export function InventoryList() {
  const { t } = useLanguage();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ItemCategory>('food');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('survival-loot');
    if (saved) setItems(JSON.parse(saved));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('survival-loot', JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const stats = useMemo(() => {
    const total = items.length;
    const secured = items.filter(i => i.found).length;
    return { total, secured, percentage: total > 0 ? Math.round((secured / total) * 100) : 0 };
  }, [items]);

  const addItem = () => {
    if (!name.trim()) return;
    const newItem: InventoryItem = {
      id: crypto.randomUUID(),
      name: name.trim(),
      category,
      found: false,
    };
    setItems(prev => [newItem, ...prev]);
    setName('');
  };

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, found: !i.found } : i));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const Column = ({ cat, title, icon: Icon }: { cat: ItemCategory, title: string, icon: any }) => {
    const filteredItems = items.filter(i => i.category === cat);
    
    return (
      <div className="flex-1 min-w-0 p-4 notebook-page border-l-[6px] border-primary/40 bg-card/10">
        <div className="flex items-center justify-between mb-6 border-b-4 border-foreground pb-2">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary" />
            <h3 className="font-headline text-lg font-black tracking-tighter uppercase">{title}</h3>
          </div>
          <span className="font-code text-xs bg-foreground text-background px-2 py-0.5 font-bold">
            {filteredItems.length.toString().padStart(2, '0')}
          </span>
        </div>
        
        <div className="space-y-1">
          <AnimatePresence mode="popLayout">
            {filteredItems.length === 0 ? (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] opacity-30 italic py-4 font-mono uppercase tracking-widest"
              >
                {t.empty}
              </motion.p>
            ) : (
              filteredItems.map(item => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  className={cn("item-slot group", item.found && "item-found")}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button 
                      onClick={() => toggleItem(item.id)} 
                      className="text-primary hover:scale-110 transition-transform shrink-0"
                    >
                      {item.found ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                    </button>
                    <span className="font-body text-sm uppercase font-bold break-words line-clamp-2 leading-tight">
                      {item.name}
                    </span>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 hover:text-primary transition-all p-1 hover:bg-primary/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      {/* Stats Readout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t.total, value: stats.total, icon: Package },
          { label: t.secure, value: stats.secured, icon: ShieldCheck },
          { label: "STATUS", value: `${stats.percentage}%`, icon: Activity },
          { label: "RESERVE", value: stats.total - stats.secured, icon: HeartPulse },
        ].map((stat, i) => (
          <div key={i} className="tactic-border bg-card p-4 flex flex-col items-center justify-center text-center overflow-hidden">
            <stat.icon className="w-4 h-4 mb-2 text-primary opacity-50" />
            <span className="text-[10px] font-black uppercase tracking-tighter opacity-40 leading-none mb-1">{stat.label}</span>
            <span className="text-3xl font-headline font-black leading-none break-all">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="p-8 tactic-border bg-card flex flex-col md:flex-row gap-6 items-end relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -rotate-45 translate-x-16 -translate-y-16" />
        
        <div className="flex-1 w-full space-y-2 relative">
          <label className="text-[10px] font-black tracking-widest opacity-50 uppercase flex items-center gap-2">
            <Plus className="w-3 h-3" /> {t.placeholder}
          </label>
          <Input 
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="TYPE_INPUT_DATA..."
            className="bg-transparent border-b-4 border-t-0 border-l-0 border-r-0 border-foreground rounded-none focus-visible:ring-0 px-0 h-12 font-headline uppercase text-xl font-black placeholder:opacity-20"
            onKeyDown={e => e.key === 'Enter' && addItem()}
          />
        </div>
        
        <div className="w-full md:w-56 space-y-2 relative">
          <label className="text-[10px] font-black tracking-widest opacity-50 uppercase">CLASS_ID</label>
          <Select value={category} onValueChange={(v: ItemCategory) => setCategory(v)}>
            <SelectTrigger className="rounded-none border-4 border-foreground h-12 uppercase font-headline text-sm font-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none border-4 border-foreground p-0">
              <SelectItem value="medicine" className="uppercase text-xs font-headline font-bold py-3 focus:bg-primary focus:text-white transition-colors">{t.categories.medicine}</SelectItem>
              <SelectItem value="tools" className="uppercase text-xs font-headline font-bold py-3 focus:bg-primary focus:text-white transition-colors">{t.categories.tools}</SelectItem>
              <SelectItem value="food" className="uppercase text-xs font-headline font-bold py-3 focus:bg-primary focus:text-white transition-colors">{t.categories.food}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={addItem} 
          disabled={!name.trim()}
          className="w-full md:w-auto rounded-none h-12 px-10 bg-foreground text-background hover:bg-primary hover:text-white transition-all font-headline font-black text-sm uppercase tracking-tighter disabled:opacity-20"
        >
          {t.add}
        </Button>
      </div>

      {/* Grid Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Column cat="medicine" title={t.categories.medicine} icon={HeartPulse} />
        <Column cat="tools" title={t.categories.tools} icon={Hammer} />
        <Column cat="food" title={t.categories.food} icon={Package} />
      </div>
    </div>
  );
}
