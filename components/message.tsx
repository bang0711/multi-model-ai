import { Bot, Copy } from "lucide-react";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactMarkdown from "react-markdown";
type Props = {
  isUser: boolean;
  content: string;
};

function Message({ content, isUser }: Props) {
  const handleCopyClick = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const renderContent = () => {
    return (
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <div className="overflow-auto rounded-lg bg-primary/10">
                <div className="flex justify-between rounded-t-lg bg-primary/50 px-3 py-2 text-xs font-semibold text-primary-foreground">
                  {match[1] && <span className="italic">{match[1]}</span>}
                  <button
                    onClick={() =>
                      handleCopyClick(String(children).replace(/\n$/, ""))
                    }
                    className="flex items-center gap-1"
                  >
                    <Copy size={15} />
                    <p>Copy</p>
                  </button>
                </div>
                <SyntaxHighlighter
                  customStyle={{ borderRadius: "0 0 5px 5px", padding: "1rem" }}
                  style={nightOwl}
                  language={match[1]}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={`${className}`} {...props}>
                {children}
              </code>
            );
          },
        }}
        className={`max-w-7xl flex-1 whitespace-pre-line rounded-md border px-3 py-2 ${
          isUser && "bg-primary text-primary-foreground"
        }`}
      >
        {content}
      </ReactMarkdown>
    );
  };
  return (
    <div
      className={`mb-3 flex gap-3 ${
        isUser ? "ms-5 justify-end" : "me-5 justify-start"
      }`}
    >
      {!isUser && <Bot size={40} />}
      {renderContent()}
    </div>
  );
}

export default Message;
