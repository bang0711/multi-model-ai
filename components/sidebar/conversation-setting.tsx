"use client";

import ChangeModel from "./change-model";
import DeleteConversation from "./delete-conversation";
type Props = {
  conversation: Conversation;
  isHover: boolean;
};

function ConversationSetting({ conversation, isHover }: Props) {
  return (
    <div
      className={`py-1 ${isHover ? "flex items-center justify-between" : "hidden"}`}
    >
      <div className="flex items-center justify-end gap-1">
        <DeleteConversation id={conversation.id} />
        <ChangeModel conversation={conversation} />
      </div>
    </div>
  );
}

export default ConversationSetting;
