"use client";

import React, { useState, useEffect } from 'react';
import { Brain, Clock, ChevronRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';

interface AIInsight {
  id: number;
  title: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  time: string;
  signal: 'bullish' | 'bearish' | 'neutral';
}

const AIInsights = () => {
  const [insights, setInsights] = useState<AIInsight[]>([
    { id: 1, title: 'BTC Accumulation', confidence: 87, impact: 'high', time: '10m ago', signal: 'bullish' },
    { id: 2, title: 'ETH Whale Alert', confidence: 72, impact: 'medium', time: '25m ago', signal: 'bearish' },
    { id: 3, title: 'Market Sentiment', confidence: 65, impact: 'medium', time: '1h ago', signal: 'bullish' },
  ]);

  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAIInsights = async () => {
    try {
      const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '');
      const response = await fetch(`${API_BASE}/ai/insights`);
      if (!response.ok) throw new Error('Failed to fetch AI insights');
      const data = await response.json();

      if (data.insights) {
        // Map backend insights to component format
        const mappedInsights: AIInsight[] = data.insights.map((item: { id: number, title: string, confidence: number, sentiment?: string }) => ({
          id: item.id,
          title: item.title,
          confidence: item.confidence,
          impact: item.confidence > 80 ? 'high' : 'medium',
          time: 'Just now',
          signal: item.sentiment || 'neutral'
        }));
        setInsights(mappedInsights);
      }
    } catch (err) {
      console.error('AIInsights fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHasMounted(true);
    fetchAIInsights();
    const interval = setInterval(fetchAIInsights, 60000); // Every minute
    return () => clearInterval(interval);
  }, []);

  if (!hasMounted || loading) return <div className="animate-pulse h-48 bg-gray-900/50 rounded-lg"></div>;

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
    }
  };

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'bullish': return <ArrowUpRight className="w-3 h-3 text-green-400" />;
      case 'bearish': return <ArrowDownRight className="w-3 h-3 text-red-400" />;
      default: return <ArrowUpRight className="w-3 h-3 text-yellow-400" />;
    }
  };

  return (
    <div className="glass-panel p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-semibold">AI Intelligence</h3>
            <p className="text-xs text-gray-400">Real-time insights</p>
          </div>
        </div>
        <Link href="/ai-insights" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center">
          View All
          <ChevronRight className="w-3 h-3 ml-1" />
        </Link>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.id} className="p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                {getSignalIcon(insight.signal)}
                <h4 className="font-medium text-sm">{insight.title}</h4>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${getImpactColor(insight.impact)}`}>
                {insight.impact}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="text-gray-300">
                Confidence: <span className="font-bold text-cyan-300">{insight.confidence}%</span>
              </div>
              <div className="text-gray-400 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {insight.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;
