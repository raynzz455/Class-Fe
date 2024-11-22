import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function Layout({ children, sidebar }: LayoutProps) {
  return (
    <SidebarProvider>
      {sidebar}
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
