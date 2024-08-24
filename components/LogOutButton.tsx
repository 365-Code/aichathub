"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOutIcon, Loader2 } from "lucide-react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useChatState } from "@/context/ChatState";

const LogOutButton = () => {
  const { setChat } = useChatState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signOut = async () => {
    setLoading(true);
    try {
      const supabase = createSupabaseClient();
      await supabase.auth.signOut();
      setChat(null);
      router.replace("/login");
    } catch (error) {
      console.error("Sign out error:", error);
      // Optionally handle errors or provide user feedback
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={signOut}
      size="icon"
      variant="outline"
      className={`relative p-3 rounded-full transition-all duration-300 
        ${loading ? "bg-gray-600 cursor-wait" : "bg-blue-600 hover:bg-blue-700"} 
        text-white shadow-md hover:shadow-lg`}
      aria-label="Log out"
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-white" />
      ) : (
        <LogOutIcon className="w-5 h-5" />
      )}
    </Button>
  );
};

export default LogOutButton;
