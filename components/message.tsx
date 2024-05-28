import { Bot, Copy } from "lucide-react";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  isUser: boolean;
  content: string;
};

function Message({ content, isUser }: Props) {
  const handleCopyClick = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```|```[\s\S]*?$)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```")) {
        const codeBlock = part.slice(3, part.length - 3).trim();
        const firstLineEndIndex = codeBlock.indexOf("\n");
        const language =
          firstLineEndIndex !== -1
            ? codeBlock.slice(0, firstLineEndIndex).trim()
            : "";
        const code =
          firstLineEndIndex !== -1
            ? codeBlock.slice(firstLineEndIndex + 1).trim()
            : codeBlock;

        return (
          <div className="mb-3 flex flex-col" key={index}>
            <div className="flex justify-between rounded-t-lg bg-primary/50 px-3 py-2 text-xs font-semibold text-primary-foreground">
              {language && <span className="italic">{language}</span>}
              <button
                onClick={() => handleCopyClick(code)}
                className="flex items-center gap-1"
              >
                <Copy size={15} />
                <p>Copy</p>
              </button>
            </div>{" "}
            <SyntaxHighlighter
              customStyle={{ borderRadius: "0 0 5px 5px", padding: "1rem" }}
              language={language}
              style={nightOwl}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        );
      } else {
        return <p key={index}>{part}</p>;
      }
    });
  };

  return (
    <div
      className={`mb-3 flex gap-3 ${
        isUser ? "ms-5 justify-end" : "me-5 justify-start"
      }`}
    >
      {!isUser && <Bot size={40} />}
      <div
        className={`max-w-5xl flex-1 whitespace-pre-line rounded-md border px-3 py-2 ${
          isUser && "bg-primary text-primary-foreground"
        }`}
      >
        {isUser ? content : renderContent(content)}
      </div>
    </div>
  );
}

export default Message;
