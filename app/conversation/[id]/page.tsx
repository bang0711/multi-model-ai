import ConversationView from "@/components/conversation-view";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

function ConversationPage({ params: { id } }: Props) {
  // Retrieve the existing conversations from the cookie
  const existingConversations = cookies().get("conversations");

  // Check if there are existing conversations in the cookie
  if (!existingConversations) {
    redirect("/"); // If no conversations exist, redirect to homepage
  }

  // Parse the existing conversations from the cookie
  let conversations = JSON.parse(existingConversations.value);

  // Find the conversation with the specified ID
  const conversation: Conversation = conversations.find(
    (c: any) => c.id === parseInt(id),
  );

  // Check if there is conversation with ID in the cookie
  if (!conversation) {
    redirect("/");
  }

  return <ConversationView conversation={conversation} id={id} />;
}

export default ConversationPage;
