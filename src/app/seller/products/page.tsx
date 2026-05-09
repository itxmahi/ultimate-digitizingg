"use client";

import React from "react";
import Link from "next/link";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductsPage = () => {
  const products = [
    { id: 1, name: "Royal Floral Embroidery", category: "Floral", price: "$25.00", sales: 124, status: "Active", image: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=100&h=100&fit=crop", discountPrice: null },
    { id: 2, name: "Cyberpunk Skull Patch", category: "Sci-Fi", price: "$15.00", sales: 89, status: "Active", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=100&h=100&fit=crop", discountPrice: "$9.99" },
    { id: 3, name: "Vintage Lion Crest", category: "Emblems", price: "$35.00", sales: 56, status: "Draft", image: "https://images.unsplash.com/photo-1582136166150-f38f12a32c25?w=100&h=100&fit=crop", discountPrice: null },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black">Products</h1>
          <p className="text-muted-foreground">Manage your digitizing portfolio and inventory.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/seller/products/new">
            <Button className="rounded-xl luxury-gradient border-none text-white shadow-lg font-bold">
              <Plus size={18} className="mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F172A] rounded-[2rem] border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
           <div className="relative w-full sm:w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-secondary/50 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 ring-primary/20 transition-all outline-none"
              />
           </div>
           <Button variant="outline" className="rounded-xl w-full sm:w-auto font-bold">
             <Filter size={16} className="mr-2" />
             Filter
           </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/30">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Sales</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                      <span className="font-bold text-sm">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">{product.category}</td>
                  <td className="py-4 px-6 text-sm">
                    {product.discountPrice ? (
                      <div className="flex flex-col">
                        <span className="font-black text-primary">{product.discountPrice}</span>
                        <span className="text-xs text-muted-foreground line-through">{product.price}</span>
                      </div>
                    ) : (
                      <span className="font-black">{product.price}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold">{product.sales}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary"><Edit size={16} /></Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></Button>
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
