import { AssessmentAnswer, AssessmentResult } from '@/types';

export interface AssessmentQuestion {
  id: keyof AssessmentAnswer;
  label: string;
  description: string;
  type: 'select' | 'boolean';
  options?: { value: string; label: string; flagWeight: number }[];
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'businessType',
    label: 'What type of business do you operate or plan to operate?',
    description: 'Some business types are restricted or prohibited as home occupations under By-law 14-45.',
    type: 'select',
    options: [
      { value: 'professional-services', label: 'Professional services (consulting, accounting, design)', flagWeight: 0 },
      { value: 'creative-arts', label: 'Creative arts (painting, photography, crafts)', flagWeight: 0 },
      { value: 'tech-digital', label: 'Technology / digital services', flagWeight: 0 },
      { value: 'food-preparation', label: 'Food preparation or catering', flagWeight: 1 },
      { value: 'personal-services', label: 'Personal services (tutoring, coaching, hairdressing)', flagWeight: 0 },
      { value: 'retail-online', label: 'Online retail / e-commerce', flagWeight: 0 },
      { value: 'retail-inperson', label: 'In-person retail store', flagWeight: 2 },
      { value: 'trades', label: 'Skilled trades (small-scale)', flagWeight: 1 },
      { value: 'vehicle-repair', label: 'Vehicle repair or body shop', flagWeight: 3 },
      { value: 'animal-boarding', label: 'Animal boarding or kennel', flagWeight: 3 },
      { value: 'restaurant', label: 'Restaurant or cafe', flagWeight: 3 },
      { value: 'warehousing', label: 'Warehousing or distribution', flagWeight: 3 },
    ],
  },
  {
    id: 'operatingSpace',
    label: 'Where in your home will the business primarily operate?',
    description: 'By-law 14-45 requires the home occupation to be secondary to the residential use.',
    type: 'select',
    options: [
      { value: 'spare-room', label: 'Spare bedroom or home office', flagWeight: 0 },
      { value: 'basement', label: 'Basement', flagWeight: 0 },
      { value: 'garage', label: 'Garage or detached structure', flagWeight: 1 },
      { value: 'multiple-rooms', label: 'Multiple rooms of the home', flagWeight: 1 },
      { value: 'entire-floor', label: 'Entire floor of the home', flagWeight: 2 },
    ],
  },
  {
    id: 'floorArea',
    label: 'What percentage of your home\'s total floor area will be used for the business?',
    description: 'Grimsby By-law 14-45 limits home occupation space to 25% of total floor area.',
    type: 'select',
    options: [
      { value: 'under-15', label: 'Less than 15%', flagWeight: 0 },
      { value: '15-25', label: '15% to 25%', flagWeight: 0 },
      { value: '25-35', label: '25% to 35%', flagWeight: 1 },
      { value: 'over-35', label: 'More than 35%', flagWeight: 2 },
    ],
  },
  {
    id: 'employees',
    label: 'How many non-resident employees will work at your home?',
    description: 'Grimsby limits the number of non-resident employees working at the home.',
    type: 'select',
    options: [
      { value: '0', label: 'None — just me', flagWeight: 0 },
      { value: '1', label: '1 employee', flagWeight: 0 },
      { value: '2', label: '2 employees', flagWeight: 1 },
      { value: '3-plus', label: '3 or more employees', flagWeight: 2 },
    ],
  },
  {
    id: 'clientVisits',
    label: 'How often will clients or customers visit your home?',
    description: 'Frequent client visits can impact parking, traffic, and neighbourhood character.',
    type: 'select',
    options: [
      { value: 'never', label: 'Never — all work is remote or offsite', flagWeight: 0 },
      { value: 'rarely', label: 'Rarely — a few times per month', flagWeight: 0 },
      { value: 'weekly', label: 'Weekly', flagWeight: 1 },
      { value: 'daily', label: 'Daily', flagWeight: 2 },
    ],
  },
  {
    id: 'signage',
    label: 'Do you plan to have exterior signage for your business?',
    description: 'Home occupations in Grimsby are typically not permitted to display exterior signage.',
    type: 'boolean',
  },
  {
    id: 'parkingImpact',
    label: 'Will your business create additional parking demand on your street?',
    description: 'Home occupations must not create traffic or parking problems for neighbours.',
    type: 'boolean',
  },
  {
    id: 'noiseOdor',
    label: 'Will your business produce noise, odor, vibration, or emissions noticeable outside your home?',
    description: 'Home occupations must not create nuisances detectable beyond the property line.',
    type: 'boolean',
  },
];

const prohibitedTypes = ['vehicle-repair', 'animal-boarding', 'restaurant', 'warehousing'];

export function calculateAssessment(answers: AssessmentAnswer): AssessmentResult {
  const flags: string[] = [];
  const recommendations: string[] = [];
  const departmentsToContact: string[] = [];
  let score = 0;

  // Check business type
  const typeQuestion = assessmentQuestions.find((q) => q.id === 'businessType');
  const typeOption = typeQuestion?.options?.find((o) => o.value === answers.businessType);
  if (typeOption) {
    score += typeOption.flagWeight;
    if (prohibitedTypes.includes(answers.businessType)) {
      flags.push(`"${typeOption.label}" is listed as a prohibited home occupation under By-law 14-45.`);
      departmentsToContact.push('Planning Department');
    } else if (typeOption.flagWeight > 0) {
      flags.push(`"${typeOption.label}" may require additional permits or health inspections.`);
    }
  }

  // Check operating space
  const spaceQuestion = assessmentQuestions.find((q) => q.id === 'operatingSpace');
  const spaceOption = spaceQuestion?.options?.find((o) => o.value === answers.operatingSpace);
  if (spaceOption) {
    score += spaceOption.flagWeight;
    if (spaceOption.flagWeight > 0) {
      flags.push(`Operating in "${spaceOption.label}" may raise questions about residential character.`);
    }
  }

  // Check floor area
  const areaQuestion = assessmentQuestions.find((q) => q.id === 'floorArea');
  const areaOption = areaQuestion?.options?.find((o) => o.value === answers.floorArea);
  if (areaOption) {
    score += areaOption.flagWeight;
    if (answers.floorArea === '25-35' || answers.floorArea === 'over-35') {
      flags.push('Floor area exceeds or may exceed the 25% limit set by By-law 14-45.');
      departmentsToContact.push('Planning Department');
      recommendations.push('Measure your total floor area and business use area to confirm compliance.');
    }
  }

  // Check employees
  const empQuestion = assessmentQuestions.find((q) => q.id === 'employees');
  const empOption = empQuestion?.options?.find((o) => o.value === answers.employees);
  if (empOption) {
    score += empOption.flagWeight;
    if (answers.employees === '2' || answers.employees === '3-plus') {
      flags.push('Having 2 or more non-resident employees may exceed the limit for home occupations.');
      departmentsToContact.push('Planning Department');
    }
  }

  // Check client visits
  const visitQuestion = assessmentQuestions.find((q) => q.id === 'clientVisits');
  const visitOption = visitQuestion?.options?.find((o) => o.value === answers.clientVisits);
  if (visitOption) {
    score += visitOption.flagWeight;
    if (answers.clientVisits === 'daily') {
      flags.push('Daily client visits may create traffic and parking issues that conflict with residential zoning.');
      recommendations.push('Consider offering virtual consultations or meeting clients at a co-working space.');
    }
  }

  // Check signage
  if (answers.signage) {
    score += 1;
    flags.push('Exterior signage is generally not permitted for home occupations in Grimsby.');
    departmentsToContact.push('Planning Department');
    recommendations.push('Consider digital marketing and an online presence instead of physical signage.');
  }

  // Check parking impact
  if (answers.parkingImpact) {
    score += 1;
    flags.push('Additional parking demand may conflict with residential zoning requirements.');
    departmentsToContact.push('Planning Department');
    recommendations.push('Ensure sufficient off-street parking is available for any business-related vehicles.');
  }

  // Check noise/odor
  if (answers.noiseOdor) {
    score += 1;
    flags.push('Noise, odor, or emissions detectable beyond the property line are not permitted.');
    departmentsToContact.push('Building Department');
    recommendations.push('Investigate soundproofing, ventilation, or operational changes to mitigate nuisances.');
  }

  // Food-specific
  if (answers.businessType === 'food-preparation') {
    departmentsToContact.push('Niagara Region Public Health');
    recommendations.push('Contact Niagara Region Public Health for food handling permits and kitchen inspection requirements.');
  }

  // General recommendations
  if (flags.length === 0) {
    recommendations.push('Your business appears well-suited for home-based operation. Consider registering with the Town.');
    recommendations.push('Explore programs like Starter Company Plus and Digital Main Street for additional support.');
  } else if (flags.length <= 4) {
    recommendations.push('Contact the Planning Department to discuss your specific situation before starting operations.');
    recommendations.push('Many issues can be resolved with minor adjustments or by obtaining the right permits.');
  } else {
    recommendations.push('Your business may not be suitable as a home occupation under current zoning rules.');
    recommendations.push('Consider commercial space options or contact Planning to discuss variance applications.');
    recommendations.push('The Enterprise Centre can help you explore alternative locations and business structures.');
  }

  // Determine eligibility
  let eligibility: 'green' | 'yellow' | 'red';
  if (score <= 2) {
    eligibility = 'green';
  } else if (score <= 4) {
    eligibility = 'yellow';
  } else {
    eligibility = 'red';
  }

  // Deduplicate departments
  const uniqueDepartments = [...new Set(departmentsToContact)];

  return {
    eligibility,
    score,
    flags,
    recommendations,
    departmentsToContact: uniqueDepartments,
  };
}
