"use client";

import React from "react";
import { Save, Camera, User, Lock, Bell, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-black">Settings</h1>
        <p className="text-muted-foreground">Manage your studio preferences and account details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="space-y-2">
          {[
            { id: "profile", name: "Profile", icon: <User size={18} /> },
            { id: "security", name: "Security", icon: <Lock size={18} /> },
            { id: "notifications", name: "Notifications", icon: <Bell size={18} /> },
            { id: "billing", name: "Billing & Payouts", icon: <CreditCard size={18} /> },
          ].map((item) => (
            <button key={item.id} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${item.id === 'profile' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-secondary'}`}>
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3 space-y-8">
          <div className="bg-white dark:bg-[#0F172A] p-8 rounded-[2rem] border border-border shadow-sm space-y-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="Profile" className="w-24 h-24 rounded-2xl object-cover ring-4 ring-secondary" />
                <button className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <h2 className="text-xl font-black">John Digitizer</h2>
                <p className="text-sm text-muted-foreground">Elite Seller • Member since 2023</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground">Display Name</label>
                <input 
                  type="text" 
                  defaultValue="John Digitizer"
                  className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 ring-primary/20 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="john@example.com"
                  className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 ring-primary/20 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground">Bio</label>
              <textarea 
                rows={4}
                defaultValue="Professional embroidery digitizer with over 10 years of experience. I specialize in custom logos and detailed artwork."
                className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 ring-primary/20 transition-all outline-none resize-none"
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <Button className="rounded-xl luxury-gradient border-none text-white shadow-lg font-bold">
                <Save size={18} className="mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
