"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
  Zap,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";

const ProductDetails = () => {
  const productIsFlash = (p: any) => {
    return p && p.flashSale && typeof p.flashSale === "object" && (p.flashSale as any).isFlashSale;
  };

  const { id } = useParams();
  const { data: session } = useSession();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

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

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <p className="text-white font-black uppercase tracking-widest italic">Asset not found in the stream.</p>
    </div>
  );

  const currentPrice = product.flashSale?.isActive ? product.flashSale.discountPrice : product.price;

  return (
    <div className="py-24 bg-background min-h-screen relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: Image Gallery & Preview */}
          <div className="space-y-8">
            <div className="relative aspect-square rounded-[4rem] overflow-hidden bg-white/[0.02] border border-white/5 group shadow-2xl">
              <AnimatePresence mode="wait">
                {!isSimulating ? (
                    <motion.img
                      key={selectedImage}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      src={product.images[selectedImage]?.startsWith('http') ? product.images[selectedImage] : `/images/${product.images[selectedImage] || 'placeholder.jpg'}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#020617] relative">
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
                          <span className="text-5xl font-black italic">{simulationProgress}%</span>
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Stitching...</span>
                       </div>
                    </div>
                  </div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
                 <Button 
                   onClick={startSimulation}
                   disabled={isSimulating}
                   className="rounded-2xl px-8 luxury-gradient border-none text-white shadow-2xl h-14 font-black text-[10px] uppercase tracking-widest italic"
                 >
                    <Play size={18} className="mr-3 fill-current" />
                    SIMULATE RENDER
                 </Button>
              </div>
            </div>

            <div className="flex space-x-6 overflow-x-auto pb-4 custom-scrollbar">
              {product.images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => { setSelectedImage(i); setIsSimulating(false); }}
                  className={`relative w-28 h-28 rounded-[2rem] flex-shrink-0 overflow-hidden border-2 transition-all duration-500 ${selectedImage === i ? 'border-primary shadow-[0_20px_40px_rgba(37,99,235,0.3)] scale-105' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                 <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 italic">{product.category}</span>
                 {product.flashSale?.isActive && (
                   <span className="text-[9px] font-black uppercase tracking-[0.3em] text-chart-4 bg-chart-4/10 px-5 py-2 rounded-full border border-chart-4/20 italic">Elite Offer</span>
                 )}
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase italic leading-none">{product.name}</h1>
              <div className="flex items-center text-yellow-500 space-x-2">
                  <Star size={18} fill="currentColor" />
                  <span className="text-sm font-black italic">4.9 RATIO</span>
                  <span className="text-muted-foreground/40 text-xs font-bold uppercase tracking-widest ml-4">Verified Protocol</span>
              </div>
              <p className="text-muted-foreground/60 text-lg md:text-xl leading-relaxed italic font-medium">
                {product.description || "Elite-tier digital embroidery architecture engineered for maximum precision and industrial performance."}
              </p>
            </div>

            <div className="flex items-center space-x-6 bg-white/[0.02] p-8 rounded-[3rem] border border-white/5 shadow-inner">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest mb-2 italic">Valuation</span>
                  <div className="flex items-baseline space-x-4">
                    <span className="text-6xl font-black italic tracking-tighter text-white">${Number(productIsFlash(product) ? product.flashSale.discountedPrice : product.price).toFixed(2)}</span>
                    {productIsFlash(product) && (
                      <span className="text-xl text-muted-foreground/30 line-through font-black italic">${Number(product.flashSale.originalPrice).toFixed(2)}</span>
                    )}
                  </div>
               </div>
               {productIsFlash(product) && (
                 <div className="ml-auto bg-primary text-white text-[10px] font-black px-5 py-2.5 rounded-full shadow-2xl italic uppercase tracking-widest">
                    -{product.discountPercentage}% OFF
                 </div>
               )}
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 space-y-2">
                  <p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.3em] italic">Stitch Count</p>
                  <p className="text-2xl font-black italic">{product.stitchCount?.toLocaleString() || "N/A"}</p>
               </div>
               <div className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 space-y-2">
                  <p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.3em] italic">Density Status</p>
                  <p className="text-2xl font-black italic text-primary">OPTIMIZED</p>
               </div>
            </div>

            <div className="flex flex-col gap-6 pt-6">
               <Link 
                 href={generateWhatsAppLink(
                   product.name, 
                   productIsFlash(product) ? product.flashSale.originalPrice : product.price,
                   productIsFlash(product) ? product.flashSale.discountPercentage : undefined,
                   productIsFlash(product) ? product.flashSale.discountedPrice : product.price,
                   session?.user?.email || undefined,
                   product.seller?.contactInfo
                 )}
                 target="_blank"
                 className="w-full"
               >
                 <Button className="w-full h-24 rounded-[3rem] text-[12px] font-black uppercase tracking-[0.4em] bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-[0_25px_50px_rgba(37,211,102,0.3)] flex items-center justify-center transition-all hover:scale-[1.02] active:scale-95 italic">
                    <MessageCircle size={28} className="mr-6 fill-current" />
                    INITIALIZE ORDER VIA WHATSAPP
                 </Button>
               </Link>
               
               <div className="flex gap-6">
                  <Button variant="outline" className="flex-1 h-20 rounded-[2.5rem] text-[10px] font-black uppercase tracking-widest border-white/10 glass hover:bg-white/5 italic">
                    <Heart size={20} className="mr-3" />
                    WISHLIST
                  </Button>
                  <Button variant="outline" className="flex-1 h-20 rounded-[2.5rem] text-[10px] font-black uppercase tracking-widest border-white/10 glass hover:bg-white/5 italic">
                    <Share2 size={20} className="mr-3" />
                    SHARE ASSET
                  </Button>
               </div>
            </div>

            <div className="pt-10 space-y-6 border-t border-white/5">
               {[
                 { icon: <ShieldCheck className="text-primary" />, text: "Verified Quality Digitizing Protocol" },
                 { icon: <Zap className="text-primary" />, text: "Instant Digital Transmission Post-Auth" },
                 { icon: <RefreshCcw className="text-primary" />, text: "24-Hour Technical Support Stream" },
               ].map((item, i) => (
                 <div key={i} className="flex items-center space-x-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">{item.icon}</div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 italic">{item.text}</span>
                 </div>
               ))}
            </div>

            {/* Seller Branding */}
            <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3.5rem] mt-16 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-6">
                     <img src={product.seller?.user?.image || "https://i.pravatar.cc/100"} className="w-20 h-20 rounded-[1.5rem] object-cover shadow-2xl border border-white/10" alt="Seller" />
                     <div>
                        <h4 className="text-2xl font-black uppercase italic tracking-tighter">{product.seller?.storeName || "Elite Studio"}</h4>
                        <p className="text-[9px] text-muted-foreground/40 font-black uppercase tracking-[0.3em] mt-1 italic">Verified Master Partner</p>
                     </div>
                  </div>
                  <Button variant="outline" className="rounded-2xl h-14 px-8 font-black text-[10px] uppercase tracking-widest italic border-white/10">FOLLOW</Button>
               </div>
               <div className="flex items-center justify-between text-center pt-8 border-t border-white/5">
                  {[
                    { label: "Rating", val: "4.9" },
                    { label: "Success", val: "99%" },
                    { label: "Response", val: "Instant" }
                  ].map((stat, i) => (
                    <div key={i}>
                       <p className="text-2xl font-black italic mb-1">{stat.val}</p>
                       <p className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">{stat.label}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
