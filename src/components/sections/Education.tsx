import { Award, BookOpen, GraduationCap } from 'lucide-react';
import { education } from '../../data';
import { Reveal } from '../shared/Reveal';

const educationIcons = [GraduationCap, Award, BookOpen];

export default function Education() {
  return (
    <section id="education" className="education-section section-pad section-anchor">
      <div className="wrap">
        <div className="education-heading">
          <Reveal>
            <div className="eyebrow"><span className="eyebrow-line"/> 03 / MY LEARNING JOURNEY</div>
            <h2><em>EDUCATION<span className="accent-period"></span></em></h2>
          </Reveal>
          
        </div>

        <div className="education-overview" aria-label="Education overview">
          
        </div>

        <div className="education-layout education-layout-refined">
          <div className="education-timeline education-timeline-refined">
            {education.map((item, i) => {
              const Icon = educationIcons[i] ?? BookOpen;
              return (
                <Reveal key={item.id} className="education-timeline-item education-timeline-item-refined" delay={i * .11}>
                  <article className="education-card education-card-refined">
                    <div className="education-card-head">
                      <span>{String(i + 1).padStart(2, '0')} / {String(education.length).padStart(2, '0')}</span>
                      <span className={`education-status ${item.status === 'IN PROGRESS' ? 'is-progress' : ''}`}>{item.status}</span>
                    </div>
                    <div className="education-card-icon"><Icon size={31} strokeWidth={1.6}/></div>
                    <div className="education-card-content">
                      <span className="education-card-kicker">{item.kind}</span>
                      <h3>{item.qualification}</h3>
                      <div className="education-institution">{item.institution}</div>
                      <p>{item.description}</p>
                    </div>
                    <div className="education-card-foot"><span>KNOWLEDGE IN PRACTICE</span><span className="education-card-endmark" aria-hidden="true">✳︎</span></div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}
