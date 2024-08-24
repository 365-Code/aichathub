import LogOutButton from "@/components/LogOutButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

type HeaderProps = {
  isVisible: boolean;
  showHistory: () => void;
};

const Header = ({ isVisible, showHistory }: HeaderProps) => {
  return (
    <div className="border-b">
      <div className="p-6 mx-auto flex items-center justify-between">
        <ThemeToggleButton />
        <div className="flex items-center gap-x-2">
          <Button
            variant={"outline"}
            className="md:hidden block"
            onClick={showHistory}
          >
            <Menu
              className={`transition-transform ${isVisible ? "rotate-90 opacity-0" : "rotate-0 opacity-100"} duration-300`}
            />
          </Button>
          <LogOutButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
