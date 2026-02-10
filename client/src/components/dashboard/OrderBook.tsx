"use client";

import { useState, useEffect } from 'react';
import { Zap, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function OrderBook() {
  const [bids, setBids] = useState([
    { price: 64245.58, amount: 1.240, total: 79.6 },
    { price: 64241.09, amount: 0.852, total: 54.7 },
    { price: 64238.20, amount: 3.410, total: 219.8 },
    { price: 64235.15, amount: 2.150, total: 138.2 },
    { price: 64232.80, amount: 1.850, total: 118.9 },
    { price: 64230.45, amount: 0.980, total: 62.9 },
    { price: 64228.10, amount: 2.350, total: 150.9 },
    { price: 64225.75, amount: 1.640, total: 105.3 }
  ]);

  const [asks, setAsks] = useState([
    { price: 64231.58, amount: 0.958, total: 61.9 },
    { price: 64238.09, amount: 4.129, total: 264.6 },
    { price: 64239.10, amount: 2.684, total: 139.7 },
    { price: 64241.50, amount: 1.520, total: 97.5 },
    { price: 64243.75, amount: 3.210, total: 206.4 },
    { price: 64246.20, amount: 1.850, total: 119.0 },
    { price: 64248.90, amount: 2.140, total: 137.5 },
    { price: 64251.60, amount: 1.320, total: 84.8 }
  ]);

  return (
    <div>
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-3 bg-gray-800/30 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">Market Price</div>
          <div className="text-xl font-bold text-white">$64,231.50</div>
          <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" />
            +2.41% today
          </div>
        </div>
        
        <div className="p-3 bg-gray-800/30 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">Order Book Depth</div>
          <div className="text-xl font-bold text-white">$1.26B</div>
          <div className="text-xs text-gray-400 mt-1">Total liquidity</div>
        </div>
        
        <div className="p-3 bg-gray-800/30 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">Spread</div>
          <div className="text-xl font-bold text-yellow-400">2.16</div>
          <div className="text-xs text-gray-400 mt-1">0.003% of price</div>
        </div>
      </div>

      {/* Order Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bids Side */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <h3 className="font-bold text-green-400">Buy Orders (Bids)</h3>
            </div>
            <div className="text-xs text-gray-400">Cumulative: $892.4M</div>
          </div>
          
          <div className="space-y-2">
            {bids.map((bid, i) => (
              <div 
                key={i} 
                className="grid grid-cols-4 p-3 bg-green-500/5 hover:bg-green-500/10 rounded-lg transition-colors group cursor-pointer"
              >
                <div className="text-green-400 font-medium text-sm">
                  ${bid.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-gray-300 text-sm text-center">{bid.amount.toFixed(3)} BTC</div>
                <div className="text-gray-400 text-sm text-center">${bid.total}M</div>
                <div className="text-right">
                  <div 
                    className="h-2 bg-green-500/30 rounded-full"
                    style={{ width: `${(i + 1) * 12}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Asks Side */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <h3 className="font-bold text-red-400">Sell Orders (Asks)</h3>
            </div>
            <div className="text-xs text-gray-400">Cumulative: $974.8M</div>
          </div>
          
          <div className="space-y-2">
            {asks.map((ask, i) => (
              <div 
                key={i} 
                className="grid grid-cols-4 p-3 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition-colors group cursor-pointer"
              >
                <div className="text-red-400 font-medium text-sm">
                  ${ask.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-gray-300 text-sm text-center">{ask.amount.toFixed(3)} BTC</div>
                <div className="text-gray-400 text-sm text-center">${ask.total}M</div>
                <div className="text-right">
                  <div 
                    className="h-2 bg-red-500/30 rounded-full"
                    style={{ width: `${(i + 1) * 12}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Book Summary */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-gray-400 mb-1">Best Bid</div>
            <div className="text-lg font-bold text-green-400">$64,245.58</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Best Ask</div>
            <div className="text-lg font-bold text-red-400">$64,231.58</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Buy/Sell Ratio</div>
            <div className="text-lg font-bold text-white">1.42:1</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Order Imbalance</div>
            <div className="text-lg font-bold text-green-400">+24% Buy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
