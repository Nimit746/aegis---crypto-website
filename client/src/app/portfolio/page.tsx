"use client";

import React, { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, PieChart, DollarSign, RefreshCw } from 'lucide-react';

export default function PortfolioPage() {
  const [portfolio] = useState([
    { id: 1, asset: 'Bitcoin', symbol: 'BTC', amount: 0.5, value: 32129, change: 2.41, changeType: 'up' },
    { id: 2, asset: 'Ethereum', symbol: 'ETH', amount: 3.2, value: 11280, change: 1.85, changeType: 'up' },
    { id: 3, asset: 'Solana', symbol: 'SOL', amount: 25, value: 4050, change: -0.75, changeType: 'down' },
    { id: 4, asset: 'Cardano', symbol: 'ADA', amount: 1000, value: 680, change: 0.42, changeType: 'up' },
    { id: 5, asset: 'Polkadot', symbol: 'DOT', amount: 50, value: 350, change: -1.25, changeType: 'down' },
  ]);

  const totalValue = portfolio.reduce((sum, item) => sum + item.value, 0);
  const totalChange = 1.82; // Simulated total portfolio change

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Wallet className="w-10 h-10 text-green-400" />
              <div>
                <h1 className="text-2xl font-bold text-green-400">Portfolio</h1>
                <p className="text-gray-400">Track your cryptocurrency investments</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Value</p>
                <p className="text-3xl font-bold text-green-400">${totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400/50" />
            </div>
            <div className={`mt-2 text-sm ${totalChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalChange >= 0 ? '+' : ''}{totalChange}% today
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Best Performer</p>
                <p className="text-xl font-bold">Bitcoin (BTC)</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400/50" />
            </div>
            <div className="mt-2 text-sm text-green-400">+2.41% today</div>
          </div>
          
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Assets</p>
                <p className="text-3xl font-bold text-green-400">{portfolio.length}</p>
              </div>
              <PieChart className="w-8 h-8 text-blue-400/50" />
            </div>
            <div className="mt-2 text-sm text-gray-400">Diversified portfolio</div>
          </div>
        </div>

        {/* Portfolio Table */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Your Holdings</h2>
            <span className="text-sm text-gray-400">{portfolio.length} assets</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 text-gray-400 font-medium">Asset</th>
                  <th className="text-left py-3 text-gray-400 font-medium">Amount</th>
                  <th className="text-left py-3 text-gray-400 font-medium">Value</th>
                  <th className="text-left py-3 text-gray-400 font-medium">24H Change</th>
                  <th className="text-left py-3 text-gray-400 font-medium">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((item) => {
                  const allocation = ((item.value / totalValue) * 100).toFixed(1);
                  return (
                    <tr key={item.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                            <span className="font-bold">{item.symbol.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{item.asset}</p>
                            <p className="text-sm text-gray-400">{item.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="font-medium">{item.amount.toLocaleString()}</p>
                      </td>
                      <td className="py-4">
                        <p className="font-bold">${item.value.toLocaleString()}</p>
                      </td>
                      <td className="py-4">
                        <div className={`flex items-center ${item.changeType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {item.changeType === 'up' ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {item.changeType === 'up' ? '+' : ''}{item.change}%
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${allocation}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{allocation}%</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}




