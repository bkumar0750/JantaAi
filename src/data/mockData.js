// ============================================================
// MOCK DATA – Janta AI
// ============================================================

export const questions = [
  {
    id: "q1",
    text: "Should I prepare for UPSC or learn to code for a tech job?",
    category: "Career",
    optionA: "UPSC / Government Job",
    optionB: "Software / Coding Career",
    votesA: 4320,
    votesB: 6810,
    totalVotes: 11130,
    trending: true,
    timeAgo: "2h ago",
    tags: ["career", "upsc", "coding"],
    answers: [
      {
        id: "a1", author: "Priya S.", avatar: "PS", color: "#6D28D9",
        text: "I switched from UPSC prep to coding bootcamp. Income started in 6 months vs 4+ years for govt job. The ROI is very different. Depends on your risk tolerance.",
        upvotes: 312, downvotes: 18, timeAgo: "1h ago", verified: true,
      },
      {
        id: "a2", author: "Rahul M.", avatar: "RM", color: "#4F46E5",
        text: "I cracked SSC CGL after 2 years of preparation. Job security and pension are unmatched. If you're from a village background, govt job is respect personified.",
        upvotes: 278, downvotes: 24, timeAgo: "3h ago", verified: false,
      },
      {
        id: "a3", author: "Anjali K.", avatar: "AK", color: "#0891B2",
        text: "Did B.Tech, tried coding, got frustrated, now preparing for state PSC. Both paths are valid. Understand your own work style first.",
        upvotes: 145, downvotes: 9, timeAgo: "5h ago", verified: false,
      },
    ],
    peopleLikeYou: { percent: 68, choice: "Coding / Tech", insight: "students in your age group" },
  },
  {
    id: "q2",
    text: "Is an MBA worth it in 2026 if I already have a stable job?",
    category: "Education",
    optionA: "Yes, do MBA",
    optionB: "No, upskill online instead",
    votesA: 3100,
    votesB: 5400,
    totalVotes: 8500,
    trending: true,
    timeAgo: "4h ago",
    tags: ["mba", "education", "career"],
    answers: [
      {
        id: "a4", author: "Vikram N.", avatar: "VN", color: "#7C3AED",
        text: "IIM MBA gave me a 3x salary jump and network that opened doors I didn't know existed. But tier-3 MBA is a waste of ₹20L. Selectivity matters enormously.",
        upvotes: 420, downvotes: 31, timeAgo: "2h ago", verified: true,
      },
      {
        id: "a5", author: "Sneha T.", avatar: "ST", color: "#0891B2",
        text: "I did CFA + online courses for ₹1.5L total. My salary doubled. MBA from top college is great but the opportunity cost is 2 years of career growth + ₹30L.",
        upvotes: 389, downvotes: 15, timeAgo: "4h ago", verified: false,
      },
    ],
    peopleLikeYou: { percent: 63, choice: "Upskill Online", insight: "working professionals like you" },
  },
  {
    id: "q3",
    text: "Best skill to learn in 2026 for maximum career growth in India?",
    category: "Skills",
    optionA: "AI / Machine Learning",
    optionB: "Cloud Computing / DevOps",
    votesA: 7600,
    votesB: 4200,
    totalVotes: 11800,
    trending: true,
    timeAgo: "6h ago",
    tags: ["skills", "ai", "tech", "career"],
    answers: [
      {
        id: "a6", author: "Arjun D.", avatar: "AD", color: "#6D28D9",
        text: "AI/ML with Python is the hottest skill right now. I went from ₹8L to ₹26L in 18 months purely by building AI projects on GitHub and showcasing them. It's insane ROI.",
        upvotes: 534, downvotes: 22, timeAgo: "5h ago", verified: true,
      },
    ],
    peopleLikeYou: { percent: 71, choice: "AI / Machine Learning", insight: "tech students in your field" },
  },
  {
    id: "q4",
    text: "Should I start investing in stocks or mutual funds first?",
    category: "Finance",
    optionA: "Direct Stocks",
    optionB: "Mutual Funds via SIP",
    votesA: 2800,
    votesB: 6900,
    totalVotes: 9700,
    trending: false,
    timeAgo: "1d ago",
    tags: ["finance", "investing", "money"],
    answers: [
      {
        id: "a7", author: "CA Mehta", avatar: "CM", color: "#10B981",
        text: "For beginners, index fund SIP is the single best decision. Zero time, diversified, historically 12-15% CAGR. Direct stocks require deep research and emotional discipline most people don't have.",
        upvotes: 612, downvotes: 28, timeAgo: "20h ago", verified: true,
      },
    ],
    peopleLikeYou: { percent: 74, choice: "Mutual Funds / SIP", insight: "young earners like you" },
  },
  {
    id: "q5",
    text: "Move to a metro city for career or stay in tier-2 for family and lower cost?",
    category: "Life",
    optionA: "Move to metro city",
    optionB: "Stay in tier-2 city",
    votesA: 5100,
    votesB: 4300,
    totalVotes: 9400,
    trending: false,
    timeAgo: "2d ago",
    tags: ["life", "career", "family"],
    answers: [
      {
        id: "a8", author: "Deepika R.", avatar: "DR", color: "#F59E0B",
        text: "Moved from Nagpur to Bangalore 3 years ago. Salary went 2.5x but lifestyle inflation ate most of it. Now I remote work from Nagpur – best of both worlds if your role allows.",
        upvotes: 445, downvotes: 33, timeAgo: "1d ago", verified: false,
      },
    ],
    peopleLikeYou: { percent: 54, choice: "Metro City", insight: "people in your age group" },
  },
  {
    id: "q6",
    text: "Should fresher engineers focus on DSA or full-stack development for placements?",
    category: "Career",
    optionA: "DSA / Competitive Programming",
    optionB: "Full Stack Web Dev",
    votesA: 6200,
    votesB: 4800,
    totalVotes: 11000,
    trending: false,
    timeAgo: "3d ago",
    tags: ["career", "engineering", "placement"],
    answers: [
      {
        id: "a9", author: "Rohan P.", avatar: "RP", color: "#6D28D9",
        text: "FAANG requires DSA without question. But 90% of Indian startups want full-stack skills. You are spending 600 hours on DSA to get 10 interviews, or 300 hours on projects to get 50+ opportunities.",
        upvotes: 389, downvotes: 21, timeAgo: "2d ago", verified: true,
      },
    ],
    peopleLikeYou: { percent: 58, choice: "DSA / Competitive Programming", insight: "engineering students" },
  },
];

export const trendingTopics = [
  { id: "t1", label: "🔥 UPSC vs Coding 2026", count: "11.1K votes" },
  { id: "t2", label: "💰 SIP vs Stocks", count: "9.7K votes" },
  { id: "t3", label: "🤖 Best AI Skills", count: "11.8K votes" },
  { id: "t4", label: "🏙️ Metro vs Tier-2", count: "9.4K votes" },
  { id: "t5", label: "📚 MBA Worth It?", count: "8.5K votes" },
];

export const categories = [
  { id: "all", label: "All", icon: "✨" },
  { id: "career", label: "Career", icon: "💼" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "finance", label: "Finance", icon: "💰" },
  { id: "skills", label: "Skills", icon: "🚀" },
  { id: "life", label: "Life", icon: "🌱" },
];

export const aiSuggestions = [
  "Should I prepare for UPSC or learn coding?",
  "Is MBA worth it in 2026?",
  "Best skills to learn for maximum salary?",
  "Should I move to Bangalore for career?",
  "Stocks vs mutual funds for beginners?",
  "Should I do a startup or job after college?",
  "Is JEE preparation worth it or focus on projects?",
  "Remote work or office – what's better for growth?",
  "Best way to pay off student loan fast?",
  "Should I switch to product management?",
];
