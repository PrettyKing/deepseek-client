import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center flex-col px-4 text-center">
      <h1 className="text-9xl font-bold text-purple-400">404</h1>
      <div className="absolute rotate-12 rounded-full bg-purple-100 px-2 text-sm text-purple-800">
        页面未找到
      </div>
      <div className="mt-8">
        <div className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          哎呀！你似乎迷路了。
        </div>
        <p className="mt-4 text-gray-600">
          我们找不到您正在寻找的页面。请检查URL或返回首页。
        </p>
        <div className="mt-8 flex justify-center gap-x-6">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition duration-300"
          >
            返回首页
          </Link>
          <Link
            to="/chat"
            className="px-6 py-3 rounded-full bg-white border border-gray-300 text-gray-700 font-medium shadow hover:shadow-md transition duration-300"
          >
            开始聊天
          </Link>
        </div>
      </div>

      <div className="mt-16">
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 opacity-50 blur"></div>
          <div className="relative bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
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
              <div>
                <h3 className="text-lg font-medium">DeepSeek AI 助手</h3>
                <p className="text-gray-600">
                  "需要任何帮助吗？我随时在线为您解答问题！"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
