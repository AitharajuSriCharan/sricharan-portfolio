import type {
  SkillCategory,
  Project,
  ExperienceItem,
  AchievementItem,
  CertificationItem,
  EducationItem,
} from '../types';

export const PERSONAL_INFO = {
  fullName: 'Aitharaju Sri Charan',
  firstName: 'Sri Charan',
  lastName: 'Aitharaju',
  badge: 'Open to VLSI & ECE Internships',
  headline: 'ECE Student | VLSI & Embedded Systems Enthusiast',
  bio: 'Building at the intersection of hardware and intelligence — from RTL design and FPGA development to real-world embedded and sensor-based systems.',
  profileImage: '/images/profile.jpg',
  academicCard: {
    degree: 'B.Tech ECE',
    institution: 'Anurag University',
    period: '2024–2028',
  },
  aboutText: [
    'I am an Electronics and Communication Engineering student at Anurag University with a strong interest in VLSI design, digital systems, embedded engineering and FPGA-based development. I enjoy combining hardware fundamentals with practical implementation through Verilog, simulation tools, microcontrollers and sensor-based projects.',
    'My goal is to strengthen my RTL design, digital verification and embedded systems skills while building projects that demonstrate engineering fundamentals, practical problem-solving and continuous learning.',
  ],
  stats: [
    { label: 'CGPA', value: '8.49', sub: 'out of 10.0' },
    { label: 'Academic Term', value: '2024–28', sub: 'Undergraduate' },
    { label: 'WRO 2026', value: 'Asia-Pacific', sub: 'Event Volunteer' },
    { label: 'Core Projects', value: '5+', sub: 'Hardware & Embedded' },
  ],
  academicCards: [
    { label: 'Degree', value: 'B.Tech — Electronics and Communication Engineering', icon: 'GraduationCap' },
    { label: 'University', value: 'Anurag University', icon: 'Building2' },
    { label: 'Academic Period', value: '2024–2028', icon: 'Calendar' },
    { label: 'CGPA', value: '8.49 / 10', icon: 'Award' },
    { label: 'Career Interests', value: 'VLSI, Digital Design, FPGA and Embedded Systems', icon: 'Cpu' },
  ],
  socials: {
    github: (import.meta.env.VITE_GITHUB_URL && !import.meta.env.VITE_GITHUB_URL.includes('SriCharanAitharaju')) 
      ? import.meta.env.VITE_GITHUB_URL 
      : 'https://github.com/AitharajuSriCharan',
    linkedin: import.meta.env.VITE_LINKEDIN_URL || '',
    email: (import.meta.env.VITE_EMAIL && !import.meta.env.VITE_EMAIL.includes('example.com')) 
      ? import.meta.env.VITE_EMAIL 
      : 'sricharanaitharaju@gmail.com',
    resume: import.meta.env.VITE_RESUME_URL || 'https://drive.google.com/file/d/1J8blqYIfCdWulH8lvXGUX18DvsWH9o7D/view?usp=drive_link',
  },
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'VLSI and Digital Design',
    iconName: 'Cpu',
    description: 'Hardware description, digital synthesis logic & RTL architecture modeling',
    skills: [
      'Verilog HDL',
      'RTL Design fundamentals',
      'Digital Logic Design',
      'Combinational and Sequential Circuits',
      'Finite State Machines',
      'FPGA Design Fundamentals',
    ],
  },
  {
    title: 'EDA and Simulation Tools',
    iconName: 'Activity',
    description: 'Industry-standard simulation, electronic design automation & mathematical analysis suites',
    skills: [
      'AMD/Xilinx Vivado',
      'Cadence EDA Tools',
      'ModelSim',
      'Multisim',
      'MATLAB',
    ],
  },
  {
    title: 'Programming',
    iconName: 'Code',
    description: 'Languages for embedded firmware, verification scripts, and algorithm implementation',
    skills: [
      'C',
      'Java',
      'Python',
    ],
  },
  {
    title: 'Embedded Systems and IoT',
    iconName: 'CircuitBoard',
    description: 'Microcontroller systems, sensor telemetry, and hardware-in-the-loop prototyping',
    skills: [
      'Arduino',
      'ESP32',
      'Sensor Interfacing',
      'Microcontroller Fundamentals',
      'Tinkercad Simulation',
    ],
  },
  {
    title: 'Engineering Fundamentals',
    iconName: 'Layers',
    description: 'Solid grounding in semiconductor physics, electronic circuits, and digital timing',
    skills: [
      'Semiconductor Fundamentals',
      'CMOS Basics',
      'Circuit Analysis',
      'Digital Electronics',
      'Basic Timing Concepts',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'jalnetra',
    title: 'JalNetra — Smart Water Monitoring System',
    category: 'IoT and Smart Water Management',
    description:
      'An integrated smart water management concept designed to support water monitoring through sensor-based data collection, usage tracking and threshold-based alerts.',
    technologies: ['Arduino', 'IoT', 'Sensors', 'Smart Water Monitoring'],
    achievement: 'Selected for Smart India Hackathon 2025.',
    status: 'Selected',
    image: '/images/jalnetra.svg',
    githubUrl: '',
    viewDetails: {
      overview:
        'JalNetra addresses real-time freshwater monitoring by synchronizing ultrasonic liquid-level detection and parameter telemetry. Developed to automate water threshold supervision with proactive alert mechanisms.',
      keyTakeaways: [
        'Selected for Smart India Hackathon 2025 at the national level',
        'Implemented threshold-triggered alert pipelines for real-time risk minimization',
        'Built sensor data collection with Arduino controller interfaces',
      ],
      technicalHighlights: [
        'Real-time ultrasonic sensing',
        'Microcontroller telemetry integration',
        'Configurable threshold logic engine',
      ],
      hardwareStack: ['Arduino Microcontroller', 'Ultrasonic Transducer', 'Water Level & Flow Sensors', 'Telemetry Interface'],
    },
  },
  {
    id: 'railway-crack-detection',
    title: 'Smart Railway Track Crack Detection System',
    category: 'Embedded Systems',
    description:
      'An Arduino-based railway track crack detection prototype designed and simulated in Tinkercad. The system uses sensor inputs to identify potential track abnormalities and trigger alerts.',
    technologies: ['Arduino', 'IR Sensors', 'Embedded C/C++', 'Tinkercad', 'Alert System'],
    status: 'Completed',
    image: '/images/railway-crack.svg',
    githubUrl: 'https://github.com/AitharajuSriCharan/Railwaytrack-Crack-Detection-System-Using-TinkerCad',
    viewDetails: {
      overview:
        'Designed and simulated in Autodesk Tinkercad to tackle railway safety hazards. Dual infrared transceiver sensors continuously monitor surface reflectance over rail geometries, triggering instant alert mechanisms upon detecting structural discontinuities.',
      keyTakeaways: [
        'Accurately modeled and validated sensor threshold differentials in Tinkercad',
        'Wrote structured Embedded C/C++ firmware for rapid anomaly interrupt handling',
        'Integrated audible/visual alert state machines for immediate technician signaling',
      ],
      technicalHighlights: [
        'IR optical reflectance analysis',
        'Firmware threshold noise filtering',
        'Simulation-backed functional verification',
      ],
      hardwareStack: ['ATmega328P / Arduino UNO', 'IR Sensor Modules', 'Piezo Buzzer & Indicator LEDs', 'Chassis Mechanism'],
    },
  },
  {
    id: 'fingerprint-quality-estimator',
    title: 'Fingerprint Image Quality Estimator',
    category: 'MATLAB and Image Processing',
    description:
      'A MATLAB-based image processing project that evaluates fingerprint image characteristics using measures such as contrast, sharpness and local clarity to estimate image quality.',
    technologies: ['MATLAB', 'Image Processing', 'Image Quality Analysis', 'Biometric Applications'],
    status: 'Completed',
    image: '/images/fingerprint-quality.svg',
    githubUrl: '',
    viewDetails: {
      overview:
        'Evaluates biometric fingerprint ridges through statistical feature extraction in MATLAB. Quantifies spatial contrast gradients, ridge sharpness, and local region clarity to classify sample adequacy prior to feature extraction. Note: Evaluates mathematical image characteristics; not intended as a certified biometric verification standard.',
      keyTakeaways: [
        'Computed spatial gradient vectors and grayscale histograms to determine ridge contrast',
        'Applied 2D filtering techniques to assess local clarity across partitioned fingerprint blocks',
        'Constructed an aggregate quality metric for biometric preprocessing pipelines',
      ],
      technicalHighlights: [
        'Gradient-based sharpness metrics',
        'Block-wise local contrast analysis',
        'MATLAB Image Processing Toolbox workflows',
      ],
      hardwareStack: ['MATLAB Runtime', 'Digital Image Processing Suite', 'Synthetic / Standard Fingerprint Datasets'],
    },
  },
  {
    id: 'plant-stress-monitor',
    title: 'Hardware-Accelerated Edge-AI Plant Stress Monitor',
    category: 'FPGA and Hardware Acceleration',
    description:
      'A project exploring hardware-accelerated plant stress classification using Verilog RTL and FPGA-oriented design, with model development and fixed-point processing concepts.',
    technologies: ['Verilog RTL', 'AMD/Xilinx Vivado', 'Zynq-7000', 'Python', 'Fixed-Point Arithmetic'],
    status: 'In Progress',
    image: '/images/plant-stress.svg',
    githubUrl: '',
    viewDetails: {
      overview:
        'Explores custom digital hardware acceleration on FPGA logic for ultra-low latency agricultural inference. Translates quantized multi-spectral sensory inputs through a fixed-point systolic arithmetic unit developed in Verilog HDL and simulated in AMD/Xilinx Vivado.',
      keyTakeaways: [
        'Actively designing pipelined fixed-point multiply-accumulate (MAC) RTL datapaths in Verilog',
        'Targeting AMD/Xilinx Zynq-7000 SoC architecture for hardware-software co-design',
        'Modeling sensory classification features in Python prior to hardware RTL translation',
      ],
      technicalHighlights: [
        'Custom Verilog HDL RTL architecture',
        'Fixed-point arithmetic quantization (Q-format)',
        'Simulation & timing verification via AMD/Xilinx Vivado',
      ],
      hardwareStack: ['AMD/Xilinx Vivado Design Suite', 'Zynq-7000 FPGA Architecture', 'Verilog HDL Testbenches', 'Python Scikit/NumPy'],
    },
  },
  {
    id: 'esp32-physiological-monitoring',
    title: 'ESP32-Based Physiological Monitoring and Alert System',
    category: 'Embedded Systems & Health Monitoring',
    description:
      'An ESP32-based physiological monitoring system designed to collect health-related sensor readings, display monitoring data, and generate alerts when measured values exceed configurable thresholds. The project explores sensor interfacing, embedded data processing, and real-time health monitoring.',
    technologies: [
      'ESP32',
      'Embedded C/C++',
      'Physiological Sensors',
      'Sensor Interfacing',
      'Real-Time Monitoring',
      'Alert System',
    ],
    status: 'In Progress',
    image: '/images/esp32-physiological.svg',
    githubUrl: '',
    viewDetails: {
      overview:
        'An ESP32-based physiological monitoring system designed to collect health-related sensor readings, display monitoring data, and generate alerts when measured values exceed configurable thresholds. The project explores sensor interfacing, embedded data processing, and real-time health monitoring.',
      keyTakeaways: [
        'Integrated physiological sensor telemetry with ESP32 dual-core processing',
        'Implemented digital noise filtering and real-time threshold comparison routines in Embedded C/C++',
        'Built automated anomaly alert states triggering visual indicators and audible alarms',
      ],
      technicalHighlights: [
        'Real-time physiological sensor data collection',
        'Configurable threshold logic engine & anomaly interrupts',
        'Embedded C/C++ firmware on ESP32 microcontroller',
      ],
      hardwareStack: ['ESP32 Dev Module', 'Physiological Pulse/Oximetry Sensor', 'I2C Telemetry Screen', 'Threshold Alert Circuit'],
    },
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'kriya-club',
    role: 'Joint Secretary',
    organization: 'Kriya Event Management Club',
    period: 'University Term',
    description:
      'Contributed to university event planning, coordination and execution, including support for large student and corporate-facing events.',
    iconName: 'Users',
    tag: 'Leadership & Event Management',
    selectedEvents: [
      {
        name: 'WRO Asia-Pacific 2026',
        year: '2026',
        role: 'Event Team Volunteer',
        description:
          'Volunteered as part of the event team, contributing to event coordination and on-ground operations.',
      },
      {
        name: 'Mind Expo 2026',
        year: '2026',
        role: 'Event Volunteer (via Kriya)',
        description:
          'Volunteered through Kriya, supporting event execution, coordination, and participant management.',
      },
    ],
  },
  {
    id: 'vlsi-club',
    role: 'Member',
    organization: 'VLSI Club',
    period: 'Undergraduate Term',
    description:
      'Participated in VLSI-related learning activities and workshops, including a Cadence VLSI design flow workshop.',
    iconName: 'Cpu',
    tag: 'Technical Club',
  },
  {
    id: 'nss',
    role: 'Member',
    organization: 'NSS (National Service Scheme)',
    period: 'Undergraduate Term',
    description:
      'Participated in university community and volunteering activities.',
    iconName: 'HeartHandshake',
    tag: 'Community Volunteering',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'jee-advanced',
    title: 'Qualified JEE Advanced 2023',
    year: '2023',
    description:
      'Successfully cleared the prestigious Joint Entrance Examination (JEE) Advanced, ranking among the top engineering aspirants in India.',
    badge: 'National Examination',
    iconName: 'Award',
  },
  {
    id: 'wro-2026',
    title: 'WRO Asia-Pacific 2026',
    year: '2026',
    description:
      'Contributed as part of the event team to the international World Robot Olympiad (WRO) Asia-Pacific 2026, assisting in competition operations and team coordination.',
    badge: 'International Robotics Event',
    iconName: 'Trophy',
  },
  {
    id: 'sakshi-bee',
    title: 'Co-organized Sakshi Spell Bee and Math Bee',
    year: '2026',
    description:
      'Co-organized Sakshi Spell Bee and Math Bee events in 2026, facilitating logistics, volunteer management, and smooth competitive sessions.',
    badge: 'Event Organization',
    iconName: 'CheckCircle2',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'arduino-embedded-workshop',
    title: 'Arduino and Embedded Systems Workshop',
    organizer: 'Anurag University / Department of ECE',
    description:
      'Comprehensive hands-on workshop covering microcontroller architecture, GPIO interfacing, sensor data acquisition, and embedded prototyping.',
    category: 'Embedded Systems',
  },
  {
    id: 'cadence-vlsi-workshop',
    title: 'Cadence VLSI Design Flow Workshop',
    organizer: 'VLSI Club / Industry Partner',
    description:
      'Specialized workshop introducing Cadence EDA tools, digital design methodologies, RTL synthesis concepts, and ASIC physical design flow principles.',
    category: 'VLSI & EDA Tools',
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'btech-ece',
    degree: 'B.Tech — Electronics and Communication Engineering',
    institution: 'Anurag University, Hyderabad',
    period: '2024–2028',
    score: '8.49',
    scoreType: 'CGPA (out of 10.0)',
    details:
      'Specializing in VLSI Design, Digital Electronics, RTL Verification, Embedded Microcontrollers, and Signal Processing.',
    highlights: [
      'Active member of the VLSI Club and Kriya Event Management Club',
      'Consistent academic standing with 8.49 CGPA',
      'Hands-on laboratory work in Digital Logic, Multisim, and Vivado',
    ],
  },
  {
    id: 'class-xii',
    degree: 'Class XII (Senior Secondary / Intermediate)',
    period: 'Completed',
    score: '80.2%',
    scoreType: 'Final Aggregate',
    details: 'Focus on Mathematics, Physics, and Chemistry (MPC stream).',
  },
  {
    id: 'class-x',
    degree: 'Class X (Secondary School Certificate)',
    period: 'Completed',
    score: '95%',
    scoreType: 'Final Aggregate',
    details: 'Graduated with outstanding academic distinction across core sciences and mathematics.',
  },
];
