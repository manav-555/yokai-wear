import Navbar from "@/components/Navbar";
import DropVaultHero from "@/components/DropVaultHero";
import ProductCard from "@/components/ProductCard";
import FitGsmVisualizer from "@/components/FitGsmVisualizer";
import CartDrawer from "@/components/CartDrawer";
import { inauguralDrops } from "@/data/products";
import { Flame, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
      {/* Manga Paper Grain Overlay */}
      <div className="manga-grain" />

      {/* Persistent Global Cart Slide-Over */}
      <CartDrawer />

      {/* Main Navigation */}
      <Navbar />

      {/* Main Hero Vault Section */}
      <DropVaultHero />

      {/* Catalog & Drops Section */}
      <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#27272a] pb-6 mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 font-spec text-xs text-[#e11d48]">
              <Flame className="h-3.5 w-3.5" />
              <span>THE INAUGURAL DROP</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-5xl font-black uppercase text-[#f4f4f5] tracking-tight">
              Cursed Archive 001
            </h2>
          </div>
          <div className="font-spec text-xs text-[#71717a] flex items-center gap-2">
            <span>STRICT LIMIT: 2 PIECES PER ORDER</span>
            <span>·</span>
            <span className="text-[#e11d48]">NO RESTOCKS</span>
          </div>
        </div>

        {/* Product Grid with Dual-Angle Crossfade Flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inauguralDrops.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Architectural GSM & Fit Visualizer */}
      <FitGsmVisualizer />

      {/* Streetwear Footer */}
      <footer className="border-t border-[#27272a] bg-[#09090b] py-16 px-4 sm:px-6 lg:px-8 text-xs font-spec">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-3">
            <span className="text-lg font-black tracking-tighter text-[#f4f4f5]">
              YOKAI<span className="text-[#e11d48]">.</span>WEAR
            </span>
            <p className="text-[#71717a] leading-relaxed">
              Elevated anime streetwear inspired by dark Japanese supernatural folklore, shinigami, and curse techniques.
            </p>
            <div className="text-[11px] text-[#e11d48]">
              妖怪ウェア TOKYO · MUMBAI · WORLDWIDE
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#f4f4f5] mb-3">DROP PROTOCOL</h4>
            <ul className="space-y-2 text-[#71717a]">
              <li>• Flash drops announced 48h prior</li>
              <li>• 10-Minute Cart Lock system</li>
              <li>• Zero restock policy for vault pieces</li>
              <li>• Worldwide tracked express shipping</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#f4f4f5] mb-3">FABRICATION</h4>
            <ul className="space-y-2 text-[#71717a]">
              <li>• 260-460 GSM custom milled cotton</li>
              <li>• Split-fountain screenprint inks</li>
              <li>• Reinforced 1.25&quot; ribbed collars</li>
              <li>• Pre-shrunk vintage wash treatments</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#f4f4f5] mb-3">COMMUNITY</h4>
            <p className="text-[#71717a] mb-4">
              Join the private Yokai Discord vault for 30-minute early drop passcodes.
            </p>
            <div className="flex gap-3">
              <a href="#" className="rounded border border-[#27272a] bg-[#121215] p-2 hover:border-[#e11d48] text-[#a1a1aa] hover:text-[#f4f4f5]">
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="rounded border border-[#27272a] bg-[#121215] p-2 hover:border-[#e11d48] text-[#a1a1aa] hover:text-[#f4f4f5]">
                <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#1f1f23] flex flex-col sm:flex-row justify-between items-center text-[#71717a] gap-4">
          <div>
            © 2026 YOKAI WEAR (妖怪ウェア). ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#f4f4f5]">PRIVACY POLICY</a>
            <a href="#" className="hover:text-[#f4f4f5]">TERMS OF DROP</a>
            <a href="#" className="hover:text-[#f4f4f5]">SHIPPING & EXCHANGES</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
