'use client'
import React from "react";
import { Project } from "@/generated/prisma";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { JsonValue } from "@/generated/prisma/runtime/library";
import { toast } from "sonner";
import {  useRouter } from "next/navigation";
import { useSlideStore } from "@/store/useSlideStore";


type Props = {
  recentProject: Project[];
};

const RecenOpen = ({ recentProject }: Props) => {
    const router = useRouter()
    const { setSlides } = useSlideStore()

    const handleQuck = (projectId: string, slides: JsonValue) => {
        if(!projectId || !slides ){
            toast.error("Event has been created.", {
                description: "Please try again",
                style: {background: 'black'}
            })
            return
        }
        setSlides(JSON.parse(JSON.stringify(slides)) as Slide[]);
        router.push(`/presentation/${projectId}`)

    }
  return recentProject.length > 0 ? (
    <SidebarGroup>
      <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>
      <SidebarMenu>
        {recentProject.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className={`hover:bg-primary-80`}
            >
              <Button
                variant={"link"}
                className={`text-xs items-center justify-start`}
                onClick={() => handleQuck(item.id, item.slides)}
              >
                <span>{item.title}</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ) : <></>;
};

export default RecenOpen;
