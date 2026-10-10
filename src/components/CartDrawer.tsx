"use client";

import { useCartStore } from "@/lib/cart-store";
import { X, Trash2, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, totalPrice, totalCount } = useCartStore();
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 mins

  // Reservation countdown ticker
  useEffect(() => {
    if (!isOpen || items.length === 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, items]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-[#27272a] bg-[#09090b] text-[#f4f4f5] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#27272a] px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="font-spec text-sm font-bold tracking-wider">
                VAULT CART ({totalCount()})
              </span>
              <span className="text-xs text-[#71717a]">[妖怪]</span>
            </div>
            <button
              onClick={closeCart}
              className="rounded p-1 text-[#71717a] hover:text-[#f4f4f5] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Lock Reservation Timer Alert */}
          {items.length > 0 && (
            <div className="flex items-center justify-between bg-[#121215] px-6 py-2.5 border-b border-[#27272a] text-xs font-spec">
              <div className="flex items-center gap-2 text-[#e11d48]">
                <Clock className="h-4 w-4 animate-spin" />
                <span>STOCK RESERVED FOR:</span>
              </div>
              <span className="font-bold text-[#f4f4f5]">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <p className="font-spec text-xs text-[#71717a]">YOUR VAULT CART IS EMPTY</p>
                <button
                  onClick={closeCart}
                  className="mt-4 rounded border border-[#27272a] bg-[#121215] px-4 py-2 font-spec text-xs text-[#f4f4f5] hover:border-[#e11d48]"
                >
                  BROWSE DROP 001
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#1f1f23]">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4 py-4">
                    <img
                      src={item.product.frontImage}
                      alt={item.product.title}
                      className="h-20 w-16 rounded border border-[#27272a] object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold uppercase tracking-tight text-[#f4f4f5]">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => removeItem(item.product.id, item.size)}
                            className="text-[#71717a] hover:text-[#e11d48] transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="mt-1 flex gap-2 font-spec text-[11px] text-[#71717a]">
                          <span>SIZE: <span className="text-[#f4f4f5] font-bold">{item.size}</span></span>
                          <span>•</span>
                          <span>QTY: {item.quantity}</span>
                          <span>•</span>
                          <span>{item.product.gsm} GSM</span>
                        </div>
                      </div>

                      <div className="font-spec text-xs font-bold text-[#e11d48]">
                        ₹{(item.product.basePrice * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout */}
          {items.length > 0 && (
            <div className="border-t border-[#27272a] bg-[#121215] p-6">
              <div className="flex justify-between text-xs font-spec text-[#a1a1aa] mb-1">
                <span>SUBTOTAL</span>
                <span className="text-[#f4f4f5] font-bold">
                  ₹{totalPrice().toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-xs font-spec text-[#71717a] mb-4">
                <span>SHIPPING</span>
                <span className="text-[#e11d48]">FREE FOR DROP 001</span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex w-full items-center justify-center gap-2 rounded bg-[#e11d48] py-3.5 font-spec text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#be123c]"
              >
                <span>PROCEED TO GUEST CHECKOUT</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-spec text-[#71717a]">
                <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                <span>UPI INTENT · APPLE PAY · ZERO FORCED SIGNUP</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
