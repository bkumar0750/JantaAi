import { createContext, useContext, useState, useEffect } from "react";
import { questions as initialQuestions } from "../data/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("jantaai_profile");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [questions, setQuestions] = useState(initialQuestions);
  const [userVotes, setUserVotes]   = useState({});   // { questionId: "A"|"B" }
  const [userUpvotes, setUserUpvotes] = useState({}); // { answerId: true }

  // Persist profile
  useEffect(() => {
    if (userProfile) localStorage.setItem("jantaai_profile", JSON.stringify(userProfile));
  }, [userProfile]);

  const saveProfile = (profile) => setUserProfile(profile);

  const voteOnQuestion = (questionId, option) => {
    if (userVotes[questionId]) return; // already voted
    setUserVotes(v => ({ ...v, [questionId]: option }));
    setQuestions(qs => qs.map(q => {
      if (q.id !== questionId) return q;
      return {
        ...q,
        votesA: option === "A" ? q.votesA + 1 : q.votesA,
        votesB: option === "B" ? q.votesB + 1 : q.votesB,
        totalVotes: q.totalVotes + 1,
      };
    }));
  };

  const upvoteAnswer = (answerId) => {
    if (userUpvotes[answerId]) return;
    setUserUpvotes(u => ({ ...u, [answerId]: true }));
    setQuestions(qs => qs.map(q => ({
      ...q,
      answers: (q.answers || []).map(a =>
        a.id === answerId ? { ...a, upvotes: a.upvotes + 1 } : a
      ),
    })));
  };

  const addQuestion = (newQ) => {
    setQuestions(qs => [newQ, ...qs]);
  };

  return (
    <AppContext.Provider value={{
      userProfile, saveProfile,
      questions, addQuestion,
      userVotes, voteOnQuestion,
      userUpvotes, upvoteAnswer,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
