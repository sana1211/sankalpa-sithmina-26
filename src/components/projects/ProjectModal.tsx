import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react';
import { profile, projects, type Project } from '../../data';

/**
 * Details-only project popup. The project screenshot is intentionally shown
 * only on the portfolio gallery card, not again when that card is clicked.
 */
export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="modal-panel modal-panel--details-only"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        <div className="modal-details-header">
          <span className="modal-details-kicker">
            <span className="modal-details-indicator" aria-hidden="true" />
            PROJECT OVERVIEW
          </span>
          <button
            type="button"
            onClick={onClose}
            className="modal-close modal-close--inline"
            aria-label="Close project details"
          >
            <X size={21} />
          </button>
        </div>

        <div className="modal-details">
          <span className="eyebrow">
            PROJECT {project.number} / {String(projects.length).padStart(2, '0')}
            {' — '}{project.category.toUpperCase()} {' / '}{project.year}
          </span>
          <h3 id="modal-title">{project.name}</h3>
          <p>{project.description}</p>
          <div className="modal-chips">
            {project.tech.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
          <div className="modal-actions">
            {project.demo && (
              <a className="btn-primary" href={project.demo} target="_blank" rel="noreferrer">
                LIVE EXPERIENCE <span><ExternalLink size={17} /></span>
              </a>
            )}
            <a
              className="modal-link"
              href={project.source || profile.github}
              target="_blank"
              rel="noopener noreferrer"
              title={project.source ? 'Open project source code' : 'Repository link not configured — open GitHub profile'}
            >
              <Github size={18} />
              {project.source ? 'SOURCE CODE' : 'GITHUB PROFILE'}
              <ArrowUpRight size={16} />
            </a>
            {!project.demo && (
              <span className="modal-progress">
                <span className="availability-light" />
                PROJECT SHOWCASE / DEMO COMING SOON
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
