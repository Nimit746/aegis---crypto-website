"use client";

import { Search, SlidersHorizontal, Menu } from "lucide-react";

interface TopBarProps {
    onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
    return (
        <header className="flex h-20 items-center justify-between border-b border-border bg-background px-4 md:px-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Search Bar */}
                <div className="flex w-40 md:w-96 items-center gap-3 rounded-xl bg-card border border-border px-4 py-2.5 shadow-sm focus-within:border-muted-foreground/30 transition-colors">
                    <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none min-w-0"
                    />
                </div>
            </div>

            {/* Market Stats - Hidden on Mobile */}
            <div className="hidden lg:flex items-center gap-8">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Total Cap</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-foreground">$2.41T</span>
                        <span className="text-xs font-medium text-bullish">+1.2%</span>
                    </div>
                </div>
                <div className="h-8 w-[1px] bg-border" />
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">BTC Dom</span>
                    <span className="text-sm font-bold text-foreground">52.4%</span>
                </div>
                <div className="h-8 w-[1px] bg-border" />
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Fear & Greed</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-bullish">65/100</span>
                        <span className="text-xs text-muted-foreground">Greed</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-muted/20 px-3 py-1.5 border border-bullish/20">
                    <div className="h-2 w-2 rounded-full bg-bullish animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-xs font-semibold text-bullish tracking-wide">LIVE FEED</span>
                </div>

                <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/20 hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors border border-transparent hover:border-border">
                    <SlidersHorizontal className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
