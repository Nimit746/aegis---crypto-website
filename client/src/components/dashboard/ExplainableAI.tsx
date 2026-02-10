"use client";

import { Twitter, Activity, BarChart3, Cpu, TrendingUp, AlertCircle } from 'lucide-react';

export function ExplainableAI() {
  const insights = [
    {
      id: 1,
      title: "Social Sentiment Analysis",
      description: "Positive sentiment increased by 28% across major crypto platforms in the last 2 hours.",
      icon: Twitter,
      color: "blue",
      confidence: 87,
      impact: "Bullish",
      details: [
        "Twitter mentions: +15%",
        "Reddit sentiment: +12%",
        "News coverage: Positive bias"
      ]
    },
    {
      id: 2,
      title: "Technical Indicators",
      description: "RSI at 68.5 (neutral), MACD showing bullish crossover, Bollinger Bands expanding.",
      icon: Activity,
      color: "amber",
      confidence: 75,
      impact: "Neutral",
      details: [
        "4H RSI: 68.5",
        "MACD: Bullish signal",
        "Support: $63,800",
        "Resistance: $64,500"
      ]
    },
    {
      id: 3,
      title: "Volume & Liquidity",
      description: "Unusual volume spike detected at $64,200 level with buy-side dominance of 65%.",
      icon: BarChart3,
      color: "green",
      confidence: 92,
      impact: "Bullish",
      details: [
        "Volume: +247% vs average",
        "Buy/Sell ratio: 65/35",
        "Liquidity depth: High"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      case "amber": return "bg-amber-500/10 border-amber-500/20 text-amber-400";
      case "green": return "bg-green-500/10 border-green-500/20 text-green-400";
      default: return "bg-gray-500/10 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Model Info */}
      <div className="p-4 bg-gray-800/30 rounded-lg">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-purple-400" />
          <div className="flex-1">
            <div className="text-sm font-medium text-white">GPT-4 + Technical Analysis Model</div>
            <div className="text-xs text-gray-400">Analyzing 15+ data sources in real-time</div>
          </div>
          <div className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
            Live Analysis
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          const colorClasses = getColorClasses(insight.color);
          
          return (
            <div 
              key={insight.id} 
              className="p-4 rounded-xl border bg-gradient-to-b from-gray-900/30 to-transparent"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-lg ${colorClasses}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm">{insight.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      insight.impact === "Bullish" ? "bg-green-500/20 text-green-400" :
                      insight.impact === "Bearish" ? "bg-red-500/20 text-red-400" :
                      "bg-amber-500/20 text-amber-400"
                    }`}>
                      {insight.impact}
                    </span>
                    <span className="text-xs text-gray-400">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                {insight.description}
              </p>

              {/* Details */}
              <div className="space-y-2">
                {insight.details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-400">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Confidence Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Model Confidence</span>
                  <span className="text-xs font-medium text-white">{insight.confidence}%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      insight.color === "blue" ? "bg-blue-500" :
                      insight.color === "amber" ? "bg-amber-500" :
                      "bg-green-500"
                    }`}
                    style={{ width: `${insight.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendation */}
      <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white text-sm mb-1">AI Recommendation</div>
            <p className="text-sm text-gray-300">
              Based on current analysis, the AI suggests a <span className="text-green-400 font-medium">BUY signal</span> with 
              target at $64,800 and stop-loss at $63,500. Expected volatility: Medium.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
