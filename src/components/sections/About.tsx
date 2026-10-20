import { Asterisk } from 'lucide-react';
import { Reveal } from '../shared/Reveal';
import './about-centered.css';

/**
 * Centered About Me presentation.
 * Content and styling are isolated to this section so the rest of
 * the portfolio, navigation, project galleries and animations stay as-is.
 */
export default function About() {
  return (
    <section id="about" className="about about-v2 about-v2-centered section-pad section-anchor">
      <div className="wrap">
        <div className="about-v2-heading">
          <Reveal>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              02 / BEHIND THE SCREEN
            </div>
            <h2 className="about-v2-title">
              <span>ABOUT <em>ME.</em></span>
            </h2>
          </Reveal>
        </div>

        <div className="about-v2-showcase about-v2-text-only">
          <Reveal className="about-v2-bio-panel about-v2-bio-only about-centered-card" delay={0.08}>
            <div className="about-v2-bio-top">
              <span><span className="about-v2-signal" /> INTRODUCING MYSELF</span>
              <span>CREATIVE DEVELOPER <Asterisk size={15} /></span>
            </div>

            <div className="about-centered-content">
              

              <h3 className="about-centered-headline">
                Designing Ideas.<br />
                <em>Building Experiences.</em>
              </h3>

              <div className="about-centered-divider" aria-hidden="true">
                <span />
                <span className="about-centered-star">✳</span>
                <span />
              </div>

              <div className="about-centered-description">
                <p>
                  I&apos;m <strong>Sankalpa Sithmina</strong>, a passionate
                  <strong> Frontend Developer &amp; UI/UX Designer</strong> from
                  Sri Lanka, currently pursuing my Bachelor of Information
                  Technology (BIT) at the University of Moratuwa.
                </p>
                <p>
                  I specialize in building modern, responsive, and visually
                  engaging web experiences using <strong>React, TypeScript,
                  Tailwind CSS</strong>, and modern animation technologies.
                </p>
                <p>
                  My passion lies at the intersection of design and development,
                  where thoughtful interfaces meet clean, functional code.
                  From interactive websites to creative digital experiences,
                  I enjoy transforming ideas into products that are both
                  beautiful and user-friendly.
                </p>
                <p>
                  I&apos;m constantly exploring new technologies, improving my
                  skills, and challenging myself through real-world projects.
                </p>
              </div>

            

              <div className="about-centered-tags" aria-label="My creative focus">
                <span>DESIGN THINKING</span>
                <span>FRONTEND DEVELOPMENT</span>
                <span>CONTINUOUS LEARNING</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
