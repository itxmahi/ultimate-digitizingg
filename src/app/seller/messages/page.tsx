"use client";

import React from "react";
import { MessageSquare, Search, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const MessagesPage = () => {
  const conversations = [
    { id: 1, name: "Sarah Jenkins", message: "Hi, I love the floral design! Can you make it a bit smaller?", time: "10:30 AM", unread: true },
    { id: 2, name: "Michael Chen", message: "Thanks for the quick delivery.", time: "Yesterday", unread: false },
    { id: 3, name: "Emma Wilson", message: "Is the DST file compatible with my machine?", time: "Tuesday", unread: false },
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-black">Messages</h1>
        <p className="text-muted-foreground">Communicate with your buyers.</p>
      </div>

      <div className="flex-1 bg-white dark:bg-[#0F172A] rounded-[2rem] border border-border shadow-sm overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full bg-secondary/50 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 ring-primary/20 transition-all outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((chat) => (
              <div key={chat.id} className={`p-4 border-b border-border cursor-pointer transition-colors ${chat.unread ? 'bg-primary/5' : 'hover:bg-secondary/30'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-sm">{chat.name}</span>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <p className={`text-sm truncate ${chat.unread ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>{chat.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-secondary/10">
          <div className="p-6 border-b border-border bg-white dark:bg-[#0F172A]">
            <h2 className="font-bold">Sarah Jenkins</h2>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="flex justify-start">
              <div className="bg-white dark:bg-[#1E293B] p-4 rounded-2xl rounded-tl-sm shadow-sm max-w-[80%] border border-border">
                <p className="text-sm">Hi, I love the floral design! Can you make it a bit smaller?</p>
                <span className="text-[10px] text-muted-foreground mt-2 block">10:30 AM</span>
              </div>
            </div>
            {/* Add more messages here to show a conversation */}
          </div>

          <div className="p-4 bg-white dark:bg-[#0F172A] border-t border-border">
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 bg-secondary/50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 ring-primary/20 transition-all outline-none"
              />
              <Button className="rounded-xl px-6 bg-primary text-white hover:bg-primary/90">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
