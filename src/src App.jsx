import { useState } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const questions = [
  // 每组五题，对应一个方向潜力
  "我能轻松的用词汇和语法表达自己的想法",
  "我善于说服别人和演讲",
  "我能快速理解阅读材料的主要观点",
  "我擅长书面沟通，例如写报告、邮件或提案",
  "我能有效的解释复杂的概念或信息",
  "我擅长理解他人的情感和需求",
  "我能适应不同的社交场合和角色",
  "我能与不同性格和背景的人建立良好的关系",
  "我善于协调团队合作和解决冲突",
  "我具有领导力和激励他人的能力",
  "我清楚了解自己的情感，需求和目标",
  "我能准确评估自己的能力和潜能",
  "我能在面对困扰时，合理调整自己的心态和情绪",
  "我能通过自省和反思，不断提升自己",
  "我擅长规划自己的职业和生活道路",
  "我善于运用逻辑分析解决的问题",
  "我擅长进行数据分析和解读",
  "我在面对复杂数学问题时感到自信",
  "我能熟练的进行计算和预测",
  "我能找到规律并推导出结论",
  "我具有良好的身体协调性",
  "我善于通过动作展示和解释事物",
  "我能快速学习新的运动技能",
  "我在需要手眼协调的任务中表现出色",
  "我擅于运用手势和表情进行沟通",
  "我能准确的识别音乐的旋律，节奏和音调",
  "我善于创作或演奏音乐",
  "我能在不同场合使用音乐来调动氛围",
  "我对音乐元素和结构有敏锐的洞察力",
  "我能通过音乐来表达自己的情感和想法",
  "我擅长使用图形和图表来表达信息",
  "我可以轻松的在脑海中想象三维形状和空间关系",
  "我能理解和解释地图，建筑图和设计图纸",
  "我能快速识别形状和图案中的规律",
  "我在设计和布局方面有创意",
  "我对自然现象和生物有浓厚的兴趣",
  "我能在日常生活中发现自然界的规律和奇迹",
  "我善于利用自然资源解决问题",
  "我能在与自然相关的领域中，发挥我的专长和创意",
  "我关心环境保护和可持续发展",
  "我对人生意义和生存问题有深刻的思考",
  "我善于探讨哲学和宗教问题",
  "我乐于探索生命的价值和目的",
  "我擅长思考抽象和超越现实的问题",
  "我对宇宙的起源和发展充满好奇"
];

const labels = [
  "表达与沟通力", "人际连接力", "自我觉察力", "理性分析力", "行动表现力",
  "情绪共鸣力", "视觉与想象力", "环境感知力", "人生意义思考力"
];

const typeMapping = questions.map((_, i) => Math.floor(i / 5));

export default function App() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(3));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getResult = () => {
    const scores = Array(labels.length).fill(0);
    const counts = Array(labels.length).fill(0);
    answers.forEach((val, i) => {
      const type = typeMapping[i];
      scores[type] += val;
      counts[type]++;
    });
    return scores.map((s, i) => ({
      type: labels[i],
      score: parseFloat((s / counts[i]).toFixed(2))
    }));
  };

  const result = getResult();
  const top = [...result].sort((a, b) => b.score - a.score).slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">幸福人生方向分析</h1>

      {!submitted ? (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {questions.map((q, i) => (
            <div key={i} className="mb-4">
              <p className="mb-2 font-medium">{q}</p>
              <input
                type="range"
                min="1"
                max="5"
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-full"
              />
              <p className="text-sm text-gray-500">评分：{answers[i]}</p>
            </div>
          ))}
          <div className="text-center mt-6">
            <button type="submit" className="bg-purple-600 text-white py-2 px-6 rounded-xl shadow">提交并查看报告</button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">你的特质方向概况</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {top.map((r, i) => (
              <div key={i} className="bg-purple-100 p-4 rounded-xl shadow">
                <h3 className="font-semibold">{r.type}</h3>
                <p className="text-sm text-gray-700">这是你当前展现最明显的潜在优势方向。</p>
              </div>
            ))}
          </div>

          <div className="h-96 mb-10">
            <ResponsiveContainer>
              <RadarChart data={result}>
                <PolarGrid />
                <PolarAngleAxis dataKey="type" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="你" dataKey="score" stroke="#9333ea" fill="#9333ea" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center">
            <p className="text-gray-600">其他方向也值得培养，有助于你成为更加整合的人。</p>
          </div>
        </div>
      )}
    </div>
  );
}
