"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createNewConversation = () => {
  const existingConversations = cookies().get("conversations");

  let conversations = [];
  if (!process.env.DEFAULT_MODEL) {
    throw new Error("Please specify the default model.");
  }
  // Check if there are existing conversations in the cookie
  if (existingConversations) {
    conversations = JSON.parse(existingConversations.value);
  }
  const newConversation: Conversation = {
    id: Date.now(),
    messages: [],
    title: `New Conversation`, // Set the title with the index
    model: process.env.DEFAULT_MODEL!,
  };
  // Insert the new conversation at the beginning of the existing conversations
  conversations.unshift(newConversation);

  // Update the cookie with the updated conversations
  cookies().set("conversations", JSON.stringify(conversations));

  // Redirect to the new conversation page
  redirect(`/conversation/${newConversation.id}`);
};

export const deleteConversation = (id: number) => {
  // Retrieve the existing conversations from the cookie
  const existingConversations = cookies().get("conversations");

  // Check if there are existing conversations in the cookie
  if (!existingConversations) {
    return; // If no conversations exist, return without modifying anything
  }

  // Parse the existing conversations from the cookie
  let conversations = JSON.parse(existingConversations.value);
  // Filter out the conversation with the specified ID
  conversations = conversations.filter(
    (conversation: any) => conversation.id !== id,
  );

  // Update the cookie with the updated conversations (after deleting the specified conversation)
  cookies().set("conversations", JSON.stringify(conversations));

  // Redirect to the homepage
  redirect("/");
};

export const clearAllConversations = () => {
  // Delete the cookies
  cookies().delete("conversations");

  // Redirect to the homepage
  redirect("/");
};

export const updateConversations = async (
  content: string,
  role: "user" | "assistant",
  conversationId: number,
) => {
  // Retrieve the existing conversations from the cookie
  const existingConversations = cookies().get("conversations");

  // Check if there are existing conversations in the cookie
  if (!existingConversations) {
    return; // If no conversations exist, return without modifying anything
  }

  // Parse the existing conversations from the cookie
  const conversations: Conversation[] = JSON.parse(existingConversations.value);

  // Find the conversation with the specified ID
  const conversationIndex = conversations.findIndex(
    (conversation: Conversation) => conversation.id === conversationId,
  );

  // If the conversation is not found, return without modifying anything
  if (conversationIndex === -1) {
    return;
  }

  const newMessage = {
    id: Date.now(),
    role,
    content,
  };
  console.log(newMessage);
  // Append the new message to the messages array of the conversation
  conversations[conversationIndex].messages.push(newMessage);
  console.log(conversations[conversationIndex].messages);
  // Update the cookie with the updated conversations
  cookies().set("conversations", JSON.stringify(conversations));
};

export const getConversation = (id: number) => {
  // Retrieve the existing conversations from the cookie
  const existingConversations = cookies().get("conversations");

  // Check if there are existing conversations in the cookie
  if (!existingConversations) {
    return; // If no conversations exist, return without modifying anything
  }

  // Parse the existing conversations from the cookie
  let conversations: Conversation[] = JSON.parse(existingConversations.value);

  // Find the conversation with the specified ID
  const conversation = conversations.find(
    (conversation: any) => conversation.id === id,
  );

  return conversation;
};

export const changeConversationModel = (id: number, model: string) => {
  // Retrieve the existing conversations from the cookie
  const existingConversations = cookies().get("conversations");

  // Check if there are existing conversations in the cookie
  if (!existingConversations) {
    return; // If no conversations exist, return without modifying anything
  }

  // Parse the existing conversations from the cookie
  const conversations: Conversation[] = JSON.parse(existingConversations.value);

  // Find the conversation with the specified ID
  const conversationIndex = conversations.findIndex(
    (conversation: Conversation) => conversation.id === id,
  );

  // If the conversation is not found, return without modifying anything
  if (conversationIndex === -1) {
    return;
  }

  // Update the model of the found conversation
  conversations[conversationIndex].model = model;

  // Update the cookie with the updated conversations
  cookies().set("conversations", JSON.stringify(conversations));
};
