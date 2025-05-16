interface FooterProps {
  isDarkMode: boolean;
}

const Footer = ({ isDarkMode }: FooterProps) => {
  return (
    <footer
      className={`mt-auto py-6 ${
        isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} DeepSeek AI Chat. All rights
              reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="#"
              className={`text-sm ${
                isDarkMode ? "hover:text-purple-300" : "hover:text-purple-600"
              }`}
            >
              隐私政策
            </a>
            <a
              href="#"
              className={`text-sm ${
                isDarkMode ? "hover:text-purple-300" : "hover:text-purple-600"
              }`}
            >
              使用条款
            </a>
            <a
              href="#"
              className={`text-sm ${
                isDarkMode ? "hover:text-purple-300" : "hover:text-purple-600"
              }`}
            >
              联系我们
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
