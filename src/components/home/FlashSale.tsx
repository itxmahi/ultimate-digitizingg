"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, Zap, ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
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

  const dummyProducts = [
    { id: 1, name: "Premium Floral Pattern", price: 49.99, salePrice: 19.99, image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&auto=format&fit=crop&q=60", discount: "60%" },
    { id: 2, name: "Luxury Gold Crest", price: 89.99, salePrice: 34.99, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60", discount: "65%" },
    { id: 3, name: "Cyberpunk Tech Stitch", price: 59.99, salePrice: 24.99, image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&auto=format&fit=crop&q=60", discount: "58%" },
    { id: 4, name: "Vintage Royal Emblem", price: 129.99, salePrice: 59.99, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&auto=format&fit=crop&q=60", discount: "55%" },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-primary">
               <Zap size={24} fill="currentColor" />
               <span className="text-xs font-black uppercase tracking-[0.3em]">Timed Offer</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">FLASH <span className="text-gradient">SALE.</span></h2>
            <p className="text-muted-foreground text-lg max-w-lg font-medium leading-relaxed">
              Limited edition digital assets and premium digitizing services at unprecedented prices. 
            </p>
          </div>

          <div className="flex items-center space-x-6 bg-white/5 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10 shadow-xl">
            <div className="flex space-x-4">
              {[
                { val: timeLeft.hours, label: "HRS" },
                { val: timeLeft.minutes, label: "MIN" },
                { val: timeLeft.seconds, label: "SEC" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-background/50 rounded-2xl flex items-center justify-center border border-white/5 mb-2 shadow-inner">
                    <span className="text-2xl font-black">{item.val.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dummyProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15 }}
              className="group relative bg-card rounded-[3rem] overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-6 left-6 bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full shadow-2xl z-10 tracking-widest">
                  {product.discount} OFF
                </div>
                
                <button className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl text-white flex items-center justify-center hover:bg-primary transition-all duration-300 z-10 border border-white/10">
                  <Heart size={20} />
                </button>

                <div className="absolute bottom-6 left-6 right-6 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 z-10">
                   <Button className="w-full h-14 rounded-2xl luxury-gradient border-none text-white font-black text-sm shadow-2xl">
                      QUICK ADD
                   </Button>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-black text-xl leading-tight group-hover:text-primary transition-colors truncate pr-2">{product.name}</h3>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary leading-none">${product.salePrice}</p>
                    <p className="text-sm text-muted-foreground line-through mt-1 leading-none">${product.price}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                   <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      <span>Available: 12</span>
                      <span>85% Sold</span>
                   </div>
                   <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full luxury-gradient rounded-full" 
                      />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
           <Button variant="outline" className="h-16 px-10 rounded-2xl border-white/10 font-black tracking-widest text-xs hover:bg-white/5 flex items-center">
              VIEW ALL OFFERS <ArrowRight size={16} className="ml-3" />
           </Button>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
