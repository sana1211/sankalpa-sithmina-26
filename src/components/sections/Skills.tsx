import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Code2, Database, Layers3, Palette, Wrench } from 'lucide-react';
import { skillGroups } from '../../data';
import { SkillLogo } from '../SkillLogo';
import { Reveal } from '../shared/Reveal';

const skillIcons = [Code2, Database, Palette, Wrench];

type SkillFilter = 'All' | (typeof skillGroups)[number]['id'];

export default function SkillShowcase() {
  const [active, setActive] = useState<SkillFilter>('All');
  const visible = active === 'All' ? skillGroups : skillGroups.filter(group => group.id === active);
  return (
    <section id="skills" className="skills-section section-pad section-anchor">
      <div className="wrap">
        <div className="skills-section-heading">
          <Reveal>
            <div className="eyebrow"><span className="eyebrow-line"/> 04 / THE TECH TOOLKIT</div>
            <h2>MY CURRENT<br/><em>SKILLS<span className="accent-period"></span></em></h2>
          </Reveal>
          
        </div>
        <Reveal className="skills-filter-bar">
          <div className="skills-filter-buttons" role="group" aria-label="Filter skills by specialty">
            {([{id:'All',label:'ALL SKILLS'}, ...skillGroups.map(group => ({id:group.id,label:group.label.toUpperCase()}))] as {id:SkillFilter;label:string}[]).map(filter => (
              <button key={filter.id} type="button" onClick={() => setActive(filter.id)} aria-pressed={active === filter.id} className={`skills-filter ${active === filter.id ? 'active' : ''}`}>{filter.label}</button>
            ))}
          </div>
        </Reveal>
        <motion.div layout className={`skill-groups ${active === 'All' ? '' : 'skill-groups-filtered'}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map(group => {
              const Icon = skillIcons[skillGroups.findIndex(g => g.id === group.id)] ?? Layers3;
              return (
                <motion.article key={group.id} layout className="skill-group-card" initial={{opacity:0,y:30,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:16,scale:.97}} transition={{duration:.38,ease:'easeOut'}}>
                  <div className="skill-group-top"><div className="skill-group-icon"><Icon size={26} strokeWidth={1.6}/></div><span>FIELD / {group.number}</span></div>
                  <h3>{group.label}</h3>
                  <p>{group.description}</p>
                  <div className="skill-logo-grid">{group.items.map((item,i) => (
                    <motion.div className="skill-logo-tile" key={item} initial={{opacity:0,y:18,scale:.96}} animate={{opacity:1,y:0,scale:1}} transition={{duration:.36,delay:i*.045}} title={item}>
                      <SkillLogo name={item}/>
                      <span className="skill-logo-title">{item}</span>
                    </motion.div>
                  ))}</div>
                  <div className="skill-group-bottom"><span>{String(group.items.length).padStart(2, '0')} TECHNOLOGIES</span><ArrowUpRight size={19}/></div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
        <Reveal className="skills-summary">
          <div className="skills-summary-star" aria-hidden="true"></div>
          
        </Reveal>
      </div>
    </section>
  );
}
