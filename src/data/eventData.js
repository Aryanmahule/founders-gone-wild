export const EVENT_DETAILS = {
  name: "Founder's Gone Wild",
  subtitle: "Think Wild. Build Smart. Pitch Bold.",
  tagline: "You don't need a billion-dollar idea. You just need to convince the Sharks that you have one.",
  prizePool: 'TBA',
  teamSize: '2–5 Members',
  duration: '1 Day',
  roundsCount: 2,
  dropDate: 'TBA',
  status: 'Registrations Open',
  stats: [
    { val: '2–5', lab: 'per team', sub: 'Cross-functional' },
    { val: '2',   lab: 'rounds',   sub: 'Quiz → Pitch' },
    { val: '7',   lab: 'rubric',   sub: 'Judging criteria' },
    { val: 'TBA', lab: 'date',     sub: 'Season 1' },
  ]
};

export const RULES_DATA = [
  {
    id: 'rule-1',
    category: 'Team',
    title: 'Squad Size: 2–5 Members',
    description: 'Every team must have between 2 and 5 members. Cross-functional squads — coders, designers, storytellers, strategists — consistently out-perform mono-skilled groups.',
    badge: 'Eligibility',
    icon: '👥'
  },
  {
    id: 'rule-2',
    category: 'Concept',
    title: 'Dynamic Concepts — Live Generation',
    description: 'Startup ideas are generated live from randomized prompt cards. You cannot pre-plan your concept. Every assigned card must be meaningfully woven into your pitch.',
    badge: 'Core Law',
    icon: '🎲'
  },
  {
    id: 'rule-3',
    category: 'Tools',
    title: 'AI & Internet Fully Permitted',
    description: 'ChatGPT, Canva, Figma, Gamma, AI image generators, and all internet research tools are 100% allowed and encouraged. Build fast. Build smart.',
    badge: 'AI Policy',
    icon: '🤖'
  },
  {
    id: 'rule-4',
    category: 'Deadlines',
    title: 'Strict Deadlines — No Extensions',
    description: 'Development and pitching windows are timed and enforced. Missing a deadline means disqualification. Manage your squad\'s time like a real founding team under investor pressure.',
    badge: 'Time Law',
    icon: '⏱️'
  },
  {
    id: 'rule-5',
    category: 'Originality',
    title: 'Originality Required — No Clones',
    description: 'Plagiarising or repackaging existing startups is a hard disqualification. Your idea must be genuinely novel. Inspired by reality is fine; copying it is not.',
    badge: 'Integrity',
    icon: '🛡️'
  },
  {
    id: 'rule-6',
    category: 'Balance',
    title: 'Wild Humor + Logical Business Sense',
    description: 'Embrace the absurdity. Humor and creativity are scored. But every wild idea must be grounded in a coherent business model, revenue logic, and a defensible market.',
    badge: 'Core Balance',
    icon: '⚖️'
  },
  {
    id: 'rule-7',
    category: 'Conduct',
    title: 'Sensitivity & Content Standards',
    description: 'No political, religious, or otherwise sensitive statements. Humor is encouraged; vulgarity, improper, or offensive content leads to immediate strict action by the jury.',
    badge: 'Conduct',
    icon: '🚫'
  },
  {
    id: 'rule-8',
    category: 'Cards',
    title: 'Minimum 3 Cards to Advance',
    description: 'Every team must purchase a minimum of 3 cards from the Round 1 shop using earned Founder Points. Failing to collect the required combination disqualifies you from Round 2.',
    badge: 'Card Law',
    icon: '🃏'
  },
];

export const ROUNDS_DATA = [
  {
    number: '01',
    title: 'Think Fast. Think Wild.',
    phase: 'Round 1',
    tag: 'Quiz → Shop → Qualify',
    tagline: 'Limited Points. Limited Cards. Every choice matters.',
    summary: 'Teams answer quiz questions to earn Founder Points, then spend those points in a live card shop to purchase Domain, Crazy Object, and Power-Up cards. Collect the right combination and you advance. Run out of points or buy wrong — you\'re out.',
    steps: [
      {
        step: 'Step 1 — Quiz Blitz',
        desc: 'Answer rapid-fire questions. Every correct answer earns Founder Points. Wrong answers earn nothing. Points are finite and scarce.'
      },
      {
        step: 'Step 2 — The Card Shop',
        desc: 'Spend your Founder Points in the live shop. Cards have fixed prices. Choose wisely — Domain cards define your tech space, Crazy Object cards define your absurd twist, Power-Up cards give you advantages in Round 2.'
      },
      {
        step: 'Qualification Gate',
        desc: 'Every team must purchase a minimum of 3 cards to advance. Shortlisted teams with the strongest card combos proceed to the Grand Pitch.'
      }
    ],
    deliverables: [
      'Earn Founder Points via quiz',
      'Purchase minimum 3 cards from the shop',
      'Secure a qualifying card combination',
    ],
    gateCriteria: 'Minimum 3 cards purchased + qualifying combo secured'
  },
  {
    number: '02',
    title: 'The Grand Pitch',
    phase: 'Round 2',
    tag: 'From Crazy Idea → Real Business',
    tagline: 'Pitch it like it\'s real. Defend it like it\'s yours.',
    summary: 'Shortlisted teams get dedicated prep time to transform their card combo into a full investable startup. Build your deck, model your business, design your brand — then stand in front of the jury and convince them to write the cheque.',
    steps: [
      {
        step: 'Prep Window',
        desc: 'Use all tools available — ChatGPT, Canva, Figma, Gamma, AI image generators — to build your pitch deck, financial model, and branding assets.'
      },
      {
        step: '5–7 Min Pitch',
        desc: 'Present your startup to the jury panel. Cover problem, solution, market, revenue model, marketing strategy, and growth roadmap.'
      },
      {
        step: '5 Min Investor Q&A + Negotiation',
        desc: 'The jury plays hardball investors. Defend your assumptions, negotiate equity, counter tough questions. Survive the Shark Tank.'
      }
    ],
    deliverables: [
      'Problem & Solution + Target Market',
      'Revenue & Pricing Model',
      'Branding & Promotional Material',
      'Financials & Investment Ask',
      'Live 5–7 min pitch + 5 min Q&A',
    ],
    gateCriteria: 'Highest combined rubric score wins — Innovation, Business Model, Branding, Presentation, Critical Thinking, Creativity, Humor'
  }
];

export const LEADERBOARD_DATA = [
  {
    rank: 1,
    teamName: 'TBA',
    score: null,
    cards: ['TBA', 'TBA'],
    members: ['TBA'],
    track: 'TBA',
    badge: '1st Place',
    innovation: null,
    execution: null,
    pitch: null,
    status: 'Champion'
  },
  {
    rank: 2,
    teamName: 'TBA',
    score: null,
    cards: ['TBA', 'TBA'],
    members: ['TBA'],
    track: 'TBA',
    badge: 'Runner Up',
    innovation: null,
    execution: null,
    pitch: null,
    status: 'Finalist'
  },
  {
    rank: 3,
    teamName: 'TBA',
    score: null,
    cards: ['TBA', 'TBA'],
    members: ['TBA'],
    track: 'TBA',
    badge: '3rd Place',
    innovation: null,
    execution: null,
    pitch: null,
    status: 'Finalist'
  },
];

export const JUDGES_DATA = [
  {
    id: 'judge-1',
    name: 'Dr. Nischal Puri',
    role: 'Faculty, CSE-DS Department',
    focus: 'Computer Science & Data Science',
    avatar: '👨‍🏫',
    quote: 'A great startup idea means nothing without execution. Show us the thinking behind the madness.',
    investmentRecord: 'CSE-DS Faculty Judge, Founder\'s Gone Wild',
    tags: ['CSE-DS', 'Innovation', 'Technical Depth']
  },
  {
    id: 'judge-2',
    name: 'Dr. Kalyani Satone',
    role: 'Faculty, CSE-DS Department',
    focus: 'Computer Science & Data Science',
    avatar: '👩‍🏫',
    quote: 'The wildest ideas often hide the sharpest minds. We\'re here to find them.',
    investmentRecord: 'CSE-DS Faculty Judge, Founder\'s Gone Wild',
    tags: ['CSE-DS', 'Business Model', 'Strategy']
  },
  {
    id: 'judge-3',
    name: 'Dr. Ashish Dandekar',
    role: 'Faculty, CSE-DS Department',
    focus: 'Computer Science & Data Science',
    avatar: '👨‍💼',
    quote: 'Don\'t just pitch a product — pitch a world where your product is inevitable.',
    investmentRecord: 'CSE-DS Faculty Judge, Founder\'s Gone Wild',
    tags: ['CSE-DS', 'Scalability', 'Critical Thinking']
  },
  {
    id: 'judge-4',
    name: 'Dr. Vrushali Pethe',
    role: 'Faculty, 1st Year Department',
    focus: '1st Year Engineering',
    avatar: '👩‍🔬',
    quote: 'Creativity is your currency here. Spend it boldly.',
    investmentRecord: '1st Year Dept. Faculty Judge, Founder\'s Gone Wild',
    tags: ['1st Year Dept.', 'Creativity', 'Presentation']
  },
  {
    id: 'judge-5',
    name: 'Stephen Dhanvajir',
    role: 'Event Coordinator, Founder\'s Gone Wild',
    focus: 'Event Strategy & Coordination',
    avatar: '🎯',
    quote: 'You don\'t need a billion-dollar idea. You just need to convince the Sharks that you have one.',
    investmentRecord: 'FGW Coordinator & Organizer',
    tags: ['Coordinator', 'Humor & Engagement', 'Pitch Coach']
  }
];
