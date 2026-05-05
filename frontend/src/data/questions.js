/**
 * questions.js — Single source of truth for survey content on the frontend.
 * Keep in sync with QUESTIONS in backend/main.py.
 */

export const QUESTIONS = [
  {
    id: "q1",
    number: 1,
    text: "Would you use an app where you lock money to stay consistent with a habit?",
    options: [
      { letter: "A", label: "Yes, definitely" },
      { letter: "B", label: "Maybe, if it's simple" },
      { letter: "C", label: "Not sure" },
      { letter: "D", label: "No" },
    ],
  },
  {
    id: "q2",
    number: 2,
    text: "What would you MOST likely use it for?",
    options: [
      { letter: "A", label: "Gym / Fitness" },
      { letter: "B", label: "Studying / Productivity" },
      { letter: "C", label: "Breaking bad habits" },
      { letter: "D", label: "General discipline" },
    ],
  },
  {
    id: "q3",
    number: 3,
    text: "How much would you be comfortable locking for a 14-day challenge?",
    options: [
      { letter: "A", label: "₹0" },
      { letter: "B", label: "₹10–₹50" },
      { letter: "C", label: "₹50–₹200" },
      { letter: "D", label: "₹200+" },
    ],
  },
  {
    id: "q4",
    number: 4,
    text: "What would motivate you more?",
    options: [
      { letter: "A", label: "Losing money" },
      { letter: "B", label: "Earning rewards" },
      { letter: "C", label: "Competing with friends" },
      { letter: "D", label: "Tracking progress" },
    ],
  },
  {
    id: "q5",
    number: 5,
    text: "What worries you most?",
    options: [
      { letter: "A", label: "Losing money" },
      { letter: "B", label: "Payment trust" },
      { letter: "C", label: "Bugs/unfair system" },
      { letter: "D", label: "Nothing" },
    ],
  },
  {
    id: "q6",
    number: 6,
    text: "How should habits be verified?",
    options: [
      { letter: "A", label: "Check-in" },
      { letter: "B", label: "Photo proof" },
      { letter: "C", label: "Automatic tracking" },
      { letter: "D", label: "Don't care" },
    ],
  },
  {
    id: "q7",
    number: 7,
    text: "Would you join friend challenges?",
    options: [
      { letter: "A", label: "Yes" },
      { letter: "B", label: "Maybe" },
      { letter: "C", label: "No" },
      { letter: "D", label: "Depends" },
    ],
  },
  {
    id: "q8",
    number: 8,
    text: "If you fail, what happens to money?",
    options: [
      { letter: "A", label: "Lose all" },
      { letter: "B", label: "Lose partial" },
      { letter: "C", label: "Given to winners" },
      { letter: "D", label: "Donated" },
    ],
  },
  {
    id: "q9",
    number: 9,
    text: "Ideal challenge duration?",
    options: [
      { letter: "A", label: "7 days" },
      { letter: "B", label: "14 days" },
      { letter: "C", label: "21 days" },
      { letter: "D", label: "30 days" },
    ],
  },
  {
    id: "q10",
    number: 10,
    text: "Would you try this app in 7 days?",
    options: [
      { letter: "A", label: "Yes" },
      { letter: "B", label: "Maybe" },
      { letter: "C", label: "No" },
      { letter: "D", label: "Only if friends join" },
    ],
  },
];