"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductsPage = () => {
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase italic">Products</h1>
          <p className="text-muted-foreground font-black text-[10px] uppercase tracking-widest italic">Manage your digitizing portfolio and inventory.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/seller/products/new">
            <Button className="h-14 px-8 rounded-xl luxury-gradient border-none text-white shadow-lg font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all italic">
              <Plus size={18} className="mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="glass rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10" />
        
        <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between relative z-10">
           <div className="relative w-full sm:w-96 group">
              <div className="absolute inset-0 bg-primary/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground relative z-10" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none relative z-10 shadow-inner"
              />
           </div>
           <Button variant="outline" className="rounded-xl h-12 px-6 glass border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all italic">
             <Filter size={16} className="mr-2" />
             Filter
           </Button>
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full">
            <thead className="bg-white/[0.02]">
              <tr>
                <th className="text-left py-6 px-8 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Product</th>
                <th className="text-left py-6 px-8 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Category</th>
                <th className="text-left py-6 px-8 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Price</th>
                <th className="text-left py-6 px-8 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Sales</th>
                <th className="text-left py-6 px-8 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Status</th>
                <th className="text-right py-6 px-8 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Synchronizing Data...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">No assets detected in sector.</p>
                  </td>
                </tr>
              ) : filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-6 px-8">
                    <div className="flex items-center space-x-5">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img src={product.images[0] || "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=100&h=100&fit=crop"} alt={product.name} className="w-14 h-14 rounded-xl object-cover relative z-10 border border-white/10" />
                      </div>
                      <span className="font-black text-[11px] uppercase tracking-tighter leading-tight italic">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-6 px-8 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">{product.category}</td>
                  <td className="py-6 px-8 text-sm italic">
                    {product.discountPrice ? (
                      <div className="flex flex-col">
                        <span className="font-black text-primary">${product.discountPrice.toFixed(2)}</span>
                        <span className="text-[9px] text-muted-foreground/40 line-through">${product.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="font-black">${product.price.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="py-6 px-8 text-sm font-black italic">124</td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/20">
                      Active
                    </span>
                  </td>
                  <td className="py-6 px-8 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl glass border border-white/5 text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"><Edit size={16} /></Button>
                      <Button 
                        onClick={() => handleDelete(product.id)}
                        variant="ghost" 
                        size="icon" 
                        className="w-10 h-10 rounded-xl glass border border-white/5 text-muted-foreground hover:text-destructive hover:border-destructive/20 transition-all"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
