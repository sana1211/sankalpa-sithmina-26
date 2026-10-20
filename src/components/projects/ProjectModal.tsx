import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react';
import { profile, projects, type Project } from '../../data';
import ProjectArtwork from '../ProjectArtwork';
import ProjectScreenshot from './ProjectScreenshot';

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = oldOverflow; window.removeEventListener('keydown', onKey); };
  }, [onClose]);
  return <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="modal-panel" initial={{opacity:0,y:50,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:40,scale:.97}} transition={{duration:.36}}>
      <div className={`modal-visual${project.image ? " modal-visual--screenshot" : ""}`}>{project.image ? <ProjectScreenshot project={project} variant="modal"/> : <ProjectArtwork kind={project.artwork}/>}<button onClick={onClose} className="modal-close" aria-label="Close project details"><X size={21}/></button></div>
      <div className="modal-details"><span className="eyebrow">PROJECT {project.number} / {String(projects.length).padStart(2, '0')} &nbsp; — &nbsp; {project.category.toUpperCase()} &nbsp; / &nbsp; {project.year}</span><h3 id="modal-title">{project.name}</h3><p>{project.description}</p><div className="modal-chips">{project.tech.map(t => <span key={t}>{t}</span>)}</div><div className="modal-actions">{project.demo && <a className="btn-primary" href={project.demo} target="_blank" rel="noreferrer">LIVE EXPERIENCE <span><ExternalLink size={17}/></span></a>}<a className="modal-link" href={project.source || profile.github} target="_blank" rel="noopener noreferrer" title={project.source ? 'Open project source code' : 'Repository link not configured — open GitHub profile'}><Github size={18}/>{project.source ? 'SOURCE CODE' : 'GITHUB PROFILE'}<ArrowUpRight size={16}/></a>{!project.demo && <span className="modal-progress"><span className="availability-light"/> PROJECT SHOWCASE / DEMO COMING SOON</span>}</div></div>
    </motion.div>
  </motion.div>;
}
