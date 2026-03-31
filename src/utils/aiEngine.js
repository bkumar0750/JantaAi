// ============================================================
// AI ENGINE – Mock AI Response Generator
// Simulates a personalized AI recommendation system
// ============================================================

const careerKeywords   = ["upsc","coding","job","career","engineer","software","government","clerk","cgl","it"];
const financeKeywords  = ["invest","sip","stock","mutual","fund","money","salary","loan","saving","wealth"];
const educationKeywords = ["mba","college","degree","study","exam","jee","neet","university","course","learn"];
const skillKeywords    = ["skill","ai","machine","cloud","devops","python","react","java","data","programming"];
const lifeKeywords     = ["move","city","metro","bangalore","delhi","family","balance","tier","rural","urban"];

const detectTopic = (question = "") => {
  const q = question.toLowerCase();
  if (careerKeywords.some(k => q.includes(k)))    return "career";
  if (financeKeywords.some(k => q.includes(k)))   return "finance";
  if (educationKeywords.some(k => q.includes(k))) return "education";
  if (skillKeywords.some(k => q.includes(k)))     return "skills";
  if (lifeKeywords.some(k => q.includes(k)))      return "life";
  return "general";
};

const responses = {
  career: {
    intro: "Based on your profile and India's current job market trends,",
    insights: [
      "the tech sector is adding 5L+ jobs annually with median salaries of ₹8-15L for freshers. Government jobs remain stable but timelines are 3-5 years minimum.",
      "your background aligns well with the private sector growth story. The skill gap in India means talented individuals have significant leverage in salary negotiations.",
      "remote work has changed the equation — tier-2 talent now accesses tier-1 salaries. Location is no longer a barrier.",
    ],
    recommendation: "Focus on high-ROI skills (Python, DSA, system design) first. The market rewards specialization over generalization in 2026.",
    confidence: "High",
  },
  finance: {
    intro: "Based on India's inflation rate (~5%) and investment landscape,",
    insights: [
      "Index mutual funds (Nifty 50) have historically returned 12-15% CAGR — beating FD and inflation handily without requiring active management.",
      "direct stock picking requires 100+ hours of research annually. For most working professionals, SIP in diversified funds is the mathematically superior choice.",
      "the compounding effect is dramatic — ₹5K/month SIP for 20 years at 12% CAGR grows to ₹50L+. Starting early beats investing more later.",
    ],
    recommendation: "Start with SIP in a Nifty 50 index fund immediately. Explore direct stocks only after you have 6-months emergency fund + 3+ years investment experience.",
    confidence: "High",
  },
  education: {
    intro: "Looking at India's education ROI data for 2026,",
    insights: [
      "IIM/ISB MBA delivers 3-5x salary jump but costs ₹25-35L. Tier-3 MBA sees 1.1-1.3x return — barely covers fees.",
      "online certifications (AWS, GCP, PMP, CFA) cost ₹1-3L and deliver comparable salary bumps to mid-tier MBA in specific domains.",
      "India's largest employers now focus more on demonstrated skills (GitHub, portfolio) than degrees, especially in tech.",
    ],
    recommendation: "Invest in education only where brand matters (IIM, IIT, ISB) or where certification is industry-mandated. Otherwise, build publicly visible skills.",
    confidence: "Medium",
  },
  skills: {
    intro: "India's tech talent shortage is creating massive opportunities —",
    insights: [
      "AI/ML engineers are the fastest growing job category in India with 40%+ salary premium over traditional software roles.",
      "Cloud certifications (AWS/Azure/GCP) add ₹3-8L to annual salary packages based on LinkedIn salary data.",
      "full-stack React + Node developers are in extreme demand at startups — 50K+ open positions as of 2026.",
    ],
    recommendation: "If you're in tech, prioritize AI/ML fundamentals + one cloud platform. If you're a fresher, nail DSA + build 2-3 end-to-end projects first.",
    confidence: "High",
  },
  life: {
    intro: "India's urban-rural income gap has narrowed with remote work —",
    insights: [
      "Bangalore/Mumbai/Delhi cost of living is 2.5-3x tier-2 cities. A ₹18L Bangalore package often nets less disposable income than a ₹10L Pune package.",
      "remote work roles at top companies now available to tier-2 residents — the metro advantage is shrinking rapidly.",
      "mental health and family proximity increasingly factor into life satisfaction scores for Indians under 35.",
    ],
    recommendation: "Calculate your actual 'take-home after costs' rather than CTC. Prioritize roles with remote flexibility so you control your geography, not your employer.",
    confidence: "Medium",
  },
  general: {
    intro: "Based on collective wisdom from 10 million Indian decision-makers,",
    insights: [
      "the best decisions align your natural strengths with market opportunities — neither purely passion-driven nor purely market-driven.",
      "in India's rapidly evolving economy, optionality trumps optimization. Preserve your ability to pivot.",
      "community wisdom suggests breaking your decision into a 3-month experiment before committing fully.",
    ],
    recommendation: "Start with the option that has a lower sunk cost and faster feedback loop. You'll have better data to make the final decision within 90 days.",
    confidence: "Medium",
  },
};

const optionSuggestions = {
  career:    { A: "Government / UPSC Path", B: "Tech / Private Sector" },
  finance:   { A: "Direct Stocks", B: "SIP / Mutual Funds" },
  education: { A: "Traditional Degree / MBA", B: "Online Certifications" },
  skills:    { A: "AI / Machine Learning", B: "Cloud / Full-Stack Dev" },
  life:      { A: "Metro City", B: "Tier-2 / Remote" },
  general:   { A: "Option A", B: "Option B" },
};

// Simulate streaming AI response
export async function getAIResponse(question, userProfile = {}) {
  await new Promise(r => setTimeout(r, 1600)); // simulate network latency

  const topic = detectTopic(question);
  const data  = responses[topic];
  const opts  = optionSuggestions[topic];
  const insight = data.insights[Math.floor(Math.random() * data.insights.length)];

  const ageNote = userProfile.age
    ? ` Given you're ${userProfile.age} years old, time is ${userProfile.age < 25 ? "your biggest asset" : "important — act decisively"}.`
    : "";

  const goalNote = userProfile.goals?.length
    ? ` Since you care about ${userProfile.goals.slice(0,2).join(" & ")}, this decision has cascading impact on those areas.`
    : "";

  return {
    answer: `${data.intro} ${insight}${ageNote}${goalNote}\n\n**Janta AI Recommendation:** ${data.recommendation}`,
    confidence: data.confidence,
    optionA: opts.A,
    optionB: opts.B,
    topic,
  };
}
