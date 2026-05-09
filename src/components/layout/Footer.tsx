import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Globe, Zap, ChevronDown } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative pt-60 pb-24 overflow-hidden bg-background">
      {/* Heavy Background Cinematic Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/[0.08] rounded-full blur-[180px] -translate-x-1/3 translate-y-1/3 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-[700px] h-[700px] bg-chart-4/[0.05] rounded-full blur-[150px] translate-x-1/3 -translate-y-1/2" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="glass border border-white/10 rounded-[5rem] p-16 lg:p-24 shadow-[0_80px_160px_rgba(0,0,0,0.6)] mb-32 relative overflow-hidden">
          {/* Internal Mesh Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
            {/* Brand Section - "HEAVY" BRANDING */}
            <div className="lg:col-span-4 space-y-12">
              <Link href="/" className="flex items-center space-x-6 group">
                <div className="w-16 h-16 glass border border-white/10 rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 group-hover:border-primary/50">
                  <img src="/logo3.png" className="w-10 h-10 object-contain brightness-110" />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tighter text-gradient leading-none uppercase italic">ULTIMATE.</span>
                  <span className="text-[10px] font-black tracking-[0.5em] text-muted-foreground/40 uppercase leading-none mt-2.5 ml-0.5">Digitizing</span>
                </div>
              </Link>
              
              <p className="text-muted-foreground/60 font-black text-xl leading-relaxed max-w-sm uppercase italic tracking-tight">
                Engineering the future of embroidery through elite protocols and high-performance digital assets.
              </p>

              <div className="flex items-center space-x-5">
                {[
                  { icon: <FaFacebook size={20} />, href: "#", color: "hover:bg-[#1877F2]" },
                  { icon: <FaTwitter size={20} />, href: "#", color: "hover:bg-[#1DA1F2]" },
                  { icon: <FaInstagram size={20} />, href: "#", color: "hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" },
                  { icon: <FaLinkedin size={20} />, href: "#", color: "hover:bg-[#0A66C2]" }
                ].map((social, i) => (
                  <Link key={i} href={social.href} className={`w-14 h-14 glass rounded-2xl flex items-center justify-center text-muted-foreground/60 hover:text-white transition-all duration-700 border border-white/5 shadow-2xl ${social.color}`}>
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Grid - "ULTRA" TYPOGRAPHY */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-16">
              <div className="space-y-12">
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary flex items-center italic">
                  <Zap size={16} className="mr-3 animate-pulse" fill="currentColor" /> CORE HUB
                </h4>
                <ul className="space-y-6">
                  {["Marketplace", "Flash Sale", "Custom Stitch", "Seller Studio", "Resource Protocol"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-muted-foreground/40 hover:text-primary font-black uppercase tracking-[0.2em] transition-all duration-500 text-[11px] flex items-center group italic">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-4 scale-0 group-hover:scale-100 transition-all shadow-[0_0_10px_var(--color-primary)]" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-12">
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-chart-4 flex items-center italic">
                  <ShieldCheck size={16} className="mr-3" /> SECURITY
                </h4>
                <ul className="space-y-6">
                  {["System Intel", "Ambassadors", "Enterprise", "Priority Support", "Legal Protocol"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-muted-foreground/40 hover:text-chart-4 font-black uppercase tracking-[0.2em] transition-all duration-500 text-[11px] flex items-center group italic">
                        <div className="w-1.5 h-1.5 bg-chart-4 rounded-full mr-4 scale-0 group-hover:scale-100 transition-all shadow-[0_0_10px_#4ade80]" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Subscription Section */}
            <div className="lg:col-span-3 space-y-10">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary flex items-center italic">
                <Mail size={16} className="mr-3" /> ACCESS GRANTED
              </h4>
              <p className="text-[11px] font-black text-muted-foreground/40 leading-relaxed uppercase tracking-widest italic">
                SUBSCRIBE FOR EXCLUSIVE ELITE ASSET RELEASES AND EARLY FLASH SALE INGRESS.
              </p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="PROTOCOL@EMAIL.COM" 
                  className="w-full h-16 bg-white/[0.03] border border-white/5 rounded-2xl px-8 text-[11px] font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none shadow-inner"
                />
                <button className="absolute right-2 top-2 h-12 px-8 luxury-gradient text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl italic">
                  INITIALIZE
                </button>
              </div>
              <div className="flex items-center space-x-6 text-muted-foreground/20 mt-6 group cursor-pointer">
                 <div className="w-10 h-10 glass border border-white/5 rounded-xl flex items-center justify-center group-hover:text-primary transition-all">
                    <Phone size={16} />
                 </div>
                 <span className="text-[11px] font-black uppercase tracking-[0.3em]">+1 (800) ULTIMATE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Base Info */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/20 italic">
             <span className="text-primary/40">© 2026 ULTIMATE DIGITIZING CORP</span>
             <span className="hidden md:block w-1.5 h-1.5 bg-white/5 rounded-full" />
             <span>NYC HQ / GLOBAL DEPLOYMENT</span>
          </div>
          
          <div className="flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/20">
             <Link href="#" className="hover:text-primary transition-colors">COMPLIANCE</Link>
             <Link href="#" className="hover:text-primary transition-colors">TERMS</Link>
             <Link href="#" className="hover:text-primary transition-colors">SECURITY</Link>
          </div>

          <div className="flex items-center space-x-5 glass px-8 py-4 rounded-[2rem] border border-white/5 hover:bg-white/5 transition-all cursor-pointer group shadow-2xl">
             <Globe size={16} className="text-primary group-hover:rotate-[360deg] transition-all duration-1000" />
             <span className="text-[11px] font-black uppercase tracking-[0.3em] italic text-muted-foreground/60">GLOBAL / EN-US</span>
             <ChevronDown size={16} className="text-muted-foreground/20 group-hover:translate-y-1 transition-transform" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
