"use client";

import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";
import FlashSale from "@/components/home/FlashSale";
import Categories from "@/components/home/Categories";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, CheckCircle2, Users, Trophy, Zap, ShieldCheck, Play } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col bg-background overflow-hidden">
      <Hero />
      <FlashSale />
      <Categories />
      
      {/* Premium Seller Studio Showcase */}
      <section className="py-40 relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 order-2 lg:order-1">
              <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20">
                 <Zap size={14} className="text-primary" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Join the Elite</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                Empowering the World's Best <span className="text-gradient">Digitizers.</span>
              </h2>
              <p className="text-2xl text-muted-foreground/80 leading-relaxed font-medium">
                Our Seller Studio provides the most advanced digital toolkit for embroidery artists. Sell globally, track growth, and scale your craft.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {[
                   { title: "Global Reach", desc: "Access millions of embroidery buyers worldwide." },
                   { title: "Smart Analytics", desc: "Deep insights into your sales and customer behavior." },
                   { title: "Instant Payouts", desc: "Get paid immediately upon successful delivery." },
                   { title: "WhatsApp Support", desc: "Direct communication with your customers." }
                 ].map((item, i) => (
                   <div key={i} className="flex space-x-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                         <CheckCircle2 size={14} className="text-primary" />
                      </div>
                      <div>
                         <h4 className="font-black text-lg">{item.title}</h4>
                         <p className="text-sm text-muted-foreground font-medium mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <Link href="/seller/register" className="inline-block pt-6">
                <Button size="lg" className="h-16 px-10 rounded-2xl luxury-gradient border-none text-white font-black text-sm shadow-2xl hover:scale-105 transition-all">
                  START SELLING TODAY
                </Button>
              </Link>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="relative z-10 grid grid-cols-2 gap-6">
                 {[
                   { name: "DigitalArt Pro", sales: "12K+", rating: 4.9, img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" },
                   { name: "StitchMaster", sales: "8K+", rating: 4.8, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
                   { name: "EmbroideryHub", sales: "15K+", rating: 5.0, img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop" },
                   { name: "CreativeThreads", sales: "6K+", rating: 4.7, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" },
                 ].map((seller, i) => (
                   <div key={i} className={`glass p-8 rounded-[3rem] border border-white/10 flex flex-col items-center text-center hover:bg-white/5 transition-all duration-500 hover:-translate-y-2 ${i % 2 !== 0 ? 'mt-12' : ''}`}>
                      <img src={seller.img} alt={seller.name} className="w-24 h-24 rounded-[2rem] mb-6 object-cover shadow-2xl" />
                      <h4 className="font-black text-xl mb-2">{seller.name}</h4>
                      <div className="flex items-center text-yellow-500 mb-3 bg-yellow-500/10 px-3 py-1 rounded-full">
                        <Star size={12} fill="currentColor" />
                        <span className="ml-1 text-xs font-black">{seller.rating}</span>
                      </div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{seller.sales} Sales</p>
                   </div>
                 ))}
              </div>
              {/* Decorative Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/10 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact Stats */}
      <section className="py-32 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <Users size={32} />, label: "Active Creators", value: "500K+" },
              { icon: <Trophy size={32} />, label: "Premium Assets", value: "250K+" },
              { icon: <ShieldCheck size={32} />, label: "Success Rate", value: "99.9%" },
              { icon: <Star size={32} />, label: "Trusted Partners", value: "12,000+" },
            ].map((stat, i) => (
              <div key={i} className="bg-card p-12 rounded-[3.5rem] border border-white/5 text-center flex flex-col items-center hover:bg-white/5 transition-all group">
                <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  {stat.icon}
                </div>
                <h3 className="text-5xl font-black mb-4 tracking-tighter">{stat.value}</h3>
                <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra-Premium CTA */}
      <section className="py-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[4rem] overflow-hidden group">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
               <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale opacity-20 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0" />
               <div className="absolute inset-0 luxury-gradient opacity-90 mix-blend-multiply" />
            </div>

            <div className="relative z-10 p-16 lg:p-32 text-center text-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-[0.9]">
                  READY TO JOIN <br />THE REVOLUTION?
                </h2>
                <p className="text-xl md:text-2xl opacity-80 mb-16 font-medium max-w-2xl mx-auto leading-relaxed">
                  Join the world's most advanced digitizing ecosystem. Experience speed, precision, and global reach like never before.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full h-20 px-16 bg-white text-black hover:bg-white/90 rounded-[2rem] text-xl font-black shadow-2xl">
                      GET STARTED
                    </Button>
                  </Link>
                  <Link href="/custom-stitch" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full h-20 px-16 border-white/30 bg-white/10 hover:bg-white/20 rounded-[2rem] text-xl font-black text-white backdrop-blur-md">
                      VIEW SERVICES
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
