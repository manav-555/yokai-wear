"use client";

import { useCartStore } from "@/lib/cart-store";
import { ShoppingBag, Flame, Menu, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { totalCount, openCart } = useCartStore();
  const count = totalCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#27272a] bg-[#09090b]/85 backdrop-blur-md">
      {/* Top Streetwear Marquee / Warning Banner */}
      <div className="flex items-center justify-between bg-[#121215] px-4 py-1.5 text-[11px] font-spec border-b border-[#1f1f23] text-[#71717a]">
        <div className="flex items-center gap-2 text-[#e11d48]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e11d48] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e11d48]"></span>
          </span>
          <span className="font-bold text-[#f4f4f5]">DROP 001 LIVE</span>
          <span className="hidden sm:inline">| STRICTLY 100 PIECES PER DESIGN · WORLDWIDE SHIPPING</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-[#a1a1aa]">妖怪ウェア ARCHIVE 2026</span>
          <span className="text-[#e11d48] font-bold">10-MIN CART LOCK ACTIVE</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Left: Japanese Brand Accent & Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-[#f4f4f5] transition-colors group-hover:text-[#e11d48]">
              YOKAI<span className="text-[#e11d48]">.</span>WEAR
            </span>
            <span className="text-xs font-bold text-[#71717a] group-hover:text-[#f4f4f5] transition-colors">
              [妖怪ウェア]
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-xs font-spec tracking-wider text-[#a1a1aa]">
            <Link href="#vault" className="transition-colors hover:text-[#f4f4f5]">
              VAULT DROPS
            </Link>
            <Link href="#curated" className="transition-colors hover:text-[#f4f4f5]">
              CATALOG
            </Link>
            <Link href="#specs" className="transition-colors hover:text-[#f4f4f5]">
              240-460 GSM
            </Link>
          </div>
        </div>

        {/* Right: Currency / Actions / Cart */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#27272a] bg-[#121215] px-2.5 py-1 text-[11px] font-spec text-[#a1a1aa]">
            <Flame className="h-3 w-3 text-[#e11d48]" />
            <span>INR / USD</span>
          </div>

          <button
            onClick={openCart}
            aria-label="Open Shopping Cart"
            className="group relative flex items-center gap-2 rounded-md border border-[#27272a] bg-[#121215] px-3.5 py-1.5 text-xs font-spec text-[#f4f4f5] transition-all hover:border-[#e11d48] hover:bg-[#18181b]"
          >
            <ShoppingBag className="h-4 w-4 text-[#e11d48]" />
            <span className="hidden sm:inline">CART</span>
            {count > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e11d48] text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
