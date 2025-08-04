// POC Policy Matcher Tool

export interface Profile {
  age: number;
  profession: string;
  income: number;
  diabetes: boolean;
  smoking: boolean;
}

export interface Policy {
  id: number;
  name: string;
  coverage: string;
  premium: string;
  description: string;
  conditions: {
    minAge?: number;
    maxAge?: number;
    nonSmoker?: boolean;
    noChronic?: boolean;
    minIncome?: number;
  };
}

const policies: Policy[] = [
  {
    id: 1,
    name: 'Basic Life Cover',
    coverage: '10x annual income',
    premium: 'Low',
    description: 'Ideal for young professionals with no major health issues.',
    conditions: { minAge: 18, maxAge: 35, nonSmoker: true, noChronic: true },
  },
  {
    id: 2,
    name: 'Comprehensive Health & Life',
    coverage: 'Health + Life insurance combo',
    premium: 'Medium-High',
    description: 'Covers pre-existing conditions with a waiting period.',
    conditions: { minAge: 25, maxAge: 50 },
  },
  {
    id: 3,
    name: 'Premium Protection Plan',
    coverage: 'Life + Health + Disability + Investment',
    premium: 'High',
    description: 'Comprehensive coverage for high earners.',
    conditions: { minAge: 30, maxAge: 55, minIncome: 100000 },
  },
];

export class PolicyMatcherTool {
  match(profile: Profile): Policy[] {
    return policies.filter((policy) => {
      const c = policy.conditions;
      if (c.minAge && profile.age < c.minAge) return false;
      if (c.maxAge && profile.age > c.maxAge) return false;
      if (c.nonSmoker && profile.smoking) return false;
      if (c.noChronic && profile.diabetes) return false;
      if (c.minIncome && profile.income < c.minIncome) return false;
      return true;
    });
  }
}
