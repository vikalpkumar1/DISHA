export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  topic: string;
}

/**
 * Deliberately evergreen (reasoning, quant, static GK) rather than "current
 * affairs" — a bundled offline file can't stay current, and shipping stale
 * "current affairs" as if it were fresh would misinform students prepping
 * for real exams. Swap in your own bank if you want exam-specific practice.
 */
export const quizBank: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'If a train travels 60 km in 45 minutes, what is its speed in km/h?',
    options: ['60 km/h', '80 km/h', '75 km/h', '90 km/h'],
    correctIndex: 1,
    topic: 'Quant',
  },
  {
    id: 'q2',
    question: 'Which of these is the odd one out?',
    options: ['Triangle', 'Square', 'Circle', 'Pentagon'],
    correctIndex: 2,
    topic: 'Reasoning',
  },
  {
    id: 'q3',
    question: 'The Constitution of India came into effect on which date?',
    options: ['15 August 1947', '26 January 1950', '2 October 1948', '26 November 1949'],
    correctIndex: 1,
    topic: 'GK',
  },
  {
    id: 'q4',
    question: 'What is the next number in the series: 2, 6, 12, 20, 30, ?',
    options: ['36', '40', '42', '44'],
    correctIndex: 2,
    topic: 'Reasoning',
  },
  {
    id: 'q5',
    question: 'Which river is the longest in India?',
    options: ['Yamuna', 'Godavari', 'Brahmaputra', 'Ganga'],
    correctIndex: 3,
    topic: 'GK',
  },
  {
    id: 'q6',
    question: 'A shopkeeper marks a price 20% above cost and gives a 10% discount. What is the net profit %?',
    options: ['8%', '10%', '12%', '20%'],
    correctIndex: 0,
    topic: 'Quant',
  },
  {
    id: 'q7',
    question: 'Who is known as the "Father of the Indian Constitution"?',
    options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'B. R. Ambedkar', 'Sardar Patel'],
    correctIndex: 2,
    topic: 'GK',
  },
  {
    id: 'q8',
    question: 'If CAT is coded as 3120, how is DOG coded (same letter-position logic)?',
    options: ['4157', '4156', '4257', '4158'],
    correctIndex: 0,
    topic: 'Reasoning',
  },
  {
    id: 'q9',
    question: 'What is the HCF of 24 and 36?',
    options: ['6', '8', '12', '18'],
    correctIndex: 2,
    topic: 'Quant',
  },
  {
    id: 'q10',
    question: 'The National Career Service (NCS) portal is run by which ministry?',
    options: [
      'Ministry of Education',
      'Ministry of Labour & Employment',
      'Ministry of Skill Development',
      'Ministry of Corporate Affairs',
    ],
    correctIndex: 1,
    topic: 'GK',
  },
];
