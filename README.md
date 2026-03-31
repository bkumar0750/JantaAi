
###  Bhuneshwar Netam 21MI31026 ###

# Janta AI - India's Collective Brain 🧠

Janta AI is an AI-first, social decision-making platform built specifically for the Indian market. It allows users to ask major life, career, and financial questions, and receive a highly personalized AI recommendation backed by real voting data from "people like you" (peers matching your age, career stage, and goals).

## 🚀 Features

- **Personalized Onboarding**: An identity matrix captures your name, age, career stage, and life goals to curate your feed and tailor AI responses.
- **Smart Decision Feed**: Browse and vote on viral, trending dilemmas across categories like Career, Finance, Skills, Education, and Life.
- **AI Verdict Engine**: Type any life question and receive an instant, personalized recommendation powered by an intelligent mock-LLM engine. It breaks down the pros, cons, and a final verdict.
- **Peer Group Analysis ("People Like You")**: After voting on a poll, unlock deep insights showing exactly what percentage of users with a similar background chose which option.
- **Community Discourse**: Read, add, and upvote nuanced textual answers from verified experts, founders, and peers.
- **Premium Glassmorphism UI**: Built with a sleek, dark-themed, "deep space" aesthetic using a vibrant Violet/Emerald/Amber palette, advanced CSS animations, and highly polished mobile-responsive grid layouts.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Vite 5
- **Routing**: React Router DOM (v6)
- **Styling**: Vanilla CSS (Custom Design System with CSS Variables, Advanced Animations, Glassmorphism)
- **State Management**: React Context API & LocalStorage
- **Typography**: Google Fonts (Plus Jakarta Sans, Space Grotesk)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AIAnswerBox.jsx  # AI verdict display & styling
│   ├── AnswerCard.jsx   # Community discourse cards
│   ├── DecisionCard.jsx # Feed item interactive cards
│   ├── LoadingSpinner.jsx # Animated AI generation state
│   ├── Navbar.jsx       # Floating sticky header
│   ├── PollBar.jsx      # Animated voting results
│   └── TrendingSection.jsx # Right sidebar viral topics
│
├── context/
│   └── AppContext.jsx   # Global provider (Profile, Votes, Questions)
│
├── data/
│   └── mockData.js      # Base questions, categories, and AI autocomplete
│
├── pages/
│   ├── AskQuestion.jsx  # Input field & prompt generation
│   ├── DecisionDetail.jsx # Split view (AI vs Community)
│   ├── Home.jsx         # Main feed & stat tracking
│   ├── Onboarding.jsx   # Context collection flow
│   └── Profile.jsx      # Telemetry, vector objectives, ledger
│
├── utils/
│   └── aiEngine.js      # Mock LLM generation logic & keyword analysis
│
├── App.jsx              # Router configuration
├── index.css            # Complete design system tokens & animation keyframes
└── main.jsx             # React DOM entry
```

## 💻 Getting Started locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bkumar0750/JantaAi.git
   cd JantaAi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to experience Janta AI.
