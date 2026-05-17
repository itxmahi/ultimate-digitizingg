"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Star, 
  Heart, 
  Loader2, 
  ArrowRight,
  MessageCircle,
  Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";

const FlashSalePage = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  const productIsFlash = (p: any) => {
    return p && p.flashSale && typeof p.flashSale === "object" && (p.flashSale as any).isFlashSale;
  };

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (Array.isArray(data)) {
          const flashSales = data.filter((p: any) => productIsFlash(p));
          setProducts(flashSales);
        }
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

    return () => clearInterval(timer);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <div className="py-24 relative overflow-hidden bg-background min-h-screen">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-24 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-primary">
               <Zap size={20} className="animate-pulse" fill="currentColor" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] italic text-primary">Priority Liquidation Protocol</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic">
              FLASH <br /><span className="text-gradient NOT-italic">STREAMS.</span>
            </h1>
            <p className="text-muted-foreground/60 text-xl max-w-xl font-medium leading-relaxed italic">
              Elite-tier digital assets under heavy discount. Authorized for immediate deployment. Time-locked protocols only.
            </p>
          </div>

          <div className="flex items-center space-x-8 glass border border-white/5 p-10 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
            <div className="flex space-x-6">
              {[
                { val: timeLeft.hours, label: "HRS" },
                { val: timeLeft.minutes, label: "MIN" },
                { val: timeLeft.seconds, label: "SEC" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-background/80 rounded-2xl flex items-center justify-center border border-white/5 mb-3 shadow-2xl">
                    <span className="text-3xl font-black tabular-nums tracking-tighter italic">{item.val.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-[9px] font-black text-muted-foreground/40 tracking-[0.3em] uppercase italic">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="py-40 text-center glass rounded-[4rem] border-dashed border-white/5">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-muted-foreground/20 italic">No active flash streams detected in sector.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {products.map((product, idx) => {
              const isFS = productIsFlash(product);
              const discountPercent = isFS ? product.flashSale.discountPercentage : 0;
              const discountedPrice = isFS ? product.flashSale.discountedPrice : product.price;
              const originalPrice = isFS ? product.flashSale.originalPrice : product.price;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -15 }}
                  className="group relative glass border border-white/5 rounded-[3.5rem] overflow-hidden transition-all duration-700 shadow-2xl hover:border-primary/40"
                >
                  <div className="relative aspect-[4/5] overflow-hidden m-2.5 rounded-[2.5rem]">
                    <Link href={`/marketplace/${product.id}`}>
                      <img 
                        src={product.images?.[0]?.startsWith('http') ? product.images[0] : `/images/${product.images?.[0] || 'placeholder.jpg'}`} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0" 
                      />
                    </Link>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
                    
                    <button className="absolute top-6 right-6 w-12 h-12 glass border border-white/10 rounded-2xl text-white flex items-center justify-center hover:bg-primary transition-all duration-500 z-10">
                      <Heart size={18} className="group-hover:scale-110 transition-transform" />
                    </button>

                    <div className="absolute bottom-8 left-8 right-8 z-20 space-y-4">
                        <Link href={`/marketplace/${product.id}`}>
                          <h3 className="text-white font-black text-2xl tracking-tighter uppercase italic line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                        </Link>
                         <div className="flex flex-col space-y-5">
                            <div className="flex items-center justify-between">
                               <div className="flex items-center space-x-4">
                                  <span className="text-3xl font-black text-primary italic tracking-tighter">${Number(discountedPrice).toFixed(2)}</span>
                                  <span className="text-[11px] text-white/20 font-black line-through italic">${Number(originalPrice).toFixed(2)}</span>
                               </div>
                               <div className="text-[11px] font-black text-white/40 italic uppercase tracking-[0.2em]">
                                 -{discountPercent}%
                               </div>
                            </div>
                            <Link 
                               href={generateWhatsAppLink(
                                 product.name, 
                                 originalPrice,
                                 discountPercent,
                                 discountedPrice,
                                 session?.user?.email || undefined,
                                 product.seller?.contactInfo
                               )}
                               target="_blank"
                               className="w-full"
                            >
                              <Button className="w-full h-14 rounded-[2rem] buy-now-premium text-[10px] group/btn">
                                 <Zap size={18} className="mr-3 group-hover/btn:rotate-12 transition-transform" />
                                 BUY NOW • BRAND STORE
                              </Button>
                            </Link>
                         </div>
                    </div>
                  </div>

                  <div className="px-10 pb-10 pt-4">
                    <div className="space-y-4">
                       <div className="flex justify-between text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.4em] italic">
                          <span>LOCKED PROTOCOL</span>
                          <span className="text-primary animate-pulse">ACTIVE</span>
                       </div>
                       <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full luxury-gradient rounded-full relative" 
                          />
                       </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-32 flex justify-center">
           <Link href="/marketplace">
            <Button variant="outline" className="h-20 px-16 rounded-[2rem] border-white/5 glass font-black tracking-[0.4em] text-[11px] uppercase hover:bg-white/5 flex items-center group shadow-2xl transition-all italic">
                RETURN TO FULL MARKET 
                <ArrowRight size={18} className="ml-4 group-hover:translate-x-3 transition-transform duration-500" />
            </Button>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default FlashSalePage;
