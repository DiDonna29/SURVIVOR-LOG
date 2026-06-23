
"use client";

import React, { useState } from 'react';
import { useLanguage } from './language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Radar, Loader2, MapPin, AlertTriangle, PlusCircle } from 'lucide-react';
import { aiScavengeListGenerator, AiScavengeListGeneratorOutput } from '@/ai/flows/ai-scavenge-list-generator';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export function ScoutTool() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [zone, setZone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiScavengeListGeneratorOutput | null>(null);

  const handleScout = async () => {
    if (!zone.trim()) return;
    setLoading(true);
    try {
      const data = await aiScavengeListGenerator({ urbanZone: zone });
      setResult(data);
    } catch (error) {
      toast({
        title: "Comms Error",
        description: "Scout signal lost. Check connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-none tactical-border shadow-none bg-card/50 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 animate-pulse" />
      <CardHeader className="p-4 border-b border-border bg-card">
        <CardTitle className="text-lg flex items-center gap-2">
          <Radar className="w-5 h-5 text-primary" />
          {t.scout}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              placeholder={t.scoutInput}
              className="pl-9 rounded-none bg-background/50 border-primary/20 font-body text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleScout()}
            />
          </div>
          <Button 
            onClick={handleScout} 
            disabled={loading || !zone}
            className="rounded-none whitespace-nowrap bg-primary hover:bg-primary/90"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t.scoutBtn}
          </Button>
        </div>

        {result && (
          <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-2">
              <div className="text-xs font-headline text-primary uppercase flex items-center gap-2">
                <Radar className="w-3 h-3" />
                Sighted Loot
              </div>
              <div className="grid grid-cols-1 gap-2">
                {result.scavengeList.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-2 bg-background/40 border border-border/50 text-sm font-body"
                  >
                    <span>{item}</span>
                    <Badge variant="outline" className="text-[10px] uppercase font-code py-0 px-1">
                      Intel
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {result.notes && (
              <div className="p-3 bg-primary/5 border-l-2 border-primary text-xs font-body italic flex gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-primary" />
                <div>
                  <span className="font-headline not-italic block mb-1">{t.notes}</span>
                  {result.notes}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
