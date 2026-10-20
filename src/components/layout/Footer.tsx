import { ArrowRight, Sparkles } from 'lucide-react';
import { profile } from '../../data';
import brandLogo from '../../assets/brand-logo.png';

export default function Footer() {
  return <footer className="footer">
    <div className="wrap footer-top">
      <a href="#home" className="footer-brand">
        <img src={brandLogo} alt="Sankalpa logo" className="footer-brand-img" />
      </a>
      <span>MADE BY SANKALPA SITHMINA</span>
      <a href="#home" className="back-top">BACK TO TOP 
        <span><ArrowRight size={17} style={{transform:'rotate(-90deg)'}}/></span>
      </a></div>
      <div className="wrap footer-bottom">
        
      </div>
    </footer>;
}
