import { useState, type CSSProperties } from 'react';
import {
  Braces, Boxes, Compass, FileJson2, Layers3, MonitorSmartphone, MousePointerClick,
  Palette, PenTool, Route, Sparkles, Workflow,
} from 'lucide-react';

type Brand = { asset: string; color: string; devicon?: string };

const brandLogos: Record<string, Brand> = {
  'React.js': { asset: 'react', color: '#61DAFB' },
  'Next.js': { asset: 'nextjs', color: '#f2f2f2', devicon: 'nextjs/nextjs-original.svg' },
  'TypeScript': { asset: 'typescript', color: '#3178C6', devicon: 'typescript/typescript-original.svg' },
  'JavaScript': { asset: 'javascript', color: '#F7DF1E' },
  'Tailwind CSS': { asset: 'tailwindcss', color: '#38BDF8', devicon: 'tailwindcss/tailwindcss-original.svg' },
  'HTML5': { asset: 'html5', color: '#E34F26' },
  'CSS3': { asset: 'css3', color: '#1572B6' },
  'Motion': { asset: 'motion', color: '#b4a3ff', devicon: 'framermotion/framermotion-original.svg' },
  'Node.js': { asset: 'nodejs', color: '#8CC84B' },
  'Express.js': { asset: 'express', color: '#f2f2f2', devicon: 'express/express-original.svg' },
  'Python': { asset: 'python', color: '#4B8BBE' },
  'MongoDB': { asset: 'mongodb', color: '#47A248', devicon: 'mongodb/mongodb-original.svg' },
  'PostgreSQL': { asset: 'postgresql', color: '#5395B9', devicon: 'postgresql/postgresql-original.svg' },
  'Figma': { asset: 'figma', color: '#FF7262' },
  'Git': { asset: 'git', color: '#F05032' },
  'GitHub': { asset: 'github', color: '#E7E7EB' },
  'Vite': { asset: 'vite', color: '#A867FF', devicon: 'vitejs/vitejs-original.svg' },
  'VS Code': { asset: 'vscode', color: '#24A9F2', devicon: 'vscode/vscode-original.svg' },
  'Adobe Photoshop': { asset: 'photoshop', color: '#31A8FF', devicon: 'photoshop/photoshop-original.svg' },
  'React Native': { asset: 'react-native', color: '#61DAFB' },
};

const conceptIcons = {
  'REST APIs': Route,
  'Wireframing': PenTool,
  'Prototyping': MousePointerClick,
  'Responsive Design': MonitorSmartphone,
  'Design Systems': Layers3,
  'UI Animations': Sparkles,
} as const;

const conceptColors: Record<string, string> = {
  'REST APIs': '#f8c671',
  'Wireframing': '#e1adff',
  'Prototyping': '#ffadba',
  'Responsive Design': '#96dcf4',
  'Design Systems': '#b8adfa',
  'UI Animations': '#f9c46c',
};

/** Logo assets are public SVG files; no icon-font dependency is needed. */
export function SkillLogo({ name }: { name: string }) {
  const brand = brandLogos[name];
  const [remoteFailed, setRemoteFailed] = useState(false);
  const color = brand?.color ?? conceptColors[name] ?? '#bda7ff';
  const style = { '--skill-brand': color } as CSSProperties;

  if (brand) {
    // Prefer original Devicon marks for brands missing from the locally bundled Font Awesome set.
    // Local vectors are fallbacks so the skill remains visible even when the CDN is blocked.
    const url = brand.devicon && !remoteFailed
      ? `https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/${brand.devicon}`
      : `${import.meta.env.BASE_URL}skill-logos/${brand.asset}.svg`;
    // Next.js, Express and Motion originals can be dark; invert their CDN artwork on the dark UI.
    const makeLight = Boolean(brand.devicon && !remoteFailed && ['Next.js', 'Express.js', 'Motion'].includes(name));
    return (
      <span className="skill-logo" style={style} aria-hidden="true">
        <img src={url} alt="" width="36" height="36" loading="lazy" decoding="async" style={makeLight ? { filter: 'brightness(0) invert(1)' } : undefined} onError={() => setRemoteFailed(true)} />
      </span>
    );
  }

  const Concept = conceptIcons[name as keyof typeof conceptIcons] ?? (name.includes('API') ? FileJson2 : name.includes('Design') ? Palette : name.includes('System') ? Boxes : name.includes('Motion') ? Workflow : name.includes('CSS') ? Braces : Compass);
  return <span className="skill-logo skill-logo-concept" style={style} aria-hidden="true"><Concept size={30} strokeWidth={1.6} /></span>;
}
