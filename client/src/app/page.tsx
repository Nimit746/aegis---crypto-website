"use client";

import { useState, useEffect } from 'react';
import { MainChart } from "@/components/dashboard/MainChart";
import { PredictionWidget } from "@/components/dashboard/PredictionWidget";
import { ExplainableAI } from "@/components/dashboard/ExplainableAI";
import { OrderBook } from "@/components/dashboard/OrderBook";
import AIInsights from "@/components/dashboard/AIInsights";
import {
  Cpu, Brain, Activity, TrendingUp, Zap, Users, Twitter,
  Clock, MessageSquare, ArrowUpRight, Shield, Database,
  TrendingDown, DollarSign, AlertCircle, RefreshCw
} from "lucide-react";

const API_BASE = 'http://localhost:8000/api/v1';

interface MarketData {
  btc?: {
    price: number;
    change_24h: number;
    high: number;
    low: number;
    volume: number;
    source: string;
  };
  eth?: {
    price: number;
    change_24h: number;
    high: number;
    low: number;
    volume: number;
    source: string;
  };
  total_market_cap?: number;
  btc_dominance?: number;
  fear_greed?: {
    index: number;
    status: string;
    source: string;
  };
  timestamp?: string;
  source?: string;
  api_status?: string;
}

export default function Dashboard() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [error, setError] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    fetchMarketData();

    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('🔄 Fetching REAL market data...');
      const response = await fetch(`${API_BASE}/market/overview`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: MarketData = await response.json();
      setMarketData(data);

      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));

      console.log('✅ Data received:', {
        btcPrice: data.btc?.price || 0,
        source: data.source || 'unknown',
        apiStatus: data.api_status || 'unknown'
      });

    } catch (err) {
      console.error('❌ Failed to fetch market data:', err);
      setError(err instanceof Error ? err.message : 'Connection failed');

      // Show error but keep UI functional
      const fallbackData: MarketData = {
        btc: { price: 64258.12, change_24h: 2.41, high: 65000, low: 63500, volume: 32800000000, source: 'fallback' },
        eth: { price: 3520.75, change_24h: 1.85, high: 3600, low: 3450, volume: 14500000000, source: 'fallback' },
        total_market_cap: 2800000000000,
        btc_dominance: 45.2,
        fear_greed: { index: 68, status: 'Greed', source: 'fallback' },
        timestamp: new Date().toISOString(),
        source: 'fallback',
        api_status: 'Using fallback data'
      };
      setMarketData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  // Format numbers
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1000 ? 2 : 0,
      maximumFractionDigits: price < 1000 ? 2 : 0
    }).format(price);
  };

  const formatCompact = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    return `$${num.toLocaleString()}`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-linear-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Aegis Crypto Intelligence</h1>
                  <p className="text-gray-400">&quot;The most accurate AI predictions I&apos;ve seen in the crypto space.&quot;</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${marketData?.source === 'real' ? 'bg-green-400 animate-pulse' : 'bg-amber-400'}`}></div>
                  <span className={`text-sm ${marketData?.source === 'real' ? 'text-green-400' : 'text-amber-400'}`}>
                    {marketData?.source === 'real' ? 'Live Data' : 'Fallback Data'}
                  </span>
                </div>
                <button
                  onClick={fetchMarketData}
                  disabled={loading}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Updated: {hasMounted ? lastUpdated : '--:--:--'}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-400">{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Market Overview Cards - Now with REAL data */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {/* BTC Card */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-xs px-2 py-1 bg-gray-800 rounded">BTC</span>
            </div>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-7 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-16"></div>
              </div>
            ) : (
              <>
                <div className="text-xl font-bold text-white">
                  {formatPrice(marketData?.btc?.price || 0)}
                </div>
                <div className={`text-xs mt-1 ${getChangeColor(marketData?.btc?.change_24h || 0)}`}>
                  {marketData?.btc?.change_24h !== undefined ? (
                    <>
                      {marketData.btc.change_24h >= 0 ? '+' : ''}
                      {marketData.btc.change_24h.toFixed(2)}%
                    </>
                  ) : '0.00%'}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {marketData?.btc?.source || 'Loading...'}
                </div>
              </>
            )}
          </div>

          {/* Market Cap Card */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Database className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-xs px-2 py-1 bg-gray-800 rounded">Market</span>
            </div>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-7 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-16"></div>
              </div>
            ) : (
              <>
                <div className="text-xl font-bold text-white">
                  {formatCompact(marketData?.total_market_cap || 0)}
                </div>
                <div className="text-xs text-gray-400 mt-1">Total Cap</div>
                <div className="text-xs text-gray-500 mt-1">
                  BTC Dominance: {marketData?.btc_dominance || '0'}%
                </div>
              </>
            )}
          </div>

          {/* Fear & Greed Card */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Activity className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-xs px-2 py-1 bg-gray-800 rounded">Sentiment</span>
            </div>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-7 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-16"></div>
              </div>
            ) : (
              <>
                <div className="text-xl font-bold text-white">
                  {marketData?.fear_greed?.index ? `${marketData.fear_greed.index}/100` : '0/100'}
                </div>
                <div className="text-xs text-amber-400 mt-1">
                  {marketData?.fear_greed?.status || 'Loading'}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {marketData?.fear_greed?.source || 'Loading...'}
                </div>
              </>
            )}
          </div>

          {/* ETH Card */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Brain className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-xs px-2 py-1 bg-gray-800 rounded">ETH</span>
            </div>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-7 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-16"></div>
              </div>
            ) : (
              <>
                <div className="text-xl font-bold text-white">
                  {formatPrice(marketData?.eth?.price || 0)}
                </div>
                <div className={`text-xs mt-1 ${getChangeColor(marketData?.eth?.change_24h || 0)}`}>
                  {marketData?.eth?.change_24h !== undefined ? (
                    <>
                      {marketData.eth.change_24h >= 0 ? '+' : ''}
                      {marketData.eth.change_24h.toFixed(2)}%
                    </>
                  ) : '0.00%'}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {marketData?.eth?.source || 'Loading...'}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Chart - Now shows REAL data */}
            <div className="glass-card p-6">
              <MainChart />
            </div>

            {/* Live Order Book */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Live Order Book</h2>
                  <p className="text-sm text-gray-400">BTC/USDT • Binance</p>
                </div>
              </div>
              <OrderBook />
            </div>

            {/* Explainable AI */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Cpu className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Explainable AI</h2>
                  <p className="text-sm text-gray-400">Market drivers & analysis</p>
                </div>
              </div>
              <ExplainableAI />
            </div>
          </div>

          {/* Right Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* User Profile */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-white">Alex Rivera</h2>
                  <p className="text-xs text-gray-400">Pro Account</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Portfolio Value</div>
                  <div className="text-2xl font-bold text-white">$248,750</div>
                  <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    +12.4% today
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Today&apos;s P&L</div>
                    <div className="text-lg font-bold text-green-400">+$3,248</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Win Rate</div>
                    <div className="text-lg font-bold text-green-400">78%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Prediction */}
            <div className="glass-card p-5">
              <PredictionWidget />
            </div>

            {/* AI Trading Insights */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Brain className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h2 className="font-bold text-white">AI Trading Insights</h2>
                  <p className="text-xs text-gray-400">ML Recommendations</p>
                </div>
              </div>
              <AIInsights />
            </div>

            {/* Live Feed */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="font-bold text-white">Market Signals</h2>
                  <p className="text-xs text-gray-400">Real-time alerts</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Breakout Confirmed</p>
                      <p className="text-xs text-gray-400 mt-1">2 min ago</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">BUY</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <Twitter className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Sentiment Spike</p>
                      <p className="text-xs text-gray-400 mt-1">5 min ago</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">NEUTRAL</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Sell Wall Detected</p>
                      <p className="text-xs text-gray-400 mt-1">8 min ago</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">SELL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 mb-12">
          <div className="text-center text-sm text-gray-500">
            <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 mb-2">
              <span>Real-time data from Binance API</span>
              <span className="hidden md:block">•</span>
              <span>Market cap & dominance from CoinGecko</span>
              <span className="hidden md:block">•</span>
              <span>Fear & Greed Index from Alternative.me</span>
            </div>
            <div className="text-xs text-gray-600">
              {marketData?.source === 'real' ? '✅ Live data connected' : '⚠️ Using fallback data'}
              {marketData?.api_status && ` • ${marketData.api_status}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
