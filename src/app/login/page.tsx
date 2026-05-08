"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left Side: Branding & Info */}
      <div className="hidden lg:flex flex-1 luxury-gradient p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-chart-4/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center space-x-2 text-white">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">Ultimate Digitizing</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-6xl font-black text-white mb-8 leading-tight">Welcome to the Future of Embroidery.</h1>
          <p className="text-xl text-white/70 leading-relaxed">
            Join thousands of professionals and creators worldwide. Access premium designs, elite digitizing services, and advanced seller tools.
          </p>
        </div>

        <div className="relative z-10">
          <div className="flex -space-x-4">
             {[1,2,3,4].map(i => (
               <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-12 h-12 rounded-full border-4 border-primary ring-2 ring-white/10" alt="User" />
             ))}
             <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border-4 border-primary ring-2 ring-white/10 flex items-center justify-center text-[10px] text-white font-black">
                +10k
             </div>
          </div>
          <p className="text-white/60 text-sm mt-4 font-bold uppercase tracking-widest">Trusted by 10,000+ creators</p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 relative">
        <Link href="/" className="absolute top-8 left-8 flex items-center text-muted-foreground hover:text-primary transition-colors text-sm font-bold lg:hidden">
          <ArrowLeft size={16} className="mr-2" /> Back
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight">Login</h2>
            <p className="text-muted-foreground font-medium text-lg">Enter your details to access your account.</p>
          </div>

          <div className="space-y-4">
             <Button className="w-full h-14 rounded-2xl bg-white dark:bg-[#0F172A] border border-border text-foreground hover:bg-secondary flex items-center justify-center font-bold shadow-sm">
                <FaGoogle size={20} className="mr-3 text-red-500" />
                Sign in with Google
             </Button>
          </div>

          <div className="relative">
             <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
             <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-muted-foreground font-black tracking-widest">Or continue with</span></div>
          </div>

          <form className="space-y-6">
             <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                <div className="relative">
                   <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                   <input type="email" placeholder="name@company.com" className="w-full h-14 bg-secondary/50 border-none rounded-2xl pl-12 pr-4 font-bold focus:ring-2 ring-primary/20 transition-all" />
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between items-center">
                   <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Password</label>
                   <Link href="#" className="text-xs font-black text-primary hover:underline uppercase tracking-widest">Forgot?</Link>
                </div>
                <div className="relative">
                   <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                   <input type="password" placeholder="••••••••" className="w-full h-14 bg-secondary/50 border-none rounded-2xl pl-12 pr-12 font-bold focus:ring-2 ring-primary/20 transition-all" />
                   <EyeOff size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer" />
                </div>
             </div>
             <Button className="w-full h-16 rounded-2xl luxury-gradient border-none text-white font-black text-lg shadow-xl shadow-primary/20">
                Sign In
             </Button>
          </form>

          <p className="text-center text-muted-foreground font-bold">
            Don't have an account? <Link href="/register" className="text-primary hover:underline ml-1">Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
