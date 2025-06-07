"use client";

import { Button } from "@/components/ui/button";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { User } from "@/generated/prisma";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-y-6 items-start group-data[collapsible=icon]:hidden 
        ">
          {!prismaUser.subscription && (
            <div className="flex flex-col items-start p-2 pb-3 gap-4 dark:bg-[#1e1e1f] bg-[#efefef] w-full h-full rounded-xl group-data-[collapsible=icon]:hidden">
              <div className="flex flex-col items-start gap-1">
                <p className="text-base font-bold">
                  Get{" "}
                  <span className="text-pretty text-orange-400">
                    Creative AI
                  </span>
                </p>
                <span className="text-sm text-pretty dark:text-gray-500">
                  Unlock all feature including AI and more
                </span>
              </div>

              <div className="w-full p-[1px]
              border rounded-full
              border-r-orange-700 border-t-red-700 border-b-yellow-400 border-l-yellow-700">
                <Button
                  className="w-full border-orange-400 bg-background-80 hover:bg-background-90 text-primary font-bold"
                  variant={"default"}
                  // onClick={handleUpgrading}
                >
                  {loading ? "Upgrading..." : "Upgrade"}
                </Button>
              </div>
            </div>
          )}

          <SignedIn>
            <SidebarMenuButton size={'lg'}
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">
                  {user?.fullName}
                </span>
                <span className="truncate text-[#878787]">
                  {user?.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
