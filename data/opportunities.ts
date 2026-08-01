import { Opportunity } from './types';

/**
 * SOURCE OF TRUTH — every entry here has been manually checked against the
 * issuing ministry / official domain. Do not add an entry unless:
 *   1. The URL's domain ends in .gov.in (or is a verified official partner
 *      domain you have personally checked), AND
 *   2. You can point to the ministry/department that owns it.
 *
 * This file intentionally ships with a small, trustworthy starter set
 * rather than a large scraped list — see README "Growing this list safely".
 *
 * `state: 'All India'` means the programme is open nationwide. Most entries
 * are national because that's where verified, centralised official portals
 * exist — see README "Future scope" for state-wise expansion plans.
 */
export const opportunities: Opportunity[] = [
  {
    id: 'myscheme',
    title: 'myScheme — find every scheme you qualify for',
    emoji: '🏛️',
    category: 'scheme',
    issuer: 'National e-Governance Division, MeitY, Govt. of India',
    description:
      'Answer a few questions about yourself (age, state, income, category) and myScheme lists every central and state government scheme you are eligible for, then sends you to the real application page.',
    tags: ['all-students', 'no-fee', 'women-friendly', 'sc-st-obc', 'income-based'],
    officialUrl: 'https://www.myscheme.gov.in/',
    officialDomain: 'myscheme.gov.in',
    verifiedOn: '2026-07-31',
    feeNote: 'Free. Never asks for payment to "check eligibility."',
    sector: 'government',
    state: 'All India',
  },
  {
    id: 'nsp-scholarships',
    title: 'National Scholarship Portal (NSP)',
    emoji: '🎓',
    category: 'scholarship',
    issuer: 'Ministry of Electronics & IT, Govt. of India',
    description:
      'The single official portal for pre-matric, post-matric and merit scholarships from the central government, state governments, UGC and AICTE. One registration (OTR) covers your whole academic career.',
    tags: ['school', 'college', 'no-fee', 'income-based', 'sc-st-obc-minority'],
    officialUrl: 'https://scholarships.gov.in/',
    officialDomain: 'scholarships.gov.in',
    verifiedOn: '2026-07-31',
    feeNote: 'Free. NSP never charges a fee to register or apply.',
    sector: 'government',
    state: 'All India',
  },
  {
    id: 'national-overseas-scholarship',
    title: 'National Overseas Scholarship — fully-funded study abroad',
    emoji: '✈️',
    category: 'scholarship',
    issuer: 'Ministry of Social Justice & Empowerment, Govt. of India',
    description:
      "Covers tuition, travel, visa fees and a living allowance (~USD 15,400/year) for Master's or PhD study at a top-500 QS-ranked foreign university. 125 awards a year; 30% reserved for women candidates.",
    tags: ['foreign-study', 'postgraduate', 'phd', 'women-friendly', 'sc-st-obc', 'no-fee', 'save-money'],
    officialUrl: 'https://nosmsje.gov.in/',
    officialDomain: 'nosmsje.gov.in',
    verifiedOn: '2026-07-31',
    feeNote: 'Free to apply. Funds go to the university/scholar directly, never to a third-party "agent."',
    sector: 'government',
    state: 'All India',
  },
  {
    id: 'ncs-jobs',
    title: 'National Career Service (NCS) — govt + private jobs, one place',
    emoji: '💼',
    category: 'job',
    issuer: 'Ministry of Labour & Employment, Govt. of India',
    description:
      'Both government and private-sector job listings side by side, career counselling, a free Employability Assessment Test, and regular online job fairs across every state. Filter by location, sector and qualification right on the site.',
    tags: ['jobs', 'freshers', 'women-friendly', 'no-fee', 'skills-test', 'private-jobs', 'govt-jobs'],
    officialUrl: 'https://www.ncs.gov.in/',
    officialDomain: 'ncs.gov.in',
    verifiedOn: '2026-07-31',
    feeNote:
      'Free at every step — NCS publishes an explicit fraud warning: it never charges for registration, applications or interviews.',
    sector: 'both',
    state: 'All India',
  },
  {
    id: 'pm-internship',
    title: 'PM Internship Scheme — 12-month paid internship',
    emoji: '🧑\u200d💻',
    category: 'internship',
    issuer: 'Ministry of Corporate Affairs, Govt. of India',
    description:
      'Paid internships (₹5,000/month stipend + one-time grant) with 500+ top Indian companies for candidates aged 18–30. Apply to up to 3 internships through one profile.',
    tags: ['internship', 'paid', 'stipend', 'freshers', 'no-fee', 'private-jobs'],
    officialUrl: 'https://pminternship.mca.gov.in/',
    officialDomain: 'pminternship.mca.gov.in',
    verifiedOn: '2026-07-31',
    feeNote: 'Free. No application fee at any stage.',
    sector: 'both',
    state: 'All India',
  },
  {
    id: 'skill-india-digital',
    title: 'Skill India Digital Hub — free courses + certification',
    emoji: '📜',
    category: 'skilling',
    issuer: 'Ministry of Skill Development & Entrepreneurship (NSDC)',
    description:
      'Free NSQF-aligned courses, apprenticeship (NAPS) listings and a verified digital skill certificate you can add to a resume or LinkedIn profile — a genuine way to save money on paid certification courses.',
    tags: ['certification', 'no-fee', 'vocational', 'apprenticeship', 'save-money'],
    officialUrl: 'https://www.skillindiadigital.gov.in/',
    officialDomain: 'skillindiadigital.gov.in',
    verifiedOn: '2026-07-31',
    feeNote: 'Free courses. Beware lookalike domains such as "skillindiadigitalgov.org" — the real one ends in .gov.in.',
    sector: 'government',
    state: 'All India',
  },
  {
    id: 'upsc-exams',
    title: 'UPSC — Civil Services & other national exams',
    emoji: '📝',
    category: 'exam',
    issuer: 'Union Public Service Commission, Govt. of India',
    description:
      'The official body for the Civil Services Exam, Engineering Services, NDA/CDS and more. Applications go through the linked upsconline.nic.in portal — always start from upsc.gov.in.',
    tags: ['exam', 'civil-services', 'graduate', 'no-fee-for-info'],
    officialUrl: 'https://upsc.gov.in/',
    officialDomain: 'upsc.gov.in',
    verifiedOn: '2026-07-31',
    feeNote: 'Exam form fees (if any) are only ever paid on the official portal — never to a "helper" or agent.',
    sector: 'government',
    state: 'All India',
  },
  {
    id: 'ssc-exams',
    title: 'SSC — CGL, CHSL, MTS and other staff selection exams',
    emoji: '📝',
    category: 'exam',
    issuer: 'Staff Selection Commission, Govt. of India',
    description:
      'Recruits for thousands of non-gazetted government posts every year (CGL, CHSL, MTS, GD Constable and more), with free practice material on the official portal.',
    tags: ['exam', 'graduate', '12th-pass', 'govt-jobs'],
    officialUrl: 'https://ssc.gov.in/',
    officialDomain: 'ssc.gov.in',
    verifiedOn: '2026-07-31',
    feeNote: 'Application fees are paid only on ssc.gov.in — SSC has repeatedly warned against fraudulent "agents."',
    sector: 'government',
    state: 'All India',
  },
  {
    id: 'nta-exams',
    title: 'NTA — JEE, NEET, CUET, UGC-NET and more',
    emoji: '📝',
    category: 'exam',
    issuer: 'National Testing Agency, Ministry of Education, Govt. of India',
    description:
      'Conducts India\u2019s biggest entrance exams for engineering, medical and university admissions, plus UGC-NET for teaching/research eligibility. The exam calendar for the whole year is published on nta.ac.in.',
    tags: ['exam', 'engineering', 'medical', 'undergraduate', 'postgraduate'],
    officialUrl: 'https://nta.ac.in/',
    officialDomain: 'nta.ac.in',
    verifiedOn: '2026-07-31',
    feeNote: 'Only pay exam fees on the official exam-specific NTA portal — never through a third-party link.',
    sector: 'government',
    state: 'All India',
  },
  {
    id: 'ibps-exams',
    title: 'IBPS — public sector bank recruitment exams',
    emoji: '🏦',
    category: 'exam',
    issuer: 'Institute of Banking Personnel Selection (recruits for public sector banks)',
    description:
      'Runs the common recruitment process (PO, Clerk, SO, RRB) for public sector banks across India — one exam, many bank postings.',
    tags: ['exam', 'banking', 'graduate', 'govt-jobs'],
    officialUrl: 'https://www.ibps.in/',
    officialDomain: 'ibps.in',
    verifiedOn: '2026-07-31',
    feeNote: 'Application fees are paid only on ibps.in.',
    sector: 'government',
    state: 'All India',
  },
  {
    id: 'smart-india-hackathon',
    title: 'Smart India Hackathon — national prize hackathon',
    emoji: '🏆',
    category: 'competition',
    issuer: 'AICTE / Ministry of Education, Govt. of India',
    description:
      'India\u2019s largest student hackathon — solve real problem statements from ministries and companies, with cash prizes and direct recognition from top institutions.',
    tags: ['competition', 'engineering', 'prize-money', 'team-event'],
    officialUrl: 'https://sih.gov.in/',
    officialDomain: 'sih.gov.in',
    verifiedOn: '2026-07-31',
    feeNote: 'Free to register and compete.',
    sector: 'government',
    state: 'All India',
  },
  {
    id: 'mygov-contests',
    title: 'MyGov "Do" — live contests, quizzes & prize tasks',
    emoji: '🎯',
    category: 'competition',
    issuer: 'MyGov, Ministry of Electronics & IT, Govt. of India',
    description:
      'A running feed of official essay, poster, reel and quiz competitions run by real ministries — many with cash prizes and certificates. Always check the specific ministry named on each task.',
    tags: ['competition', 'prize-money', 'creative', 'quiz'],
    officialUrl: 'https://www.mygov.in/home/do',
    officialDomain: 'mygov.in',
    verifiedOn: '2026-07-31',
    feeNote: 'Free to enter. MyGov never asks entrants to pay.',
    sector: 'government',
    state: 'All India',
  },
  {
    id: 'india-gov-directory',
    title: 'India.gov.in — National Portal of India',
    emoji: '🇮🇳',
    category: 'scheme',
    issuer: 'National Informatics Centre, Govt. of India',
    description:
      'The master directory for every official Indian government service, scheme and portal. Use this to double-check that any scheme, job or scholarship site you find elsewhere is genuinely official.',
    tags: ['directory', 'verification', 'all-students'],
    officialUrl: 'https://www.india.gov.in/',
    officialDomain: 'india.gov.in',
    verifiedOn: '2026-07-31',
    feeNote: 'Free — information directory only.',
    sector: 'government',
    state: 'All India',
  },
];

export const categoryLabels: Record<string, { label: string; emoji: string }> = {
  scheme: { label: 'Govt. Schemes', emoji: '🏛️' },
  scholarship: { label: 'Scholarships', emoji: '🎓' },
  exam: { label: 'Exams', emoji: '📝' },
  internship: { label: 'Internships', emoji: '🧑\u200d💻' },
  job: { label: 'Jobs', emoji: '💼' },
  competition: { label: 'Competitions & Prizes', emoji: '🏆' },
  skilling: { label: 'Free Courses & Certificates', emoji: '📜' },
};

export const indianStates = [
  'All India',
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Gujarat', 'Haryana',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab',
  'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];
