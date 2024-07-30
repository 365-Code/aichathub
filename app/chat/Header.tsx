import LogOutButton from "@/components/LogOutButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { Menu } from "lucide-react";
  import React from "react";

const Header = () => {
  return (
    <div className="border-b">
      <div className="p-6 mx-auto flex items-center justify-between">
        <ThemeToggleButton />
        <LogOutButton />
      </div>
    </div>
  );
};

export default Header;
