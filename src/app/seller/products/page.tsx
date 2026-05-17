"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Edit, Trash2, Loader2, X, Eye, EyeOff, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductsPage = () => {
  const fallbackProducts = [
    {
      id: "prod_1",
      name: "Elite Gold Crest Precision",
      description: "High-density metallic gold crest designed for premium outerwear.",
      price: 120.00,
      stock: 15,
      category: "LOGOS / CORPORATE",
      images: ["https://images.unsplash.com/photo-1620619767323-b95a89183081?w=200&h=200&fit=crop"],
      active: true,
      flashSale: { isFlashSale: true, originalPrice: 120.00, discountedPrice: 78.00, discountPercentage: 35 }
    },
    {
      id: "prod_2",
      name: "Silver Lotus Pattern Protocol",
      description: "Delicate floral accent stitches tailored for lightweight cotton apparel.",
      price: 85.50,
      stock: 9,
      category: "FLORAL / BOTANICAL",
      images: ["https://images.unsplash.com/photo-1576016770956-debb63d900ad?w=200&h=200&fit=crop"],
      active: true
    },
    {
      id: "prod_3",
      name: "Neon Skull Cyber DST",
      description: "Futuristic glow-stitch asset built for modern streetwear garments.",
      price: 150.00,
      stock: 24,
      category: "GEOMETRIC / ABSTRACT",
      images: ["https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=200&h=200&fit=crop"],
      active: false
    }
  ];

  const [products, setProducts] = useState<any[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    isFlashSale: false,
    stock: "",
    category: "",
    customCategory: "",
    active: true,
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products?seller=true");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(fallbackProducts);
      }
    } catch (error) {
      console.warn("Failed to fetch products, deploying sandbox portfolio:", error);
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset permanently? This cannot be undone.")) return;
    
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

  const toggleActive = async (product: any) => {
    try {
      const newActive = !product.active;
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          active: newActive,
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        setProducts(prev => prev.map(p => p.id === product.id ? updated : p));
      } else {
        alert("Failed to toggle status.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (product: any) => {
    const isFS = !!product.flashSale?.isFlashSale;
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description || "",
      price: isFS ? String(product.flashSale.originalPrice) : String(product.price),
      salePrice: isFS ? String(product.flashSale.discountedPrice) : "",
      isFlashSale: isFS,
      stock: String(product.stock ?? 10),
      category: ["ANIMALS / WILDLIFE", "FLORAL / BOTANICAL", "LOGOS / CORPORATE", "TYPOGRAPHY / ALPHA", "GEOMETRIC / ABSTRACT"].includes(product.category) ? product.category : "OTHER",
      customCategory: ["ANIMALS / WILDLIFE", "FLORAL / BOTANICAL", "LOGOS / CORPORATE", "TYPOGRAPHY / ALPHA", "GEOMETRIC / ABSTRACT"].includes(product.category) ? "" : product.category,
      active: product.active ?? true,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const originalPriceVal = parseFloat(editForm.price);
      const salePriceVal = editForm.isFlashSale && editForm.salePrice ? parseFloat(editForm.salePrice) : originalPriceVal;
      const discountPercent = editForm.isFlashSale ? Math.round((1 - salePriceVal / originalPriceVal) * 100) : null;

      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
          price: salePriceVal,
          stock: parseInt(editForm.stock) || 10,
          category: editForm.category === "OTHER" ? editForm.customCategory : editForm.category,
          isFlashSale: editForm.isFlashSale,
          discountPercentage: discountPercent,
          originalPrice: originalPriceVal,
          discountedPrice: salePriceVal,
          active: editForm.active,
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? updated : p));
        setEditingProduct(null);
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating product.");
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase italic">Products Portfolio</h1>
          <p className="text-muted-foreground font-black text-[10px] uppercase tracking-widest italic">Manage your digitizing assets, stock, and pricing parameters.</p>
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
                placeholder="Search assets..." 
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
                <th className="text-left py-6 px-8 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Valuation</th>
                <th className="text-left py-6 px-8 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Stock</th>
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
              ) : filteredProducts.map((product) => {
                const isFS = !!product.flashSale?.isFlashSale;
                return (
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
                      {isFS ? (
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2">
                            <span className="font-black text-primary">${Number(product.flashSale.discountedPrice).toFixed(2)}</span>
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-chart-4/15 text-chart-4 border border-chart-4/20">
                              {product.flashSale.discountPercentage}% OFF
                            </span>
                          </div>
                          <span className="text-[9px] text-muted-foreground/40 line-through">${Number(product.flashSale.originalPrice).toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="font-black">${Number(product.price).toFixed(2)}</span>
                      )}
                    </td>
                    <td className="py-6 px-8 text-sm font-black italic">{product.stock ?? 10}</td>
                    <td className="py-6 px-8">
                      {product.active !== false ? (
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/20">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                          Archived
                        </span>
                      )}
                    </td>
                    <td className="py-6 px-8 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <Button 
                          onClick={() => startEdit(product)}
                          variant="ghost" 
                          size="icon" 
                          className="w-10 h-10 rounded-xl glass border border-white/5 text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          onClick={() => toggleActive(product)}
                          variant="ghost" 
                          size="icon" 
                          className={`w-10 h-10 rounded-xl glass border border-white/5 transition-all ${product.active !== false ? 'text-muted-foreground hover:text-yellow-400 hover:border-yellow-400/20' : 'text-yellow-400 hover:text-green-400 hover:border-green-400/20'}`}
                          title={product.active !== false ? "Archive / Deactivate" : "Activate"}
                        >
                          {product.active !== false ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stunning Glassmorphic Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass w-full max-w-2xl rounded-[3rem] border border-white/10 overflow-hidden relative shadow-2xl flex flex-col max-h-[90vh]">
            <div className="absolute inset-0 bg-primary/5 blur-[120px] -z-10" />
            
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <div>
                <h3 className="text-xl font-black uppercase italic tracking-tight">Modify Asset Protocols</h3>
                <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">Adjusting parameters for design: {editingProduct.name}</p>
              </div>
              <button 
                onClick={() => setEditingProduct(null)}
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdate} className="p-8 space-y-6 overflow-y-auto flex-1">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] italic ml-1">Asset Name</label>
                <input 
                  type="text" 
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] italic ml-1">Description</label>
                <textarea 
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] italic ml-1">Original Price (USD)</label>
                  <input 
                    type="number" 
                    value={editForm.price}
                    onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                    required
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] italic ml-1">Stock Quantity</label>
                  <input 
                    type="number" 
                    value={editForm.stock}
                    onChange={(e) => setEditForm(prev => ({ ...prev, stock: e.target.value }))}
                    required
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Flash Sale Toggle */}
              <div className="flex items-center justify-between p-5 glass border border-white/5 rounded-2xl bg-white/[0.01]">
                <div className="space-y-0.5">
                  <p className="font-black text-[10px] uppercase tracking-widest italic text-primary">FLASH SALE ENABLE</p>
                  <p className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest italic">INJECT DISCOUNT INTO MARKETPLACE</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={editForm.isFlashSale}
                    onChange={(e) => setEditForm(prev => ({ ...prev, isFlashSale: e.target.checked }))}
                    className="sr-only peer" 
                  />
                  <div className="w-12 h-7 bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-muted-foreground/40 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-white peer-checked:bg-primary shadow-inner border border-white/5"></div>
                </label>
              </div>

              {editForm.isFlashSale && (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <label className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] italic ml-1">Sale Price (USD)</label>
                  <input 
                    type="number" 
                    value={editForm.salePrice}
                    onChange={(e) => setEditForm(prev => ({ ...prev, salePrice: e.target.value }))}
                    placeholder="Discounted selling price"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:ring-4 ring-chart-4/10 transition-all outline-none"
                  />
                  {editForm.price && editForm.salePrice && (
                    <p className="text-[9px] font-black text-chart-4 uppercase tracking-widest italic ml-1">
                      Discount percentage badge: {Math.round((1 - parseFloat(editForm.salePrice) / parseFloat(editForm.price)) * 100)}% OFF
                    </p>
                  )}
                </div>
              )}

              {/* Status Switch (Archive/Deactivate) */}
              <div className="flex items-center justify-between p-5 glass border border-white/5 rounded-2xl bg-white/[0.01]">
                <div className="space-y-0.5">
                  <p className="font-black text-[10px] uppercase tracking-widest italic text-green-400">ACTIVE ON MARKETPLACE</p>
                  <p className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest italic">ARCHIVE TO HIDE FROM PUBLIC VIEW</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={editForm.active}
                    onChange={(e) => setEditForm(prev => ({ ...prev, active: e.target.checked }))}
                    className="sr-only peer" 
                  />
                  <div className="w-12 h-7 bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-muted-foreground/40 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-white peer-checked:bg-green-500 peer-checked:border-green-500/20 shadow-inner border border-white/5"></div>
                </label>
              </div>

              {/* Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] italic ml-1">Category Sector</label>
                  <select 
                    value={editForm.category}
                    onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:ring-4 ring-primary/10 outline-none"
                  >
                    <option className="bg-[#0F172A]" value="SELECT SECTOR">SELECT SECTOR</option>
                    <option className="bg-[#0F172A]" value="ANIMALS / WILDLIFE">ANIMALS / WILDLIFE</option>
                    <option className="bg-[#0F172A]" value="FLORAL / BOTANICAL">FLORAL / BOTANICAL</option>
                    <option className="bg-[#0F172A]" value="LOGOS / CORPORATE">LOGOS / CORPORATE</option>
                    <option className="bg-[#0F172A]" value="TYPOGRAPHY / ALPHA">TYPOGRAPHY / ALPHA</option>
                    <option className="bg-[#0F172A]" value="GEOMETRIC / ABSTRACT">GEOMETRIC / ABSTRACT</option>
                    <option className="bg-[#0F172A]" value="OTHER">OTHER (WRITE CUSTOM)</option>
                  </select>
                </div>

                {editForm.category === "OTHER" && (
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <label className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] italic ml-1">Custom Category Name</label>
                    <input 
                      type="text" 
                      value={editForm.customCategory}
                      onChange={(e) => setEditForm(prev => ({ ...prev, customCategory: e.target.value }))}
                      required
                      placeholder="E.G. PATCHES"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:ring-4 ring-primary/10 outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4 pt-6 border-t border-white/5">
                <Button 
                  type="button" 
                  onClick={() => setEditingProduct(null)}
                  variant="outline" 
                  className="w-1/2 h-14 rounded-xl glass border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 italic"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="w-1/2 h-14 rounded-xl luxury-gradient border-none text-white font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all italic"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
