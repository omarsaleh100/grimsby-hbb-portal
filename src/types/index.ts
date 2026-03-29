export interface Business {
  id: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  businessName: string;
  type: BusinessType;
  description: string;
  stage: BusinessStage;
  fullTime: boolean;
  yearsOperating: number;
  needs: BusinessNeed[];
  tourismInterest: TourismInterest[];
  registeredAt: string;
}

export type BusinessType = 'professional' | 'creative' | 'food' | 'retail' | 'trades' | 'tech' | 'other';
export type BusinessStage = 'emerging' | 'stabilizing' | 'growth';
export type BusinessNeed = 'funding' | 'mentorship' | 'workspace' | 'marketing' | 'networking' | 'zoning' | 'digital' | 'training';
export type TourismInterest = 'farmers-market' | 'directory' | 'events' | 'shop-local';

export interface AssessmentAnswer {
  businessType: string;
  operatingSpace: string;
  floorArea: string;
  employees: string;
  clientVisits: string;
  signage: boolean;
  parkingImpact: boolean;
  noiseOdor: boolean;
}

export type EligibilityResult = 'green' | 'yellow' | 'red';

export interface AssessmentResult {
  eligibility: EligibilityResult;
  score: number;
  flags: string[];
  recommendations: string[];
  departmentsToContact: string[];
}

export interface Resource {
  slug: string;
  name: string;
  shortDescription: string;
  icon: string;
  iconBg: string;
  fullDescription: string;
  eligibility: string[];
  benefits: string[];
  howItWorks: string[];
  simulatedFeature: SimulatedFeature;
  website?: string;
  isGrimsbySpecific: boolean;
}

export interface SimulatedFeature {
  title: string;
  description: string;
  steps: SimulationStep[];
}

export interface SimulationStep {
  label: string;
  description: string;
  type: 'form' | 'info' | 'result' | 'calendar' | 'calculator';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: EventCategory;
  spotsLeft: number;
  /** If set, this is a real researched workshop with a detail page */
  slug?: string;
  isReal?: boolean;
}

export interface WorkshopModule {
  time: string;
  title: string;
  format: string;
  description?: string;
}

export interface WorkshopBudgetLine {
  item: string;
  description: string;
  cost: string;
}

export interface Workshop {
  slug: string;
  title: string;
  subtitle: string;
  purpose: string;
  targetAudience: string;
  outreachStrategy: string;
  format: string;
  fee: string;
  budget: string;
  participants: string;
  learningObjectives: string[];
  modules: WorkshopModule[];
  facilitation: string;
  budgetBreakdown: WorkshopBudgetLine[];
  totalCost: string;
  budgetReserve: string;
}

export type EventCategory = 'workshop' | 'networking' | 'info-session' | 'market' | 'webinar';

export interface DirectoryListing {
  id: string;
  businessName: string;
  description: string;
  category: BusinessType;
  tags: string[];
  website?: string;
  featured: boolean;
}

export interface MatchedProgram {
  resource: Resource;
  matchPercentage: number;
  reasons: string[];
}
