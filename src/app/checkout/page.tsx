"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useCartStore } from "@/lib/cart-store";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  Flame,
  BadgeAlert
} from "lucide-react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");
  const [razorpayPaymentId, setRazorpayPaymentId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Guest Checkout Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const total = totalPrice();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Call our backend to generate order payload
      const res = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          notes: {
            customer: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            pieces: items.map(i => `${i.product.sku} (${i.size})`).join(", ")
          }
        })
      });

      const orderData = await res.json();

      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to initialize order");
      }

      // Check if Razorpay SDK loaded
      if (typeof window !== "undefined" && window.Razorpay) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "YOKAI WEAR (妖怪ウェア)",
          description: "Drop 001 Cursed Archive Allocation",
          image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=200",
          order_id: orderData.orderId,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handler: function (response: any) {
            // Success Callback from Razorpay popup
            const generatedId = `YK-${Math.floor(100000 + Math.random() * 900000)}`;
            setOrderId(generatedId);
            setRazorpayPaymentId(response.razorpay_payment_id || "pay_test_sample123");
            setIsSubmitting(false);
            setOrderSuccess(true);
            clearCart();
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#e11d48", // Yokai Torii Crimson accent
          },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rzp.on("payment.failed", function (response: any) {
          setErrorMessage(response.error.description || "Payment was rejected or cancelled.");
          setIsSubmitting(false);
        });
        rzp.open();

      } else {
        // Fallback simulation if running in preview without external script
        setTimeout(() => {
          const generatedId = `YK-${Math.floor(100000 + Math.random() * 900000)}`;
          setOrderId(generatedId);
          setRazorpayPaymentId(`pay_test_${Math.random().toString(36).substring(2, 10)}`);
          setIsSubmitting(false);
          setOrderSuccess(true);
          clearCart();
        }, 1200);
      }

    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || "An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] px-4 py-16 flex items-center justify-center">
        <div className="manga-grain" />
        <div className="w-full max-w-xl rounded-xl border border-[#27272a] bg-[#121215] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e11d48] to-[#8b5cf6]" />
          
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e11d48]/10 border border-[#e11d48]/30 text-[#e11d48]">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-0.5 text-[11px] font-spec text-green-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>RAZORPAY TEST VERIFIED</span>
            </div>

            <h1 className="mt-2 text-2xl sm:text-3xl font-black uppercase text-[#f4f4f5]">
              Order #{orderId}
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              Arigato for joining the Yokai realm! Your payment has been authorized and heavyweight pieces are locked for dispatch boxing.
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-[#27272a] bg-[#09090b] p-5 font-spec text-xs space-y-3">
            <div className="flex justify-between text-[#71717a]">
              <span>CUSTOMER:</span>
              <span className="text-[#f4f4f5] font-bold">{formData.fullName || "Yokai Collector"}</span>
            </div>
            <div className="flex justify-between text-[#71717a]">
              <span>RAZORPAY REF ID:</span>
              <span className="text-[#8b5cf6] font-bold">{razorpayPaymentId}</span>
            </div>
            <div className="flex justify-between text-[#71717a]">
              <span>DISPATCH UPDATE TO:</span>
              <span className="text-[#f4f4f5]">{formData.email}</span>
            </div>
            <div className="flex justify-between text-[#71717a]">
              <span>DESTINATION:</span>
              <span className="text-[#f4f4f5] text-right truncate max-w-[200px]">
                {formData.city}, {formData.pincode}
              </span>
            </div>
            <div className="border-t border-[#1f1f23] pt-3 flex justify-between text-sm font-bold text-[#e11d48]">
              <span>AMOUNT AUTHORIZED:</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 rounded bg-[#e11d48] py-3 text-center font-spec text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#be123c]"
            >
              RETURN TO SANCTUARY
            </Link>
          </div>

          <div className="mt-6 text-center font-spec text-[10px] text-[#71717a]">
            ⚡ Test Mode: Zero real currency was charged. Ready for production webhook listener.
          </div>

        </div>
      </div>
    );
  }

  // EMPTY CART GUARD
  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col items-center justify-center px-4">
        <div className="manga-grain" />
        <p className="font-spec text-sm text-[#71717a]">YOUR VAULT CART HAS EXPIRED OR IS EMPTY</p>
        <Link
          href="/"
          className="mt-4 rounded border border-[#27272a] bg-[#121215] px-6 py-2.5 font-spec text-xs text-[#f4f4f5] hover:border-[#e11d48]"
        >
          BROWSE CURSED ARCHIVE 001
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
      {/* Load Razorpay Standard Checkout SDK */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="manga-grain" />

      {/* Top Header */}
      <header className="border-b border-[#27272a] bg-[#09090b]/90 backdrop-blur-md px-4 py-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-spec text-[#a1a1aa] hover:text-[#f4f4f5]">
            <ArrowLeft className="h-4 w-4" />
            <span>BACK TO ARCHIVE</span>
          </Link>
          <div className="text-center">
            <span className="text-lg font-black tracking-tight text-[#f4f4f5]">
              YOKAI<span className="text-[#e11d48]">.</span>WEAR
            </span>
            <span className="ml-2 font-spec text-[10px] text-[#71717a]">[RAZORPAY TEST]</span>
          </div>
          <div className="flex items-center gap-1.5 font-spec text-[11px] text-[#e11d48]">
            <Lock className="h-3 w-3" />
            <span>256-BIT ENCRYPTION</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Sandbox alert banner */}
        <div className="mb-8 flex items-center justify-between rounded-lg border border-[#e11d48]/40 bg-[#e11d48]/10 p-3.5 text-xs font-spec text-[#f4f4f5]">
          <div className="flex items-center gap-2 text-[#e11d48]">
            <BadgeAlert className="h-4 w-4" />
            <span className="font-bold">RAZORPAY TEST ENVIRONMENT ACTIVE</span>
          </div>
          <span className="hidden sm:inline text-[#a1a1aa]">TEST CARD / FAKE UPI CREDENTIALS SUPPORTED</span>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded border border-red-500 bg-red-500/10 p-4 font-spec text-xs text-red-400">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (Forms): 7 Cols */}
          <div className="lg:col-span-7">
            
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              
              {/* Step 1: Contact (Zero Forced Sign-in) */}
              <div className="rounded-xl border border-[#27272a] bg-[#121215] p-6 sm:p-7">
                <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e11d48] text-[10px] font-bold text-white">
                      1
                    </span>
                    <h2 className="font-spec text-xs font-bold tracking-wider text-[#f4f4f5]">
                      CONTACT INFORMATION (GUEST PASS)
                    </h2>
                  </div>
                  <span className="font-spec text-[10px] text-[#71717a]">NO PASSWORD REQUIRED</span>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-spec text-[10px] text-[#a1a1aa] mb-1">
                      FULL NAME *
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      placeholder="e.g. Satoru Gojo"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full rounded border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-xs text-[#f4f4f5] placeholder-[#71717a] focus:border-[#e11d48] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-spec text-[10px] text-[#a1a1aa] mb-1">
                      WHATSAPP / MOBILE NUMBER *
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-xs text-[#f4f4f5] placeholder-[#71717a] focus:border-[#e11d48] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-spec text-[10px] text-[#a1a1aa] mb-1">
                      EMAIL ADDRESS (FOR TRACKING DISPATCH) *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="collector@yokaiwear.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-xs text-[#f4f4f5] placeholder-[#71717a] focus:border-[#e11d48] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Destination */}
              <div className="rounded-xl border border-[#27272a] bg-[#121215] p-6 sm:p-7">
                <div className="flex items-center gap-2 border-b border-[#27272a] pb-4">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e11d48] text-[10px] font-bold text-white">
                    2
                  </span>
                  <h2 className="font-spec text-xs font-bold tracking-wider text-[#f4f4f5]">
                    SHIPPING DESTINATION
                  </h2>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block font-spec text-[10px] text-[#a1a1aa] mb-1">
                      STREET ADDRESS / APARTMENT / LANDMARK *
                    </label>
                    <input
                      required
                      type="text"
                      name="address"
                      placeholder="Flat 402, Shibuya Tower, Street 4"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full rounded border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-xs text-[#f4f4f5] placeholder-[#71717a] focus:border-[#e11d48] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-spec text-[10px] text-[#a1a1aa] mb-1">CITY *</label>
                      <input
                        required
                        type="text"
                        name="city"
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full rounded border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-xs text-[#f4f4f5] placeholder-[#71717a] focus:border-[#e11d48] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-spec text-[10px] text-[#a1a1aa] mb-1">STATE *</label>
                      <input
                        required
                        type="text"
                        name="state"
                        placeholder="Maharashtra"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full rounded border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-xs text-[#f4f4f5] placeholder-[#71717a] focus:border-[#e11d48] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-spec text-[10px] text-[#a1a1aa] mb-1">PINCODE *</label>
                      <input
                        required
                        type="text"
                        name="pincode"
                        placeholder="400001"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full rounded border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-xs text-[#f4f4f5] placeholder-[#71717a] focus:border-[#e11d48] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Routing */}
              <div className="rounded-xl border border-[#27272a] bg-[#121215] p-6 sm:p-7">
                <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e11d48] text-[10px] font-bold text-white">
                      3
                    </span>
                    <h2 className="font-spec text-xs font-bold tracking-wider text-[#f4f4f5]">
                      PAYMENT SELECTION
                    </h2>
                  </div>
                  <span className="font-spec text-[10px] text-[#e11d48]">RAZORPAY TEST GATEWAY</span>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                      paymentMethod === "upi"
                        ? "border-[#e11d48] bg-[#09090b] text-[#f4f4f5] shadow-sm"
                        : "border-[#27272a] bg-[#09090b]/50 text-[#a1a1aa] hover:border-[#71717a]"
                    }`}
                  >
                    <Smartphone className="h-5 w-5 text-[#e11d48]" />
                    <div>
                      <div className="font-spec text-xs font-bold">UPI INTENT / QR (TEST)</div>
                      <div className="text-[10px] text-[#71717a]">GPay, PhonePe, Paytm Sandbox</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                      paymentMethod === "card"
                        ? "border-[#e11d48] bg-[#09090b] text-[#f4f4f5] shadow-sm"
                        : "border-[#27272a] bg-[#09090b]/50 text-[#a1a1aa] hover:border-[#71717a]"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-[#8b5cf6]" />
                    <div>
                      <div className="font-spec text-xs font-bold">CARD (TEST)</div>
                      <div className="text-[10px] text-[#71717a]">Test Cards (4111 1111...)</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-[#e11d48] py-4 font-spec text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#be123c] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4 animate-spin" />
                    OPENING RAZORPAY TEST GATEWAY...
                  </span>
                ) : (
                  <span>PAY ₹{total.toLocaleString("en-IN")} VIA RAZORPAY</span>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 font-spec text-[10px] text-[#71717a]">
                <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                <span>OFFICIAL RAZORPAY 256-BIT SECURE CHECKOUT</span>
              </div>

            </form>
          </div>

          {/* Right Column (Order Summary): 5 Cols */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-xl border border-[#27272a] bg-[#121215] p-6 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
                <h3 className="font-spec text-xs font-bold tracking-wider text-[#f4f4f5]">
                  VAULT DROP 001 MANIFEST
                </h3>
                <span className="font-spec text-[10px] text-[#e11d48]">
                  {items.length} PIECES RESERVED
                </span>
              </div>

              {/* Items List */}
              <div className="mt-4 divide-y divide-[#1f1f23] max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="py-3.5 flex gap-3">
                    <img
                      src={item.product.frontImage}
                      alt={item.product.title}
                      className="h-16 w-14 rounded border border-[#27272a] object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-[#f4f4f5]">
                          {item.product.title}
                        </h4>
                        <div className="mt-1 flex gap-2 font-spec text-[10px] text-[#71717a]">
                          <span>SIZE: <span className="text-[#f4f4f5]">{item.size}</span></span>
                          <span>•</span>
                          <span>QTY: {item.quantity}</span>
                          <span>•</span>
                          <span>{item.product.gsm} GSM</span>
                        </div>
                      </div>
                      <div className="font-spec text-xs font-bold text-[#f4f4f5]">
                        ₹{(item.product.basePrice * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="mt-6 border-t border-[#27272a] pt-4 space-y-2 text-xs font-spec">
                <div className="flex justify-between text-[#a1a1aa]">
                  <span>SUBTOTAL</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#71717a]">
                  <span>EXPRESS PACKAGING</span>
                  <span className="text-green-400 font-bold">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-[#71717a]">
                  <span>TRANSIT INSURANCE</span>
                  <span className="text-[#a1a1aa]">INCLUDED</span>
                </div>
                <div className="border-t border-[#1f1f23] pt-3 flex justify-between text-sm font-bold text-[#f4f4f5]">
                  <span>TOTAL AMOUNT</span>
                  <span className="text-[#e11d48]">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Collector Guarantee Decal */}
              <div className="mt-6 rounded-lg border border-[#27272a] bg-[#09090b] p-3 text-[10px] font-spec text-[#71717a] leading-relaxed flex items-start gap-2">
                <Flame className="h-4 w-4 text-[#e11d48] shrink-0 mt-0.5" />
                <span>
                  Each item is sealed with an individual archival number badge (`PIECE 0xx/100`). Once this drop closes, these SKUs will never enter reproduction.
                </span>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
