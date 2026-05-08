import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Globe, Zap, ChevronDown } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 pt-32 pb-12 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1 space-y-10">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 luxury-gradient rounded-xl flex items-center justify-center shadow-2xl transition-transform group-hover:rotate-6">
                <span className="text-white font-black text-xl">U</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-gradient leading-none">ULTIMATE</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase leading-none mt-1">Digitizing</span>
              </div>
            </Link>
            
            <p className="text-muted-foreground/80 text-lg font-medium leading-relaxed">
              The world's most advanced marketplace for elite embroidery digitizing and professional stitching assets.
            </p>

            <div className="flex items-center space-x-4">
              {[
                { icon: <FaFacebook size={18} />, href: "#" },
                { icon: <FaTwitter size={18} />, href: "#" },
                { icon: <FaInstagram size={18} />, href: "#" },
                { icon: <FaLinkedin size={18} />, href: "#" }
              ].map((social, i) => (
                <Link key={i} href={social.href} className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all shadow-sm">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-12 lg:col-span-2">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-10">Marketplace</h4>
              <ul className="space-y-5">
                {["All Designs", "Flash Sales", "Custom Orders", "Best Sellers", "New Arrivals"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground hover:text-foreground font-bold transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-10">Company</h4>
              <ul className="space-y-5">
                {["About Us", "Our Story", "Careers", "Press Kit", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground hover:text-foreground font-bold transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-10">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-10">Get in Touch</h4>
            <div className="space-y-8">
               <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                     <MapPin size={18} />
                  </div>
                  <p className="text-sm font-bold text-muted-foreground leading-relaxed mt-1">123 Luxury Ave, Stitch District, New York, NY 10001</p>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                     <Phone size={18} />
                  </div>
                  <p className="text-sm font-black text-foreground">+1 (800) ULTIMATE</p>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                     <Mail size={18} />
                  </div>
                  <p className="text-sm font-black text-foreground">support@ultimate.ai</p>
               </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
             <span>© 2026 ULTIMATE DIGITIZING</span>
             <div className="w-1 h-1 bg-white/20 rounded-full" />
             <span>ALL RIGHTS RESERVED</span>
          </div>
          
          <div className="flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
             <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
             <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>

          <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
             <Globe size={12} className="text-primary" />
             <span className="text-[10px] font-black uppercase tracking-widest">Global English</span>
             <ChevronDown size={12} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
