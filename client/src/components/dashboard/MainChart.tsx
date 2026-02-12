"use client";

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext,
  TooltipItem
} from 'chart.js';
import { Loader2, RefreshCw } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface ChartDataPoint {
  timestamp: string;
  price: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
}

interface ChartResponse {
  timeframe: string;
  symbol: string;
  current_price: number;
  price_change: number;
  price_change_percent: number;
  data: ChartDataPoint[];
  timestamp: string;
  resolution: string;
  source: string;
}

export function MainChart() {
  const [timeframe, setTimeframe] = useState('24H');
  const [chartData, setChartData] = useState<ChartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  const fetchChartData = async (tf: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/chart/btc-usdt?timeframe=${tf}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${tf} data`);
      }

      const data: ChartResponse = await response.json();
      setChartData(data);
      setLastUpdated(new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));

    } catch (err) {
      console.error('Chart error:', err);
      setError(err instanceof Error ? err.message : 'Connection error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHasMounted(true);
    fetchChartData(timeframe);

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchChartData(timeframe);
    }, 30000);

    return () => clearInterval(interval);
  }, [timeframe]);

  const timeframeButtons = [
    { label: '1H', value: '1H' },
    { label: '4H', value: '4H' },
    { label: '24H', value: '24H' },
    { label: '7D', value: '7D' },
    { label: '1M', value: '1M' }
  ];

  // Format numbers
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatChange = (change: number) => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  if ((loading && !chartData) || !hasMounted) {
    return (
      <div className="h-[350px] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-400 mb-2" />
        <p className="text-gray-400">Fetching real-time chart data...</p>
      </div>
    );
  }

  // Prepare chart configuration
  const chartConfig = chartData ? {
    labels: chartData.data.map((point, index) => {
      const date = new Date(point.timestamp);

      if (timeframe === '1H' || timeframe === '4H') {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (timeframe === '24H') {
        return index % 8 === 0 ? date.getHours() + ':00' : '';
      } else {
        return index % 7 === 0 ? date.toLocaleDateString([], { month: 'short', day: 'numeric' }) : '';
      }
    }),
    datasets: [
      {
        label: 'BTC Price',
        data: chartData.data.map(point => point.price),
        borderColor: chartData.price_change_percent >= 0 ? '#10b981' : '#ef4444',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return 'transparent';

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

          if (chartData.price_change_percent >= 0) {
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
            gradient.addColorStop(0.7, 'rgba(16, 185, 129, 0.1)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0.01)');
          } else {
            gradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
            gradient.addColorStop(0.7, 'rgba(239, 68, 68, 0.1)');
            gradient.addColorStop(1, 'rgba(239, 68, 68, 0.01)');
          }

          return gradient;
        },
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
        cubicInterpolationMode: 'monotone' as const,
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#9ca3af',
        bodyColor: '#f9fafb',
        borderColor: 'rgba(75, 85, 99, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            return `Price: ${formatPrice(context.parsed.y ?? 0)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(75, 85, 99, 0.2)' },
        ticks: { color: '#9ca3af', maxTicksLimit: 8 }
      },
      y: {
        position: 'right' as const,
        grid: { color: 'rgba(75, 85, 99, 0.2)' },
        ticks: {
          color: '#9ca3af',
          callback: (value: string | number) => {
            if (typeof value === 'number' && value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
            return `$${value}`;
          }
        }
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-green-400">BTC/USDT</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-1 bg-gray-800 rounded text-sm">BINANCE</span>
            <span className="text-2xl font-bold">
              {chartData ? formatPrice(chartData.current_price) : '$0'}
            </span>
            <span className={`px-2 py-1 rounded text-sm ${(chartData?.price_change_percent ?? 0) >= 0
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
              }`}>
              {chartData ? formatChange(chartData.price_change_percent) : '+0.00%'}
              {chartData?.price_change && ` (${formatPrice(chartData.price_change)})`}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
            <span>Source: {chartData?.source || 'Loading...'}</span>
            <span>•</span>
            <span>Updated: {lastUpdated}</span>
            <button
              onClick={() => fetchChartData(timeframe)}
              className="flex items-center gap-1 text-green-400 hover:text-green-300"
            >
              <RefreshCw className="w-3 h-3" />
              Refresh
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          {timeframeButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setTimeframe(btn.value)}
              className={`px-3 py-1 rounded-lg text-sm transition ${timeframe === btn.value
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[350px] relative">
        {chartConfig ? (
          <>
            <Line data={chartConfig} options={chartOptions} />
            {error && (
              <div className="absolute top-4 right-4 px-3 py-2 bg-amber-500/20 text-amber-400 rounded-lg text-sm">
                ⚠️ {error}
              </div>
            )}
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">No chart data available</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
        <div>
          Timeframe: {timeframe} • Resolution: {chartData?.resolution || 'Loading...'}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${(chartData?.price_change_percent ?? 0) >= 0 ? 'bg-green-400' : 'bg-red-400'
              }`}></div>
            <span>24h Change: {chartData ? formatChange(chartData.price_change_percent) : '+0.00%'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
