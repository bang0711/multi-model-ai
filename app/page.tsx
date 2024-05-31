"use client";

import { Button } from "@/components/ui/button";
import { Bot, MoveUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, KeyboardEvent, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function Chat() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // createNewConversation();

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
    };
    console.log(userMessage);
    setInput("");
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
    <div className="stretch mx-auto flex w-full flex-col py-24">
      <div className="flex flex-col items-center justify-center gap-5">
        <Bot size={100} />
        <h1 className="text-5xl font-bold">
          Welcome To My Open-Source Chat Bot
        </h1>
        <p className="text-3xl font-semibold">Type Something To Get Started</p>
      </div>

      <form className="flex w-full justify-center gap-3 py-5 backdrop-blur-md">
        <TextareaAutosize
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
