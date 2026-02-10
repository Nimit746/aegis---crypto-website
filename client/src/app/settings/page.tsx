"use client";

import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, User, Globe, Moon, Save } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    whaleMovements: true,
    sentimentChanges: false,
    newsletter: false,
  });

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <SettingsIcon className="w-10 h-10 text-green-400" />
            <div>
              <h1 className="text-2xl font-bold text-green-400">Settings</h1>
              <p className="text-gray-400">Configure your Aegis platform preferences</p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-bold">Notification Settings</h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div>
                    <p className="font-medium">
                      {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                    </p>
                    <p className="text-sm text-gray-400">Receive alerts for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={value}
                      onChange={() => setNotifications(prev => ({...prev, [key]: !prev[key]}))}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-bold">Account Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div>
                  <p className="font-medium">Account Type</p>
                  <p className="text-sm text-gray-400">Pro Account</p>
                </div>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg">
                  Upgrade
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-400">alex.rivera@email.com</p>
                </div>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}