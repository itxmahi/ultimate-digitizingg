"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X, Search, Sparkles, Zap, ArrowRight, LogOut, LayoutDashboard, Settings, Store, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideAnnouncement, setHideAnnouncement] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "MARKETPLACE", href: "/marketplace", icon: <Sparkles size={16} className="mr-3" /> },
    { name: "FLASH SALE", href: "/flash-sale", badge: "ELITE" },
    { name: "CUSTOM STITCH", href: "/custom-stitch" },
    // Only show Seller Studio if role is SELLER
    ...(session?.user?.role === "SELLER" ? [{ name: "SELLER STUDIO", href: "/seller/dashboard" }] : []),
    ...(session?.user?.role === "BUYER" ? [{ name: "GET STARTED", href: "/seller/onboarding", badge: "NEW" }] : []),
  ];

  return (
    <>
      {/* Cinematic Announcement Bar */}
      {!hideAnnouncement && (
        <div className="fixed top-0 w-full z-[60] h-12 luxury-gradient flex items-center justify-center px-6 overflow-hidden shadow-2xl">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center space-x-6 text-white text-[10px] font-black uppercase tracking-[0.4em] italic"
          >
            <span className="flex items-center"><Zap size={14} className="mr-3 animate-pulse text-yellow-400" fill="currentColor" /> EXCLUSIVE OFFER: 60% OFF ALL PREMIUM DESIGNS</span>
            <span className="hidden md:inline text-white/30 font-light">|</span>
            <Link href="/flash-sale" className="hidden md:flex items-center hover:text-white/80 group transition-all">
              VIEW OFFERS <ArrowRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
          <button 
            onClick={() => setHideAnnouncement(true)}
            className="absolute right-6 text-white/40 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-1000 mx-auto ${
          hideAnnouncement ? "top-0" : "top-12"
        } ${
          scrolled 
            ? "max-w-6xl mt-6 rounded-[3rem] bg-[#020617]/40 backdrop-blur-3xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.7)] py-3 px-3" 
            : "max-w-full bg-transparent py-10 px-8 sm:px-16"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo - HEAVY BRANDING */}
            <Link href="/" className="flex items-center group relative">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className={`${
                  scrolled ? "h-12 w-12" : "h-16 sm:h-20"
                } relative transition-all duration-1000 flex items-center justify-center`}
              >
                {/* Brand Aura */}
                <div className="absolute inset-[-20px] bg-primary/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                {/* UD Monogram - "The Stitch Hub" */}
                <div className="relative z-10 h-full aspect-square bg-[#020617] rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl group-hover:border-primary/50 transition-all duration-700">
                  {/* Subtle Thread Pattern Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  
                  {/* Outer Stitched Border */}
                  <div className="absolute inset-[3px] border-[2px] border-dashed border-primary/40 rounded-xl animate-[spin_60s_linear_infinite]" />
                  
                  {/* The Monogram */}
                  <div className="relative flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white flex items-baseline italic">
                      U
                      <span className="text-primary -ml-1 drop-shadow-[0_0_10px_rgba(37,99,235,0.8)]">D</span>
                    </span>
                    
                    {/* Realistic Stitch Texture via Shadows */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <span className="text-2xl sm:text-3xl font-black tracking-tighter text-transparent italic select-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>UD</span>
                    </div>
                  </div>

                  {/* Glow Pulse */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
              
              {!scrolled && (
                <div className="ml-5 hidden md:flex flex-col">
                   <div className="flex items-center">
                     <span className="text-2xl font-black tracking-tighter text-white leading-none uppercase italic">ULTIMATE</span>
                     <div className="w-2 h-2 bg-primary rounded-full ml-2 animate-pulse shadow-[0_0_10px_rgba(37,99,235,1)]" />
                   </div>
                   <div className="flex items-center mt-1">
                     <span className="text-[8px] font-black uppercase tracking-[0.6em] text-primary/60 italic">DIGITIZING</span>
                   </div>
                </div>
              )}
            </Link>

            {/* Desktop Navigation - ULTRA TYPOGRAPHY */}
            <div className={`hidden lg:flex items-center ${scrolled ? "bg-white/[0.02]" : "bg-white/[0.05]"} rounded-full px-4 py-1.5 border border-white/5 transition-all duration-700 backdrop-blur-3xl`}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-8 py-3.5 group"
                >
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 relative z-10 flex items-center italic ${
                    pathname === link.href ? "text-primary" : "text-muted-foreground/60 group-hover:text-foreground"
                  }`}>
                    {link.icon && link.icon}
                    {link.name}
                    {link.badge && (
                      <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/5 rounded-full z-0 border border-white/5 shadow-inner"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_10px_var(--color-primary)]"
                  />
                </Link>
              ))}
            </div>

            {/* Actions - PREMIUM UI */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center bg-white/[0.03] rounded-2xl p-1.5 border border-white/5 shadow-inner">
                <button className="w-11 h-11 text-muted-foreground/60 hover:text-primary transition-all hover:bg-white/5 rounded-xl flex items-center justify-center">
                  <Search size={20} />
                </button>
                <Link href="/cart" className="w-11 h-11 text-muted-foreground/60 hover:text-primary transition-all hover:bg-white/5 rounded-xl relative group flex items-center justify-center">
                  <ShoppingCart size={20} />
                  <span className="absolute top-1 right-1 w-5 h-5 bg-primary text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-background group-hover:scale-110 transition-transform shadow-lg">
                    0
                  </span>
                </Link>
              </div>
              <div className="h-10 w-[1px] bg-white/10" />
              
              {status === "authenticated" ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-4 glass border-white/10 pl-2 pr-5 py-2 rounded-2xl hover:border-primary/40 transition-all duration-500 group"
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/40 transition-all">
                      {session.user?.image ? (
                        <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-black">
                          {session.user?.email?.[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-black text-white uppercase tracking-wider truncate max-w-[120px]">
                        {session.user?.name || "Member"}
                      </span>
                      <span className="text-[8px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                        {session.user?.email}
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-72 glass border-white/10 rounded-[2rem] p-4 shadow-[0_40px_80px_rgba(0,0,0,0.8)] backdrop-blur-3xl z-[100]"
                      >
                        <div className="p-4 border-b border-white/5 mb-2">
                           <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1 italic">ACCOUNT PROFILE</p>
                           <p className="text-[12px] font-black text-white truncate uppercase italic">{session.user?.email}</p>
                        </div>
                        
                        <div className="space-y-1">
                          {session.user?.role === "SELLER" ? (
                            <Link href="/seller/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center space-x-3 w-full p-4 rounded-xl hover:bg-white/5 transition-colors group">
                              <LayoutDashboard size={16} className="text-muted-foreground/60 group-hover:text-primary" />
                               <span className="text-[10px] font-black text-muted-foreground/60 group-hover:text-white uppercase tracking-widest italic">SELLER DASHBOARD</span>
                            </Link>
                          ) : (
                            <Link href="/seller/onboarding" onClick={() => setIsProfileOpen(false)} className="flex items-center space-x-3 w-full p-4 rounded-xl hover:bg-primary/10 transition-colors group border border-primary/20">
                              <Store size={16} className="text-primary" />
                              <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">BECOME A SELLER</span>
                            </Link>
                          )}
                          {session.user?.role === "ADMIN" && (
                            <Link href="/admin/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center space-x-3 w-full p-4 rounded-xl hover:bg-white/5 transition-colors group">
                              <ShieldCheck size={16} className="text-muted-foreground/60 group-hover:text-primary" />
                               <span className="text-[10px] font-black text-muted-foreground/60 group-hover:text-white uppercase tracking-widest italic">ADMIN PANEL</span>
                            </Link>
                          )}
                          <Link href="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center space-x-3 w-full p-4 rounded-xl hover:bg-white/5 transition-colors group">
                            <Settings size={16} className="text-muted-foreground/60 group-hover:text-primary" />
                            <span className="text-[10px] font-black text-muted-foreground/60 group-hover:text-white uppercase tracking-widest italic">SETTINGS</span>
                          </Link>
                          <button 
                            onClick={() => signOut()}
                            className="flex items-center space-x-3 w-full p-4 rounded-xl hover:bg-red-500/10 transition-colors group"
                          >
                            <LogOut size={16} className="text-muted-foreground/60 group-hover:text-red-500" />
                             <span className="text-[10px] font-black text-muted-foreground/60 group-hover:text-red-500 uppercase tracking-widest italic">LOG OUT</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login">
                    <Button variant="ghost" className="h-14 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest text-muted-foreground/80 hover:text-primary transition-colors italic">LOG IN</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="h-14 px-10 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] luxury-gradient border-none text-white shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95 transition-all italic">
                      GET STARTED
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <Link href="/cart" className="relative w-12 h-12 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center group">
                <ShoppingCart size={22} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-background shadow-lg">
                  0
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-2xl text-foreground hover:bg-white/20 transition-all active:scale-90 border border-white/10 shadow-xl"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay - "HEAVY" MOBILE UI */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60] lg:hidden"
              />
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="fixed right-6 top-6 bottom-6 w-[calc(100%-3rem)] max-w-sm bg-[#020617]/90 backdrop-blur-3xl border border-white/10 z-[70] lg:hidden shadow-[0_0_100px_rgba(0,0,0,1)] rounded-[3.5rem] p-10 overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-chart-4/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 -z-10" />
                
                <div className="flex justify-between items-center mb-16 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black tracking-tighter text-gradient leading-none uppercase italic">ULTIMATE.</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mt-2">USER ACCOUNT</span>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-muted-foreground hover:text-white transition-all shadow-2xl"><X size={22} /></button>
                </div>

                <div className="space-y-4 relative z-10 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center justify-between p-7 rounded-[2rem] border transition-all duration-500 ${
                          pathname === link.href 
                            ? "bg-primary text-white border-primary shadow-[0_20px_40px_rgba(37,99,235,0.4)]" 
                            : "bg-white/[0.03] border-white/5 text-muted-foreground/60 hover:bg-white/10 hover:border-white/10 hover:text-foreground hover:shadow-2xl"
                        }`}
                      >
                        <span className="text-2xl font-black tracking-tighter uppercase italic">{link.name}</span>
                        <ArrowRight size={24} className={`transition-all duration-500 ${pathname === link.href ? "translate-x-0" : "-translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-10 mt-10 border-t border-white/5 space-y-6 relative z-10">
                  {status === "authenticated" ? (
                    <div className="space-y-6">
                      <div className="glass p-6 rounded-[2rem] border-white/10 flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                          {session.user?.image ? (
                            <img src={session.user.image} alt={session.user.name || ""} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-black">
                              {session.user?.email?.[0].toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-[10px] font-black text-white uppercase tracking-wider truncate">{session.user?.name || "Member"}</span>
                          <span className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest truncate">{session.user?.email}</span>
                        </div>
                      </div>
                      {session.user?.role === "SELLER" ? (
                        <Link href="/seller/dashboard" onClick={() => setIsOpen(false)}>
                          <Button className="w-full h-20 rounded-[2rem] luxury-gradient border-none text-white font-black text-[11px] uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(37,99,235,0.3)] italic">
                            SELLER STUDIO
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/seller/onboarding" onClick={() => setIsOpen(false)}>
                          <Button className="w-full h-20 rounded-[2rem] bg-primary text-white font-black text-[11px] uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(37,99,235,0.3)] italic">
                            BECOME A SELLER
                          </Button>
                        </Link>
                      )}
                      <button 
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="w-full h-16 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest border border-red-500/20 bg-red-500/5 text-red-500 italic"
                      >
                        SIGN OUT
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full h-16 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest border-white/10 bg-white/5 shadow-xl italic">LOG IN</Button>
                        </Link>
                        <Link href="/cart" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full h-16 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest border-white/10 bg-white/5 flex items-center justify-center shadow-xl italic">
                            CART
                          </Button>
                        </Link>
                      </div>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full h-20 rounded-[2rem] luxury-gradient border-none text-white font-black text-[11px] uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(37,99,235,0.3)] italic">
                          GET STARTED FREE
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
