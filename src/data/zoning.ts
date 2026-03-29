export interface ZoningRule {
  title: string;
  description: string;
  details: string[];
}

export interface DepartmentContact {
  name: string;
  role: string;
  phone: string;
  email: string;
  when: string[];
}

export interface ComparisonRow {
  criterion: string;
  grimsby: string;
  pickering: string;
  mississauga: string;
  toronto: string;
  princeEdward: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const homeOccupationRules: ZoningRule[] = [
  {
    title: 'Floor Area Limit',
    description: 'The home occupation must not occupy more than 25% of the total gross floor area of the dwelling.',
    details: [
      'Measured as gross floor area including walls and partitions',
      'Applies to the total dwelling, not individual floors',
      'Accessory structures (garages, sheds) are generally not included unless specifically used for the business',
      'Storage of business materials counts toward the 25% limit',
    ],
  },
  {
    title: 'Employee Restrictions',
    description: 'A limited number of non-resident employees may work at the home occupation.',
    details: [
      'Typically limited to 1 non-resident employee on-site at any time',
      'The owner/operator must reside in the dwelling',
      'Remote employees working elsewhere do not count toward this limit',
      'Family members residing in the home are not counted as non-resident employees',
    ],
  },
  {
    title: 'Signage Restrictions',
    description: 'Exterior signage advertising the home occupation is generally not permitted.',
    details: [
      'No exterior signs, banners, or displays advertising the business',
      'The residential character of the property must be maintained',
      'Business vehicles with signage may be parked in the driveway but cannot serve as advertising',
      'Digital and online marketing is recommended as an alternative',
    ],
  },
  {
    title: 'No External Evidence',
    description: 'The home occupation must not be visible or detectable from outside the property.',
    details: [
      'No exterior alterations that change the residential appearance of the dwelling',
      'No outdoor storage of materials, goods, or equipment related to the business',
      'No noise, odor, vibration, smoke, dust, or glare detectable at the property line',
      'Deliveries should not exceed what is normal for a residential property',
    ],
  },
  {
    title: 'Parking & Traffic',
    description: 'The home occupation must not create traffic or parking issues beyond normal residential levels.',
    details: [
      'Client visits should not create a noticeable increase in traffic',
      'Sufficient off-street parking must be available for any business-related vehicles',
      'Commercial vehicles exceeding certain size limits may not be parked at the property',
      'Delivery frequency should not disrupt the neighbourhood',
    ],
  },
  {
    title: 'Prohibited Uses',
    description: 'Certain business types are specifically prohibited as home occupations.',
    details: [
      'Vehicle repair, painting, or body work',
      'Animal hospitals, boarding kennels, or breeding operations',
      'Restaurants, cafes, or food establishments open to the public',
      'Retail stores with walk-in customer traffic',
      'Warehousing, distribution centres, or shipping depots',
      'Any use involving hazardous materials beyond household quantities',
      'Medical or dental offices (in most zones)',
    ],
  },
];

export const departmentContacts: DepartmentContact[] = [
  {
    name: 'Planning Department',
    role: 'Zoning compliance, home occupation permits, by-law interpretation',
    phone: '905-945-9634 ext. 2',
    email: 'planning@grimsby.ca',
    when: [
      'You need to confirm your business type is permitted in your zone',
      'Your floor area usage is close to or exceeds 25%',
      'You want to apply for a zoning variance or minor amendment',
      'You plan to have employees or regular client visits at your home',
    ],
  },
  {
    name: 'Building Department',
    role: 'Building permits, structural changes, safety compliance',
    phone: '905-945-9634 ext. 3',
    email: 'building@grimsby.ca',
    when: [
      'You plan to renovate or modify your home for business use',
      'You need to install commercial-grade equipment',
      'Your business requires changes to electrical, plumbing, or ventilation',
      'You are converting a garage or accessory structure for business use',
    ],
  },
  {
    name: 'Niagara Region Public Health',
    role: 'Food safety permits, health inspections, personal services licensing',
    phone: '905-688-8248 ext. 7330',
    email: 'health@niagararegion.ca',
    when: [
      'Your business involves food preparation, handling, or catering',
      'You offer personal services like hairdressing or aesthetics',
      'You need food handler certification',
      'Your business involves any activity regulated by public health',
    ],
  },
];

export const comparisonData: ComparisonRow[] = [
  {
    criterion: 'Floor Area Limit',
    grimsby: '25% of gross floor area',
    pickering: '25% of dwelling area',
    mississauga: '25% of dwelling unit',
    toronto: '25% of dwelling unit floor area',
    princeEdward: 'Varies by zone, generally 25%',
  },
  {
    criterion: 'Non-Resident Employees',
    grimsby: '1 (typical)',
    pickering: '1',
    mississauga: '1',
    toronto: '1',
    princeEdward: '2',
  },
  {
    criterion: 'Exterior Signage',
    grimsby: 'Not permitted',
    pickering: 'Small nameplate permitted (0.1 m\u00B2)',
    mississauga: 'Not permitted',
    toronto: 'Small sign permitted (0.1 m\u00B2)',
    princeEdward: '1 small sign permitted',
  },
  {
    criterion: 'Client Visits',
    grimsby: 'Limited, no impact on neighbourhood',
    pickering: 'Permitted with restrictions',
    mississauga: 'By appointment only',
    toronto: 'Permitted with restrictions',
    princeEdward: 'Permitted',
  },
  {
    criterion: 'Outdoor Storage',
    grimsby: 'Not permitted',
    pickering: 'Not permitted',
    mississauga: 'Not permitted',
    toronto: 'Not permitted',
    princeEdward: 'Not permitted',
  },
  {
    criterion: 'Registration Required',
    grimsby: 'Business licence required',
    pickering: 'Registration recommended',
    mississauga: 'Business licence required',
    toronto: 'Municipal Licensing required for some',
    princeEdward: 'Business licence required',
  },
  {
    criterion: 'Vehicle Restrictions',
    grimsby: 'Commercial vehicles limited',
    pickering: '1 commercial vehicle',
    mississauga: '1 commercial vehicle',
    toronto: '1 commercial vehicle (limited size)',
    princeEdward: '1 commercial vehicle',
  },
];

export const faqs: FAQ[] = [
  {
    question: 'Do I need a permit to run a business from my home in Grimsby?',
    answer:
      'Yes. Under By-law 14-45, home-based businesses in Grimsby are regulated as "home occupations." You should contact the Planning Department to confirm your business type is permitted in your zone and to obtain any necessary permits or licences. Many low-impact businesses (consulting, freelancing, online retail) are generally permitted as long as they comply with the rules.',
  },
  {
    question: 'What happens if my business exceeds the 25% floor area limit?',
    answer:
      'If your business requires more than 25% of your home\'s total floor area, it may not be classified as a permitted home occupation. You have several options: reduce the business footprint, apply for a minor variance through the Committee of Adjustment, or consider transitioning to a commercial space. The Planning Department can advise on the best path forward.',
  },
  {
    question: 'Can I hire employees to work at my home-based business?',
    answer:
      'Grimsby typically allows one non-resident employee to work on-site. If you need more employees, they would need to work remotely or from another location. For businesses requiring multiple on-site staff, consult the Planning Department about your options.',
  },
  {
    question: 'Can I sell products directly to customers from my home?',
    answer:
      'Online sales and shipping from home are generally fine under zoning rules. However, operating a walk-in retail store from your home is typically not permitted. If you want to sell products in person, consider participating in farmers markets, pop-up events, or the Made in Grimsby directory instead.',
  },
  {
    question: 'What if I prepare food at home for sale?',
    answer:
      'Food-based businesses operating from home must comply with both zoning rules and public health regulations. Contact Niagara Region Public Health for food handler certification requirements and kitchen inspection standards. Ontario\'s food safety regulations apply even if you are selling at farmers markets or online.',
  },
  {
    question: 'Can I put a sign outside my home advertising my business?',
    answer:
      'Under By-law 14-45, exterior signage for home occupations is generally not permitted in Grimsby. Your home must maintain its residential appearance. Instead, invest in a strong online presence, Google Business Profile, and digital marketing to attract customers.',
  },
  {
    question: 'How does Grimsby compare to other Ontario municipalities for home-based business rules?',
    answer:
      'Grimsby\'s rules are broadly similar to other Ontario municipalities. Most limit floor area to 25%, restrict employees to 1 non-resident, and prohibit exterior signage. Grimsby\'s framework is slightly more restrictive on signage than some cities (Toronto and Pickering allow small nameplates), but is otherwise in line with provincial norms. The comparison table in the Zoning Guide provides a detailed breakdown.',
  },
  {
    question: 'What happens if I violate the home occupation rules?',
    answer:
      'Violations of the zoning by-law can result in enforcement action by the Town, potentially including fines and an order to cease the business activity. If a complaint is received, a by-law enforcement officer may investigate. It is always better to confirm compliance proactively by contacting the Planning Department.',
  },
];
