"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import ConversationSetting from "./conversation-setting";

type Props = {
  conversations: Conversation[];
};

function SidebarLinks({ conversations }: Props) {
  const params = useParams();
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="flex flex-1 flex-col">
      {conversations.map((conversation) => (
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={`flex transition-all duration-300 ${conversation.id === parseInt(params.id as string) ? "bg-primary-foreground/80 text-primary" : "hover:bg-primary-foreground/80 hover:text-primary"}`}
          key={conversation.id}
        >
          <Link
            className="flex-1 p-3"
            href={`/conversation/${conversation.id}`}
          >
            {conversation.title}
          </Link>
          <ConversationSetting isHover={isHover} conversation={conversation} />
        </div>
      ))}
    </div>
  );
}

export default SidebarLinks;
