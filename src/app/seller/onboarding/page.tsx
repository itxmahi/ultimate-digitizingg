"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Store, 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  CreditCard, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  Loader2,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const SellerOnboarding = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    storeName: "",
    businessCategory: "",
    cnic: "",
    address: "",
    contactInfo: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.storeName || !formData.businessCategory || !formData.cnic || !formData.address || !formData.contactInfo) {
      alert("All identity details are mandatory. Please fill all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/seller/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        const error = await response.json();
        alert(error.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  if (!session) {
    router.push("/login");
    return null;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass p-12 rounded-[3rem] border-primary/20 space-y-8"
        >
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={48} className="text-primary" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Application Sent</h2>
            <p className="text-muted-foreground/60 text-sm font-medium italic">
              Your elite seller registration protocol has been initialized. Our analysts will review your credentials manually. 
              Status: <span className="text-primary font-black uppercase">PENDING REVIEW</span>
            </p>
          </div>
          <Button disabled className="w-full h-16 rounded-2xl luxury-gradient border-none text-white font-black text-xs uppercase tracking-widest italic">
            Redirecting to Hub...
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-foreground selection:bg-primary/30 relative overflow-hidden py-20 px-6">
      {/* Cinematic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[900px] h-[900px] bg-chart-4/5 rounded-full blur-[200px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 text-primary"
          >
             <ShieldCheck size={20} />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">SELLER ONBOARDING PROTOCOL</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase italic">
            BECOME A <br /><span className="text-gradient NOT-italic">PARTNER.</span>
          </h1>
          <p className="text-muted-foreground/60 text-lg md:text-xl font-medium italic max-w-2xl mx-auto">
            Scale your embroidery architecture globally. Provide your professional credentials to initialize your merchant account.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-10 md:p-16 rounded-[4rem] border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Shop Name */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 ml-4">Elite Shop Name</label>
                <div className="relative group">
                  <Store size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <input 
                    name="storeName"
                    required
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="E.G. TITAN DIGITIZING" 
                    className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-16 pr-6 font-black text-xs focus:ring-2 ring-primary/20 transition-all outline-none text-white uppercase tracking-widest placeholder:text-muted-foreground/20" 
                  />
                </div>
              </div>

              {/* Business Category */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 ml-4">Business Category</label>
                <div className="relative group">
                  <Briefcase size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <select 
                    name="businessCategory"
                    required
                    value={formData.businessCategory}
                    onChange={handleChange}
                    className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-16 pr-6 font-black text-xs focus:ring-2 ring-primary/20 transition-all outline-none text-white uppercase tracking-widest appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#020617]">SELECT CATEGORY</option>
                    <option value="Custom Digitizing" className="bg-[#020617]">CUSTOM DIGITIZING</option>
                    <option value="Ready Designs" className="bg-[#020617]">READY DESIGNS</option>
                    <option value="Premium 3D" className="bg-[#020617]">PREMIUM 3D</option>
                    <option value="Industrial Bulk" className="bg-[#020617]">INDUSTRIAL BULK</option>
                  </select>
                </div>
              </div>

              {/* CNIC / National ID */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 ml-4">National ID / CNIC</label>
                <div className="relative group">
                  <CreditCard size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <input 
                    name="cnic"
                    required
                    value={formData.cnic}
                    onChange={handleChange}
                    placeholder="XXXXX-XXXXXXX-X" 
                    className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-16 pr-6 font-black text-xs focus:ring-2 ring-primary/20 transition-all outline-none text-white uppercase tracking-widest placeholder:text-muted-foreground/20" 
                  />
                </div>
              </div>

              {/* Contact Info (WhatsApp) */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 ml-4">Contact Phone (WhatsApp)</label>
                <div className="relative group">
                  <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <input 
                    name="contactInfo"
                    required
                    value={formData.contactInfo}
                    onChange={handleChange}
                    placeholder="+92 XXX XXXXXXX" 
                    className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-16 pr-6 font-black text-xs focus:ring-2 ring-primary/20 transition-all outline-none text-white uppercase tracking-widest placeholder:text-muted-foreground/20" 
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 ml-4">Business / Residential Address</label>
              <div className="relative group">
                <MapPin size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                <input 
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="FULL PHYSICAL PROTOCOL ADDRESS" 
                  className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-16 pr-6 font-black text-xs focus:ring-2 ring-primary/20 transition-all outline-none text-white uppercase tracking-widest placeholder:text-muted-foreground/20" 
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 ml-4">Store Description (Brief)</label>
              <textarea 
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="DESCRIBE YOUR DIGITIZING EXPERTISE..." 
                className="w-full bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 font-black text-xs focus:ring-2 ring-primary/20 transition-all outline-none text-white uppercase tracking-widest placeholder:text-muted-foreground/20 resize-none"
              />
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-24 rounded-[2.5rem] luxury-gradient border-none text-white font-black text-[12px] tracking-[0.6em] uppercase italic shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500"
            >
              {isLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <>
                  INITIALIZE MERCHANT ACCOUNT
                  <ArrowRight size={20} className="ml-6" />
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { icon: <Zap size={20} />, title: "Instant Access", desc: "Unlock seller studio immediately after verification." },
             { icon: <ShieldCheck size={20} />, title: "Secure Payouts", desc: "Direct WhatsApp-coordinated transactions." },
             { icon: <Briefcase size={20} />, title: "Elite Network", desc: "Join the top 1% of embroidery professionals." }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary">{item.icon}</div>
                <h4 className="font-black text-xs uppercase tracking-widest text-white italic">{item.title}</h4>
                <p className="text-[10px] text-muted-foreground/40 font-black uppercase italic tracking-tighter">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default SellerOnboarding;
