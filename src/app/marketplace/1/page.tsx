"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RefreshCcw, 
  MessageCircle,
  Play,
  Maximize2,
  CheckCircle2,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80",
  ];

  const startSimulation = () => {
    setIsSimulating(true);
    setSimulationProgress(0);
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Image Gallery & Preview */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-card border border-border group">
              <AnimatePresence mode="wait">
                {!isSimulating ? (
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={images[selectedImage]}
                    alt="Product"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#0F172A] relative">
                    {/* Stitch Simulation Animation */}
                    <div className="relative w-64 h-64 border-2 border-primary/20 rounded-full flex items-center justify-center overflow-hidden">
                       <svg className="w-full h-full rotate-[-90deg]">
                          <circle
                            cx="128"
                            cy="128"
                            r="120"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-primary/10"
                          />
                          <circle
                            cx="128"
                            cy="128"
                            r="120"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray="753.6"
                            strokeDashoffset={753.6 - (753.6 * simulationProgress) / 100}
                            className="text-primary transition-all duration-100 ease-linear"
                          />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                          <span className="text-4xl font-black">{simulationProgress}%</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Stitching...</span>
                       </div>
                    </div>
                    {/* Simulated "Thread" particles */}
                    {simulationProgress > 0 && Array(10).fill(0).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          x: [Math.random() * 200 - 100, Math.random() * 200 - 100], 
                          y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                          opacity: [0, 1, 0] 
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute w-1 h-4 bg-primary rounded-full"
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
                 <Button 
                   onClick={startSimulation}
                   disabled={isSimulating}
                   className="rounded-full px-6 luxury-gradient border-none text-white shadow-2xl h-12"
                 >
                    <Play size={18} className="mr-2 fill-current" />
                    Simulate Stitch
                 </Button>
                 <Button variant="outline" className="rounded-full w-12 h-12 p-0 glass border-white/10 text-white">
                    <Maximize2 size={18} />
                 </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedImage(i); setIsSimulating(false); }}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-primary shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                 <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">New Arrival</span>
                 <div className="flex items-center text-yellow-500 bg-yellow-500/10 px-4 py-1.5 rounded-full">
                    <Star size={14} fill="currentColor" />
                    <span className="ml-1 text-xs font-black">4.9 (128 Reviews)</span>
                 </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">Premium Floral Pattern - 3D Puff Series</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Experience the highest quality embroidery digitizing with our 3D Puff Floral Series. Perfectly optimized for caps, jackets, and high-end apparel. This design features over 15,000 stitches of pure precision.
              </p>
            </div>

            <div className="flex items-end space-x-4">
               <span className="text-5xl font-black">$19.99</span>
               <span className="text-xl text-muted-foreground line-through mb-1.5">$49.99</span>
               <span className="text-green-500 font-bold mb-1.5 bg-green-500/10 px-3 py-1 rounded-full text-xs">60% OFF</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-secondary/50 p-6 rounded-3xl border border-border">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Stitch Count</p>
                  <p className="text-xl font-bold">15,420</p>
               </div>
               <div className="bg-secondary/50 p-6 rounded-3xl border border-border">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Colors</p>
                  <p className="text-xl font-bold">4 Colors</p>
               </div>
               <div className="bg-secondary/50 p-6 rounded-3xl border border-border">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">File Formats</p>
                  <p className="text-sm font-bold">DST, PES, JEF, EXP</p>
               </div>
               <div className="bg-secondary/50 p-6 rounded-3xl border border-border">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Optimized For</p>
                  <p className="text-sm font-bold">3D Puff / Caps</p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <Button className="flex-1 h-16 rounded-[1.5rem] text-lg font-black luxury-gradient border-none text-white shadow-2xl hover:scale-105 transition-transform">
                  <ShoppingCart size={22} className="mr-3" />
                  Add to Cart
               </Button>
               <Button variant="outline" className="flex-1 h-16 rounded-[1.5rem] text-lg font-black border-2 border-primary/20 hover:bg-primary/5">
                  <Heart size={22} className="mr-3" />
                  Wishlist
               </Button>
            </div>

            <Button className="w-full h-16 rounded-[1.5rem] text-lg font-black bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-xl flex items-center justify-center">
               <MessageCircle size={24} className="mr-3 fill-current" />
               Order via WhatsApp
            </Button>

            <div className="pt-8 space-y-4 border-t border-border">
               {[
                 { icon: <ShieldCheck className="text-primary" />, text: "Verified Quality Digitizing" },
                 { icon: <Zap className="text-primary" />, text: "Instant Digital Download" },
                 { icon: <RefreshCcw className="text-primary" />, text: "24-Hour Edit Support" },
               ].map((item, i) => (
                 <div key={i} className="flex items-center space-x-3">
                   {item.icon}
                   <span className="text-sm font-bold">{item.text}</span>
                 </div>
               ))}
            </div>

            {/* Seller Info */}
            <div className="p-8 bg-card border border-border rounded-[2.5rem] mt-12">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                     <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop" className="w-16 h-16 rounded-2xl object-cover" alt="Seller" />
                     <div>
                        <h4 className="text-xl font-black">StitchPro Studio</h4>
                        <p className="text-xs text-muted-foreground font-bold">Joined Jan 2024 • 1.2K Sales</p>
                     </div>
                  </div>
                  <Button variant="outline" className="rounded-xl font-bold">Follow</Button>
               </div>
               <div className="flex items-center justify-between text-center pt-6 border-t border-border">
                  <div>
                     <p className="text-lg font-black">4.9</p>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Rating</p>
                  </div>
                  <div className="w-[1px] h-8 bg-border" />
                  <div>
                     <p className="text-lg font-black">98%</p>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Response</p>
                  </div>
                  <div className="w-[1px] h-8 bg-border" />
                  <div>
                     <p className="text-lg font-black">2h</p>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Delivery</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
