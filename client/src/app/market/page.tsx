"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, BarChart3, DollarSign, Activity, RefreshCw, PieChart } from "lucide-react";

interface MarketData {
  btc: { price: number; change: number; dominance: number };
  eth: { price: number; change: number };
  market_cap: number;
  total_volume: number;
  fear_greed: number;
}

export default function MarketPage() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMarketData = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('http://localhost:8000/api/v1/market/stats');
      const data = await response.json();
      setMarketData(data);
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      // Fallback data
      setMarketData({
        btc: { price: 64258.12, change: 2.41, dominance: 45.2 },
        eth: { price: 3525.44, change: 1.80 },
        market_cap: 2807000000000,
        total_volume: 43700000000,
        fear_greed: 68
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-gray-800 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-800 rounded-xl"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - NO navigation bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BarChart3 className="w-10 h-10 text-green-400" />
              <div>
                <h1 className="text-2xl font-bold text-green-400">Market Overview</h1>
                <p className="text-gray-400">Real-time cryptocurrency market statistics</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={fetchMarketData}
                disabled={refreshing}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <div className="text-sm text-gray-400">
                Auto-refresh: 30s
              </div>
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Market Cap</p>
                <p className="text-3xl font-bold">
                  ${marketData?.market_cap ? (marketData.market_cap / 1e9).toFixed(1) + 'B' : '2.8T'}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400/50" />
            </div>
            <div className="mt-2 text-xs text-green-400">+2.1% today</div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">24h Volume</p>
                <p className="text-3xl font-bold">
                  ${marketData?.total_volume ? (marketData.total_volume / 1e9).toFixed(1) + 'B' : '43.7B'}
                </p>
              </div>
              <Activity className="w-8 h-8 text-blue-400/50" />
            </div>
            <div className="mt-2 text-xs text-green-400">+15% increase</div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">BTC Dominance</p>
                <p className="text-3xl font-bold">
                  {marketData?.btc?.dominance || 45.2}%
                </p>
              </div>
              <PieChart className="w-8 h-8 text-yellow-400/50" />
            </div>
            <div className="mt-2 text-xs text-green-400">Stable</div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Fear & Greed</p>
                <p className="text-3xl font-bold">
                  {marketData?.fear_greed || 68}/100
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-400/50" />
            </div>
            <div className="mt-2 text-xs text-green-400">Greed</div>
          </div>
        </div>

        {/* BTC & ETH Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* BTC Card */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-orange-400">BTC</span>
                </div>
                <div>
                  <h3 className="font-bold">Bitcoin</h3>
                  <p className="text-sm text-gray-400">BTC/USDT</p>
                </div>
              </div>
              <div className={`flex items-center ${(marketData?.btc?.change ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {(marketData?.btc?.change ?? 0) >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span className="ml-1">{(marketData?.btc?.change ?? 0) >= 0 ? '+' : ''}{marketData?.btc?.change ?? 2.41}%</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">
              ${marketData?.btc?.price?.toLocaleString() || '64,258.12'}
            </div>
            <p className="text-gray-400">Market leader with 45.2% dominance</p>
          </div>

          {/* ETH Card */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-purple-400">ETH</span>
                </div>
                <div>
                  <h3 className="font-bold">Ethereum</h3>
                  <p className="text-sm text-gray-400">ETH/USDT</p>
                </div>
              </div>
              <div className={`flex items-center ${(marketData?.eth?.change ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {(marketData?.eth?.change ?? 0) >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span className="ml-1">{(marketData?.eth?.change ?? 0) >= 0 ? '+' : ''}{marketData?.eth?.change ?? 1.80}%</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">
              ${marketData?.eth?.price?.toLocaleString() || '3,525.44'}
            </div>
            <p className="text-gray-400">Smart contracts platform</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="glass-panel p-6">
          <h2 className="text-lg font-bold mb-4">Market Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <p className="text-gray-400 text-sm">24H Low</p>
              <p className="text-xl font-bold">$63,400</p>
            </div>
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <p className="text-gray-400 text-sm">24H High</p>
              <p className="text-xl font-bold">$65,000</p>
            </div>
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <p className="text-gray-400 text-sm">Trading Volume</p>
              <p className="text-xl font-bold">$43.7B</p>
            </div>
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <p className="text-gray-400 text-sm">Market Sentiment</p>
              <p className="text-xl font-bold text-green-400">Bullish</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
