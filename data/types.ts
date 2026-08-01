export type Category =
  | 'scholarship'
  | 'internship'
  | 'job'
  | 'competition'
  | 'skilling'
  | 'scheme'
  | 'exam';

export type Sector = 'government' | 'private' | 'both';

export interface Opportunity {
  id: string;
  title: string;
  emoji: string;
  category: Category;
  issuer: string; // e.g. "Ministry of Corporate Affairs, Govt. of India"
  description: string;
  tags: string[]; // e.g. ["women-friendly", "no-fee", "12th-pass", "engineering"]
  officialUrl: string; // ALWAYS the real, official .gov.in / verified source
  officialDomain: string; // shown in-app so users can eyeball it before tapping
  verifiedOn: string; // ISO date this listing was last hand-checked
  feeNote: string; // always state clearly this is free / no application fee
  sector: Sector; // government-only, private-only, or both (e.g. NCS lists both)
  state: string; // 'All India' for national programmes, or a specific state
}
