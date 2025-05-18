import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import "./CodeReviewApp.css";

// 类型定义
interface CodeReviewResult {
  issues: {
    severity: "error" | "warning" | "info";
    message: string;
    line?: number;
  }[];
  suggestions: {
    message: string;
    line?: number;
  }[];
  positives: {
    message: string;
  }[];
}

interface MemoryLeakResult {
  leaks: {
    severity: "high" | "medium" | "low";
    message: string;
    line?: number;
  }[];
  warnings: {
    severity: string;
    message: string;
    line?: number;
  }[];
  recommendations: {
    message: string;
  }[];
}

interface AnalysisResponse {
  codeReview: CodeReviewResult;
  memoryLeakAnalysis?: MemoryLeakResult;
  text?: string;
}

// 改进：添加表单输入验证接口
interface FormValidation {
  isValid: boolean;
  message: string | null;
}

// 改进：添加语言和分析级别的类型
interface LanguageOption {
  value: string;
  label: string;
}

interface AnalysisLevelOption {
  value: string;
  label: string;
  description: string; // 增加描述说明各级别的区别
}

const CodeReviewApp: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [analysisLevel, setAnalysisLevel] = useState<string>("detailed");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkMemoryLeaks, setCheckMemoryLeaks] = useState<boolean>(true);
  const [apiUrl, setApiUrl] = useState<string>(
    "https://faithcal-mastra-app.chalee695469701.workers.dev/api/agents/codeReviewAgent/generate"
  );
  const [showApiOptions, setShowApiOptions] = useState<boolean>(false);

  // 改进：支持的语言选项
  const languages: LanguageOption[] = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "php", label: "PHP" },
    { value: "swift", label: "Swift" },
    { value: "rust", label: "Rust" },
    { value: "kotlin", label: "Kotlin" },
    { value: "other", label: "Other" },
  ];

  // 改进：分析级别选项
  const analysisLevels: AnalysisLevelOption[] = [
    {
      value: "basic",
      label: "Basic",
      description: "Quick scan for obvious issues and simple recommendations",
    },
    {
      value: "detailed",
      label: "Detailed",
      description:
        "Thorough analysis with specific suggestions and line references",
    },
    {
      value: "comprehensive",
      label: "Comprehensive",
      description:
        "In-depth review with advanced patterns and optimization advice",
    },
  ];

  // 改进：添加示例代码
  const exampleCode = {
    javascript: `function calculateTotal(items) {
  let total = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// Event listener that might cause memory leaks
document.getElementById('button').addEventListener('click', function() {
  console.log('Button clicked');
});`,
    typescript: `interface Item {
  name: string;
  price: number;
}

function calculateTotal(items: Item[]): number {
  let total: number = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// Potential memory leak in React component
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Interval running');
  }, 1000);
  // Missing cleanup
}, []);`,
    python: `def calculate_total(items):
    total = 0
    for item in items:
        total += item['price']
    return total

# Potential memory leak with file handling
def read_file(path):
    f = open(path, 'r')
    content = f.read()
    # Missing f.close()
    return content`,
  };

  // 改进：加载示例代码
  const loadExampleCode = useCallback(() => {
    if (exampleCode[language as keyof typeof exampleCode]) {
      setCode(exampleCode[language as keyof typeof exampleCode]);
    } else {
      setCode(exampleCode.javascript); // 默认加载JavaScript示例
    }
  }, [language]);

  // 改进：验证表单输入
  const validateForm = (): FormValidation => {
    if (!code.trim()) {
      return {
        isValid: false,
        message: "Please enter some code to analyze",
      };
    }

    if (code.trim().length < 10) {
      return {
        isValid: false,
        message: "Code sample is too short for meaningful analysis",
      };
    }

    return {
      isValid: true,
      message: null,
    };
  };

  // 改进：处理提交代码进行分析 - 添加防抖和错误处理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null); // 清除之前的结果

    try {
      const codeContent = code.trim();
      const promptMessage = `请对以下${language}代码进行审查，分析级别为${analysisLevel}。${
        checkMemoryLeaks ? "同时进行内存泄漏分析。" : ""
      }\n\n\`\`\`${language}\n${codeContent}\n\`\`\``;

      const response = await axios.post(
        apiUrl,
        {
          messages: [
            {
              role: "user",
              content: promptMessage,
            },
          ],
          code: codeContent,
          language,
          level: analysisLevel,
          checkMemoryLeaks,
        },
        {
          timeout: 60000, // 添加60秒超时
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 检查响应数据结构
      if (response.data) {
        if (response.data.text && response.data.text.includes("请提供具体的")) {
          setError("请提供有效的代码内容进行分析");
        } else {
          setResult(response.data);
        }
      } else {
        setError("Received invalid response format from the server");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // 超时错误处理
        if (err.code === "ECONNABORTED") {
          setError(
            "Analysis timed out. Please try a smaller code sample or lower analysis level."
          );
        } else {
          setError(
            `Analysis failed: ${
              err.response?.data?.message ||
              err.response?.statusText ||
              err.message
            }`
          );
        }
      } else {
        setError("An unexpected error occurred during analysis");
        console.error("Unexpected error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 改进：清除表单和结果
  const handleClear = () => {
    setCode("");
    setResult(null);
    setError(null);
  };

  // 改进：复制结果到剪贴板
  const copyResultToClipboard = () => {
    if (!result) return;

    let textToCopy = "";

    if (result.text) {
      textToCopy += result.text + "\n\n";
    }

    if (result.codeReview) {
      textToCopy += "==== CODE REVIEW RESULTS ====\n";

      if (result.codeReview.issues.length > 0) {
        textToCopy += `ISSUES (${result.codeReview.issues.length}):\n`;
        result.codeReview.issues.forEach((issue, i) => {
          textToCopy += `${i + 1}. [${issue.severity}] ${issue.message}${
            issue.line ? ` (Line: ${issue.line})` : ""
          }\n`;
        });
        textToCopy += "\n";
      }

      if (result.codeReview.suggestions.length > 0) {
        textToCopy += `SUGGESTIONS (${result.codeReview.suggestions.length}):\n`;
        result.codeReview.suggestions.forEach((suggestion, i) => {
          textToCopy += `${i + 1}. ${suggestion.message}${
            suggestion.line ? ` (Line: ${suggestion.line})` : ""
          }\n`;
        });
        textToCopy += "\n";
      }

      if (result.codeReview.positives.length > 0) {
        textToCopy += "POSITIVE ASPECTS:\n";
        result.codeReview.positives.forEach((positive, i) => {
          textToCopy += `${i + 1}. ${positive.message}\n`;
        });
        textToCopy += "\n";
      }
    }

    if (result.memoryLeakAnalysis) {
      textToCopy += "==== MEMORY LEAK ANALYSIS ====\n";

      if (result.memoryLeakAnalysis.leaks.length > 0) {
        textToCopy += `POTENTIAL LEAKS (${result.memoryLeakAnalysis.leaks.length}):\n`;
        result.memoryLeakAnalysis.leaks.forEach((leak, i) => {
          textToCopy += `${i + 1}. [${leak.severity}] ${leak.message}${
            leak.line ? ` (Line: ${leak.line})` : ""
          }\n`;
        });
        textToCopy += "\n";
      }

      if (result.memoryLeakAnalysis.warnings.length > 0) {
        textToCopy += `WARNINGS (${result.memoryLeakAnalysis.warnings.length}):\n`;
        result.memoryLeakAnalysis.warnings.forEach((warning, i) => {
          textToCopy += `${i + 1}. [${warning.severity}] ${warning.message}${
            warning.line ? ` (Line: ${warning.line})` : ""
          }\n`;
        });
        textToCopy += "\n";
      }

      if (result.memoryLeakAnalysis.recommendations.length > 0) {
        textToCopy += "RECOMMENDATIONS:\n";
        result.memoryLeakAnalysis.recommendations.forEach((rec, i) => {
          textToCopy += `${i + 1}. ${rec.message}\n`;
        });
      }
    }

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // 显示临时提示
        const tempAlert = document.createElement("div");
        tempAlert.className = "copy-alert";
        tempAlert.textContent = "Results copied to clipboard!";
        document.body.appendChild(tempAlert);

        setTimeout(() => {
          document.body.removeChild(tempAlert);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        setError("Failed to copy results to clipboard");
      });
  };

  // 改进：高亮显示代码中的问题行
  const renderCodeWithHighlights = () => {
    if (!result || !code) return null;

    // 收集需要高亮的行
    const highlights: Record<
      number,
      {
        severity: string;
        message: string;
      }[]
    > = {};

    // 收集代码审查问题
    if (result.codeReview?.issues) {
      result.codeReview.issues.forEach((issue) => {
        if (issue.line) {
          if (!highlights[issue.line]) {
            highlights[issue.line] = [];
          }
          highlights[issue.line].push({
            severity: issue.severity,
            message: issue.message,
          });
        }
      });
    }

    // 收集内存泄漏问题
    if (result.memoryLeakAnalysis?.leaks) {
      result.memoryLeakAnalysis.leaks.forEach((leak) => {
        if (leak.line) {
          if (!highlights[leak.line]) {
            highlights[leak.line] = [];
          }
          highlights[leak.line].push({
            severity: leak.severity,
            message: leak.message,
          });
        }
      });
    }

    // 分割代码到行
    const lines = code.split("\n");

    return (
      <div className="highlighted-code">
        <h3>Code with Issue Highlights</h3>
        <div className="code-container">
          {lines.map((line, index) => {
            const lineNumber = index + 1;
            const hasHighlight = highlights[lineNumber];

            return (
              <div
                key={`line-${lineNumber}`}
                className={`code-line ${
                  hasHighlight ? `highlight-${hasHighlight[0].severity}` : ""
                }`}
              >
                <span className="line-number">{lineNumber}</span>
                <code className="line-content">{line}</code>
                {hasHighlight && (
                  <div className="line-issues">
                    {hasHighlight.map((highlight, i) => (
                      <div
                        key={`highlight-${lineNumber}-${i}`}
                        className={`issue-marker ${highlight.severity}`}
                      >
                        {highlight.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 渲染代码审查结果
  const renderCodeReviewResults = (codeReview: CodeReviewResult) => {
    return (
      <div className="result-section">
        <h3>Code Review Results</h3>

        {codeReview.issues.length > 0 && (
          <div className="result-subsection">
            <h4>Issues ({codeReview.issues.length})</h4>
            <ul className="issue-list">
              {codeReview.issues.map((issue, index) => (
                <li
                  key={`issue-${index}`}
                  className={`severity-${issue.severity}`}
                >
                  <span className="severity-badge">{issue.severity}</span>
                  <span className="message">{issue.message}</span>
                  {issue.line && (
                    <span className="line-number">Line: {issue.line}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {codeReview.suggestions.length > 0 && (
          <div className="result-subsection">
            <h4>Suggestions ({codeReview.suggestions.length})</h4>
            <ul className="suggestion-list">
              {codeReview.suggestions.map((suggestion, index) => (
                <li key={`suggestion-${index}`}>
                  <span className="message">{suggestion.message}</span>
                  {suggestion.line && (
                    <span className="line-number">Line: {suggestion.line}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {codeReview.positives.length > 0 && (
          <div className="result-subsection">
            <h4>Positive Aspects</h4>
            <ul className="positive-list">
              {codeReview.positives.map((positive, index) => (
                <li key={`positive-${index}`}>{positive.message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // 渲染内存泄漏分析结果
  const renderMemoryLeakResults = (memoryLeakAnalysis: MemoryLeakResult) => {
    return (
      <div className="result-section memory-leak-section">
        <h3>Memory Leak Analysis</h3>

        {memoryLeakAnalysis.leaks.length > 0 && (
          <div className="result-subsection">
            <h4>Potential Memory Leaks ({memoryLeakAnalysis.leaks.length})</h4>
            <ul className="leak-list">
              {memoryLeakAnalysis.leaks.map((leak, index) => (
                <li
                  key={`leak-${index}`}
                  className={`severity-${leak.severity}`}
                >
                  <span className="severity-badge">{leak.severity}</span>
                  <span className="message">{leak.message}</span>
                  {leak.line && (
                    <span className="line-number">Line: {leak.line}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {memoryLeakAnalysis.warnings.length > 0 && (
          <div className="result-subsection">
            <h4>Warnings ({memoryLeakAnalysis.warnings.length})</h4>
            <ul className="warning-list">
              {memoryLeakAnalysis.warnings.map((warning, index) => (
                <li
                  key={`warning-${index}`}
                  className={`severity-${warning.severity}`}
                >
                  <span className="severity-badge">{warning.severity}</span>
                  <span className="message">{warning.message}</span>
                  {warning.line && (
                    <span className="line-number">Line: {warning.line}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {memoryLeakAnalysis.recommendations.length > 0 && (
          <div className="result-subsection">
            <h4>Recommendations</h4>
            <ul className="recommendation-list">
              {memoryLeakAnalysis.recommendations.map(
                (recommendation, index) => (
                  <li key={`recommendation-${index}`}>
                    {recommendation.message}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // 添加响应文本显示逻辑
  const renderApiResponseText = (responseText: string) => {
    if (!responseText) return null;

    return (
      <div className="result-section api-response-text">
        <h3>API Response</h3>
        <div className="response-content markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {responseText}
          </ReactMarkdown>
        </div>
      </div>
    );
  };

  // 改进：添加分析级别描述弹窗
  const renderAnalysisLevelInfo = () => {
    return (
      <div className="info-popup">
        <h4>Analysis Levels Explained</h4>
        <ul>
          {analysisLevels.map((level) => (
            <li key={`level-info-${level.value}`}>
              <strong>{level.label}:</strong> {level.description}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // 改进：添加API设置弹窗
  const renderApiSettings = () => {
    if (!showApiOptions) return null;

    return (
      <div className="api-settings-popup">
        <h4>API Settings</h4>
        <div className="form-group">
          <label htmlFor="api-url">API URL:</label>
          <input
            type="text"
            id="api-url"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="api-url-input"
          />
        </div>
        <button className="btn-close" onClick={() => setShowApiOptions(false)}>
          Close
        </button>
      </div>
    );
  };

  // 键盘快捷键监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Enter 或 Cmd+Enter 提交表单
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        const form = document.querySelector("form");
        if (form && !isLoading) {
          form.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLoading]);

  return (
    <div className="code-review-app">
      {/* <header>
        <h1>Code Review & Memory Leak Analyzer</h1>
        <p>Submit your code for analysis and receive detailed feedback</p>
      </header> */}

      {renderApiSettings()}

      <div className="app-container relative">
        <div className="settings-button !top-8 !right-8">
          <button
            onClick={() => setShowApiOptions(!showApiOptions)}
            className="btn-settings"
            title="API Settings"
          >
            ⚙️
          </button>
        </div>
        <div className="input-panel">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="form-controls">
                <div className="control-group">
                  <label htmlFor="language-select">Language:</label>
                  <select
                    id="language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="control-group">
                  <label htmlFor="level-select">
                    Analysis Level:
                    <span
                      className="info-icon"
                      title="Click for more information about analysis levels"
                      onClick={() =>
                        alert(
                          analysisLevels
                            .map((l) => `${l.label}: ${l.description}`)
                            .join("\n\n")
                        )
                      }
                    >
                      ℹ️
                    </span>
                  </label>
                  <select
                    id="level-select"
                    value={analysisLevel}
                    onChange={(e) => setAnalysisLevel(e.target.value)}
                  >
                    {analysisLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="control-group checkbox-group">
                  <label htmlFor="memory-leak-check">
                    <input
                      type="checkbox"
                      id="memory-leak-check"
                      checked={checkMemoryLeaks}
                      onChange={(e) => setCheckMemoryLeaks(e.target.checked)}
                    />
                    Check for Memory Leaks
                  </label>
                </div>
              </div>

              <div className="code-editor-container">
                <div className="editor-toolbar">
                  <button
                    type="button"
                    className="btn-example"
                    onClick={loadExampleCode}
                    title="Load example code for the selected language"
                  >
                    Load Example
                  </button>
                  <span
                    className="keyboard-shortcut"
                    title="Use Ctrl+Enter to submit"
                  >
                    Ctrl+Enter to Submit
                  </span>
                </div>
                <textarea
                  id="code-input"
                  className="code-editor"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your code here for analysis..."
                  rows={15}
                  spellCheck={false}
                  aria-label="Code editor"
                />
              </div>

              <div className="button-group">
                <button
                  type="submit"
                  className="btn-analyze"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Code"
                  )}
                </button>
                <button
                  type="button"
                  className="btn-clear"
                  onClick={handleClear}
                  disabled={isLoading}
                >
                  Clear
                </button>
              </div>

              {error && <div className="error-message">{error}</div>}
            </div>
          </form>
        </div>

        {result && (
          <div className="result-panel">
            <div className="result-toolbar">
              <button
                className="btn-copy"
                onClick={copyResultToClipboard}
                title="Copy results to clipboard"
              >
                Copy Results
              </button>
            </div>

            {/* 高亮显示代码中的问题 */}
            {renderCodeWithHighlights()}

            {/* 展示来自API的原始文本响应 */}
            {result.text && renderApiResponseText(result.text)}

            {/* 如果有代码审查结果则显示结构化内容 */}
            {result.codeReview && renderCodeReviewResults(result.codeReview)}

            {/* 如果有内存泄漏分析结果则显示 */}
            {result.memoryLeakAnalysis &&
              renderMemoryLeakResults(result.memoryLeakAnalysis)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeReviewApp;
