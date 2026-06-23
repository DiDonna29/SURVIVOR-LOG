"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from './language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, CheckSquare, Square, Plus, Package, Hammer, HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  useEffect(() => {
    const saved = localStorage.getItem('survival-loot');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('survival-loot', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!name.trim()) return;
    const newItem: InventoryItem = {
      id: crypto.randomUUID(),
      name,
      category,
      found: false,
    };
    setItems([newItem, ...items]);
    setName('');
  };

  const toggleItem = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, found: !i.found } : i));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const Column = ({ cat, title, icon: Icon }: { cat: ItemCategory, title: string, icon: any }) => (
    <div className="flex-1 min-w-[280px] p-4 notebook-page border-l-4 border-primary/30">
      <div className="flex items-center gap-2 mb-4 border-b-2 border-primary/20 pb-2">
        <Icon className="w-5 h-5 text-primary" />
        <h3 className="font-headline text-lg font-bold tracking-widest">{title}</h3>
      </div>
      <div className="space-y-1">
        {items.filter(i => i.category === cat).length === 0 ? (
          <p className="text-xs opacity-30 italic py-4">{t.empty}</p>
        ) : (
          items.filter(i => i.category === cat).map(item => (
            <div key={item.id} className={cn("item-slot group", item.found && "item-found")}>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleItem(item.id)} className="text-primary">
                  {item.found ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                </button>
                <span className="font-body text-sm uppercase font-medium">{item.name}</span>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="opacity-0 group-hover:opacity-100 hover:text-primary transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Input Section - Tactical Form */}
      <div className="p-6 tactic-border bg-card flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full space-y-1">
          <label className="text-[10px] font-bold tracking-widest opacity-50 uppercase">{t.placeholder}</label>
          <Input 
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="..."
            className="bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 px-0 h-10 font-headline uppercase"
            onKeyDown={e => e.key === 'Enter' && addItem()}
          />
        </div>
        <div className="w-full md:w-48 space-y-1">
          <label className="text-[10px] font-bold tracking-widest opacity-50 uppercase">CAT</label>
          <Select value={category} onValueChange={(v: ItemCategory) => setCategory(v)}>
            <SelectTrigger className="rounded-none border-2 border-foreground h-10 uppercase font-headline text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="food" className="uppercase text-xs font-headline">{t.categories.food}</SelectItem>
              <SelectItem value="tools" className="uppercase text-xs font-headline">{t.categories.tools}</SelectItem>
              <SelectItem value="medicine" className="uppercase text-xs font-headline">{t.categories.medicine}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={addItem} className="w-full md:w-auto rounded-none h-10 px-8 bg-foreground text-background hover:bg-primary hover:text-white transition-all font-headline font-bold">
          <Plus className="w-4 h-4 mr-2" />
          {t.add}
        </Button>
      </div>

      {/* Grid Columns */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Column cat="medicine" title={t.categories.medicine} icon={HeartPulse} />
        <Column cat="tools" title={t.categories.tools} icon={Hammer} />
        <Column cat="food" title={t.categories.food} icon={Package} />
      </div>
    </div>
  );
}