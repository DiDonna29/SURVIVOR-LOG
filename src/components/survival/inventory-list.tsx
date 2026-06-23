
"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from './language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Apple, Hammer, Stethoscope, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
  const [newItemName, setNewItemName] = useState('');
  const [activeCategory, setActiveCategory] = useState<ItemCategory>('food');

  useEffect(() => {
    const saved = localStorage.getItem('dd-inventory');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('dd-inventory', JSON.stringify(items));
  }, [items]);

  const addItem = (name?: string, categoryOverride?: ItemCategory) => {
    const finalName = name || newItemName;
    if (!finalName.trim()) return;
    const newItem: InventoryItem = {
      id: crypto.randomUUID(),
      name: finalName,
      category: categoryOverride || activeCategory,
      found: false,
    };
    setItems([newItem, ...items]);
    if (!name) setNewItemName('');
  };

  const toggleFound = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, found: !item.found } : item
    ));
    // Simulate haptic feedback if available
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = (cat: ItemCategory) => items.filter(i => i.category === cat);

  const ProgressStats = () => {
    const total = items.length;
    const foundCount = items.filter(i => i.found).length;
    const percent = total > 0 ? Math.round((foundCount / total) * 100) : 0;
    
    return (
      <div className="flex flex-col gap-2 p-4 bg-secondary/30 rounded-none border-l-4 border-primary font-code">
        <div className="flex justify-between text-xs uppercase opacity-70">
          <span>{t.stats}</span>
          <span>{percent}% SECURE</span>
        </div>
        <div className="h-1.5 w-full bg-muted overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500" 
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] uppercase opacity-70">
          <span>{t.total}: {total}</span>
          <span>{t.secure}: {foundCount}</span>
        </div>
      </div>
    );
  };

  const ItemRow = ({ item }: { item: InventoryItem }) => (
    <div 
      className={cn(
        "group flex items-center justify-between p-3 border-b border-border/50 transition-all hover:bg-accent/5",
        item.found && "bg-accent/5 opacity-60"
      )}
    >
      <div className="flex items-center gap-3">
        <button 
          onClick={() => toggleFound(item.id)}
          className="text-primary hover:scale-110 transition-transform"
        >
          {item.found ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
        </button>
        <span className={cn(
          "font-body text-sm tracking-tight",
          item.found && "line-through italic"
        )}>
          {item.name}
        </span>
      </div>
      <button 
        onClick={() => deleteItem(item.id)}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <ProgressStats />

      <Card className="rounded-none tactical-border shadow-none bg-card">
        <CardHeader className="p-4 border-b border-border">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2 h-4 bg-primary inline-block" />
              {t.inventory}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 bg-background/50 flex gap-2">
            <Input 
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addItem()}
              placeholder={t.placeholder}
              className="rounded-none border-primary/20 bg-background font-body"
            />
            <Button 
              onClick={() => addItem()}
              className="rounded-none glitch-hover h-10 px-3"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          <Tabs defaultValue="food" onValueChange={(v) => setActiveCategory(v as ItemCategory)}>
            <TabsList className="w-full flex rounded-none h-12 bg-muted p-0">
              <TabsTrigger 
                value="food" 
                className="flex-1 rounded-none data-[state=active]:bg-card data-[state=active]:border-t-2 data-[state=active]:border-primary"
              >
                <Apple className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{t.categories.food}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tools" 
                className="flex-1 rounded-none data-[state=active]:bg-card data-[state=active]:border-t-2 data-[state=active]:border-primary"
              >
                <Hammer className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{t.categories.tools}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="medicine" 
                className="flex-1 rounded-none data-[state=active]:bg-card data-[state=active]:border-t-2 data-[state=active]:border-primary"
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{t.categories.medicine}</span>
              </TabsTrigger>
            </TabsList>

            <div className="min-h-[300px] max-h-[500px] overflow-y-auto">
              {(['food', 'tools', 'medicine'] as const).map(cat => (
                <TabsContent key={cat} value={cat} className="m-0">
                  {filteredItems(cat).length === 0 ? (
                    <div className="p-12 text-center text-sm opacity-40 italic">
                      {t.empty}
                    </div>
                  ) : (
                    filteredItems(cat).map(item => (
                      <ItemRow key={item.id} item={item} />
                    ))
                  )}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
