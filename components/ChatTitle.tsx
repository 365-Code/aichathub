import React from "react";
import { Button } from "./ui/button";

const ChatTitle = ({title}: {title: string}) => {

    const setCurrentChat = (chat: any) => {
        // set chat on clikc
    }

  return (
    <Button onClick={() => setCurrentChat(title)} variant={"outline"} className="w-full">
      <p className="truncate">{title}</p>
    </Button>
  );
};

export default ChatTitle;
