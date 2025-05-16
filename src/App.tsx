import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './pages/Chat';
import AlgorithmPage from './pages/Algorithm';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';

function App() {
  // 可以在这里添加全局状态或主题设置
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Routes>
        <Route path="/" element={<Layout onToggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}>
          {/* 主页路由 */}
          <Route index element={<HomePage />} />
          
          {/* 聊天页面路由 */}
          <Route index path="chat" element={<ChatPage />} />
          
          {/* 算法页面路由 */}
          <Route path="algorithm" element={<AlgorithmPage />} />
          
          {/* 404页面 */}
          <Route path="404" element={<NotFoundPage />} />
          
          {/* 重定向其他所有路径到404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;