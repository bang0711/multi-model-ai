type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};
type Conversation = {
  id: number;
  messages: Message[];
  title: string;
  model: string;
};
