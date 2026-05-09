"use client";

import React from "react";
import { Search, Filter, Mail, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomersPage = () => {
  const customers = [
    { id: 1, name: "Sarah Jenkins", email: "sarah.j@example.com", orders: 12, spent: "$450.00", lastActive: "2 hours ago" },
    { id: 2, name: "Michael Chen", email: "m.chen@example.com", orders: 5, spent: "$125.00", lastActive: "1 day ago" },
    { id: 3, name: "Emma Wilson", email: "emma.w@example.com", orders: 28, spent: "$1,240.00", lastActive: "3 days ago" },
    { id: 4, name: "James Rodriguez", email: "j.rod@example.com", orders: 2, spent: "$55.00", lastActive: "1 week ago" },
    { id: 5, name: "Lisa Taylor", email: "lisa.t@example.com", orders: 7, spent: "$285.00", lastActive: "2 weeks ago" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black">Customers</h1>
          <p className="text-muted-foreground">View and manage your customer relationships.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F172A] rounded-[2rem] border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
           <div className="relative w-full sm:w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search customers by name or email..." 
                className="w-full bg-secondary/50 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 ring-primary/20 transition-all outline-none"
              />
           </div>
           <Button variant="outline" className="rounded-xl font-bold">
             <Filter size={16} className="mr-2" />
             Filter
           </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/30">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Orders</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Spent</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Last Active</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-bold">{customer.orders}</td>
                  <td className="py-4 px-6 text-sm font-black text-green-600 dark:text-green-400">{customer.spent}</td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">{customer.lastActive}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary"><Mail size={16} /></Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary"><MoreHorizontal size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
