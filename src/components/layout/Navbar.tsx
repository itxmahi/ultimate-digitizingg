"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Flash Sale", href: "/flash-sale" },
    { name: "Custom Stitch", href: "/custom-stitch" },
    { name: "Seller Studio", href: "/seller/dashboard" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "py-3 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="w-11 h-11 luxury-gradient rounded-xl flex items-center justify-center shadow-2xl mr-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
              <span className="text-white font-black text-xl relative z-10">U</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-none text-gradient">
                ULTIMATE
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase leading-none mt-1">
                Digitizing
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-5 py-2 group overflow-hidden"
              >
                <span className={`text-sm font-bold transition-colors duration-300 relative z-10 ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                }`}>
                  {link.name}
                </span>
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-5">
            <div className="h-8 w-[1px] bg-white/10" />
            <button className="p-2.5 text-muted-foreground hover:text-primary transition-all hover:bg-white/5 rounded-xl">
              <Search size={20} />
            </button>
            <Link href="/cart" className="p-2.5 text-muted-foreground hover:text-primary transition-all hover:bg-white/5 rounded-xl relative group">
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-background group-hover:scale-110 transition-transform">
                0
              </span>
            </Link>
            <div className="flex items-center space-x-3 ml-2">
              <Link href="/login">
                <Button variant="ghost" className="rounded-xl px-6 font-bold text-sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-xl px-8 font-black text-sm luxury-gradient border-none text-white shadow-xl hover:scale-105 transition-all">
                  Join Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
             <Link href="/cart" className="relative p-2">
              <ShoppingCart size={22} className="text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-background">
                0
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 flex items-center justify-center bg-white/5 rounded-xl text-foreground hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-background border-l border-white/5 z-50 lg:hidden shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-black text-gradient">MENU</span>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-white/5 rounded-lg"><X size={20} /></button>
              </div>

              <div className="space-y-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-4 text-2xl font-black ${
                        pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="absolute bottom-8 left-8 right-8 space-y-4">
                 <Link href="/login" className="block" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full h-14 rounded-2xl font-bold">Login</Button>
                 </Link>
                 <Link href="/register" className="block" onClick={() => setIsOpen(false)}>
                    <Button className="w-full h-14 rounded-2xl luxury-gradient border-none text-white font-black">Get Started</Button>
                 </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
