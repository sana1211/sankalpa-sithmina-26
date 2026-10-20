import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import brandLogo from '../../assets/brand-logo.png';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);
  useEffect(() => {
    // If the visitor rotates the device or expands to desktop, close the mobile drawer.
    const media = window.matchMedia('(min-width: 1101px)');
    const onDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener('change', onDesktop);
    return () => media.removeEventListener('change', onDesktop);
  }, []);
  return (
    <>
      <header className={`nav ${solid ? 'nav-solid' : ''}`}>
        <a href="#home" className="nav-logo" aria-label="Back to top" onClick={() => setOpen(false)}><img src={brandLogo} alt="Sankalpa logo" className="nav-logo-img" /></a>
        <nav className="nav-links" aria-label="Main navigation"><a href="#work">WORK <span>01</span></a><a href="#about">ABOUT <span>02</span></a><a href="#education">EDUCATION <span>03</span></a><a href="#skills">SKILLS <span>04</span></a><a href="#certificates">CERTIFICATES <span>05</span></a></nav>
        <a className="nav-contact" href="#contact"><span className="availability-light"/> LET'S TALK <ArrowUpRight size={15}/></a>
        <button className="nav-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="portfolio-mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={26}/> : <Menu size={26}/>}</button>
      </header>
      <AnimatePresence>
        {open && <motion.nav id="portfolio-mobile-navigation" aria-label="Mobile navigation" className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
          {[['01','WORK','#work'], ['02','ABOUT','#about'], ['03','EDUCATION','#education'], ['04','SKILLS','#skills'], ['05','CERTIFICATES','#certificates'], ['06','CONTACT','#contact']].map(([i,label,url]) => <a key={i} href={url} onClick={() => setOpen(false)}><small>{i}</small>{label}<ArrowUpRight/></a>)}
          <p>CODE IS THE MEDIUM. IMAGINATION IS THE LIMIT.</p>
        </motion.nav>}
      </AnimatePresence>
    </>
  );
}
