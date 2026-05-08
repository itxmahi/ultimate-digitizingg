"use client";

import React, { useState } from "react";
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
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Marketplace = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  
  const products = [
    { id: 1, name: "Premium Floral Pattern", price: 19.99, rating: 4.9, reviews: 128, seller: "StitchPro", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&auto=format&fit=crop&q=60", category: "Floral" },
    { id: 2, name: "Luxury Gold Crest", price: 34.99, rating: 4.8, reviews: 85, seller: "RoyalDesigns", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60", category: "Emblems" },
    { id: 3, name: "Cyberpunk Tech Stitch", price: 24.99, rating: 5.0, reviews: 42, seller: "FutureArt", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&auto=format&fit=crop&q=60", category: "Tech" },
    { id: 4, name: "Vintage Royal Emblem", price: 59.99, rating: 4.7, reviews: 210, seller: "HistoryStitch", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&auto=format&fit=crop&q=60", category: "Vintage" },
    { id: 5, name: "Dragon Master Design", price: 79.99, rating: 4.9, reviews: 67, seller: "MythicArts", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60", category: "Fantasy" },
    { id: 6, name: "Corporate Logo Pack", price: 15.99, rating: 4.6, reviews: 340, seller: "BizStitch", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=60", category: "Logo" },
  ];

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Search */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-6">Marketplace</h1>
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search for designs, digitizers, categories..." 
                className="w-full bg-secondary/50 border border-border rounded-2xl pl-12 pr-4 py-4 focus:ring-2 ring-primary/20 transition-all text-lg"
              />
            </div>
            <div className="flex items-center space-x-3 w-full lg:w-auto">
              <Button variant="outline" className="h-14 rounded-2xl flex-1 lg:flex-none font-bold">
                <SlidersHorizontal size={20} className="mr-2" />
                Filters
              </Button>
              <div className="bg-secondary rounded-2xl p-1 flex items-center space-x-1">
                <button 
                  onClick={() => setViewType("grid")}
                  className={`p-3 rounded-xl transition-all ${viewType === 'grid' ? 'bg-white dark:bg-[#0F172A] shadow-md text-primary' : 'text-muted-foreground'}`}
                >
                  <LayoutGrid size={20} />
                </button>
                <button 
                  onClick={() => setViewType("list")}
                  className={`p-3 rounded-xl transition-all ${viewType === 'list' ? 'bg-white dark:bg-[#0F172A] shadow-md text-primary' : 'text-muted-foreground'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-10 hidden lg:block">
            <div>
              <h3 className="font-black uppercase tracking-widest text-xs text-muted-foreground mb-6">Categories</h3>
              <div className="space-y-3">
                {["All Designs", "3D Puff", "Applique", "Cap Designs", "Small Text", "Jackets Back"].map((cat) => (
                  <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary/20" />
                    <span className="text-sm font-bold group-hover:text-primary transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black uppercase tracking-widest text-xs text-muted-foreground mb-6">Price Range</h3>
              <div className="space-y-4">
                <input type="range" className="w-full accent-primary" />
                <div className="flex justify-between text-xs font-black">
                  <span>$0</span>
                  <span>$500</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-black uppercase tracking-widest text-xs text-muted-foreground mb-6">Rating</h3>
              <div className="space-y-3">
                {[5, 4, 3].map((r) => (
                  <label key={r} className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary/20" />
                    <div className="flex text-yellow-500">
                      {Array(r).fill(0).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <span className="text-xs font-bold">& Up</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
             <div className="flex justify-between items-center mb-8">
                <p className="text-sm text-muted-foreground font-bold">Showing <span className="text-foreground">2,450</span> results</p>
                <div className="flex items-center space-x-2">
                   <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort By:</span>
                   <Button variant="ghost" className="text-sm font-black p-0 h-auto hover:bg-transparent flex items-center">
                      Featured <ChevronDown size={16} className="ml-1" />
                   </Button>
                </div>
             </div>

             <div className={`grid gap-8 ${viewType === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    whileHover={{ y: -10 }}
                    className={`group bg-card rounded-[2.5rem] border border-border overflow-hidden transition-all hover:shadow-2xl ${viewType === 'list' ? 'flex items-center p-4' : ''}`}
                  >
                    <div className={`relative overflow-hidden bg-secondary ${viewType === 'list' ? 'w-48 h-48 rounded-2xl flex-shrink-0' : 'aspect-square'}`}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all">
                        <Heart size={18} />
                      </button>
                    </div>
                    <div className={`p-8 ${viewType === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">{product.category}</span>
                        <div className="flex items-center text-yellow-500">
                          <Star size={14} fill="currentColor" />
                          <span className="ml-1 text-xs font-black">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-6">by <span className="font-bold text-foreground hover:underline cursor-pointer">{product.seller}</span></p>
                      
                      <div className="flex items-center justify-between">
                         <span className="text-2xl font-black">${product.price}</span>
                         <Button className="rounded-2xl luxury-gradient border-none text-white shadow-lg">
                           <ShoppingCart size={18} className="mr-2" />
                           Add to Cart
                         </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
             </div>

             {/* Pagination Placeholder */}
             <div className="mt-20 flex justify-center space-x-2">
                {[1, 2, 3, "...", 12].map((p, i) => (
                  <button key={i} className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${p === 1 ? 'bg-primary text-white shadow-lg' : 'hover:bg-secondary text-muted-foreground'}`}>
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
