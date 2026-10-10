"use client";

import { useEffect, useState } from "react";
import { Flame, Lock, ShieldAlert, Sparkles } from "lucide-react";

export default function DropVaultHero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <section id="vault" className="relative overflow-hidden border-b border-[#27272a] bg-[#09090b] py-16 sm:py-24">
      {/* Background Japanese Watermark Kanji */}
      <div className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none text-[18vw] font-black text-[#121215]/60">
        特級
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Drop Title & Lore */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e11d48]/40 bg-[#e11d48]/10 px-3 py-1 text-xs font-spec text-[#e11d48]">
              <Flame className="h-3.5 w-3.5" />
              <span>LIMITED DROP 001 · CURSED VAULT</span>
            </div>

            <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#f4f4f5]">
              Heavyweight <br />
              <span className="text-[#e11d48] underline decoration-[#e11d48]/40 underline-offset-8">
                Cursed Silk
              </span>
              <br />
              Streetwear.
            </h1>

            <p className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-[#a1a1aa]">
              240-460 GSM custom-milled Japanese boxy silhouettes inspired by dark folklore,
              shinigami, and supernatural lore. Strictly numbered pieces. Never restocked.
            </p>

            {/* Spec Badges */}
            <div className="mt-8 flex flex-wrap gap-4 text-xs font-spec">
              <div className="rounded border border-[#27272a] bg-[#121215] px-3.5 py-2 text-[#f4f4f5]">
                <span className="text-[#71717a]">FABRIC:</span> 460 GSM FRENCH TERRY
              </div>
              <div className="rounded border border-[#27272a] bg-[#121215] px-3.5 py-2 text-[#f4f4f5]">
                <span className="text-[#71717a]">CUT:</span> INTENTIONAL BOXY OVERSIZED
              </div>
              <div className="rounded border border-[#27272a] bg-[#121215] px-3.5 py-2 text-[#e11d48]">
                <span className="text-[#71717a]">EDITION:</span> 100 PIECES GLOBALLY
              </div>
            </div>
          </div>

          {/* Right Column: Scarcity Countdown Vault Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl border border-[#27272a] bg-[#121215] p-6 shadow-2xl sm:p-8">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[#e11d48]" />
                  <span className="font-spec text-xs tracking-wider text-[#f4f4f5]">
                    VAULT LOCK DOWN
                  </span>
                </div>
                <span className="font-spec text-[11px] text-[#e11d48]">
                  026 / 100 ALLOCATED
                </span>
              </div>

              {/* Countdown Numbers Grid */}
              <div className="mt-6">
                <p className="font-spec text-[11px] text-[#71717a]">DROP ACCESS CLOSES IN:</p>
                <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  <div className="rounded-lg border border-[#27272a] bg-[#09090b] p-3">
                    <span className="text-2xl sm:text-3xl font-black text-[#f4f4f5]">
                      {formatNumber(timeLeft.days)}
                    </span>
                    <span className="block mt-1 font-spec text-[10px] text-[#71717a]">DAYS</span>
                  </div>
                  <div className="rounded-lg border border-[#27272a] bg-[#09090b] p-3">
                    <span className="text-2xl sm:text-3xl font-black text-[#f4f4f5]">
                      {formatNumber(timeLeft.hours)}
                    </span>
                    <span className="block mt-1 font-spec text-[10px] text-[#71717a]">HOURS</span>
                  </div>
                  <div className="rounded-lg border border-[#27272a] bg-[#09090b] p-3">
                    <span className="text-2xl sm:text-3xl font-black text-[#f4f4f5]">
                      {formatNumber(timeLeft.minutes)}
                    </span>
                    <span className="block mt-1 font-spec text-[10px] text-[#71717a]">MINS</span>
                  </div>
                  <div className="rounded-lg border border-[#e11d48]/40 bg-[#09090b] p-3">
                    <span className="text-2xl sm:text-3xl font-black text-[#e11d48]">
                      {formatNumber(timeLeft.seconds)}
                    </span>
                    <span className="block mt-1 font-spec text-[10px] text-[#e11d48]">SECS</span>
                  </div>
                </div>
              </div>

              {/* Scarcity Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-[11px] font-spec">
                  <span className="text-[#a1a1aa]">REMAINING GLOBAL STOCK</span>
                  <span className="font-bold text-[#e11d48]">26% LEFT</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#27272a]">
                  <div className="h-full w-[26%] bg-gradient-to-r from-[#e11d48] to-[#8b5cf6]" />
                </div>
              </div>

              {/* Call to action */}
              <div className="mt-6 flex flex-col gap-2.5">
                <a
                  href="#catalog"
                  className="flex items-center justify-center gap-2 rounded bg-[#e11d48] px-4 py-3 font-spec text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#be123c] active:scale-[0.99]"
                >
                  <Sparkles className="h-4 w-4" />
                  ACCESS DROP 001 ARCHIVE
                </a>
                <p className="text-center font-spec text-[10px] text-[#71717a]">
                  ⚡ 10-Minute Cart Lock activates upon adding any item
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
