"use client";
import { updateConversations } from "@/lib/conversation";
import React, { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./message";
import { Bot, Loader2, MoveUp } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";

type Props = {
  id: string;
  conversation: Conversation;
};

function ConversationView({ id, conversation }: Props) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [AIStreamingResponse, setAIStreamingResponse] = useState("");
  const [messages, setMessages] = useState(conversation.messages);

  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation.messages]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    updateConversations(input, "user", parseInt(id));
    setIsLoading(true);
    setInput("");
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: updatedMessages,
        model: conversation.model,
      }),
    });

    if (!response.body) {
      throw new Error("ReadableStream not supported!");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let assistantMessageContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        updateConversations(assistantMessageContent, "assistant", parseInt(id));
        setIsStreaming(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Date.now(),
            role: "assistant",
            content: assistantMessageContent,
          },
        ]);
        break;
      }
      setIsLoading(false);
      setIsStreaming(true);
      assistantMessageContent += decoder.decode(value, { stream: true });
      setAIStreamingResponse(assistantMessageContent);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent); // Cast to FormEvent for TypeScript
    } else if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      setInput((prevInput) => prevInput + "\n");
    }
  };

  return (
    <div className="stretch mx-auto flex w-full flex-col justify-between">
      <ScrollArea className="relative flex h-full w-full flex-1 flex-col gap-4 rounded-md border p-4">
        {messages.map((message) => (
          <Message
            content={message.content}
            isUser={message.role === "user"}
            key={message.id}
          />
        ))}
        {isLoading && (
          <div className={`mb-3 me-5 flex justify-start gap-3`}>
            <Bot size={40} />
            <p className="flex items-center gap-2 whitespace-pre-line rounded-md border px-3 py-2">
              <Loader2 className="animate-spin" /> Thinking...
            </p>
          </div>
        )}

        {isStreaming && (
          <Message content={AIStreamingResponse} isUser={false} />
        )}
      </ScrollArea>
      <form
        onSubmit={async (e) => {
          if (!isStreaming && !isLoading) {
            await handleSubmit(e);
          }
        }}
        className="flex w-full justify-center gap-3 py-3 backdrop-blur-md"
      >
        <TextareaAutosize
          disabled={isStreaming || isLoading}
          onKeyDown={handleKeyDown}
          className="min-h-10 w-full min-w-96 max-w-xl rounded border border-gray-300 px-3 py-2 shadow-xl outline-none transition-all"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          maxRows={8}
        />
        <Button className="" type="submit">
          <MoveUp />
        </Button>
      </form>
    </div>
  );
}

export default ConversationView;
