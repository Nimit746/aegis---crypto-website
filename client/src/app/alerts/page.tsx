"use client";

import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, XCircle, Filter, Clock } from 'lucide-react';

export default function AlertsPage() {
  const [alerts] = useState([
    { id: 1, type: 'warning', title: 'BTC Price Drop Alert', message: 'Bitcoin dropped below $63,000', time: '10 min ago', read: false },
    { id: 2, type: 'success', title: 'ETH Target Reached', message: 'Ethereum reached target price of $3,600', time: '1 hour ago', read: true },
    { id: 3, type: 'warning', title: 'Large ETH Transfer', message: '2,500 ETH transferred to exchange', time: '2 hours ago', read: false },
    { id: 4, type: 'info', title: 'Market Sentiment Shift', message: 'Social media sentiment turning positive', time: '3 hours ago', read: true },
    { id: 5, type: 'error', title: 'Network Congestion', message: 'Solana network experiencing high traffic', time: '5 hours ago', read: true },
  ]);

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bell className="w-10 h-10 text-green-400" />
              <div>
                <h1 className="text-2xl font-bold text-green-400">Alerts</h1>
                <p className="text-gray-400">Real-time notifications and market alerts</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <div className="relative">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">{unreadCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Alerts</p>
                <p className="text-2xl font-bold text-green-400">{alerts.length}</p>
              </div>
              <Bell className="w-8 h-8 text-yellow-400/50" />
            </div>
            <div className="mt-2 text-xs text-gray-400">Today: {alerts.length}</div>
          </div>
          
          <div className="glass-panel p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Unread</p>
                <p className="text-2xl font-bold text-green-400">{unreadCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400/50" />
            </div>
            <div className="mt-2 text-xs text-gray-400">Require attention</div>
          </div>
          
          <div className="glass-panel p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">High Priority</p>
                <p className="text-2xl font-bold text-green-400">3</p>
              </div>
              <XCircle className="w-8 h-8 text-orange-400/50" />
            </div>
            <div className="mt-2 text-xs text-gray-400">Critical alerts</div>
          </div>
          
          <div className="glass-panel p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Resolved</p>
                <p className="text-2xl font-bold text-green-400">{alerts.filter(a => a.read).length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400/50" />
            </div>
            <div className="mt-2 text-xs text-gray-400">Completed alerts</div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Recent Alerts</h2>
            <span className="text-sm text-gray-400">{unreadCount} unread</span>
          </div>
          
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border ${
                  alert.read 
                    ? 'bg-gray-800/30 border-gray-800' 
                    : 'bg-blue-900/20 border-blue-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      alert.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                      alert.type === 'success' ? 'bg-green-500/20 text-green-400' :
                      alert.type === 'error' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {alert.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                      {alert.type === 'success' && <CheckCircle className="w-5 h-5" />}
                      {alert.type === 'error' && <XCircle className="w-5 h-5" />}
                      {alert.type === 'info' && <Bell className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold">{alert.title}</h3>
                      <p className="text-gray-300 mt-1">{alert.message}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Clock className="w-3 h-3" />
                          {alert.time}
                        </div>
                        {!alert.read && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className={`px-3 py-1 rounded text-sm ${
                    alert.read 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}>
                    {alert.read ? 'Mark Unread' : 'Mark Read'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}




