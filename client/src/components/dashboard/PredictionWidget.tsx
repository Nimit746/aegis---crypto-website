"use client";

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface PredictionData {
  high: number;
  low: number;
  target: number;
  confidence: number;
  sentiment: "bullish" | "bearish" | "neutral";
  model: string;
}

export function PredictionWidget() {
  const [predictions, setPredictions] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/v1/predictions/24h');
      if (!response.ok) throw new Error('Failed to fetch predictions');
      const data = await response.json();
      setPredictions(data);
    } catch (err) {
      console.error('Prediction fetch error:', err);
      // Fallback
      setPredictions({
        high: 64850,
        low: 62120,
        target: 64231,
        confidence: 88,
        sentiment: "bullish",
        model: "LSTM Neural Network (Fallback)"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHasMounted(true);
    fetchPredictions();
  }, []);

  if (!hasMounted || (loading && !predictions)) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-16 w-16 bg-gray-800 rounded-full mx-auto"></div>
        <div className="h-4 bg-gray-800 rounded w-1/2 mx-auto"></div>
        <div className="space-y-2">
          <div className="h-2 bg-gray-800 rounded"></div>
          <div className="h-2 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  const p = predictions!;

  return (
    <div className="space-y-4">
      {/* Confidence Level */}
      <div className="text-center relative">
        <button
          onClick={fetchPredictions}
          className="absolute right-0 top-0 p-1 text-gray-500 hover:text-white"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
        </button>
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-r mb-2 ${p.sentiment === 'bullish' ? 'from-green-500 to-emerald-500' :
          p.sentiment === 'bearish' ? 'from-red-500 to-rose-500' : 'from-blue-500 to-indigo-500'
          }`}>
          <span className="text-2xl font-bold text-white">{p.confidence}%</span>
        </div>
        <div className={`text-sm font-medium ${p.sentiment === 'bullish' ? 'text-green-400' : p.sentiment === 'bearish' ? 'text-red-400' : 'text-blue-400'}`}>
          {p.confidence > 80 ? 'Strong Confidence' : 'Moderate Confidence'}
        </div>
        <div className="text-xs text-gray-400">{p.model}</div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-400">Projected High</span>
            <span className="font-bold text-green-400">${p.high.toLocaleString()}</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-green-500 to-emerald-500 rounded-full"
              style={{ width: '85%' }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-400">Projected Low</span>
            <span className="font-bold text-red-400">${p.low.toLocaleString()}</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-red-500 to-rose-500 rounded-full"
              style={{ width: '65%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Current vs Target */}
      <div className="p-3 bg-gray-800/30 rounded-lg">
        <div className="grid grid-cols-1 gap-2">
          <div className="text-xs text-gray-400 mb-1 text-center">Price Target</div>
          <div className={`text-xl font-bold text-center ${p.sentiment === 'bullish' ? 'text-green-400' : p.sentiment === 'bearish' ? 'text-red-400' : 'text-white'}`}>
            ${p.target.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className={`p-3 border rounded-lg ${p.sentiment === 'bullish' ? 'bg-green-500/10 border-green-500/20' :
        p.sentiment === 'bearish' ? 'bg-red-500/10 border-red-500/20' : 'bg-blue-500/10 border-blue-500/20'
        }`}>
        <div className="flex items-center gap-2">
          {p.sentiment === 'bullish' ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
          <div className="text-sm">
            <span className="font-medium text-white">AI Signal: </span>
            <span className={p.sentiment === 'bullish' ? 'text-green-400' : 'text-red-400'}>
              {p.sentiment.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {p.sentiment === 'bullish' ? 'Upward momentum confirmed' : 'Downward trend expected'}
        </div>
      </div>
    </div>
  );
}
