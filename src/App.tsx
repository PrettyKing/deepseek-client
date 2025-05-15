import { useState, useRef, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const client = new ApolloClient({
  uri: "https://deepseek-server.chalee695469701.workers.dev",
  cache: new InMemoryCache(),
});

// Define your GraphQL query
const ASK_DEEPSEEK = gql`
  query AskDeepSeek($prompt: String!) {
    askDeepSeek(prompt: $prompt)
  }
`;
// 定义消息的接口类型
interface Message {
  sender: "user" | "bot";
  content: string;
  timestamp: string;
  isError?: boolean; // 添加可选的错误标志
}

function AskDeepSeek() {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      content: "你好！我是DeepSeek AI助手，有什么我可以帮助你的吗？👋",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { refetch } = useQuery(ASK_DEEPSEEK, {
    variables: { prompt },
    skip: true,
  });

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || loading) return;

    // 添加用户消息
    const userMessage: Message = {
      sender: "user",
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const { data, error } = await refetch({ prompt: userMessage.content });

      if (error) {
        console.error(error);
        // 添加错误消息
        const errorMessage: Message = {
          sender: "bot",
          content: "抱歉，我遇到了一些问题。请稍后再试。😥",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } else if (data && data.askDeepSeek) {
        // 添加AI回复
        const botReply: Message = {
          sender: "bot",
          content: data.askDeepSeek,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botReply]);
      }
    } catch (err) {
      console.error("GraphQL请求错误:", err);
      // 添加捕获到的错误消息
      const errorMessage: Message = {
        sender: "bot",
        content: "发生了未知错误，请检查网络连接或稍后重试。😓",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // 自动调整文本区域高度
  const autoResizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    setPrompt(textarea.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-2xl flex flex-col h-[600px]">
        {/* 头部 */}
        <div className="relative bg-gradient-to-r from-purple-400 to-pink-400 p-4 sm:p-6">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white flex items-center justify-center p-1">
              <div className="h-full w-full rounded-full flex items-center justify-center bg-purple-100">
                <svg
                  className="w-8 h-8 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  ></path>
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                DeepSeek AI 助手
              </h1>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                <p className="text-sm text-white text-opacity-80">在线</p>
              </div>
            </div>
          </div>
        </div>

        {/* 消息区域 */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 bg-opacity-50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                      <div className="h-full w-full flex items-center justify-center bg-purple-100">
                        <svg
                          className="w-6 h-6 text-purple-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  )}

                  <div
                    className={`mx-2 ${
                      message.sender === "user" ? "ml-2" : "mr-2"
                    }`}
                  >
                    <div
                      className={`rounded-2xl p-4 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : message.isError
                          ? "bg-red-50 border border-red-200 text-red-600"
                          : "bg-white border border-gray-200 text-gray-700 shadow-sm"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      ) : (
                        <div className="markdown-body">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                              }: any) {
                                const match = /language-(\w+)/.exec(
                                  className || ""
                                );
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    className="rounded-md overflow-hidden"
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, "")}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code
                                    className={`${className} px-1 py-0.5 bg-gray-100 rounded text-sm`}
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                );
                              },
                              // 自定义链接样式
                              a: ({ node, ...props }: any) => (
                                <a
                                  {...props}
                                  className="text-purple-600 hover:text-purple-800 underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                />
                              ),
                              // 自定义标题样式
                              h1: ({ node, ...props }: any) => (
                                <h1
                                  {...props}
                                  className="text-xl font-bold mt-4 mb-2"
                                />
                              ),
                              h2: ({ node, ...props }: any) => (
                                <h2
                                  {...props}
                                  className="text-lg font-bold mt-3 mb-2"
                                />
                              ),
                              h3: ({ node, ...props }: any) => (
                                <h3
                                  {...props}
                                  className="text-md font-bold mt-3 mb-1"
                                />
                              ),
                              // 自定义列表样式
                              ul: ({ node, ...props }: any) => (
                                <ul
                                  {...props}
                                  className="list-disc pl-6 my-2"
                                />
                              ),
                              ol: ({ node, ...props }: any) => (
                                <ol
                                  {...props}
                                  className="list-decimal pl-6 my-2"
                                />
                              ),
                              // 自定义段落样式
                              p: ({ node, ...props }: any) => (
                                <p {...props} className="my-2" />
                              ),
                              // 自定义引用样式
                              blockquote: ({ node, ...props }: any) => (
                                <blockquote
                                  {...props}
                                  className="border-l-4 border-gray-300 pl-4 italic my-3 text-gray-600"
                                />
                              ),
                              // 自定义表格样式
                              table: ({ node, ...props }: any) => (
                                <div className="overflow-x-auto my-4">
                                  <table
                                    {...props}
                                    className="min-w-full divide-y divide-gray-200 border border-gray-300"
                                  />
                                </div>
                              ),
                              thead: ({ node, ...props }: any) => (
                                <thead {...props} className="bg-gray-100" />
                              ),
                              tr: ({ node, ...props }: any) => (
                                <tr
                                  {...props}
                                  className="border-b border-gray-300"
                                />
                              ),
                              th: ({ node, ...props }: any) => (
                                <th
                                  {...props}
                                  className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                />
                              ),
                              td: ({ node, ...props }: any) => (
                                <td {...props} className="px-3 py-2" />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                    <div
                      className={`text-xs text-gray-500 mt-1 ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {message.timestamp}
                    </div>
                  </div>

                  {message.sender === "user" && (
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                      你
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                    <div className="h-full w-full flex items-center justify-center bg-purple-100">
                      <svg
                        className="w-6 h-6 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="mx-2">
                    <div className="rounded-2xl p-4 bg-white border border-gray-200 text-gray-700 shadow-sm flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 输入区域 */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl opacity-70 blur-sm group-focus-within:opacity-100 transition duration-300"></div>
            <div className="relative flex items-end bg-white rounded-xl pl-3 pr-1 py-1 overflow-hidden">
              <textarea
                className="flex-1 bg-transparent outline-none resize-none min-h-[44px] max-h-32 text-gray-800 placeholder-gray-400 py-2 px-1"
                value={prompt}
                onChange={autoResizeTextarea}
                onKeyPress={handleKeyPress}
                placeholder="输入你的问题... (支持Markdown格式)"
                disabled={loading}
                rows={1}
                style={{ height: "auto" }}
              />

              <div className="flex items-center space-x-2 self-end pb-2">
                <button
                  type="button"
                  className="text-gray-400 hover:text-pink-500 transition-colors p-2 rounded-full"
                  title="插入表情"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>

                <button
                  onClick={() => handleSubmit()}
                  disabled={loading || !prompt.trim()}
                  className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  title="发送消息"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-2 text-xs text-center text-gray-400">
            DeepSeek AI助手支持Markdown格式，可以输出代码、表格、列表等富文本 ✨
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-100">
        <AskDeepSeek />
      </div>
    </ApolloProvider>
  );
}

export default App;
