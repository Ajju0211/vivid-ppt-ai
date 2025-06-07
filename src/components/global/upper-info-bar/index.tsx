import { SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "@/generated/prisma";
import React from "react";
import SearchBar from "./upper-info-searchbar";
import ThemeSwitcher from "../mode-toggle";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import NewProjectButton from "./new-projects-button";

type Props = {
  user: User;
  children: React.ReactNode;
};

function UpperInfoBar({ user }: Props) {
  return (
    <header className="sticky top-0 z-[10] flex shrink-0 flex-wrap  items-center gap-2  bg-background p-4 justify-between">
      <SidebarTrigger className="" />
      <div className="w-full  max-w-[95%] flex items-center justify-between gap-4 flex-wrap">
        <SearchBar />
        <ThemeSwitcher />
        <div className="flex  flex-wrap gap-4 items-center justify-end">
          <Button
          className="bg-primary-80 dark:bg-[#1e1e1e] rounded-lg hover:bg-background-80 text-primary font-semibold cursor-not-allowed"
          >
            <Upload />
            import
          </Button>
          <NewProjectButton user={user}/>
        </div>
      </div>
    </header>
  );
}

export default UpperInfoBar;
