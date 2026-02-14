export type SignalStatus = 'ACTIVE' | 'CLOSED' | 'HIT_TP' | 'HIT_SL';

export interface Signal {
  id: string;
  pair: string;
  direction: 'BUY' | 'SELL';
  entry: number;
  sl: number;
  tp1: number;
  tp2: number;
  tp3: number;
  status: SignalStatus;
  resultPips?: number;
  date: string;
  analyst: string;
  timeframe: string;
  analysis: string;
}

export interface Broker {
  id: string;
  name: string;
  type: 'Local' | 'International' | 'Prop Firm';
  link: string;
  logo: string;
  rating: number;
  features: string[];
  regulation: string;
  isRecommended?: boolean;
}

export interface EducationArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  content?: string;
}

export interface NavItem {
  label: string;
  path: string;
}