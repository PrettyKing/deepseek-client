import React from "react";
import {
  ArrowRight,
  Code,
  Cpu,
  Database,
  BarChart3,
  Brain,
  CheckCircle,
  Zap,
  GitBranch,
  Share2,
  Server,
  Lock,
} from "lucide-react";

const TechHomePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b">
      {/* Hero Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              前沿技术的完美结合
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              探索 DeepSeek AI、Mastra
              框架与先进算法如何共同推动人工智能与数据科学的边界
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 flex items-center gap-2">
                开始探索 <ArrowRight size={18} />
              </button>
              <button className="px-6 py-3 bg-white text-gray-800 font-medium rounded-full shadow border hover:shadow-lg transition flex items-center gap-2">
                技术文档
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl h-64 md:h-80 w-full relative overflow-hidden">
                {/* 科技感网格背景 */}
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
                  {Array.from({ length: 100 }).map((_, index) => (
                    <div
                      key={index}
                      className="border-[0.5px] border-white border-opacity-10"
                    />
                  ))}
                </div>
                {/* 悬浮元素 */}
                <div className="absolute top-1/4 left-1/4 bg-white bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
                  <Cpu size={28} />
                </div>
                <div className="absolute bottom-1/3 right-1/4 bg-white bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
                  <Brain size={28} />
                </div>
                <div className="absolute top-1/4 right-1/3 bg-white bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
                  <Database size={28} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DeepSeek AI 部分 */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 inline-block">
            DeepSeek AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            新一代人工智能引擎，为复杂问题提供智能解决方案
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="bg-purple-100 rounded-2xl p-8">
                <div className="absolute -top-4 -left-4 bg-purple-500 text-white p-3 rounded-xl shadow-lg">
                  <Brain size={28} />
                </div>
                <div className="pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    DeepSeek 核心能力
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-purple-200 p-1 rounded-full mt-1 mr-3">
                        <CheckCircle className="text-purple-700" size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">多模态理解</p>
                        <p className="text-gray-600 text-sm">
                          同时处理文本、图像、音频等多种数据类型
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-200 p-1 rounded-full mt-1 mr-3">
                        <CheckCircle className="text-purple-700" size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          自然语言处理
                        </p>
                        <p className="text-gray-600 text-sm">
                          高级语义理解与生成能力，支持复杂上下文
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-200 p-1 rounded-full mt-1 mr-3">
                        <CheckCircle className="text-purple-700" size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          预训练模型库
                        </p>
                        <p className="text-gray-600 text-sm">
                          丰富的领域专业模型，可快速适应特定任务
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-200 p-1 rounded-full mt-1 mr-3">
                        <CheckCircle className="text-purple-700" size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          持续学习系统
                        </p>
                        <p className="text-gray-600 text-sm">
                          从新数据中不断提升模型能力，进化适应能力
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              DeepSeek AI 应用场景
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Share2 className="text-purple-600" size={20} />
                </div>
                <h4 className="font-semibold mb-1">智能对话系统</h4>
                <p className="text-sm text-gray-600">企业级客服与内容生成</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="text-purple-600" size={20} />
                </div>
                <h4 className="font-semibold mb-1">数据分析与预测</h4>
                <p className="text-sm text-gray-600">商业智能与决策支持</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Code className="text-purple-600" size={20} />
                </div>
                <h4 className="font-semibold mb-1">代码智能助手</h4>
                <p className="text-sm text-gray-600">编程辅助与代码生成</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Lock className="text-purple-600" size={20} />
                </div>
                <h4 className="font-semibold mb-1">智能安全系统</h4>
                <p className="text-sm text-gray-600">风险检测与安全防护</p>
              </div>
            </div>
            <button className="text-purple-600 font-medium flex items-center hover:text-purple-800">
              了解 DeepSeek AI 更多功能
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Mastra 框架部分 */}
      <section className="py-16 px-4 max-w-6xl mx-auto bg-gray-50 rounded-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600 inline-block">
            Mastra 框架
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            高性能分布式计算框架，为AI模型提供强大的底层支持
          </p>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Mastra 技术优势
            </h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Zap className="text-pink-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">超高性能</h4>
                  <p className="text-gray-600">
                    优化的内存管理和计算调度，比传统框架提升5-10倍运算效率
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Server className="text-pink-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">无缝扩展</h4>
                  <p className="text-gray-600">
                    从单机到数千节点集群的线性扩展能力，支持弹性资源管理
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <GitBranch className="text-pink-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">灵活部署</h4>
                  <p className="text-gray-600">
                    支持云端、边缘和混合环境，适应不同计算资源限制
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Database className="text-pink-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">数据并行处理</h4>
                  <p className="text-gray-600">
                    创新的数据分片和并行处理技术，实现PB级数据的实时流处理
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="bg-gray-800 rounded-lg p-5 text-white font-mono text-sm overflow-hidden relative">
                <div className="absolute top-3 left-3 flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mt-6">
                  <p className="text-green-400">// Mastra 框架示例代码</p>
                  <p className="text-purple-400">
                    import{" "}
                    <span className="text-yellow-300">
                      {"{"} Mastra, Cluster, DataPipeline {"}"}
                    </span>{" "}
                    from "mastra-core";
                  </p>
                  <br />
                  <p className="text-blue-400">
                    async function{" "}
                    <span className="text-yellow-300">
                      initializeDistributedTraining
                    </span>
                    () {"{"}
                  </p>
                  <p className="ml-4 text-white">// 配置计算集群</p>
                  <p className="ml-4 text-white">
                    const cluster = await Mastra.Cluster.create({"{"}
                  </p>
                  <p className="ml-8 text-white">
                    nodes: <span className="text-yellow-300">128</span>,
                  </p>
                  <p className="ml-8 text-white">
                    gpuPerNode: <span className="text-yellow-300">8</span>,
                  </p>
                  <p className="ml-8 text-white">
                    memoryPerNode:{" "}
                    <span className="text-yellow-300">'128GB'</span>
                  </p>
                  <p className="ml-4 text-white">{"}"});</p>
                  <br />
                  <p className="ml-4 text-white">// 创建数据流水线</p>
                  <p className="ml-4 text-white">
                    const pipeline = new DataPipeline()
                  </p>
                  <p className="ml-8 text-white">
                    .addSource(
                    <span className="text-green-300">
                      's3://data-lake/training'
                    </span>
                    )
                  </p>
                  <p className="ml-8 text-white">
                    .transform(
                    <span className="text-green-300">'normalize'</span>)
                  </p>
                  <p className="ml-8 text-white">
                    .shard(<span className="text-yellow-300">1024</span>)
                  </p>
                  <p className="ml-8 text-white">.cache();</p>
                  <br />
                  <p className="ml-4 text-white">// 应用高级优化</p>
                  <p className="ml-4 text-white">
                    Mastra.enableAdaptiveOptimization();
                  </p>
                  <br />
                  <p className="ml-4 text-white">
                    return {"{"} cluster, pipeline {"}"};
                  </p>
                  <p className="text-blue-400">{"}"}</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  Mastra 框架提供简洁而强大的 API，简化分布式计算实现
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 先进算法部分 */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 inline-block">
            先进算法
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            专为大规模数据处理与机器学习优化的算法集合
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 16.5H17M12 5V12M12 12L16 8M12 12L8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">梯度优化算法</h3>
            <p className="text-gray-600 mb-4">
              自适应学习率与动量调整算法，加速模型收敛速度，有效避免局部最优解。
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 mr-2 flex-shrink-0"></div>
                <span>AdaptiveMomentum 优化器</span>
              </li>
              <li className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 mr-2 flex-shrink-0"></div>
                <span>二阶导数近似计算</span>
              </li>
              <li className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 mr-2 flex-shrink-0"></div>
                <span>分布式梯度同步</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 7L12 17L3 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">图神经网络算法</h3>
            <p className="text-gray-600 mb-4">
              针对复杂关系网络的高效算法，适用于社交网络、分子结构与知识图谱分析。
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 mr-2 flex-shrink-0"></div>
                <span>高速图卷积网络</span>
              </li>
              <li className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 mr-2 flex-shrink-0"></div>
                <span>注意力图聚合机制</span>
              </li>
              <li className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 mr-2 flex-shrink-0"></div>
                <span>时序图演化模型</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2V5M16 2V5M3 8H21M5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">时序预测算法</h3>
            <p className="text-gray-600 mb-4">
              结合深度学习与统计模型的创新算法，提供高精度时间序列预测与异常检测。
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 mr-2 flex-shrink-0"></div>
                <span>多尺度时间卷积</span>
              </li>
              <li className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 mr-2 flex-shrink-0"></div>
                <span>自适应注意力机制</span>
              </li>
              <li className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 mr-2 flex-shrink-0"></div>
                <span>概率密度预测</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            我们的算法库持续更新，集成最新学术研究成果与工业实践经验
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform transition hover:-translate-y-1">
            浏览完整算法库
          </button>
        </div>
      </section>

      {/* CTA 部分 */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl my-12 max-w-6xl mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">开启你的技术之旅</h2>
          <p className="text-xl mb-8 opacity-90">
            深入了解 DeepSeek AI、Mastra
            框架与先进算法如何协同工作，创造无限可能
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full shadow-lg hover:shadow-xl transform transition hover:-translate-y-1">
              免费开始使用
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full shadow-lg hover:shadow-xl transform transition hover:-translate-y-1">
              申请技术演示
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TechHomePage;
