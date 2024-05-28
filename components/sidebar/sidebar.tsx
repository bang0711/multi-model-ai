import { createNewConversation } from "@/lib/conversation";
import { cookies } from "next/headers";
import React from "react";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarLinks from "./sidebar-links";
import ConversationSetting from "./conversation-setting";

type Props = {};

function Sidebar({}: Props) {
  const conversations = cookies().get("conversations");
  if (!conversations) {
    return (
      <div className="min-w-64 bg-primary py-3 text-primary-foreground">
        <form action={createNewConversation} className="">
          <Button
            variant={"reverse"}
            className="mx-auto flex items-center gap-3"
          >
            <PlusCircle />
            New Conversation
          </Button>
        </form>
      </div>
    );
  }
  const formattedConversations: Conversation[] = JSON.parse(
    conversations.value,
  );
  return (
    <div className="relative flex max-h-screen min-w-64 flex-col justify-between bg-primary py-3 text-primary-foreground">
      {/* <ConversationSetting conversations={formattedConversations} /> */}
      <ScrollArea className="h-full w-full flex-1">
        <SidebarLinks conversations={formattedConversations} />
      </ScrollArea>
      <form action={createNewConversation} className="flex w-full">
        <Button variant={"reverse"} className="mx-auto flex items-center gap-3">
          <PlusCircle />
          New Conversation
        </Button>
      </form>
    </div>
  );
}

export default Sidebar;
