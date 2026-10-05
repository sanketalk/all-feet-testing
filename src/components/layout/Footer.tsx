"use client";

import React, { useState } from "react";
import Link from "next/link";
import { STORE_INFO } from "@/data/storeInfo";
import { ArrowRight, Check, MapPin, Phone, MessageSquare, MessageCircle, Instagram, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const cleanEmail = email.trim();
    const text = `✨ *ALL FEET FASHION — PRIVATE CLIENT LIST* ✨
━━━━━━━━━━━━━━━━━━━━
Hello All Feet Fashion team! I would like to join the Private Client List to receive secret release notifications, limited capsule drops, and my ₹500 welcome discount.

📧 *Registered Email:* ${cleanEmail}
🛍️ *Requested Offer:* Inaugural Client Privilege (₹500 Off / Secret Drops)

Please add me to your VIP broadcast. Thank you!`;

    const url = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    setWhatsappUrl(url);
    setSubscribed(true);

    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  return (
    <footer className="bg-luxury-950 border-t border-white/10 text-zinc-400 font-sans pt-16 pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14 border-b border-white/10">
          <div className="flex items-center gap-4 p-4 rounded-none bg-zinc-900/40 border border-white/5">
            <div className="p-3 bg-black border border-gold/30 text-gold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider">PAN-INDIA DELIVERY</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">Complimentary express shipping on orders over ₹1,999</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-none bg-zinc-900/40 border border-white/5">
            <div className="p-3 bg-black border border-gold/30 text-gold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider">100% AUTHENTIC QUALITY</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">Direct boutique sourcing with serial authentication</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-none bg-zinc-900/40 border border-white/5">
            <div className="p-3 bg-black border border-gold/30 text-gold">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider">7-DAY EASY RETURNS & EXCHANGE</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">Hassle-free online pickup or instant exchange at our store</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-white/10">
          {/* Col 1 & 2: Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 border border-gold flex items-center justify-center bg-black">
                <span className="font-serif text-lg font-bold text-gold">AFF</span>
              </div>
              <div>
                <span className="font-serif text-xl tracking-[0.2em] font-bold text-white">ALL FEET</span>
                <span className="block text-[9px] tracking-[0.35em] text-zinc-400 uppercase -mt-1">FASHION</span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
              Defining modern Indian luxury. Meticulously engineered chronographs, bespoke perfumes, architectural streetwear, and Italian footwear crafted for everyday confidence.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest text-zinc-200 font-semibold mb-2">
                JOIN THE PRIVATE CLIENT LIST
              </p>
              <p className="text-[11px] text-zinc-500 mb-3">
                Receive secret release notifications and ₹500 off your premier order.
              </p>

              {subscribed ? (
                <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs space-y-2 max-w-sm">
                  <div className="flex items-center gap-2 font-medium text-emerald-400">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>Connecting via WhatsApp...</span>
                  </div>
                  <p className="text-[11px] text-zinc-300">
                    Your email has been registered! Use code <strong className="text-gold font-mono">WELCOME10</strong> at checkout for 10% off.
                  </p>
                  <div className="pt-1 flex items-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] tracking-wider uppercase font-semibold transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Open WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubscribed(false);
                        setEmail("");
                      }}
                      className="text-[10px] text-zinc-400 hover:text-white underline transition"
                    >
                      Use another email
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gold hover:bg-gold-light text-black text-xs font-semibold tracking-wider uppercase transition flex items-center gap-1.5 whitespace-nowrap shadow-md group"
                  >
                    <span>JOIN</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              )}
            </div>

            {/* Store Quick Coordinates */}
            <div className="pt-2 text-xs text-zinc-400 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  School Bazar, Bibiganj, Midnapore - 721101, WB
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <a href={`tel:${STORE_INFO.phone}`} className="text-[11px] hover:text-white transition">
                  {STORE_INFO.displayPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: SHOP */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest">SHOP</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/shop?category=watches" className="hover:text-gold transition">Watches</Link>
              </li>
              <li>
                <Link href="/shop?category=perfumes" className="hover:text-gold transition">Perfumes</Link>
              </li>
              <li>
                <Link href="/shop?category=shoes" className="hover:text-gold transition">Shoes & Sneakers</Link>
              </li>
              <li>
                <Link href="/shop?category=clothing" className="hover:text-gold transition">Clothing</Link>
              </li>
              <li>
                <Link href="/shop?category=sunglasses" className="hover:text-gold transition">Sunglasses</Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="hover:text-gold transition">Accessories</Link>
              </li>
              <li>
                <Link href="/shop?sort=newest" className="hover:text-gold transition">New Arrivals</Link>
              </li>
              <li>
                <Link href="/shop?filter=sale" className="text-gold hover:underline">Offers & Drops</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: CLIENT CARE & HELP */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest">CLIENT CARE</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/track-order" className="hover:text-gold transition font-medium text-zinc-300">Track Your Order</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition">Contact Concierge</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition">Brand Story</Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-gold transition">Visit Midnapore Boutique</Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Helpline</span>
                </a>
              </li>
              <li>
                <Link href="/admin" className="text-zinc-600 hover:text-zinc-400 transition text-[10px]">Staff Portal</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: LEGAL & SOCIAL */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest">EXPERIENCE</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`https://instagram.com/${STORE_INFO.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{STORE_INFO.instagram}</span>
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps Review</span>
                </a>
              </li>
              <li className="pt-2 text-zinc-500 text-[11px]">
                School Bazar Chawk, Bibiganj, Paschim Medinipur, WB - 721101
              </li>
              <li className="text-zinc-500 text-[11px]">
                Mon–Sun: 10:00 AM – 9:30 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} ALL FEET FASHION. All Rights Reserved. Engineered for luxury.</p>
          <div className="flex items-center gap-6">
            <span>Prices in Indian Rupees (INR ₹)</span>
            <span>Pan-India Logistics</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
