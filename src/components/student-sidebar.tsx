import React from 'react';
import { Book, Home, Inbox, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items for students.
const items = [
  {
    title: "Home",
    url: "/dashboard/students",
    icon: Home,
  },
  {
    title: "Courses",
    url: "/dashboard/students/courses",
    icon: Book,
  },
  {
    title: "Inbox",
    url: "/dashboard/students/inbox",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "/dashboard/students/settings",
    icon: Settings,
  },
];

const StudentSidebar: React.FC = () => {
  return (
    <Sidebar>
      <SidebarHeader>Students</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>Additional Links or Info</SidebarFooter>
    </Sidebar>
  );
};

export default StudentSidebar;
