"use client";

import { useState } from "react";
import { Layers, Shield, Sparkles } from "lucide-react";

export default function FitGsmVisualizer() {
  const [selectedGsm, setSelectedGsm] = useState<260 | 460>(460);

  return (
    <section id="specs" className="border-b border-[#27272a] bg-[#121215] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end border-b border-[#27272a] pb-6">
          <div>
            <div className="flex items-center gap-2 font-spec text-xs text-[#e11d48]">
              <Layers className="h-3.5 w-3.5" />
              <span>THE ARCHITECTURAL FIT EQUATION</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black uppercase text-[#f4f4f5]">
              Fabric Density & Silhouette
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#a1a1aa]">
            We refuse thin 180 GSM blank tees. Every Yokai piece is custom milled in heavyweight Japanese structured weaves that hold an aggressive, tailored boxy drop.
          </p>
        </div>

        {/* GSM Interactive Toggle */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          
          <div className="space-y-4 lg:col-span-5">
            <button
              onClick={() => setSelectedGsm(460)}
              className={`w-full rounded-lg border p-5 text-left transition-all ${
                selectedGsm === 460
                  ? "border-[#e11d48] bg-[#09090b] shadow-lg"
                  : "border-[#27272a] bg-[#09090b]/50 hover:border-[#71717a]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-spec text-xs font-bold text-[#e11d48]">HOODIE / FLEECE ARCHIVE</span>
                <span className="rounded bg-[#e11d48]/20 px-2 py-0.5 font-spec text-[10px] text-[#e11d48]">
                  ULTRA DENSE
                </span>
              </div>
              <h3 className="mt-2 text-xl font-bold text-[#f4f4f5]">460 GSM Double-Face French Terry</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#a1a1aa]">
                Custom heavyweight knit that will never sag. Sculpted double-layer hood without drawstrings, dropped shoulders, and ribbed waist that cinches clean.
              </p>
            </button>

            <button
              onClick={() => setSelectedGsm(260)}
              className={`w-full rounded-lg border p-5 text-left transition-all ${
                selectedGsm === 260
                  ? "border-[#e11d48] bg-[#09090b] shadow-lg"
                  : "border-[#27272a] bg-[#09090b]/50 hover:border-[#71717a]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-spec text-xs font-bold text-[#e11d48]">TEE / JERSEY ARCHIVE</span>
                <span className="rounded bg-[#8b5cf6]/20 px-2 py-0.5 font-spec text-[10px] text-[#8b5cf6]">
                  STRUCTURED
                </span>
              </div>
              <h3 className="mt-2 text-xl font-bold text-[#f4f4f5]">260 GSM Compact Combed Cotton</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#a1a1aa]">
                Thick, tactile hand-feel that prevents any body cling. Reinforced 1.25&quot; thick collar ribbing that never bacon-curls after washing.
              </p>
            </button>
          </div>

          {/* Model Fit Guide Box */}
          <div className="rounded-xl border border-[#27272a] bg-[#09090b] p-6 lg:col-span-7">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
              <span className="font-spec text-xs font-bold text-[#f4f4f5]">
                FIT REFERENCE MATRIX: {selectedGsm} GSM
              </span>
              <span className="font-spec text-[11px] text-[#71717a]">
                TRUE-TO-STREETWEAR OVERSIZED
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="rounded border border-[#1f1f23] bg-[#121215] p-4">
                <span className="block font-spec text-[10px] text-[#71717a]">SILHOUETTE</span>
                <span className="mt-1 block font-bold text-sm text-[#f4f4f5]">Boxy Drop-Shoulder</span>
                <span className="mt-1 block text-[10px] text-[#a1a1aa]">Square chest, cropped hem</span>
              </div>

              <div className="rounded border border-[#1f1f23] bg-[#121215] p-4">
                <span className="block font-spec text-[10px] text-[#71717a]">COLLAR SPEC</span>
                <span className="mt-1 block font-bold text-sm text-[#f4f4f5]">1.25&quot; High-Ribbed</span>
                <span className="mt-1 block text-[10px] text-[#a1a1aa]">Zero neckline sag</span>
              </div>

              <div className="rounded border border-[#1f1f23] bg-[#121215] p-4">
                <span className="block font-spec text-[10px] text-[#71717a]">RECOMMENDATION</span>
                <span className="mt-1 block font-bold text-sm text-[#e11d48]">Order True to Size</span>
                <span className="mt-1 block text-[10px] text-[#a1a1aa]">For intentional bagginess</span>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-[#27272a] bg-[#121215]/60 p-4">
              <div className="flex items-center gap-2 text-xs font-spec text-[#f4f4f5]">
                <Shield className="h-4 w-4 text-[#e11d48]" />
                <span>MEASURED FIT NOTE:</span>
              </div>
              <p className="mt-1.5 text-xs text-[#a1a1aa] leading-relaxed">
                Model is 6&apos;1&quot; (185cm) wearing Size Large for a relaxed, oversized look. If you desire a more conventional fitted look, size down one step.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
