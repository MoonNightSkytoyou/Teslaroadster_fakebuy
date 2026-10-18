export type PackageType = 'performance' | 'thrust' | 'rocket';

export interface PackageDetails {
  id: PackageType;
  name: string;
  shortName: string;
  badge?: string;
  badgeType?: 'default' | 'limited' | 'exclusive';
  description: string;
  dueToday: number;
  due10Days: number;
  totalPrice: number;
}

export const PACKAGE_DETAILS: Record<PackageType, PackageDetails> = {
  performance: {
    id: 'performance',
    name: 'Roadster - Performance',
    shortName: 'Performance',
    badge: 'Reserve',
    badgeType: 'default',
    description: 'Road ready with seating for two. Includes active aero and a multi-mode suction system.',
    dueToday: 5000,
    due10Days: 45000,
    totalPrice: 50000,
  },
  thrust: {
    id: 'thrust',
    name: 'Roadster - Thrust',
    shortName: 'Thrust',
    badge: 'Limited',
    badgeType: 'limited',
    description: 'Race ready with seating for two. Includes Performance active aero and a multi-mode suction system, plus acceleration thrusters.',
    dueToday: 5000,
    due10Days: 245000,
    totalPrice: 250000,
  },
  rocket: {
    id: 'rocket',
    name: 'Roadster - Rocket Flight System',
    shortName: 'Rocket',
    badge: 'Invite Only',
    badgeType: 'exclusive',
    description: 'Air ready with seating for one. Includes Performance and Thrust, plus a full flight system.',
    dueToday: 5000,
    due10Days: 245000,
    totalPrice: 250000,
  },
};

export interface AugmentOption {
  id: PackageType;
  title: string;
  badge?: string;
  badgeType?: 'default' | 'limited' | 'exclusive';
  description: string;
  dueToday: number;
  due10Days: number;
  specs: {
    topSpeed: string;
    acceleration: string;
    seating: string;
    features: string[];
  };
}

export type Step = 'landing' | 'reserve' | 'apple-pay' | 'success';

export interface ReservationState {
  packageId: PackageType;
  step: Step;
  agreementAccepted: boolean;
  reservationId: string;
  transactionId: string;
  paymentTimestamp?: string;
}
