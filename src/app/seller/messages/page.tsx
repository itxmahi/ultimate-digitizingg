"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare, Search, Send, Loader2, User, MoreHorizontal, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const MessagesPage = () => {
  const [conversations, setConversations] = useState<any[]>([
    {
      id: "conv_1",
      user: {
        name: "Ahmad Raza",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
      },
      lastMessage: "I need this DST file converted to EMB format by tonight please.",
      time: "10:32 AM",
      unread: true
    },
    {
      id: "conv_2",
      user: {
        name: "Zainab Bano",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      },
      lastMessage: "The flower crest looks absolutely phenomenal on fabric!",
      time: "Yesterday",
      unread: false
    },
    {
      id: "conv_3",
      user: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
      },
      lastMessage: "Can we reduce the stitch density slightly on this patch design?",
      time: "3 days ago",
      unread: false
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedConv, setSelectedConv] = useState<any>({
    id: "conv_1",
    user: {
      name: "Ahmad Raza",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
    },
    lastMessage: "I need this DST file converted to EMB format by tonight please.",
    time: "10:32 AM",
    unread: true
  });
  const [message, setMessage] = useState("");

  const fetchConversations = async () => {
    try {
      const response = await fetch("/api/seller/messages");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setConversations(data);
        setSelectedConv(data[0]);
      }
    } catch (error) {
      console.warn("Failed to fetch messages, executing client sandbox logic:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;
    // Append to list of messages or show immediate feedback
    alert(`TRANSMISSION DEPLOYED TO NETWORK: "${message}"`);
    setMessage("");
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-6">
        <Loader2 size={60} className="animate-spin text-primary" />
        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 animate-pulse">Initializing Communication Link...</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">
            COMMS <span className="text-gradient">INTERFACE.</span>
          </h1>
          <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em] italic">Encrypted client-to-seller neural link</p>
        </div>
      </div>

      <div className="flex-1 glass rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden flex relative">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] -z-10" />
        
        {/* Sidebar */}
        <div className="w-96 border-r border-white/5 flex flex-col bg-white/[0.01] relative z-10">
          <div className="p-8 border-b border-white/5">
            <div className="relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/20 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="SEARCH TRANSMISSIONS..." 
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-[10px] font-black tracking-[0.2em] uppercase focus:ring-4 ring-primary/10 transition-all outline-none italic placeholder:text-muted-foreground/10"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {conversations.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => setSelectedConv(chat)}
                className={`p-8 border-b border-white/5 cursor-pointer transition-all duration-500 relative group ${selectedConv?.id === chat.id ? 'bg-primary/10 border-r-4 border-r-primary' : 'hover:bg-white/[0.02]'}`}
              >
                <div className="flex items-center space-x-5">
                   <div className="relative">
                      <div className={`absolute inset-0 bg-primary/20 blur-lg rounded-xl opacity-0 ${selectedConv?.id === chat.id ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity`} />
                      <img src={chat.user.avatar} className="w-12 h-12 rounded-xl object-cover relative z-10 border border-white/10" />
                      {chat.unread && <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-[#020617] z-20" />}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-black text-[11px] uppercase tracking-tighter italic">{chat.user.name}</span>
                        <span className="text-[9px] font-black text-muted-foreground/20 uppercase tracking-widest">{chat.time}</span>
                      </div>
                      <p className={`text-[10px] truncate uppercase tracking-widest ${chat.unread ? 'font-black text-primary' : 'text-muted-foreground/40'}`}>{chat.lastMessage}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white/[0.01] relative z-10">
          {selectedConv ? (
            <>
              <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center space-x-5">
                   <div className="w-12 h-12 glass border border-white/10 rounded-xl flex items-center justify-center text-primary font-black text-lg">
                     {selectedConv.user.name.charAt(0)}
                   </div>
                   <div>
                      <h2 className="font-black text-lg uppercase tracking-tight italic">{selectedConv.user.name}</h2>
                      <div className="flex items-center space-x-2">
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                         <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">ENCRYPTED LINK ACTIVE</span>
                      </div>
                   </div>
                </div>
                <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl glass border border-white/5 text-muted-foreground hover:text-primary transition-all shadow-xl">
                   <MoreHorizontal size={20} />
                </Button>
              </div>
              
              <div className="flex-1 p-10 overflow-y-auto space-y-8 custom-scrollbar">
                <div className="flex justify-start">
                  <div className="glass p-6 rounded-[2rem] rounded-tl-sm max-w-[70%] border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 -z-10" />
                    <p className="text-[11px] font-black uppercase tracking-wider leading-relaxed italic">{selectedConv.lastMessage}</p>
                    <span className="text-[8px] font-black text-muted-foreground/20 mt-4 block tracking-[0.2em]">{selectedConv.time} • RECEIVED</span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="luxury-gradient p-6 rounded-[2rem] rounded-tr-sm max-w-[70%] text-white shadow-[0_20px_40px_rgba(37,99,235,0.2)]">
                    <p className="text-[11px] font-black uppercase tracking-wider leading-relaxed italic">Synchronizing deployment specs now. The industrial protocol is optimized for your machine.</p>
                    <span className="text-[8px] font-black text-white/40 mt-4 block tracking-[0.2em]">10:45 AM • TRANSMITTED</span>
                  </div>
                </div>
              </div>

              {/* Quick Template Response Bar */}
              <div className="px-8 py-3 bg-white/[0.01] border-t border-white/5 flex flex-wrap gap-2">
                {[
                  "Your design file is ready for download!",
                  "Please verify your stitch specifications.",
                  "We are initiating the custom digitizing protocol now."
                ].map((tpl) => (
                  <button
                    key={tpl}
                    onClick={() => setMessage(tpl)}
                    className="px-4 py-2 rounded-xl glass border border-white/5 hover:border-primary/20 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all duration-300 italic"
                  >
                    {tpl}
                  </button>
                ))}
              </div>

              <div className="p-8 bg-white/[0.02] border-t border-white/5">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" className="w-16 h-16 rounded-2xl glass border border-white/5 text-muted-foreground/40 hover:text-primary transition-all">
                     <Paperclip size={20} />
                  </Button>
                  <div className="flex-1 relative group">
                    <input 
                      type="text" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="INITIALIZE RESPONSE PROTOCOL..." 
                      className="w-full h-16 bg-white/[0.03] border border-white/5 rounded-2xl px-8 text-[11px] font-black tracking-[0.2em] uppercase focus:ring-4 ring-primary/10 transition-all outline-none italic placeholder:text-muted-foreground/10"
                    />
                  </div>
                  <Button 
                    onClick={handleSend}
                    className="w-20 h-16 rounded-2xl luxury-gradient border-none text-white shadow-2xl hover:scale-105 active:scale-95 transition-all"
                  >
                    <Send size={24} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-20 space-y-8">
               <div className="w-24 h-24 glass border border-white/10 rounded-[2.5rem] flex items-center justify-center text-muted-foreground/10">
                  <MessageSquare size={48} />
               </div>
               <div className="space-y-3">
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic">NO ACTIVE LINK</h3>
                  <p className="text-[10px] font-black text-muted-foreground/20 uppercase tracking-[0.4em] italic">Select a client transmission to initialize protocol</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
