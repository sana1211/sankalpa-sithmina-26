import { useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Asterisk, Github } from 'lucide-react';
import { profile, projects, projectCategories, type Project, type ProjectCategory } from '../../data';
import ProjectArtwork from '../ProjectArtwork';
import ProjectScreenshot from '../projects/ProjectScreenshot';
import { Reveal, fadeUp } from '../shared/Reveal';

type Filter = 'All' | ProjectCategory;

// The list is derived from the portfolio data: no empty or out-of-date tabs.
const filters: Filter[] = [
  'All',
  ...projectCategories.filter(category => projects.some(project => project.category === category)),
];
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const tiltX = useSpring(useTransform(y, [-200,200], [4,-4]), {stiffness:130,damping:18});
  const tiltY = useSpring(useTransform(x, [-250,250], [-4,4]), {stiffness:130,damping:18});
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    // 3D hover tilt should not run on touch devices or reduced-motion settings.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX-r.left-r.width/2); y.set(e.clientY-r.top-r.height/2);
  };
  return <motion.article className="project" {...fadeUp} transition={{duration:.8,delay:(index%2)*.1}}>
    <motion.div className="project-visual project-visual--static" onMouseMove={handleMouseMove} onMouseLeave={() => {x.set(0);y.set(0);}} style={{rotateX:tiltX,rotateY:tiltY, transformPerspective:1300}}>
      {project.image ? <ProjectScreenshot project={project}/> : <ProjectArtwork kind={project.artwork}/>}<span className="project-visual-number">{project.number} / {String(projects.length).padStart(2, '0')}</span>
    </motion.div>
    <div className="project-info project-info-compact">
      <div className="project-card-main">
        <span className="project-eyebrow">{project.eyebrow}</span>
        <h3 className="project-title">{project.name}</h3>
      </div>
      <div className="project-card-footer">
        <span className="project-type">{project.category.toUpperCase()} / {project.year}</span>
        <a
          className="project-github-link"
          href={project.source || profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={project.source ? `View ${project.name} GitHub source code` : `Open GitHub profile for ${project.name} (repository link not configured)`}
          title={project.source ? `View ${project.name} source code` : 'GitHub profile — add this project repo link in src/data.ts'}
        >
          <Github size={16}/><span>{project.source ? 'SOURCE CODE' : 'GITHUB PROFILE'}</span><ArrowUpRight size={13}/>
        </a>
      </div>
    </div>
  </motion.article>;
}

export default function Work() {
  const [filter, setFilter] = useState<Filter>('All');
  const filtered = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <section id="work" className="work section-pad section-anchor">
      <div className="section-heading wrap">
        <Reveal>
          <div className="eyebrow"><span className="eyebrow-line"/> 01 / THE PORTFOLIO</div>
          <h2>MY LATEST<br/><em>PROJECT<span className="accent-period">.</span></em></h2>
        </Reveal>
        <Reveal className="section-heading-right" delay={.14}>
          <span className="section-symbol"><Asterisk size={67} strokeWidth={1.25}/></span>
        </Reveal>
      </div>
      <div className="wrap">
        <div className="work-toolbar">
          <div className="filter-tabs project-category-tabs" role="group" aria-label="Filter projects by category">
            {filters.map(category => (
              <button
                key={category}
                type="button"
                className={filter === category ? 'active' : ''}
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                aria-controls="filtered-projects"
              >
                <span>{category === 'All' ? 'ALL PROJECTS' : category.toUpperCase()}</span>
              </button>
            ))}
          </div>
          <span className="work-count" aria-live="polite" aria-atomic="true">
            SHOWING {String(filtered.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>
        <motion.div id="filtered-projects" className="projects-grid grid" layout>
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index}/>
          ))}
        </motion.div>
        <Reveal className="work-end">
          <div className="work-end-line"/><span><span className="tiny-spark">✳︎</span></span><div className="work-end-line"/>
        </Reveal>
      </div>
    </section>
  );
}
