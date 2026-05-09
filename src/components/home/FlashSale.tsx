"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, Zap, ShoppingCart, Heart, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FlashSale = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        // Filter products that have an active flash sale
        const flashSales = data.filter((p: any) => p.flashSale && p.flashSale.isActive);
        setProducts(flashSales.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch flash sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSales();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center space-y-6">
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">Syncing Flash Stream...</p>
      </div>
    );
  }

  // If no flash sales, don't show the section or show a message
  if (products.length === 0) return null;

  return (
    <section id="flash-sale" className="py-32 relative overflow-hidden bg-background">
      {/* Premium Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-20 gap-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 text-primary"
            >
               <Zap size={20} className="animate-pulse" fill="currentColor" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Elite Time-Locked Offer</span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase">FLASH <br /><span className="text-gradient italic">SALE.</span></h2>
            <p className="text-muted-foreground/60 text-lg md:text-xl max-w-xl font-medium leading-relaxed italic">
              Unlocking premium digital assets and elite digitizing services at unprecedented factory prices for a very limited duration.
            </p>
          </div>

          <div className="flex items-center space-x-6 glass border border-white/5 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex space-x-5 relative z-10">
              {[
                { val: timeLeft.hours, label: "HRS" },
                { val: timeLeft.minutes, label: "MIN" },
                { val: timeLeft.seconds, label: "SEC" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-background/80 rounded-2xl flex items-center justify-center border border-white/5 mb-2 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <span className="text-2xl font-black tabular-nums tracking-tighter italic">{item.val.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-[8px] font-black text-muted-foreground/40 tracking-[0.3em] uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product, idx) => {
            const discountPercent = Math.round((1 - (Number(product.flashSale.discountPrice) / Number(product.price))) * 100);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -15 }}
                className="group relative glass border border-white/5 rounded-[3rem] overflow-hidden transition-all duration-700 shadow-2xl hover:border-primary/40"
              >
                <div className="relative aspect-[4/5] overflow-hidden m-2.5 rounded-[2.25rem]">
                  <img 
                    src={product.images[0] || "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
                  
                  <div className="absolute top-5 left-5 luxury-gradient text-white text-[9px] font-black px-4 py-2 rounded-full shadow-2xl z-10 tracking-[0.2em] italic uppercase">
                    {discountPercent}% OFF
                  </div>
                  
                  <button className="absolute top-5 right-5 w-12 h-12 glass border border-white/10 rounded-2xl text-white flex items-center justify-center hover:bg-primary transition-all duration-500 z-10">
                    <Heart size={18} className="group-hover:scale-110 transition-transform" />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6 z-20">
                      <p className="text-white font-black text-sm tracking-tight leading-none mb-2 uppercase italic line-clamp-1">{product.name}</p>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                            <span className="text-2xl font-black text-primary italic tracking-tighter">${Number(product.flashSale.discountPrice).toFixed(2)}</span>
                            <span className="text-[10px] text-white/20 font-black line-through italic">${Number(product.price).toFixed(2)}</span>
                         </div>
                         <Button size="icon" className="w-10 h-10 rounded-xl luxury-gradient border-none shadow-2xl hover:scale-110 transition-transform">
                            <ShoppingCart size={16} />
                         </Button>
                      </div>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-2">
                  <div className="space-y-3">
                     <div className="flex justify-between text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.3em] italic">
                        <span>LOCKED OFFER</span>
                        <span className="text-primary">SYNCED</span>
                     </div>
                     <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1.5, delay: 0.8 }}
                          className="h-full luxury-gradient rounded-full relative" 
                        />
                     </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 flex justify-center">
           <Link href="/marketplace">
            <Button variant="outline" className="h-16 px-12 rounded-2xl border-white/5 glass font-black tracking-[0.3em] text-[10px] uppercase hover:bg-white/5 flex items-center group shadow-2xl transition-all italic">
                EXPLORE ALL OFFERS 
                <ArrowRight size={16} className="ml-4 group-hover:translate-x-3 transition-transform duration-500" />
            </Button>
           </Link>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
