
export enum SubscriptionPlan {
  BASIC = 'Basic',
  STANDARD = 'Standard',
  PREMIUM = 'Premium'
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PlanDetails {
  type: SubscriptionPlan;
  price: number;
  freeVisits: number;
  extraVisitPrice: number;
  description: string;
}

export interface UserState {
  isLoggedIn: boolean;
  isSetupComplete: boolean; // New: Tracks if they've chosen a name
  name?: string;
  email?: string;
  authProvider?: 'google' | 'facebook';
  plan?: SubscriptionPlan;
  isPaid: boolean;
  totalVisitsUsed: number;
  remainingVisits: number;
  bookings: Booking[]; // New: Real list of user bookings
}

export interface Booking {
  id: string;
  serviceId: string;
  date: string;
  workerCount: number;
  description: string;
  status: 'مكتملة' | 'قيد الانتظار' | 'ملغاة';
}
