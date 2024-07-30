"use client";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useChatState } from "@/context/ChatState";

const LogOutButton = () => {
  const { setChat } = useChatState();

  const nav = useRouter();

  const signOut = async () => {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    setChat(null);
    nav.replace("/login");
  };

  return (
    <Button
      onClick={signOut}
      size={"icon"}
      variant={"outline"}
      className="p-2 rounded-full no-underline bg-btn-background hover:bg-btn-background-hover text-white"
    >
      <LogOutIcon className="w-[1.2rem] h-[1.2rem]" />
    </Button>
  );
};

export default LogOutButton;
