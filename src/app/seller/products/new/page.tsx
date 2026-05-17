"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, UploadCloud, Image as ImageIcon, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddProductPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [dragActive, setDragActive] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "", // Original Price
    salePrice: "", // Sale Price
    stock: "10",
    category: "SELECT SECTOR",
    customCategory: "",
    tags: "",
    isFlashSale: false,
    stitchCount: "",
    imageName: "Box1.jpg", // Default to one of the pasted images
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (files) {
      const fileArr = Array.from(files);
      setSelectedImages(prev => [...prev, ...fileArr]);
      
      const newPreviews = fileArr.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handlePublish = async () => {
    if (!formData.name || !formData.price || formData.category === "SELECT SECTOR") {
      alert("Please fill in all core metadata.");
      return;
    }

    if (formData.category === "OTHER" && !formData.customCategory) {
      alert("Please specify your custom category.");
      return;
    }

    setIsPublishing(true);
    try {
      const originalPriceVal = parseFloat(formData.price);
      const salePriceVal = formData.isFlashSale && formData.salePrice ? parseFloat(formData.salePrice) : originalPriceVal;
      const discountPercent = formData.isFlashSale ? Math.round((1 - salePriceVal / originalPriceVal) * 100) : null;

      // In a real app, you'd upload images to Cloudinary/S3 first
      const imageFiles = selectedImages.length > 0 ? selectedImages.map(f => `/images/${f.name}`) : [`/images/${formData.imageName}`];

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: salePriceVal,
          stock: parseInt(formData.stock) || 10,
          category: formData.category === "OTHER" ? formData.customCategory : formData.category,
          isFlashSale: formData.isFlashSale,
          discountPercentage: discountPercent,
          originalPrice: originalPriceVal,
          discountedPrice: salePriceVal,
          stitchCount: formData.stitchCount ? parseInt(formData.stitchCount) : null,
          images: imageFiles,
        }),
      });

      if (response.ok) {
        alert("ASSET DEPLOYED SUCCESSFULLY.");
        router.push("/seller/products");
      } else {
        const err = await response.json();
        alert(`DEPLOYMENT FAILURE: ${err.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("SYSTEM ERROR DURING DEPLOYMENT.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-24 relative overflow-hidden">
      {/* Page Specific Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 border-b border-white/5 pb-12">
        <div className="flex items-center space-x-8">
          <Link href="/seller/dashboard">
            <Button variant="ghost" size="icon" className="w-16 h-16 rounded-2xl glass border-white/10 shadow-2xl hover:bg-primary hover:text-white transition-all duration-500">
              <ArrowLeft size={24} />
            </Button>
          </Link>
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">
              INITIALIZE <span className="text-gradient">ASSET.</span>
            </h1>
            <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em] italic">Deploying high-precision digitizing architecture</p>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <Button variant="outline" className="h-16 px-10 rounded-2xl glass border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all italic">SAVE PROTOCOL</Button>
          <Button 
            onClick={handlePublish}
            disabled={isPublishing}
            className="h-16 px-12 rounded-2xl luxury-gradient border-none text-white shadow-[0_20px_40px_rgba(37,99,235,0.3)] font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all italic disabled:opacity-50"
          >
            {isPublishing ? "DEPLOYING..." : "PUBLISH ASSET"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-8 space-y-12">
          <div className="glass p-12 rounded-[3.5rem] border border-white/5 space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
            
            <div className="flex items-center space-x-4 mb-4">
               <div className="w-2 h-8 bg-primary rounded-full" />
               <h2 className="text-2xl font-black tracking-tight uppercase italic">CORE METADATA</h2>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic ml-2">ASSET IDENTIFICATION / TITLE</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                type="text" 
                placeholder="e.g. ULTIMATE FLORAL PRECISION PROTOCOL" 
                className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-8 py-6 text-sm font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none shadow-inner placeholder:text-muted-foreground/20"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px) font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic ml-2">TECHNICAL SPECIFICATIONS / DESCRIPTION</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={8}
                placeholder="DEFINE THE PARAMETERS OF YOUR DESIGN..." 
                className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-8 py-6 text-sm font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none resize-none shadow-inner placeholder:text-muted-foreground/20"
              />
            </div>
          </div>

          {/* Media Upload */}
          <div className="glass p-12 rounded-[3.5rem] border border-white/5 space-y-10">
            <div className="flex items-center space-x-4 mb-4">
               <div className="w-2 h-8 bg-chart-4 rounded-full" />
               <h2 className="text-2xl font-black tracking-tight uppercase italic">ASSET INGESTION</h2>
            </div>
            
            <div 
              className={`border-4 border-dashed rounded-[3rem] p-20 text-center transition-all duration-700 ${dragActive ? 'border-primary bg-primary/5' : 'border-white/5 hover:border-primary/40 bg-white/[0.02]'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={onDrop}
              onClick={triggerFileInput}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                multiple 
                accept="image/*"
              />
              <div className="w-24 h-24 glass border border-white/10 shadow-2xl rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <UploadCloud size={40} className="text-primary" />
              </div>
              <h3 className="text-xl font-black mb-2 uppercase italic tracking-tighter">Initial Upload Stream</h3>
              <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] mb-10 italic">UPLOAD PREVIEW RENDER & SOURCE PROTOCOLS (DST, PES, ART)</p>
              <Button 
                variant="outline" 
                className="h-16 px-12 rounded-2xl glass border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all italic"
                onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}
              >
                BROWSE FILESYSTEM
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
              {previews.map((previewUrl, index) => (
                <div key={index} className="aspect-square glass rounded-3xl border border-white/10 relative overflow-hidden group shadow-2xl">
                  <img 
                    src={previewUrl} 
                    alt="preview" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <div 
                onClick={triggerFileInput}
                className="aspect-square glass rounded-3xl border border-white/5 border-dashed flex items-center justify-center text-muted-foreground/20 hover:text-primary hover:border-primary/40 transition-all cursor-pointer group shadow-inner"
              >
                 <ImageIcon size={32} className="group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Organization & Pricing */}
        <div className="lg:col-span-4 space-y-12">
          <div className="glass p-12 rounded-[3.5rem] border border-white/5 space-y-10 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-chart-4/5 rounded-full blur-[80px] -z-10" />
            
            <div className="flex items-center space-x-4 mb-4">
               <div className="w-2 h-8 bg-blue-400 rounded-full" />
               <h2 className="text-2xl font-black tracking-tight uppercase italic">FINANCIALS</h2>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic ml-2">ORIGINAL PRICE (USD)</label>
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-primary">$</span>
                <input 
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  type="number" 
                  placeholder="0.00" 
                  className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] pl-12 pr-8 py-6 text-xl font-black tracking-tighter focus:ring-4 ring-primary/10 transition-all outline-none shadow-inner italic"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-6 glass border border-white/5 rounded-[2rem] bg-white/[0.02]">
              <div className="space-y-1">
                <p className="font-black text-[11px] uppercase tracking-widest italic text-primary">FLASH SALE ENABLE</p>
                <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest italic">INJECT INTO DISCOUNT STREAM</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  name="isFlashSale"
                  type="checkbox" 
                  checked={formData.isFlashSale}
                  onChange={handleInputChange}
                  className="sr-only peer" 
                />
                <div className="w-14 h-8 bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-muted-foreground/40 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:bg-white peer-checked:bg-primary shadow-inner border border-white/5"></div>
              </label>
            </div>

            {formData.isFlashSale && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic ml-2">SALE PRICE (USD)</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-chart-4">$</span>
                  <input 
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    type="number" 
                    placeholder="0.00" 
                    className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] pl-12 pr-8 py-6 text-xl font-black tracking-tighter focus:ring-4 ring-chart-4/10 transition-all outline-none shadow-inner italic"
                  />
                </div>
                {formData.price && formData.salePrice && (
                  <p className="text-[10px] font-black text-chart-4 uppercase tracking-widest italic ml-2">
                    Badge: {Math.round((1 - parseFloat(formData.salePrice) / parseFloat(formData.price)) * 100)}% OFF
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="glass p-12 rounded-[3.5rem] border border-white/5 space-y-10">
            <div className="flex items-center space-x-4 mb-4">
               <div className="w-2 h-8 bg-purple-500 rounded-full" />
               <h2 className="text-2xl font-black tracking-tight uppercase italic">HIERARCHY & INVENTORY</h2>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic ml-2">STITCH COUNT</label>
              <input 
                name="stitchCount"
                value={formData.stitchCount}
                onChange={handleInputChange}
                type="number" 
                placeholder="E.G. 12500" 
                className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-8 py-6 text-sm font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none shadow-inner placeholder:text-muted-foreground/20"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic ml-2">STOCK QUANTITY</label>
              <input 
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                type="number" 
                placeholder="10" 
                className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-8 py-6 text-sm font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none shadow-inner placeholder:text-muted-foreground/20"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic ml-2">ASSET CATEGORY</label>
              <div className="relative group">
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-8 py-6 text-[11px] font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none appearance-none shadow-inner italic"
                >
                  <option className="bg-[#0F172A]" value="SELECT SECTOR">SELECT SECTOR</option>
                  <option className="bg-[#0F172A]" value="ANIMALS / WILDLIFE">ANIMALS / WILDLIFE</option>
                  <option className="bg-[#0F172A]" value="FLORAL / BOTANICAL">FLORAL / BOTANICAL</option>
                  <option className="bg-[#0F172A]" value="LOGOS / CORPORATE">LOGOS / CORPORATE</option>
                  <option className="bg-[#0F172A]" value="TYPOGRAPHY / ALPHA">TYPOGRAPHY / ALPHA</option>
                  <option className="bg-[#0F172A]" value="GEOMETRIC / ABSTRACT">GEOMETRIC / ABSTRACT</option>
                  <option className="bg-[#0F172A]" value="OTHER">OTHER (WRITE CUSTOM)</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/40">
                   <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {formData.category === "OTHER" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic ml-2">CUSTOM CATEGORY NAME</label>
                <input 
                  name="customCategory"
                  value={formData.customCategory}
                  onChange={handleInputChange}
                  type="text" 
                  placeholder="E.G. CUSTOM STITCH / PATCHES" 
                  className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-8 py-6 text-sm font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none shadow-inner placeholder:text-muted-foreground/20"
                />
              </div>
            )}

            <div className="space-y-4">
              <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic ml-2">METADATA TAGS</label>
              <input 
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                type="text" 
                placeholder="SEPARATE PROTOCOLS BY COMMA" 
                className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] focus:ring-4 ring-primary/10 transition-all outline-none shadow-inner italic placeholder:text-muted-foreground/20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
