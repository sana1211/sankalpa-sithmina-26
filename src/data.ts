// ✏️ EDIT YOUR PORTFOLIO CONTENT HERE
export const profile = {
  firstName: 'Sankalpa',
  fullName: 'Sankalpa Sithmina',
  role: 'Creative Developer & UI/UX Designer',
  email: 'sankalpasithmina18@gmail.com',
  location: 'Anuradhapura, Sri Lanka',
  availability: 'Open to exciting opportunities',
  github: 'https://github.com/sana1211',
  linkedin: 'https://www.linkedin.com/in/sankalpa-sithmina',
  // Replace public/resume.pdf with your final CV before publishing.
  resume: './W.M.Sankalpa Sithmina.pdf',
};

// Project filters are ordered here. Work.tsx only displays categories with projects.
export const projectCategories = [
  'Web Development',
  'Web Applications',
  'Desktop Applications',
  'IoT & Embedded Systems',
] as const;
export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectArtwork = 'travel' | 'agri' | 'vogue' | 'wedding' | 'arduino' | 'gallery' | 'passport' | 'management';

export interface Project {
  id: string;
  number: string;
  name: string;
  eyebrow: string;
  description: string;
  year: string;
  category: ProjectCategory;
  artwork: ProjectArtwork;
  tech: string[];
  demo?: string;
  source?: string;
  featured?: boolean;
  image?: string; // Original project screenshot stored under public/projects/
}

export const projects: Project[] = [
  {
    id: 'lanka-odyssey',
    number: '01',
    name: 'Lanka Odyssey',
    eyebrow: 'EXPLORE. DISCOVER. EXPERIENCE.',
    description: 'A premium Sri Lanka travel website showcasing iconic destinations, curated tour packages, interactive day-by-day itineraries, destination galleries and essential travel guides.',
    year: '2026',
    category: 'Web Development',
    artwork: 'travel',
    image: 'projects/lanka-odyssey.png',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
    demo: 'https://sana1211.github.io/srilanka-travel/',
    source: 'https://github.com/sana1211/srilanka-travel',
    featured: true,
  },
  {
    id: 'karoma-coffee',
    number: '02',
    name: 'Premium Coffee Shop Website',
    eyebrow: 'KAROMA — SPECIALTY COFFEE & ROASTERS.',
    description: 'A cinematic coffee shop experience with an interactive menu, customizable drinks, cart and checkout interface, reservation forms, order tracking and location information.',
    year: '2026',
    category: 'Web Development',
    artwork: 'vogue',
    image: 'projects/karoma-coffee.png',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
    demo: 'https://sana1211.github.io/karoma-coffee/',
    source: 'https://github.com/sana1211/karoma-coffee',
    featured: true,
  },
  {
    id: 'wedding-gallery',
    number: '03',
    name: 'Wedding Gallery Celebration Story',
    eyebrow: 'EVERY MOMENT, BEAUTIFULLY REMEMBERED.',
    description: 'An elegant wedding celebration website with the couple’s story, timeline, photo gallery, cherished memories, guestbook and event details.',
    year: '2026',
    category: 'Web Development',
    artwork: 'wedding',
    image: 'projects/wedding-gallery.png',
    tech: ['React', 'Responsive Design', 'Gallery', 'Animations'],
    demo: 'https://sana1211.github.io/wedding-gallery-celebration',
    source: 'https://github.com/sana1211/wedding-gallery-celebration',
    featured: true,
  },
  {
    id: 'wedding-invitation',
    number: '04',
    name: 'Wedding Invitation Website',
    eyebrow: 'A DIGITAL INVITATION TO REMEMBER.',
    description: 'A modern, responsive wedding invitation with an elegant opening screen, ceremony details, live countdown, RSVP experience and smooth animations.',
    year: '2026',
    category: 'Web Development',
    artwork: 'wedding',
    image: 'projects/wedding-invitation.png',
    tech: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    demo: 'https://sana1211.github.io/Wedding-invitation/',
    source: 'https://github.com/sana1211/Wedding-invitation',
  },
  
  {
    id: 'automatic-plant-watering',
    number: '05',
    name: 'Automatic Plant Watering System',
    eyebrow: 'SMART IRRIGATION. GREENER TOMORROW.',
    description: 'An Arduino-powered smart irrigation system that automatically monitors soil moisture and controls a 12V water pump through a relay module. Features real-time moisture monitoring, an I2C LCD status display, and intelligent watering automation to support efficient water usage and healthier plant growth.',
    year: '2026',
    category: 'IoT & Embedded Systems',
    artwork: 'arduino',
    image: 'projects/automatic-plant-watering.png',
    tech: ['Arduino UNO','Embedded C++','Soil Moisture Sensor','I2C LCD','Relay Module','IoT'],
    source: 'https://github.com/sana1211/Automatic_Plant_Watering_System',
  },

  {
    id: 'wallpaper-download-gallery',
    number: '06',
    name: 'Wallpaper Download Gallery',
    eyebrow: 'EXPLORE. DISCOVER. DOWNLOAD.',
    description: 'A visually engaging wallpaper gallery designed to showcase a curated collection of high-quality wallpapers. Features a clean image-grid layout, immersive visual browsing, and a simple download-focused experience for discovering unique digital artwork.',
    year: '2026',
    category: 'Web Applications',
    artwork: 'gallery',
    image: 'projects/wallpaper-gallery.png',
    tech: ['HTML', 'CSS', 'JavaScript'],
    // Add a live demo or repository link here after publishing this project.
  },
  {
    id: 'e-passport-sri-lanka',
    number: '07',
    name: 'E-Passport Sri Lanka',
    eyebrow: 'SIMPLIFYING PASSPORT SERVICES DIGITALLY.',
    description: 'A digital passport service portal prototype designed to simplify the application experience in Sri Lanka. Features an intuitive dashboard, passport application and renewal sections, appointment booking interface, application status tracking, and service information.',
    year: '2026',
    category: 'Web Applications',
    artwork: 'passport',
    image: 'projects/e-passport-sri-lanka.png',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  },
  {
    id: 'employee-management-system',
    number: '08',
    name: 'Employee Management System',
    eyebrow: 'SIMPLIFYING WORKFORCE MANAGEMENT.',
    description: 'A desktop-based employee management application designed to streamline everyday HR administration. Features an interactive dashboard, employee record management, active and inactive employee statistics, salary administration, and a structured interface for efficient workforce management.',
    year: '2025',
    category: 'Desktop Applications',
    artwork: 'management',
    image: 'projects/employee-management.png',
    tech: ['C#', '.NET', 'Windows Forms', 'SQL Server'],
  },
];

export const skills = [
  'REACT', 'TYPESCRIPT', 'NEXT.JS', 'TAILWIND CSS', 'UI / UX', 'FIGMA',
  'MOTION DESIGN', 'NODE.JS', 'PYTHON', 'MONGODB', 'GITHUB', 'RESPONSIVE DESIGN',
];


// EDUCATION: Edit these records with your exact dates, institutions and credentials.
// Dates have been omitted rather than inventing a graduation year.
export const education = [
  {
    id: 'bit',
    qualification: 'Bachelor of Information Technology (BIT)',
    institution: 'University of Moratuwa',
    status: 'IN PROGRESS',
    kind: 'UNDERGRADUATE DEGREE',
    description: 'Pursuing a foundation in software development, computing concepts and modern information technology.',
  },
  {
    id: 'aviation',
    qualification: 'G.C.E. Advanced Level (A/L) Examination',
    institution: 'Walisinghe Harischandra College, Anuradhapura',
    status: 'COMPLETED',
    kind: 'UPPER SECONDARY EDUCATION',
    description: 'Completed the G.C.E. Advanced Level examination under the Sri Lankan national education system.',
  },
  {
    id: 'gds',
    qualification: 'G.C.E. Ordinary Level (O/L) Examination',
    institution: 'Walisinghe Harischandra College, Anuradhapura',
    status: 'COMPLETED',
    kind: 'SECONDARY EDUCATION',
    description: 'Completed the G.C.E. Ordinary Level examination under the Sri Lankan national education system.',
  },
] as const;

// SKILLS: Curated by category. Add or remove technologies that match your experience.
export const skillGroups = [
  {
    id: 'frontend',
    number: '01',
    label: 'Frontend Development',
    description: 'Fast, polished, responsive web experiences and interactive frontend applications.',
    items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'Motion'],
  },
  {
    id: 'backend',
    number: '02',
    label: 'Backend & Data',
    description: 'APIs, application logic, data integrations and persistent storage.',
    items: ['Node.js', 'Express.js', 'Python', 'MongoDB', 'PostgreSQL', 'REST APIs'],
  },
  {
    id: 'design',
    number: '03',
    label: 'UI / UX Design',
    description: 'User-centered interfaces with considered visual systems and thoughtful interaction design.',
    items: ['Figma', 'Wireframing', 'Prototyping', 'Responsive Design', 'Design Systems', 'UI Animations'],
  },
  {
    id: 'tools',
    number: '04',
    label: 'Creative Tools',
    description: 'A practical workflow for design, collaboration, experimentation and shipping.',
    items: ['Git', 'GitHub', 'Vite', 'VS Code', 'Adobe Photoshop', 'React Native'],
  },
] as const;


// CERTIFICATES GALLERY — these are qualifications already listed above.
// Real certificate images/PDFs have NOT been uploaded, so file is left empty.
// 1. Put each image or PDF into public/certificates/.
// 2. Set file: 'certificates/your-document.pdf' (or .png/.jpg/.webp).
// 3. The Preview and Download actions become available automatically.
// Add more records only for qualifications you actually earned.
export interface CertificateEntry {
  id: string;
  title: string;
  type: 'Diploma' | 'Professional Certification' | 'Course' | 'Online Learning Certificate';
  description: string;
  institution?: string;
  issued?: string;
  file?: string;
}

export const certificates: CertificateEntry[] = [
  {
    id: 'ticketing-diploma',
  title: 'Diploma in Ticketing, Reservations & Marketing',
  type: 'Diploma',
  description: 'Successfully completed a professional diploma with Distinction, gaining knowledge in airline ticketing, reservation procedures, travel operations, and aviation marketing.',
  institution: 'International Airline and Aviation College (IAAC)',
  file: 'certificates/iaac.jpg',
  },
  {
    id: 'gds-training',
  title: 'Sri Lanka Computer Competency Licence',
  type: 'Professional Certification',
  description: 'Successfully completed computer competency training, developing foundational skills in information technology, computer applications, digital literacy, and essential computing operations.',
  institution: 'Ranaviru Information Technology Training Institute',
  file: 'certificates/computer.jpg',
  },
  {
    id: 'gds-training',
  title: 'Web Design for Beginners',
  type: 'Online Learning Certificate',
  description: 'Participated in a university-led online learning programme covering introductory web design concepts, website structure, and fundamental principles of web development.',
  institution: 'University of Moratuwa - CODL',
  file: 'certificates/web.jpg',
  },
    {
    id: 'gds-training',
  title: 'Python for Beginners',
  type: 'Online Learning Certificate',
  description: 'Participated in a university-led Python programming programme introducing programming fundamentals, computational thinking, and basic problem-solving techniques using Python.',
  institution: 'University of Moratuwa - CODL',
  file: 'certificates/python.jpg',
  },
];
