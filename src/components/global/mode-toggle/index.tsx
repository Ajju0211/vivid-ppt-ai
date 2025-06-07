"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

type Props = {};

function ThemeSwitcher({}: Props) {
  const [mouted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  if(!mouted){
    return null
  }
  return <div>
    <Switch checked={theme === 'light'}
    className="h-10 bg-[#eeeeee] w-20 pl-1 data-[state=checked]:bg-primary-80"
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    aria-label="Toggle dark mode"
    />
  </div>;
}

export default ThemeSwitcher;
