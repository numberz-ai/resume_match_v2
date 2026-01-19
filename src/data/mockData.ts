import { Candidate, AuditLog, BiasMetric, Job } from '../types';

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Machine Learning Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA (Hybrid)',
    type: 'full-time',
    level: 'senior',
    status: 'open',
    openings: 2,
    postedDate: '2025-10-15',
    description: 'We are looking for an experienced ML Engineer to lead our AI initiatives and build cutting-edge machine learning systems.',
    requirements: [
      'Ph.D. or M.S. in Computer Science, Machine Learning, or related field',
      '5+ years of experience in production ML systems',
      'Strong programming skills in Python and experience with TensorFlow or PyTorch',
      'Experience with NLP and Computer Vision',
      'Published research papers or open-source contributions preferred'
    ],
    responsibilities: [
      'Design and implement machine learning models for production',
      'Lead research initiatives and mentor junior engineers',
      'Collaborate with product teams to identify ML opportunities',
      'Optimize model performance and scalability'
    ],
    benefits: ['Health Insurance', 'Stock Options', 'Unlimited PTO', '401k Match'],
    salaryRange: {
      min: 180000,
      max: 250000,
      currency: 'USD'
    },
    hiringTeam: {
      hiringManager: 'John Smith',
      recruiters: ['Jane Doe', 'Mike Wilson']
    },
    pipeline: {
      new: 12,
      screening: 8,
      interview: 5,
      offer: 2,
      hired: 0,
      rejected: 15
    },
    candidateIds: ['1', '3', '5', '7', '8'],
    createdBy: 'John Smith',
    updatedAt: '2025-11-08'
  },
  {
    id: 'job-2',
    title: 'Full Stack Engineering Lead',
    department: 'Engineering',
    location: 'Austin, TX (Remote)',
    type: 'full-time',
    level: 'lead',
    status: 'open',
    openings: 1,
    postedDate: '2025-10-20',
    description: 'Seeking a technical leader to build and scale our full-stack engineering team.',
    requirements: [
      '10+ years of software engineering experience',
      'Strong expertise in React, Node.js, and TypeScript',
      '3+ years of team leadership experience',
      'Experience with cloud platforms (AWS/GCP)',
      'Strong system design and architecture skills'
    ],
    responsibilities: [
      'Lead a team of 8-10 engineers',
      'Drive technical architecture and best practices',
      'Mentor and develop engineering talent',
      'Collaborate with product and design teams'
    ],
    salaryRange: {
      min: 200000,
      max: 280000,
      currency: 'USD'
    },
    hiringTeam: {
      hiringManager: 'Sarah Williams',
      recruiters: ['Jane Doe']
    },
    pipeline: {
      new: 8,
      screening: 6,
      interview: 3,
      offer: 1,
      hired: 0,
      rejected: 10
    },
    candidateIds: ['2', '4', '6'],
    createdBy: 'Sarah Williams',
    updatedAt: '2025-11-09'
  },
  {
    id: 'job-3',
    title: 'Mobile Engineering Lead',
    department: 'Mobile',
    location: 'Seattle, WA (Hybrid)',
    type: 'full-time',
    level: 'lead',
    status: 'open',
    openings: 1,
    postedDate: '2025-10-25',
    description: 'Join us to lead mobile development across iOS and Android platforms.',
    requirements: [
      '8+ years of mobile development experience',
      'Expert in iOS (Swift) and/or Android (Kotlin)',
      'Experience with React Native',
      'App Store and Play Store management experience',
      'Leadership experience managing mobile teams'
    ],
    responsibilities: [
      'Lead mobile architecture and development',
      'Manage App Store releases and optimization',
      'Build and mentor mobile engineering team',
      'Define mobile development best practices'
    ],
    salaryRange: {
      min: 190000,
      max: 260000,
      currency: 'USD'
    },
    hiringTeam: {
      hiringManager: 'Michael Chen',
      recruiters: ['Mike Wilson']
    },
    pipeline: {
      new: 5,
      screening: 4,
      interview: 2,
      offer: 1,
      hired: 0,
      rejected: 6
    },
    candidateIds: ['4', '9'],
    createdBy: 'Michael Chen',
    updatedAt: '2025-11-07'
  },
  {
    id: 'job-4',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Boston, MA (Remote)',
    type: 'full-time',
    level: 'mid',
    status: 'open',
    openings: 3,
    postedDate: '2025-11-01',
    description: 'Help us build and scale our cloud infrastructure.',
    requirements: [
      '3+ years of DevOps/SRE experience',
      'Strong experience with AWS and Kubernetes',
      'Infrastructure as Code (Terraform/CloudFormation)',
      'CI/CD pipeline experience',
      'Monitoring and observability tools'
    ],
    responsibilities: [
      'Manage cloud infrastructure and deployments',
      'Build and maintain CI/CD pipelines',
      'Implement monitoring and alerting systems',
      'Ensure system reliability and security'
    ],
    salaryRange: {
      min: 130000,
      max: 170000,
      currency: 'USD'
    },
    hiringTeam: {
      hiringManager: 'Lisa Anderson',
      recruiters: ['Jane Doe', 'Mike Wilson']
    },
    pipeline: {
      new: 15,
      screening: 10,
      interview: 4,
      offer: 1,
      hired: 0,
      rejected: 8
    },
    candidateIds: ['5', '10'],
    createdBy: 'Lisa Anderson',
    updatedAt: '2025-11-10'
  },
  {
    id: 'job-5',
    title: 'Product Designer',
    department: 'Design',
    location: 'New York, NY (Hybrid)',
    type: 'full-time',
    level: 'senior',
    status: 'open',
    openings: 1,
    postedDate: '2025-10-28',
    description: 'Create beautiful and intuitive user experiences for our products.',
    requirements: [
      '5+ years of product design experience',
      'Strong portfolio demonstrating UX/UI skills',
      'Experience with Figma and design systems',
      'User research and testing experience',
      'Excellent communication skills'
    ],
    responsibilities: [
      'Lead design for core product features',
      'Conduct user research and usability testing',
      'Build and maintain design system',
      'Collaborate with engineering and product teams'
    ],
    salaryRange: {
      min: 140000,
      max: 190000,
      currency: 'USD'
    },
    hiringTeam: {
      hiringManager: 'Emma Thompson',
      recruiters: ['Jane Doe']
    },
    pipeline: {
      new: 10,
      screening: 6,
      interview: 3,
      offer: 0,
      hired: 0,
      rejected: 12
    },
    candidateIds: [],
    createdBy: 'Emma Thompson',
    updatedAt: '2025-11-06'
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Dr. Sarah Anderson',
    title: 'Senior Machine Learning Engineer',
    location: 'Chicago, IL',
    email: 'sarah.anderson@email.com',
    phone: '+1 (312) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjQ4Mzg5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    experience: 8,
    education: 'Ph.D. in Computer Science, University of Chicago',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'PyTorch', 'Research', 'NLP', 'Computer Vision', 'Distributed Systems'],
    resumeUrl: '/resume-sample.pdf',
    status: 'screening',
    matchScore: 94,
    appliedDate: '2025-11-05',
    linkedIn: 'linkedin.com/in/sarahanderson',
    github: 'github.com/sarahanderson',
    stackoverflow: 'stackoverflow.com/users/sarahanderson',
    medium: 'medium.com/@sarahanderson',
    summary: 'Ph.D. in CS with 8+ years of experience building production ML systems. Published researcher with 15+ papers in top-tier conferences. Strong background in NLP and computer vision.',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    title: 'Full Stack Developer & Team Lead',
    location: 'Chicago, IL',
    email: 'marcus.j@email.com',
    phone: '+1 (312) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI0ODgxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    experience: 12,
    education: 'B.S. in Software Engineering, Northwestern University',
    skills: ['React', 'Node.js', 'TypeScript', 'Leadership', 'AWS', 'GraphQL', 'Docker', 'Kubernetes', 'Team Management'],
    resumeUrl: '/resume-sample.pdf',
    status: 'interview',
    matchScore: 89,
    appliedDate: '2025-11-03',
    linkedIn: 'linkedin.com/in/marcusjohnson',
    github: 'github.com/marcusj',
    website: 'marcusjohnson.dev',
    summary: 'Seasoned full-stack developer with proven leadership experience. Led teams of 5-10 engineers across multiple successful product launches. Strong focus on scalable architecture.',
  },
  {
    id: '3',
    name: 'Jennifer Thompson',
    title: 'Senior Backend Engineer',
    location: 'Chicago, IL',
    email: 'jennifer.thompson@email.com',
    phone: '+1 (312) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1758599543120-4e462429a4d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2MjQ3ODM0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    experience: 6,
    education: 'M.S. in Computer Science, University of Illinois at Chicago',
    skills: ['Go', 'Python', 'Microservices', 'Kubernetes', 'PostgreSQL', 'Redis', 'System Design', 'API Design'],
    resumeUrl: '/resume-sample.pdf',
    status: 'new',
    matchScore: 87,
    appliedDate: '2025-11-06',
    linkedIn: 'linkedin.com/in/jenniferthompson',
    github: 'github.com/jenniferthompson',
    stackoverflow: 'stackoverflow.com/users/jenniferthompson',
    summary: 'Backend specialist with extensive experience in building high-throughput distributed systems. Open source contributor to several major Go projects.',
  },
  {
    id: '4',
    name: 'Alex Rivera',
    title: 'Mobile Engineering Lead',
    location: 'Chicago, IL',
    email: 'alex.rivera@email.com',
    phone: '+1 (312) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2MjUxNzIxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    experience: 10,
    education: 'B.S. in Computer Science, DePaul University',
    skills: ['iOS', 'Android', 'React Native', 'Swift', 'Kotlin', 'App Store Optimization', 'CI/CD', 'Mobile Architecture'],
    resumeUrl: '/resume-sample.pdf',
    status: 'offer',
    matchScore: 92,
    appliedDate: '2025-10-28',
    linkedIn: 'linkedin.com/in/alexrivera',
    github: 'github.com/alexrivera',
    summary: 'Mobile engineering leader with 10+ years shipping apps to millions of users. Expert in App Store and Play Store management, optimization, and mobile best practices.',
  },
  {
    id: '5',
    name: 'David Williams',
    title: 'DevOps Engineer',
    location: 'Chicago, IL',
    email: 'david.williams@email.com',
    phone: '+1 (312) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MjQyNTA0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    experience: 5,
    education: 'B.S. in Information Systems, Illinois Institute of Technology',
    skills: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring', 'Security', 'Linux'],
    resumeUrl: '/resume-sample.pdf',
    status: 'screening',
    matchScore: 78,
    appliedDate: '2025-11-04',
    linkedIn: 'linkedin.com/in/davidwilliams',
    github: 'github.com/davidwilliams',
    summary: 'DevOps engineer focused on infrastructure automation and security. Previously worked at government contractor managing classified systems.',
  },
  {
    id: '6',
    name: 'Emily Davis',
    title: 'Product Designer with Frontend Skills',
    location: 'Chicago, IL',
    email: 'emily.davis@email.com',
    phone: '+1 (312) 678-9012',
    avatar: 'https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MjQ4NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    experience: 7,
    education: 'BFA in Interaction Design, School of the Art Institute of Chicago',
    skills: ['UI/UX Design', 'Figma', 'React', 'CSS', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility'],
    resumeUrl: '/resume-sample.pdf',
    status: 'new',
    matchScore: 71,
    appliedDate: '2025-11-07',
    linkedIn: 'linkedin.com/in/emilydavis',
    website: 'emilydavis.design',
    medium: 'medium.com/@emilydavis',
    summary: 'Product designer with strong frontend development skills. Passionate about accessibility and inclusive design. Regular contributor to design system open source projects.',
  },
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2025-11-07T10:30:00Z',
    action: 'Semantic Search',
    user: 'recruiter@company.com',
    details: 'Searched for "machine learning PhD research experience"',
    category: 'search',
  },
  {
    id: '2',
    timestamp: '2025-11-07T10:28:00Z',
    action: 'View Candidate',
    user: 'recruiter@company.com',
    candidateId: '1',
    candidateName: 'Dr. Sarah Anderson',
    details: 'Viewed candidate profile and AI insights',
    category: 'view',
  },
  {
    id: '3',
    timestamp: '2025-11-07T10:25:00Z',
    action: 'Status Change',
    user: 'recruiter@company.com',
    candidateId: '2',
    candidateName: 'Marcus Johnson',
    details: 'Changed status from "screening" to "interview"',
    category: 'status_change',
  },
  {
    id: '4',
    timestamp: '2025-11-07T10:20:00Z',
    action: 'AI Chat',
    user: 'recruiter@company.com',
    candidateId: '4',
    candidateName: 'Alex Rivera',
    details: 'Asked AI: "What training would this candidate need?"',
    category: 'ai_interaction',
  },
  {
    id: '5',
    timestamp: '2025-11-07T10:15:00Z',
    action: 'Export Data',
    user: 'recruiter@company.com',
    details: 'Exported candidate list to CSV (15 candidates)',
    category: 'export',
  },
];

export const mockBiasMetrics: BiasMetric[] = [
  {
    category: 'Gender Distribution',
    score: 48,
    status: 'good',
    description: 'Candidate pool shows balanced gender representation (52% male, 48% female)',
    recommendations: ['Continue monitoring to maintain balance', 'Review job descriptions for gendered language'],
  },
  {
    category: 'Age Diversity',
    score: 72,
    status: 'warning',
    description: 'Slight bias toward younger candidates (avg age: 32)',
    recommendations: [
      'Review screening criteria for age-related bias',
      'Consider experience requirements vs. years of experience',
      'Ensure job postings appeal to all age groups',
    ],
  },
  {
    category: 'Geographic Diversity',
    score: 85,
    status: 'good',
    description: 'Strong geographic diversity across candidate pool',
    recommendations: ['Maintain current sourcing strategies', 'Consider underrepresented regions'],
  },
  {
    category: 'Educational Background',
    score: 64,
    status: 'warning',
    description: 'Potential bias toward candidates from top-tier universities',
    recommendations: [
      'Review if university prestige is necessary for role',
      'Focus on skills and achievements over institution names',
      'Consider alternative education paths and bootcamps',
    ],
  },
  {
    category: 'Name-Based Bias Detection',
    score: 91,
    status: 'good',
    description: 'No detectable bias based on name ethnicity in screening process',
    recommendations: ['Continue blind review practices', 'Regular audits recommended'],
  },
];