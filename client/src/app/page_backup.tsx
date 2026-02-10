import { MainChart } from "@/components/dashboard/MainChart";
import { PredictionWidget } from "@/components/dashboard/PredictionWidget";
import { ExplainableAI } from "@/components/dashboard/ExplainableAI";
import { OrderBook } from "@/components/dashboard/OrderBook";
import AIInsights from "@/components/dashboard/AIInsights";
import { BarChart3, Cpu, Brain, Activity, TrendingUp, Zap, Users, Twitter, Clock, MessageSquare } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-400 mb-2">Dashboard</h1>
          <div className="flex items-center justify-between">
            <div className="text-gray-400">
              Real-time cryptocurrency market statistics
            </div>
            <div className="text-sm text-gray-400">
              Last updated: 04:02:09 PM
            </div>
          </div>
        </div>

        {/* Top Row: Market Overview + User Profile Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Market Overview - Takes 2/3 space */}
          <div className="lg:col-span-2 glass-panel p-6">
            <h2 className="text-lg font-bold text-green-400 mb-4">Market Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                <p className="text-gray-400 text-sm">BTC Dominance</p>
                <p className="text-3xl font-bold mt-2">45.2%</p>
                <p className="text-xs text-green-400 mt-1">Stable</p>
              </div>
              <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                <p className="text-gray-400 text-sm">Fear & Greed</p>
                <p className="text-3xl font-bold mt-2">68/100</p>
                <p className="text-xs text-yellow-400 mt-1">Greed</p>
              </div>
              <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                <p className="text-gray-400 text-sm">Market Cap</p>
                <p className="text-3xl font-bold mt-2">$2.80T</p>
                <p className="text-xs text-green-400 mt-1">+2.1%</p>
              </div>
              <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                <p className="text-gray-400 text-sm">BTC Price</p>
                <p className="text-3xl font-bold mt-2">$64,258</p>
                <p className="text-xs text-green-400 mt-1">+2.41%</p>
              </div>
            </div>
          </div>

          {/* User Profile - Takes 1/3 space */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-green-400">User Profile</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Portfolio Value</p>
                  <p className="text-2xl font-bold">$248,750</p>
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">+12.4%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Today's P&L</p>
                  <p className="text-xl font-bold text-green-400">+$3,248</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Win Rate</p>
                  <p className="text-xl font-bold text-green-400">78%</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">AI Confidence Score</span>
                  <span className="text-green-400 font-bold">94/100</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chart & Explainable AI */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Chart - Keep exactly as is */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-green-400">BTC/USDT</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 bg-gray-800 rounded text-sm">BINANCE</span>
                    <span className="text-2xl font-bold">$64,258.12</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                      +2.41% (+$1,545.77)
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">1H</button>
                  <button className="px-3 py-1 bg-green-500 rounded-lg text-sm">24H</button>
                  <button className="px-3 py-1 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">7D</button>
                  <button className="px-3 py-1 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">1M</button>
                </div>
              </div>
              <div className="h-[350px]">
                <MainChart />
              </div>
            </div>

            {/* Live Order Book - Full width below the chart */}
            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h2 className="text-xl font-bold text-yellow-400">Live Order Book</h2>
              </div>
              
              <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800">
                {/* Order Book Header */}
                <div className="grid grid-cols-3 bg-gray-900 p-4 border-b border-gray-800">
                  <div className="text-gray-400 text-sm font-medium">PRICE (USDT)</div>
                  <div className="text-gray-400 text-sm font-medium">AMOUNT (BTC)</div>
                  <div className="text-gray-400 text-sm font-medium">TOTAL</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Bids - Left Side */}
                  <div className="p-4 border-r border-gray-800">
                    <div className="text-green-400 text-sm font-medium mb-3">BIDS</div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 p-3 bg-green-500/5 hover:bg-green-500/10 rounded-lg transition">
                        <div className="text-green-400 font-medium">64,245.58</div>
                        <div className="text-gray-300">1.240 BTC</div>
                        <div className="text-gray-400">79.6M</div>
                      </div>
                      <div className="grid grid-cols-3 p-3 bg-green-500/5 hover:bg-green-500/10 rounded-lg transition">
                        <div className="text-green-400 font-medium">64,241.09</div>
                        <div className="text-gray-300">0.852 BTC</div>
                        <div className="text-gray-400">54.7M</div>
                      </div>
                      <div className="grid grid-cols-3 p-3 bg-green-500/5 hover:bg-green-500/10 rounded-lg transition">
                        <div className="text-green-400 font-medium">64,238.20</div>
                        <div className="text-gray-300">3.410 BTC</div>
                        <div className="text-gray-400">219.8M</div>
                      </div>
                      <div className="grid grid-cols-3 p-3 bg-green-500/5 hover:bg-green-500/10 rounded-lg transition">
                        <div className="text-green-400 font-medium">64,235.15</div>
                        <div className="text-gray-300">2.150 BTC</div>
                        <div className="text-gray-400">138.2M</div>
                      </div>
                      <div className="grid grid-cols-3 p-3 bg-green-500/5 hover:bg-green-500/10 rounded-lg transition">
                        <div className="text-green-400 font-medium">64,232.80</div>
                        <div className="text-gray-300">1.850 BTC</div>
                        <div className="text-gray-400">118.9M</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Asks - Right Side */}
                  <div className="p-4">
                    <div className="text-red-400 text-sm font-medium mb-3">ASKS</div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 p-3 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition">
                        <div className="text-red-400 font-medium">64,231.58</div>
                        <div className="text-gray-300">0.958 BTC</div>
                        <div className="text-gray-400">61.9M</div>
                      </div>
                      <div className="grid grid-cols-3 p-3 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition">
                        <div className="text-red-400 font-medium">64,238.09</div>
                        <div className="text-gray-300">4.129 BTC</div>
                        <div className="text-gray-400">264.6M</div>
                      </div>
                      <div className="grid grid-cols-3 p-3 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition">
                        <div className="text-red-400 font-medium">64,239.10</div>
                        <div className="text-gray-300">2.684 BTC</div>
                        <div className="text-gray-400">139.7M</div>
                      </div>
                      <div className="grid grid-cols-3 p-3 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition">
                        <div className="text-red-400 font-medium">64,241.50</div>
                        <div className="text-gray-300">1.520 BTC</div>
                        <div className="text-gray-400">97.5M</div>
                      </div>
                      <div className="grid grid-cols-3 p-3 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition">
                        <div className="text-red-400 font-medium">64,243.75</div>
                        <div className="text-gray-300">3.210 BTC</div>
                        <div className="text-gray-400">206.4M</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Spread */}
                <div className="p-4 bg-gray-900 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-400 text-sm">SPREAD: </span>
                      <span className="text-yellow-400 font-bold">2.16 (0.003%)</span>
                    </div>
                    <div className="text-gray-400 text-sm">Total Depth: 18.6M USDT</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explainable AI - Below Order Book */}
            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 mb-6">
                <Cpu className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-purple-400">Explainable AI: Predictive Drivers</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Social Sentiment */}
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Twitter className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold">Social Sentiment</h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">TRENDING</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    Increased Twitter mentions and positive weighted sentiment from crypto news outlets.
                  </p>
                  <div className="mt-3 flex items-center text-xs text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    Updated 2 min ago
                  </div>
                </div>

                {/* Technical RSI */}
                <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Activity className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold">Technical (RSI)</h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs">NEUTRAL</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    RSI sitting at 68.6. Neither overbought nor oversold on the 4H timeframe.
                  </p>
                  <div className="mt-3 text-xs text-amber-400 font-medium">
                    RSI: 68.6
                  </div>
                </div>

                {/* Volume Dynamics */}
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-bold">Volume Dynamics</h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">BULLISH</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    Large volume spikes on buy-side at $63,966 support level detected in last hour.
                  </p>
                  <div className="mt-3 text-xs text-green-400 font-medium">
                    Volume: +247%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Insights */}
          <div className="space-y-6">
            {/* LSTM 24H Prediction Range */}
            <div className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-purple-400" />
                <div>
                  <h2 className="text-xl font-bold text-purple-400">LSTM 24H Prediction</h2>
                  <p className="text-sm text-gray-400">AI-powered price range</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-center mb-4">
                  <p className="text-gray-400 text-sm">Prediction Confidence</p>
                  <p className="text-4xl font-bold text-green-400">88%</p>
                  <p className="text-sm text-green-400 font-medium">STRONG/BULLISH</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">24H HIGH</span>
                      <span className="text-green-400 font-bold">$64,850</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">24H LOW</span>
                      <span className="text-red-400 font-bold">$62,120</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Current Price</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold">$64,231.50</p>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">+2.41%</span>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-green-400">AI Insights</h2>
                <Activity className="w-5 h-5 text-green-400" />
              </div>
              <AIInsights />
            </div>

            {/* Live Feed */}
            <div className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                <div>
                  <h2 className="text-xl font-bold text-blue-400">Live Feed</h2>
                  <p className="text-sm text-gray-400">Real-time market updates</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Twitter className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Elon Musk tweets about Bitcoin</p>
                      <p className="text-xs text-gray-400">2 minutes ago</p>
                    </div>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">BULLISH</span>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">AI detects whale accumulation</p>
                      <p className="text-xs text-gray-400">5 minutes ago</p>
                    </div>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">BULLISH</span>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <Activity className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Large sell order detected</p>
                      <p className="text-xs text-gray-400">8 minutes ago</p>
                    </div>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">BEARISH</span>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">BTC breaks resistance level</p>
                      <p className="text-xs text-gray-400">12 minutes ago</p>
                    </div>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">BULLISH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}