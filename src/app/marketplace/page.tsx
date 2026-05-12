"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  LayoutGrid, 
  List,
  Star,
  ShoppingCart,
  Heart,
  SlidersHorizontal,
  Zap,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";

const Marketplace = () => {
  const { data: session } = useSession();
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.seller?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-24 relative overflow-hidden">
      {/* Background Section Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header & Search - "HEAVY" LOOK */}
        <div className="mb-24 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-primary">
                 <Zap size={16} className="animate-pulse" fill="currentColor" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">GLOBAL ASSET PROTOCOL</span>
              </div>
              <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.75] uppercase italic">
                DIGITAL <br /><span className="text-gradient NOT-italic">MARKET.</span>
              </h1>
            </div>
            <p className="text-muted-foreground/60 text-xl max-w-sm font-medium leading-relaxed italic">
              Access the world's most advanced repository of high-precision embroidery assets and digitizing protocols.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full group">
              <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="INITIALIZE ASSET SEARCH..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] pl-16 pr-8 py-7 focus:ring-4 ring-primary/10 transition-all text-sm font-black uppercase tracking-widest outline-none shadow-inner"
              />
            </div>
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <Button variant="outline" className="h-20 px-10 rounded-[2rem] glass border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all italic">
                <SlidersHorizontal size={20} className="mr-3" />
                FILTER ENGINE
              </Button>
              <div className="glass rounded-[2rem] p-1.5 flex items-center space-x-1.5">
                <button 
                  onClick={() => setViewType("grid")}
                  className={`p-4 rounded-[1.5rem] transition-all duration-500 ${viewType === 'grid' ? 'bg-primary text-white shadow-2xl' : 'text-muted-foreground/40 hover:text-white'}`}
                >
                  <LayoutGrid size={22} />
                </button>
                <button 
                  onClick={() => setViewType("list")}
                  className={`p-4 rounded-[1.5rem] transition-all duration-500 ${viewType === 'list' ? 'bg-primary text-white shadow-2xl' : 'text-muted-foreground/40 hover:text-white'}`}
                >
                  <List size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Sidebar Filters - "PROTOCOLS" */}
          <aside className="w-full lg:w-72 space-y-16 hidden lg:block">
            <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-12">
              <div>
                <h3 className="font-black uppercase tracking-[0.4em] text-[10px] text-primary mb-8 italic flex items-center">
                  <Filter size={14} className="mr-3" /> SECTORS
                </h3>
                <div className="space-y-4">
                  {["All Designs", "3D Puff", "Applique", "Cap Designs", "Small Text", "Jackets Back"].map((cat) => (
                    <label key={cat} className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-all">
                        <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer" />
                        <div className="w-2.5 h-2.5 rounded-sm bg-primary scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover:text-primary transition-colors italic">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-black uppercase tracking-[0.4em] text-[10px] text-primary mb-8 italic flex items-center">
                  <SlidersHorizontal size={14} className="mr-3" /> THRESHOLD
                </h3>
                <div className="space-y-6">
                  <div className="h-1.5 bg-white/5 rounded-full relative">
                    <div className="absolute inset-y-0 left-0 right-1/4 bg-primary rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
                    <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-2xl border-4 border-primary" />
                  </div>
                  <div className="flex justify-between text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest italic">
                    <span>$0.00</span>
                    <span>$500.00</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-black uppercase tracking-[0.4em] text-[10px] text-primary mb-8 italic flex items-center">
                  <Star size={14} className="mr-3" /> RATING
                </h3>
                <div className="space-y-4">
                  {[5, 4, 3].map((r) => (
                    <label key={r} className="flex items-center space-x-4 cursor-pointer group">
                      <input type="checkbox" className="hidden" />
                      <div className="flex text-yellow-500/40 group-hover:text-yellow-500 transition-colors">
                        {Array(r).fill(0).map((_, i) => <Star key={i} size={12} fill="currentColor" className="mr-1" />)}
                      </div>
                      <span className="text-[10px] font-black text-muted-foreground/40 group-hover:text-white transition-colors italic">& UP</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-10 rounded-[3rem] glass border border-primary/20 bg-primary/[0.02]">
               <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-4 text-primary">Priority Support</h4>
               <p className="text-[10px] font-bold text-muted-foreground/60 leading-relaxed italic">Get instant access to elite digitizing consultants for your custom enterprise needs.</p>
               <Button variant="link" className="p-0 h-auto mt-6 text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors italic">Contact Intel <ArrowRight size={12} className="ml-2" /></Button>
            </div>
          </aside>

          {/* Product Grid - "ASSETS" */}
          <div className="flex-1 space-y-12">
             <div className="flex justify-between items-center mb-12">
                <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em] italic">DEPLOYING <span className="text-white">{filteredProducts.length}</span> ACTIVE PROTOCOLS</p>
                <div className="flex items-center space-x-4">
                   <span className="text-[10px] font-black text-muted-foreground/20 uppercase tracking-[0.2em] italic">ORDER BY:</span>
                   <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest p-0 h-auto hover:bg-transparent flex items-center text-primary italic">
                      FEATURED <ChevronDown size={14} className="ml-2" />
                   </Button>
                </div>
             </div>

             <div className={`grid gap-10 ${viewType === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {loading ? (
                   <div className="col-span-full py-40 flex flex-col items-center justify-center space-y-6">
                      <Loader2 size={60} className="animate-spin text-primary" />
                      <p className="text-[11px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 italic animate-pulse">Synchronizing with global asset stream...</p>
                   </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="col-span-full py-40 text-center">
                    <p className="text-[11px] font-black uppercase tracking-[0.5em] text-muted-foreground/20 italic">No assets detected in sector.</p>
                  </div>
                ) : filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    whileHover={{ y: -15, scale: 1.02 }}
                    className={`group relative glass rounded-[3.5rem] border border-white/5 overflow-hidden transition-all duration-700 hover:border-primary/40 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] ${viewType === 'list' ? 'flex items-center p-6' : ''}`}
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <Link href={`/marketplace/${product.id}`} className={`relative overflow-hidden bg-white/[0.02] ${viewType === 'list' ? 'w-64 h-64 rounded-[2.5rem] flex-shrink-0' : 'aspect-square'}`}>
                      <img src={product.images?.[0] || "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&auto=format&fit=crop&q=60"} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-3 transition-all duration-1000 grayscale group-hover:grayscale-0" />
                      <div className="absolute top-6 left-6 bg-primary text-white text-[9px] font-black px-4 py-1.5 rounded-full shadow-2xl z-10 uppercase tracking-[0.2em] flex items-center italic">
                        <Zap size={10} className="mr-2 animate-pulse" fill="currentColor" /> ELITE ASSET
                      </div>
                      <button className="absolute top-6 right-6 w-12 h-12 glass border border-white/10 rounded-2xl text-white hover:bg-primary transition-all opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 flex items-center justify-center">
                        <Heart size={18} />
                      </button>
                    </Link>

                    <div className={`p-10 relative z-10 ${viewType === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/10 italic">{product.category}</span>
                        <div className="flex items-center text-yellow-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                          <Star size={12} fill="currentColor" />
                          <span className="ml-2 text-[10px] font-black">4.9</span>
                        </div>
                      </div>
                      <Link href={`/marketplace/${product.id}`}>
                        <h3 className="text-2xl font-black mb-2 tracking-tighter uppercase italic group-hover:text-primary transition-colors duration-500 line-clamp-1">{product.name}</h3>
                      </Link>
                      <p className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-widest mb-8 italic">ENGINEERED BY <span className="text-muted-foreground/80 hover:text-primary cursor-pointer transition-colors">{product.seller?.name || "ULTIMATE"}</span></p>
                      
                      <div className="flex items-center justify-between">
                         <div className="flex flex-col">
                            {product.flashSale && product.flashSale.isActive ? (
                              <div className="flex flex-col">
                                <span className="text-3xl font-black tracking-tighter italic text-primary">${Number(product.flashSale.discountPrice).toFixed(2)}</span>
                                <span className="text-[10px] text-muted-foreground/30 font-black line-through italic">${Number(product.price).toFixed(2)}</span>
                              </div>
                            ) : (
                              <span className="text-3xl font-black tracking-tighter italic text-primary">${Number(product.price).toFixed(2)}</span>
                            )}
                         </div>
                         <Link 
                           href={generateWhatsAppLink(
                             product.name, 
                             product.flashSale?.isActive ? product.flashSale.discountPrice : product.price, 
                             session?.user?.email || undefined,
                             product.seller?.contactInfo
                           )}
                           target="_blank"
                         >
                           <Button className="h-14 px-8 rounded-2xl luxury-gradient border-none text-white shadow-2xl hover:scale-105 active:scale-95 transition-all">
                             <Zap size={18} className="mr-3" />
                             <span className="text-[10px] font-black uppercase tracking-widest">BUY NOW</span>
                           </Button>
                         </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
             </div>

             {/* Pagination - "DEPLOYMENT PHASES" */}
             <div className="mt-32 flex justify-center space-x-4">
                {[1, 2, 3, "...", 12].map((p, i) => (
                  <button key={i} className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-[10px] uppercase tracking-widest transition-all duration-500 border ${p === 1 ? 'bg-primary border-primary text-white shadow-[0_20px_40px_rgba(37,99,235,0.4)] scale-110' : 'glass border-white/5 text-muted-foreground/40 hover:text-white hover:border-white/20'}`}>
                    {p}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
