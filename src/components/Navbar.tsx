import { Link, NavLink } from "react-router-dom";

interface NavbarProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar = ({ onToggleDarkMode, isDarkMode }: NavbarProps) => {
  return (
    <header className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              <span
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                DeepSeek AI
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? isDarkMode
                          ? "text-purple-300 border-b-2 border-purple-300"
                          : "text-purple-600 border-b-2 border-purple-600"
                        : isDarkMode
                        ? "text-gray-300 hover:text-purple-300"
                        : "text-gray-600 hover:text-purple-600"
                    } font-medium pb-1`
                  }
                  end
                >
                  聊天
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/algorithm"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? isDarkMode
                          ? "text-purple-300 border-b-2 border-purple-300"
                          : "text-purple-600 border-b-2 border-purple-600"
                        : isDarkMode
                        ? "text-gray-300 hover:text-purple-300"
                        : "text-gray-600 hover:text-purple-600"
                    } font-medium pb-1`
                  }
                >
                  算法导图
                </NavLink>
              </li>
              <li>
                <a
                  href="https://github.com/deepseek-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isDarkMode
                      ? "text-gray-300 hover:text-purple-300"
                      : "text-gray-600 hover:text-purple-600"
                  } font-medium`}
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-100 text-gray-700"
              }`}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
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
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              ) : (
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  ></path>
                </svg>
              )}
            </button>

            <Link
              to="/chat"
              className="hidden sm:flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-full shadow-md transition-colors"
            >
              <span>开始聊天</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button
              className={`p-2 rounded-md ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
