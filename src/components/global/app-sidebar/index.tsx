"use client";

import { Project, User } from "@/generated/prisma";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import React, { ComponentProps } from "react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import NavMain from "./nav-main";
import { data } from "@/lib/constants";
import RecenOpen from "./recent-open";
import NavFooter from "./nav-footer";

type Props = {
  recentProjects: Project[];
  user: User;
} & ComponentProps<typeof Sidebar>;

export const AppSidebar = ({ recentProjects, user, ...props }: Props) => {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-background-90"
      {...props}
    >
      <SidebarHeader className="pt-6 px-2 pb-0">
        <SidebarMenuButton
          size={"lg"}
          className="data-[state=open]:text-sidebar-accent-foreground "
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src={"/vercel.svg"} alt={"/vivid.png"} />
              <AvatarFallback className="rounded-lg">VI</AvatarFallback>
            </Avatar>
          </div>
          <span className="truncate text-primary text-2xl font-semibold">
            Vivid
          </span>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent className="px-2 mt-10 gap-y-6">
        <NavMain items={data.navMain} />
        <RecenOpen recentProject={recentProjects} />
      </SidebarContent>
      <SidebarFooter >
        <NavFooter prismaUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
