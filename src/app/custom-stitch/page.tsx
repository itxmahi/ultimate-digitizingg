"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  FileText, 
  Palette, 
  Maximize, 
  CheckCircle2, 
  Send,
  Zap,
  Clock,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomStitch = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-white/10 mb-6"
          >
            <Zap size={16} className="text-chart-4" />
            <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
              Turn your vision into thread
            </span>
          </motion.div>
          <h1 className="text-4xl lg:text-6xl font-black mb-6">Custom <span className="text-gradient">Stitch Request</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your artwork and our expert digitizers will convert it into a professional embroidery file within 24 hours.
          </p>
        </div>

        {/* Multi-step Form */}
        <div className="bg-card border border-border rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
           {/* Progress Bar */}
           <div className="absolute top-0 left-0 w-full h-1 bg-secondary">
              <motion.div 
                className="h-full bg-primary" 
                initial={{ width: "33%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
              />
           </div>

           <div className="flex justify-between items-center mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all ${step >= s ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                    {s}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest mt-2 ${step >= s ? 'text-primary' : 'text-muted-foreground'}`}>
                    {s === 1 ? 'Artwork' : s === 2 ? 'Details' : 'Review'}
                  </span>
                </div>
              ))}
           </div>

           <form className="space-y-12">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                   <div className="space-y-2">
                      <h2 className="text-2xl font-black">Upload your Artwork</h2>
                      <p className="text-muted-foreground">We accept JPG, PNG, PDF, or Vector files.</p>
                   </div>
                   
                   <div className="border-4 border-dashed border-border rounded-[2.5rem] p-12 text-center hover:border-primary/50 transition-all cursor-pointer group">
                      <div className="w-20 h-20 bg-secondary rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                         <Upload size={32} className="text-primary" />
                      </div>
                      <p className="text-lg font-bold mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">Max file size 20MB</p>
                   </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                   <div className="space-y-2">
                      <h2 className="text-2xl font-black">Technical Specifications</h2>
                      <p className="text-muted-foreground">Help our digitizers understand your needs.</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                         <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Stitch Type</label>
                         <select className="w-full h-14 bg-secondary border-none rounded-2xl px-4 font-bold focus:ring-2 ring-primary/20">
                            <option>Flat Embroidery</option>
                            <option>3D Puff</option>
                            <option>Applique</option>
                            <option>Sequin</option>
                         </select>
                      </div>
                      <div className="space-y-3">
                         <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Fabric Type</label>
                         <select className="w-full h-14 bg-secondary border-none rounded-2xl px-4 font-bold focus:ring-2 ring-primary/20">
                            <option>Cotton / T-Shirt</option>
                            <option>Pique / Polo</option>
                            <option>Denim / Twill</option>
                            <option>Leather</option>
                         </select>
                      </div>
                      <div className="space-y-3">
                         <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Size (Width)</label>
                         <input type="text" placeholder="e.g. 4 inches" className="w-full h-14 bg-secondary border-none rounded-2xl px-4 font-bold focus:ring-2 ring-primary/20" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Placement</label>
                         <input type="text" placeholder="e.g. Left Chest, Cap Front" className="w-full h-14 bg-secondary border-none rounded-2xl px-4 font-bold focus:ring-2 ring-primary/20" />
                      </div>
                   </div>
                   
                   <div className="space-y-3">
                      <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Additional Instructions</label>
                      <textarea placeholder="Tell us more about your design..." className="w-full h-32 bg-secondary border-none rounded-3xl px-4 py-4 font-bold focus:ring-2 ring-primary/20 resize-none"></textarea>
                   </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-center py-8">
                   <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-primary">
                      <CheckCircle2 size={48} />
                   </div>
                   <h2 className="text-3xl font-black">All Set!</h2>
                   <p className="text-muted-foreground text-lg max-w-md mx-auto">
                      Your request is ready to be submitted. Our team will review the artwork and provide an estimated price and delivery time via email.
                   </p>
                   
                   <div className="bg-secondary/50 p-8 rounded-[2.5rem] border border-border mt-8 text-left space-y-4">
                      <div className="flex justify-between">
                         <span className="font-bold text-muted-foreground">Service Type</span>
                         <span className="font-black">Custom Digitizing</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="font-bold text-muted-foreground">Estimated Time</span>
                         <span className="font-black">12 - 24 Hours</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="font-bold text-muted-foreground">Starting Price</span>
                         <span className="font-black">$15.00</span>
                      </div>
                   </div>
                </motion.div>
              )}

              <div className="flex items-center justify-between pt-8 border-t border-border">
                 {step > 1 ? (
                   <Button type="button" onClick={prevStep} variant="ghost" className="rounded-xl h-14 px-8 font-black">Back</Button>
                 ) : <div></div>}
                 
                 {step < 3 ? (
                   <Button type="button" onClick={nextStep} className="rounded-xl h-14 px-10 luxury-gradient border-none text-white font-black shadow-lg">Next Step</Button>
                 ) : (
                   <Button type="button" className="rounded-xl h-14 px-10 luxury-gradient border-none text-white font-black shadow-lg">
                      Submit Request <Send size={18} className="ml-2" />
                   </Button>
                 )}
              </div>
           </form>
        </div>

        {/* Why choose us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
           {[
             { icon: <Clock />, title: "Quick Turnaround", desc: "Most designs delivered within 12-24 hours." },
             { icon: <ShieldCheck />, title: "Quality Guaranteed", desc: "Unlimited revisions until you are satisfied." },
             { icon: <Zap />, title: "Format Versatility", desc: "We provide all industry standard file formats." },
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center text-center space-y-4">
               <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-primary">{item.icon}</div>
               <h4 className="text-lg font-black">{item.title}</h4>
               <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default CustomStitch;
