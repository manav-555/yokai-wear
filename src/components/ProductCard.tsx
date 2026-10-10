"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCartStore } from "@/lib/cart-store";
import { ShoppingBag, Eye, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L" | "XL" | "XXL">(product.sizes[1] || "M");
  const { addItem } = useCartStore();

  return (
    <div className="group relative flex flex-col rounded-lg border border-[#27272a] bg-[#121215] transition-all hover:border-[#71717a]/50">
      
      {/* Top Header Label */}
      <div className="flex items-center justify-between border-b border-[#27272a] px-4 py-2.5 font-spec text-[11px] text-[#71717a]">
        <span>{product.dropNumber}</span>
        <span className="text-[#e11d48]">{product.pieceNumber}</span>
      </div>

      {/* Dual-Angle Image Container (Front ⇄ Back Crossfade Flip) */}
      <div
        className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden bg-[#09090b]"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Image */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
            isFlipped ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={product.frontImage}
            alt={`${product.title} Front View`}
            className="h-full w-full object-cover object-center grayscale-[25%] transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Back Image (The Massive Anime Graphic Print) */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
            isFlipped ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={product.backImage}
            alt={`${product.title} Back Graphic Print`}
            className="h-full w-full object-cover object-center grayscale-[10%] transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Japanese Accent Stamp */}
        <div className="vertical-kanji pointer-events-none absolute left-3 top-3 select-none text-[10px] font-bold tracking-widest text-[#f4f4f5]/60 bg-[#09090b]/70 backdrop-blur-sm px-1 py-2 border border-[#27272a]">
          {product.kanjiTitle}
        </div>

        {/* Angle Indicator Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-[#27272a] bg-[#09090b]/80 px-2.5 py-1 text-[10px] font-spec text-[#f4f4f5] backdrop-blur-md">
          <Eye className="h-3 w-3 text-[#e11d48]" />
          <span>{isFlipped ? "BACK VIEW" : "HOVER FOR BACK"}</span>
        </div>

        {/* Scarcity badge */}
        <div className="absolute bottom-3 left-3 rounded border border-[#e11d48]/40 bg-[#09090b]/90 px-2 py-0.5 text-[10px] font-spec font-bold text-[#e11d48]">
          ONLY {product.remainingPieces} LEFT
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-spec text-[10px] text-[#71717a]">
              {product.collection}
            </span>
            <h3 className="mt-0.5 text-sm sm:text-base font-bold uppercase tracking-tight text-[#f4f4f5]">
              {product.title}
            </h3>
          </div>
          <div className="font-spec text-sm font-bold text-[#f4f4f5]">
            ₹{product.basePrice.toLocaleString("en-IN")}
          </div>
        </div>

        {/* Specifications row */}
        <div className="mt-3 flex items-center gap-3 border-y border-[#1f1f23] py-2 text-[11px] font-spec text-[#a1a1aa]">
          <span>{product.gsm} GSM</span>
          <span className="text-[#27272a]">/</span>
          <span>{product.fit}</span>
        </div>

        {/* Size Selection */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-spec text-[#71717a]">
            <span>SELECT FIT SIZE:</span>
            <span className="text-[#e11d48] font-bold">{selectedSize}</span>
          </div>
          <div className="mt-2 flex gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 rounded border py-1 font-spec text-xs font-bold transition-all ${
                  selectedSize === size
                    ? "border-[#e11d48] bg-[#e11d48] text-white shadow-sm"
                    : "border-[#27272a] bg-[#09090b] text-[#a1a1aa] hover:border-[#71717a]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => addItem(product, selectedSize)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded border border-[#27272a] bg-[#18181b] py-2.5 font-spec text-xs font-bold uppercase tracking-wider text-[#f4f4f5] transition-all hover:border-[#e11d48] hover:bg-[#e11d48] hover:text-white"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>RESERVE SIZE {selectedSize}</span>
        </button>

      </div>
    </div>
  );
}
