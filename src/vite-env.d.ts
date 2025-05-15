/// <reference types="vite/client" />
// 添加这个文件来声明需要的类型定义
// 添加这个文件来声明需要的类型定义

// React Markdown 组件类型
declare module 'react-markdown' {
  import { ReactNode } from 'react';
  
  export interface ReactMarkdownProps {
    children: string;
    remarkPlugins?: any[];
    components?: {
      [key: string]: React.ComponentType<any>;
    };
    className?: string;
  }
  
  const ReactMarkdown: React.FC<ReactMarkdownProps>;
  export default ReactMarkdown;
}

// 为 SyntaxHighlighter 添加类型
declare module 'react-syntax-highlighter' {
  import { ReactNode } from 'react';

  export interface SyntaxHighlighterProps {
    style?: any;
    language?: string;
    children: string;
    showLineNumbers?: boolean;
    wrapLines?: boolean;
    lineProps?: any;
    PreTag?: string;
    className?: string;
  }

  export const PrismLight: React.FC<SyntaxHighlighterProps>;
  export const Light: React.FC<SyntaxHighlighterProps>;
}

// 为 react-syntax-highlighter/dist/esm/styles/prism 添加类型
declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export const vscDarkPlus: any;
  export const prism: any;
  export const atomDark: any;
  export const dracula: any;
  export const materialDark: any;
  export const materialLight: any;
  export const okaidia: any;
  export const solarizedlight: any;
  export const tomorrow: any;
}

// 为 remark-gfm 添加类型
declare module 'remark-gfm' {
  const remarkGfm: any;
  export default remarkGfm;
}
