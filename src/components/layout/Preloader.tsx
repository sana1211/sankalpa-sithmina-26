import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import brandLogo from '../../assets/brand-logo.png';
import brandSymbol from '../../assets/brand-symbol.png';

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onFinish();
      return;
    }

    const startedAt = performance.now();
    const duration = 1900;
    let animationFrame = 0;
    let finishTimer = 0;
    let lastProgress = -1;

    const update = (now: number) => {
      const elapsed = Math.min(1, (now - startedAt) / duration);
      const percent = Math.floor(elapsed * 100);
      if (percent !== lastProgress) {
        lastProgress = percent;
        setProgress(percent);
      }
      if (elapsed < 1) animationFrame = window.requestAnimationFrame(update);
      else finishTimer = window.setTimeout(onFinish, 180);
    };

    animationFrame = window.requestAnimationFrame(update);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="preloader"
      role="status"
      aria-label="Loading Sankalpa's portfolio"
      initial={{ opacity: 1 }}
      exit={{ y: '-102%' }}
      transition={{ duration: .85, ease: [.76, 0, .24, 1] }}
    >
      <div className="intro-ambient" aria-hidden="true" />
      <div className="intro-grid" aria-hidden="true" />
      <header className="intro-topbar">
        <span className="intro-brand"><img src={brandLogo} alt="Sankalpa logo" className="intro-brand-logo" /> <span>Sankalpa Sithmina</span></span>
        
      </header>

      <div className="intro-center">
        <div className="intro-orbit" aria-hidden="true">
          <span className="intro-orbit-outline" />
          <span className="intro-orbit-ellipse" />
          <span className="intro-orbit-ellipse intro-orbit-ellipse-secondary" />
          <span className="intro-orbit-halo" />
          <img src={brandSymbol} alt="Sankalpa monogram" className="intro-monogram-logo" />
          <span className="intro-orbit-particle intro-orbit-particle-a" />
          <span className="intro-orbit-particle intro-orbit-particle-b" />
        </div>
        <motion.p className="intro-eyebrow" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .25 }}>
          <span className="intro-eyebrow-line" /> WELCOME TO MY DIGITAL SPACE <span className="intro-eyebrow-line" />
        </motion.p>
        <motion.h2 className="intro-headline" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .36, ease: [.22, 1, .36, 1] }}>
           <em>WELCOME!</em>
        </motion.h2>
        <motion.p className="intro-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .65 }}>
          Design in motion. Built with intention.
        </motion.p>
      </div>

      <footer className="intro-footer">
        
        <div className="intro-progress-wrap" aria-hidden="true">
          <div className="intro-progress-track"><div className="intro-progress-fill" style={{ width: `${progress}%` }} /></div>
        </div>
        <span className="intro-progress-number" aria-hidden="true">{String(progress).padStart(2, '0')}<small>%</small></span>
      </footer>
      <button className="intro-skip" type="button" onClick={onFinish}>SKIP INTRO <ArrowUpRight size={14} /></button>
    </motion.div>
  );
}
