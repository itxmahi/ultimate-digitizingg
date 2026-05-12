"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;
  }

  // Basic protection - only allow ADMIN role
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#020617] text-foreground">
      <nav className="h-20 glass border-b border-white/5 flex items-center justify-between px-10">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 luxury-gradient rounded-xl flex items-center justify-center">
            <span className="text-white font-black italic">A</span>
          </div>
          <span className="font-black tracking-widest uppercase text-sm">Admin Nexus</span>
        </div>
        <div className="flex items-center space-x-6">
           <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">{session.user.email}</span>
        </div>
      </nav>
      <main className="p-10">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
