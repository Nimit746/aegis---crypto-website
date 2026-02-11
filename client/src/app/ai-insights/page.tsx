"use client";

import React, { useState } from 'react';
import { Brain, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AIInsightsPage() {
  const [insights] = useState([
    {
      id: '1',
      title: 'BTC Accumulation Pattern Detected',
      description: 'Large wallets accumulating Bitcoin below $63,000. Pattern suggests strong support at $62,500.',
      confidence: 87,
      impact: 'high',
      timestamp: '10 minutes ago',
      signal: 'bullish',
      asset: 'BTC',
    },
    {
      id: '2',
      title: 'ETH Whale Movement Alert',
      description: '2,500 ETH transferred to exchange. Historical patterns suggest potential selling pressure.',
      confidence: 72,
      impact: 'medium',
      timestamp: '25 minutes ago',
      signal: 'bearish',
      asset: 'ETH',
    },
    {
      id: '3',
      title: 'Market Sentiment Turning Positive',
      description: 'Social media sentiment analysis shows 42% increase in positive mentions.',
      confidence: 65,
      impact: 'medium',
      timestamp: '1 hour ago',
      signal: 'bullish',
      asset: 'MARKET',
    },
  ]);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Brain className="w-10 h-10 text-green-400" />
              <div>
                <h1 className="text-2xl font-bold text-green-400">AI Insights</h1>
                <p className="text-gray-400">Real-time market intelligence powered by AI</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Last Updated</div>
              <div className="text-lg font-bold">04:02:09 PM</div>
            </div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight) => (
            <div key={insight.id} className="glass-panel p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`px-2 py-1 rounded text-xs ${insight.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                    insight.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                    {insight.impact.toUpperCase()} IMPACT
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    {insight.signal === 'bullish' ? (
                      <ArrowUpRight className="w-5 h-5 text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-400" />
                    )}
                    <h3 className="font-bold text-lg">{insight.title}</h3>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold text-green-400">{insight.confidence}%</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Confidence</div>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{insight.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="w-4 h-4" />
                  {insight.timestamp}
                </div>
                <div className="text-gray-300">
                  Asset: <span className="font-bold">{insight.asset}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
