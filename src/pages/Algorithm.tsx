import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const MindMapNode = ({ label, children, level = 0, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const hasChildren = children && children.length > 0;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getColor = () => {
    const colors = [
      "bg-blue-500", // Level 0 - Main
      "bg-green-500", // Level 1 - Categories
      "bg-purple-500", // Level 2 - Subcategories
      "bg-orange-400", // Level 3 - Topics
      "bg-red-400", // Level 4 - Subtopics
      "bg-teal-500", // Level 5 and beyond
    ];
    return colors[Math.min(level, colors.length - 1)];
  };

  const getFontSize = () => {
    const sizes = [
      "text-xl font-bold", // Level 0
      "text-lg font-bold", // Level 1
      "text-base font-semibold", // Level 2
      "text-sm font-medium", // Level 3
      "text-xs", // Level 4
      "text-xs", // Level 5+
    ];
    return sizes[Math.min(level, sizes.length - 1)];
  };

  const getMarginLeft = () => {
    return `ml-${Math.min(level * 4, 16)}`;
  };

  return (
    <div className={`${level > 0 ? getMarginLeft() : ""} mb-1`}>
      <div className="flex items-center">
        {hasChildren && (
          <button onClick={toggleExpand} className="mr-1 focus:outline-none">
            {isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
        )}
        <div
          className={`${getColor()} text-white rounded-md px-2 py-0.5 ${getFontSize()}`}
        >
          {label}
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="border-l-2 border-gray-300 pl-2 ml-1.5 mt-1">
          {children.map((child, index) => (
            <MindMapNode
              key={index}
              label={child.label}
              children={child.children}
              level={level + 1}
              expanded={level < 2} // Auto-expand only the first 2 levels
            />
          ))}
        </div>
      )}
    </div>
  );
};

const AlgorithmMindMap = () => {
  const mindMapData = {
    label: "算法学习",
    children: [
      {
        label: "一、基础知识",
        children: [
          {
            label: "复杂度分析",
            children: [
              { label: "时间复杂度", children: [] },
              { label: "空间复杂度", children: [] },
              { label: "大O表示法", children: [] },
              { label: "最好/最坏/平均/均摊复杂度", children: [] },
            ],
          },
          {
            label: "数学基础",
            children: [
              { label: "组合数学", children: [] },
              { label: "概率论基础", children: [] },
              { label: "线性代数基础", children: [] },
              { label: "数论基础", children: [] },
            ],
          },
          {
            label: "计算机基础",
            children: [
              { label: "位运算", children: [] },
              { label: "计算机表示（整数/浮点数）", children: [] },
              { label: "内存模型", children: [] },
            ],
          },
        ],
      },
      {
        label: "二、数据结构",
        children: [
          {
            label: "线性数据结构",
            children: [
              { label: "数组", children: [] },
              {
                label: "链表",
                children: [
                  { label: "单链表", children: [] },
                  { label: "双链表", children: [] },
                  { label: "循环链表", children: [] },
                ],
              },
              { label: "栈", children: [] },
              {
                label: "队列",
                children: [
                  { label: "普通队列", children: [] },
                  { label: "双端队列", children: [] },
                  { label: "优先队列", children: [] },
                ],
              },
              { label: "哈希表", children: [] },
            ],
          },
          {
            label: "树结构",
            children: [
              { label: "二叉树", children: [] },
              { label: "二叉搜索树", children: [] },
              {
                label: "平衡树",
                children: [
                  { label: "AVL树", children: [] },
                  { label: "红黑树", children: [] },
                ],
              },
              {
                label: "堆",
                children: [
                  { label: "二叉堆", children: [] },
                  { label: "斐波那契堆", children: [] },
                ],
              },
              { label: "B树/B+树", children: [] },
              { label: "线段树", children: [] },
              { label: "树状数组", children: [] },
              { label: "字典树(Trie)", children: [] },
            ],
          },
          {
            label: "图结构",
            children: [
              {
                label: "图的表示",
                children: [
                  { label: "邻接矩阵", children: [] },
                  { label: "邻接表", children: [] },
                ],
              },
              { label: "有向图/无向图", children: [] },
              { label: "加权图/无权图", children: [] },
              {
                label: "特殊图",
                children: [
                  { label: "二分图", children: [] },
                  { label: "DAG(有向无环图)", children: [] },
                ],
              },
            ],
          },
          {
            label: "高级数据结构",
            children: [
              { label: "并查集", children: [] },
              { label: "跳表", children: [] },
              { label: "布隆过滤器", children: [] },
              { label: "LRU/LFU缓存", children: [] },
            ],
          },
        ],
      },
      {
        label: "三、基本算法思想",
        children: [
          { label: "枚举法", children: [] },
          { label: "分治法", children: [] },
          { label: "贪心算法", children: [] },
          { label: "动态规划", children: [] },
          { label: "回溯法", children: [] },
          { label: "分支限界法", children: [] },
        ],
      },
      {
        label: "四、经典算法",
        children: [
          {
            label: "排序算法",
            children: [
              {
                label: "比较类排序",
                children: [
                  { label: "冒泡排序", children: [] },
                  { label: "选择排序", children: [] },
                  { label: "插入排序", children: [] },
                  { label: "希尔排序", children: [] },
                  { label: "归并排序", children: [] },
                  { label: "快速排序", children: [] },
                  { label: "堆排序", children: [] },
                ],
              },
              {
                label: "非比较类排序",
                children: [
                  { label: "计数排序", children: [] },
                  { label: "基数排序", children: [] },
                  { label: "桶排序", children: [] },
                ],
              },
            ],
          },
          {
            label: "查找算法",
            children: [
              { label: "顺序查找", children: [] },
              { label: "二分查找", children: [] },
              { label: "哈希查找", children: [] },
              { label: "二叉搜索树查找", children: [] },
            ],
          },
          {
            label: "图算法",
            children: [
              {
                label: "图的遍历",
                children: [
                  { label: "深度优先搜索(DFS)", children: [] },
                  { label: "广度优先搜索(BFS)", children: [] },
                ],
              },
              {
                label: "最短路径",
                children: [
                  { label: "Dijkstra算法", children: [] },
                  { label: "Bellman-Ford算法", children: [] },
                  { label: "Floyd-Warshall算法", children: [] },
                ],
              },
              {
                label: "最小生成树",
                children: [
                  { label: "Prim算法", children: [] },
                  { label: "Kruskal算法", children: [] },
                ],
              },
              { label: "拓扑排序", children: [] },
              { label: "关键路径", children: [] },
              {
                label: "网络流",
                children: [
                  { label: "最大流问题", children: [] },
                  { label: "Ford-Fulkerson算法", children: [] },
                  { label: "Edmonds-Karp算法", children: [] },
                  { label: "Dinic算法", children: [] },
                ],
              },
            ],
          },
          {
            label: "字符串算法",
            children: [
              { label: "暴力匹配", children: [] },
              { label: "KMP算法", children: [] },
              { label: "Boyer-Moore算法", children: [] },
              { label: "Rabin-Karp算法", children: [] },
              { label: "正则表达式", children: [] },
              { label: "字符串哈希", children: [] },
              { label: "后缀数组/后缀树", children: [] },
            ],
          },
        ],
      },
      {
        label: "五、高级算法",
        children: [
          {
            label: "动态规划进阶",
            children: [
              { label: "状态压缩DP", children: [] },
              { label: "树形DP", children: [] },
              { label: "数位DP", children: [] },
              { label: "区间DP", children: [] },
              { label: "概率DP", children: [] },
              { label: "博弈论DP", children: [] },
            ],
          },
          {
            label: "计算几何",
            children: [
              { label: "点、线、面的表示与运算", children: [] },
              { label: "多边形面积", children: [] },
              { label: "凸包", children: [] },
              { label: "最近点对", children: [] },
              { label: "线段相交", children: [] },
            ],
          },
          {
            label: "数论算法",
            children: [
              { label: "素数判定/筛法", children: [] },
              { label: "最大公约数/最小公倍数", children: [] },
              { label: "快速幂", children: [] },
              { label: "模运算", children: [] },
              { label: "欧拉函数", children: [] },
              { label: "扩展欧几里得", children: [] },
              { label: "中国剩余定理", children: [] },
            ],
          },
          {
            label: "随机化算法",
            children: [
              { label: "随机快排", children: [] },
              { label: "蒙特卡洛算法", children: [] },
              { label: "拉斯维加斯算法", children: [] },
              { label: "舍伍德算法", children: [] },
            ],
          },
          {
            label: "近似算法",
            children: [
              { label: "近似比", children: [] },
              { label: "贪心近似算法", children: [] },
              { label: "PTAS/FPTAS", children: [] },
            ],
          },
        ],
      },
      {
        label: "六、复杂度理论",
        children: [
          { label: "P/NP问题", children: [] },
          { label: "NP完全/NP困难", children: [] },
          { label: "规约", children: [] },
          { label: "近似算法复杂度类", children: [] },
        ],
      },
      {
        label: "七、实战技巧",
        children: [
          {
            label: "算法设计技巧",
            children: [
              { label: "减而治之", children: [] },
              { label: "双指针技巧", children: [] },
              { label: "滑动窗口", children: [] },
              { label: "前缀和/差分", children: [] },
              { label: "二分思想应用", children: [] },
              { label: "单调栈/单调队列", children: [] },
              { label: "思维转换", children: [] },
            ],
          },
          {
            label: "常见问题解决方案",
            children: [
              { label: "区间问题", children: [] },
              { label: "序列问题", children: [] },
              { label: "树型问题", children: [] },
              { label: "图论问题", children: [] },
              { label: "组合优化问题", children: [] },
              { label: "概率问题", children: [] },
              { label: "博弈问题", children: [] },
            ],
          },
        ],
      },
      {
        label: "八、算法学习路径建议",
        children: [
          {
            label: "入门阶段",
            children: [
              { label: "掌握基本数据结构", children: [] },
              { label: "理解复杂度分析", children: [] },
              { label: "熟悉基本排序和查找", children: [] },
              { label: "解决基础算法题", children: [] },
            ],
          },
          {
            label: "进阶阶段",
            children: [
              { label: "深入理解动态规划", children: [] },
              { label: "掌握图论基础算法", children: [] },
              { label: "学习高级数据结构", children: [] },
              { label: "培养算法设计思维", children: [] },
            ],
          },
          {
            label: "高级阶段",
            children: [
              { label: "研究复杂算法", children: [] },
              { label: "解决竞赛级问题", children: [] },
              { label: "理解算法理论基础", children: [] },
              { label: "分析算法优化思路", children: [] },
            ],
          },
          {
            label: "专家阶段",
            children: [
              { label: "研究算法设计范式", children: [] },
              { label: "开发新算法", children: [] },
              { label: "处理特定领域算法问题", children: [] },
              { label: "算法理论研究", children: [] },
            ],
          },
        ],
      },
      {
        label: "九、算法学习资源",
        children: [
          {
            label: "经典教材",
            children: [
              { label: "《算法导论》", children: [] },
              { label: "《算法》(Sedgewick)", children: [] },
              { label: "《数据结构与算法分析》", children: [] },
              { label: "《编程珠玑》", children: [] },
              { label: "《算法设计手册》", children: [] },
            ],
          },
          {
            label: "在线平台",
            children: [
              { label: "LeetCode", children: [] },
              { label: "CodeForces", children: [] },
              { label: "AtCoder", children: [] },
              { label: "TopCoder", children: [] },
              { label: "HackerRank", children: [] },
            ],
          },
          {
            label: "竞赛资源",
            children: [
              { label: "ACM-ICPC问题集", children: [] },
              { label: "国际信息学奥赛(IOI)题库", children: [] },
              { label: "Google Code Jam/Kick Start", children: [] },
              { label: "Facebook Hacker Cup", children: [] },
            ],
          },
          {
            label: "专业课程",
            children: [
              { label: "斯坦福/MIT/普林斯顿算法课", children: [] },
              { label: "Coursera算法专项课程", children: [] },
            ],
          },
        ],
      },
      {
        label: "十、算法与应用领域",
        children: [
          { label: "机器学习算法", children: [] },
          { label: "密码学算法", children: [] },
          { label: "分布式算法", children: [] },
          { label: "自然语言处理算法", children: [] },
          { label: "计算机视觉算法", children: [] },
          { label: "运筹学算法", children: [] },
          { label: "量子计算算法", children: [] },
        ],
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-6xl mx-auto my-4 min-w-[960px]">
      <div className="text-2xl font-bold mb-6 text-center">算法学习脉络图</div>
      <div className="overflow-auto p-2">
        <MindMapNode
          label={mindMapData.label}
          children={mindMapData.children}
        />
      </div>
      <div className="mt-4 text-sm text-gray-500 text-center">
        点击节点前的箭头可以展开或折叠内容
      </div>
    </div>
  );
};

export default AlgorithmMindMap;
