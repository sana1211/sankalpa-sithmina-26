import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { profile } from './data';
import Preloader from './components/layout/Preloader';
import Cursor from './components/layout/Cursor';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import Progress from './components/layout/Progress';
import Hero from './components/sections/Hero';
import Work from './components/sections/Work';
import About from './components/sections/About';
import Education from './components/sections/Education';
import SkillShowcase from './components/sections/Skills';
import Certificates from './components/Certificates';
import Contact from './components/sections/Contact';
import './certificates.css';

export default function App() {
  const [loaded,setLoaded] = useState(false);
  const finishLoading = () => setLoaded(true);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setLoaded(true);
  }, []);
  return <>
    <Progress/><Cursor/>
    <AnimatePresence>{!loaded && <Preloader onFinish={finishLoading}/>}</AnimatePresence>
    <div className="page-shell relative overflow-hidden"><div className="site-grain"/><Nav/><main><Hero/><Work/><About/><Education/><SkillShowcase/><Certificates/><Contact/></main><Footer/></div>
    <span className="screenreader">Portfolio of {profile.fullName}. Navigation, project filtering and skills filters are keyboard accessible.</span>
  </>;
}
