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
  Heart,
  SlidersHorizontal,
  Zap,
  ArrowRight,
  MessageCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Marketplace = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceThreshold, setPriceThreshold] = useState(500);
  const whatsappNumber = "03217200848";

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

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.seller?.name || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesPrice = Number(p.isFlashSale ? p.discountedPrice : p.price) <= priceThreshold;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const topFiveProducts = filteredProducts.slice(0, 5);
  const curatedCardMeta = [
    { name: "Signature Custom Logo Design", category: "Custom Logo" },
    { name: "Premium Cap Stitch Design", category: "Cap Stitch" },
    { name: "Luxury Applique Embroidery Design", category: "Applique" },
    { name: "Elite 3D Puff Embroidery Design", category: "3D Puff" },
    { name: "Royal 3D Puff Lettering Design", category: "3D Puff" },
  ];
  const cardImages = [
    "/images/Box1.jpg",
    "/images/Box2.jpg",
    "/images/Box3.jpg",
    "/images/Box4.jpg",
    "/images/Box5.png",
  ];
  const fallbackProducts = cardImages.map((_, index) => ({
    id: `box-${index + 1}`,
    name: curatedCardMeta[index].name,
    category: curatedCardMeta[index].category,
    seller: { name: "ULTIMATE" },
    price: 30 + index * 5,
    isFlashSale: false,
    discountedPrice: null,
    originalPrice: null,
  }));
  const displayProducts = topFiveProducts.length > 0 ? topFiveProducts : fallbackProducts;

  const getWhatsAppLink = (productName: string, price: number) => {
    const message = `Hi, I want to buy this premium product: ${productName}. Price: $${price.toFixed(2)}.`;
    const cleanNumber = whatsappNumber.replace(/\D/g, "");
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

  const getProfessionalDescription = (product: any, index: number) => {
    const descriptions = [
      "Bespoke logo digitizing with crisp outlines and balanced stitch density—ideal for polos, uniforms, and merchandise.",
      "Structured cap-front embroidery with stable underlay and clean curves for Richardson-style caps and curved panels.",
      "Layered applique workflow with neat satin borders and dimensional depth for luxury streetwear and jackets.",
      "High-rise puff embroidery with controlled loft and smooth fills—built for bold logos that pop off the fabric.",
      "Premium puff lettering with consistent column width and sharp corners—perfect for names, numbers, and varsity styles.",
    ];

    if (product?.description && product.description.trim().length > 10) {
      return product.description;
    }

    return descriptions[index % descriptions.length];
  };

  return (
    <div className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
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
              Access the world&apos;s most advanced repository of high-precision embroidery assets and digitizing protocols.
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
                  className={`p-4 rounded-[1.5rem] transition-all duration-500 ${viewType === "grid" ? "bg-primary text-white shadow-2xl" : "text-muted-foreground/40 hover:text-white"}`}
                >
                  <LayoutGrid size={22} />
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className={`p-4 rounded-[1.5rem] transition-all duration-500 ${viewType === "list" ? "bg-primary text-white shadow-2xl" : "text-muted-foreground/40 hover:text-white"}`}
                >
                  <List size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          <aside className="w-full lg:w-72 space-y-16 hidden lg:block">
            <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-12">
              <div>
                <h3 className="font-black uppercase tracking-[0.4em] text-[10px] text-primary mb-8 italic flex items-center">
                  <Filter size={14} className="mr-3" /> SECTORS
                </h3>
                <div className="space-y-4">
                  {["3D Puff", "Applique", "Cap Designs", "Small Text", "Jackets Back"].map((cat) => (
                    <label key={cat} className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-all">
                        <input
                          type="checkbox"
                          className="opacity-0 absolute inset-0 cursor-pointer"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                        />
                        <div className={`w-2.5 h-2.5 rounded-sm bg-primary transition-transform ${selectedCategories.includes(cat) ? "scale-100" : "scale-0"}`} />
                      </div>
                      <span className={`text-[11px] font-black uppercase tracking-widest transition-colors italic ${selectedCategories.includes(cat) ? "text-primary" : "text-muted-foreground/60 group-hover:text-primary"}`}>{cat}</span>
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
                    <div
                      className="absolute inset-y-0 left-0 bg-primary rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                      style={{ width: `${(priceThreshold / 500) * 100}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceThreshold}
                      onChange={(e) => setPriceThreshold(parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-2xl border-4 border-primary pointer-events-none"
                      style={{ left: `calc(${(priceThreshold / 500) * 100}% - 10px)` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest italic">
                    <span>$0.00</span>
                    <span className="text-primary">${priceThreshold}.00</span>
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

          <div className="flex-1 space-y-12">
            <div className="flex justify-between items-center mb-12">
              <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em] italic">DEPLOYING <span className="text-white">{displayProducts.length}</span> ACTIVE PROTOCOLS</p>
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-black text-muted-foreground/20 uppercase tracking-[0.2em] italic">ORDER BY:</span>
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest p-0 h-auto hover:bg-transparent flex items-center text-primary italic">
                  FEATURED <ChevronDown size={14} className="ml-2" />
                </Button>
              </div>
            </div>

            <div className={`grid gap-6 ${viewType === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {loading ? (
                <div className="col-span-full py-40 flex flex-col items-center justify-center space-y-6">
                  <Loader2 size={60} className="animate-spin text-primary" />
                  <p className="text-[11px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 italic animate-pulse">Synchronizing with global asset stream...</p>
                </div>
              ) : displayProducts.map((product, index) => (
                (() => {
                  const displayName = curatedCardMeta[index]?.name || product.name;
                  const displayCategory = curatedCardMeta[index]?.category || product.category;
                  return (
                <motion.div
                  key={product.id}
                  layout
                  whileHover={{ y: -6, scale: 1.01 }}
                  className={`group relative rounded-2xl border border-slate-700/70 bg-slate-950 overflow-hidden transition-all duration-300 hover:border-slate-500 hover:shadow-[0_10px_24px_rgba(0,0,0,0.28)] ${viewType === "list" ? "flex items-center p-4" : ""}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <Link href={String(product.id).startsWith("box-") ? "/marketplace" : `/marketplace/${product.id}`} className={`relative overflow-hidden bg-slate-900 ${viewType === "list" ? "w-56 h-56 rounded-xl flex-shrink-0" : "aspect-[4/5]"}`}>
                    <img src={cardImages[index]} alt={displayName} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className={`pointer-events-none absolute bottom-[3.25rem] left-3 right-3 z-10 ${viewType === "list" ? "hidden" : ""}`}>
                      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-400/90">{displayCategory}</p>
                      <p className="mt-0.5 text-sm font-semibold leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] line-clamp-2">{displayName}</p>
                    </div>
                    <Link
                      href={getWhatsAppLink(
                        displayName,
                        Number(product.isFlashSale ? product.discountedPrice : product.price)
                      )}
                      target="_blank"
                      className="absolute bottom-3 left-3 right-3 z-20"
                    >
                      <Button className="w-full h-10 rounded-xl border border-emerald-300/50 bg-emerald-600 text-white text-[11px] font-semibold tracking-normal shadow-[0_6px_18px_rgba(16,185,129,0.3)] hover:bg-emerald-500 active:scale-[0.98] transition-all duration-200">
                        <MessageCircle size={13} className="mr-1.5" />
                        Buy Now
                      </Button>
                    </Link>
                    <button className="absolute top-6 right-6 w-11 h-11 rounded-xl border border-white/20 bg-black/35 text-white hover:bg-primary/90 transition-all opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 flex items-center justify-center z-20">
                      <Heart size={18} />
                    </button>
                  </Link>

                  <div className={`p-4 relative z-10 ${viewType === "list" ? "flex-1" : ""}`}>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-medium text-primary bg-primary/10 px-3 py-1 rounded-md border border-primary/20">{displayCategory}</span>
                      <div className="flex items-center text-yellow-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        <Star size={12} fill="currentColor" />
                        <span className="ml-2 text-[11px] font-semibold">4.9</span>
                      </div>
                    </div>
                    <Link href={String(product.id).startsWith("box-") ? "/marketplace" : `/marketplace/${product.id}`}>
                      <h3 className="text-[15px] sm:text-base font-semibold mb-1 tracking-tight text-slate-50 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">{displayName}</h3>
                    </Link>
                    <p className="text-[11px] text-slate-400 mb-2">by <span className="text-slate-200 hover:text-primary cursor-pointer transition-colors">{product.seller?.name || "Ultimate"}</span></p>
                    <p className="text-[12px] leading-relaxed text-slate-300/90 mb-4 line-clamp-2">
                      {getProfessionalDescription(product, index)}
                    </p>

                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          {product.isFlashSale ? (
                            <div className="flex flex-col">
                              <span className="text-2xl font-bold tracking-tight text-white">${Number(product.discountedPrice).toFixed(2)}</span>
                              <span className="text-[11px] text-slate-500 line-through">${Number(product.originalPrice).toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="text-2xl font-bold tracking-tight text-white">${Number(product.price).toFixed(2)}</span>
                          )}
                        </div>
                        <Link href={String(product.id).startsWith("box-") ? "/marketplace" : `/marketplace/${product.id}`} className="text-[11px] font-medium text-primary hover:text-white transition-colors">
                          View details
                        </Link>
                      </div>

                      <Link 
                        href={getWhatsAppLink(displayName, Number(product.isFlashSale ? product.discountedPrice : product.price))} 
                        target="_blank"
                        className="block w-full"
                      >
                        <Button className="w-full h-11 rounded-xl border border-emerald-300/50 bg-emerald-600 text-white text-[12px] font-semibold tracking-normal shadow-[0_8px_20px_rgba(16,185,129,0.32)] hover:bg-emerald-500 active:scale-[0.99] transition-all duration-200 group/btn">
                          <MessageCircle size={16} className="mr-2" />
                          Buy Now on WhatsApp
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
                  );
                })()
              ))}
            </div>

            <div className="mt-32 flex justify-center space-x-4">
              {[1, 2, 3, "...", 12].map((p, i) => (
                <button key={i} className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-[10px] uppercase tracking-widest transition-all duration-500 border ${p === 1 ? "bg-primary border-primary text-white shadow-[0_20px_40px_rgba(37,99,235,0.4)] scale-110" : "glass border-white/5 text-muted-foreground/40 hover:text-white hover:border-white/20"}`}>
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
