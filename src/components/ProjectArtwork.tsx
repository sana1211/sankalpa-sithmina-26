import type { ProjectArtwork as ArtworkType } from '../data';
import { Activity, ArrowUpRight, CloudSun, Leaf, ScanLine, Sparkles, Images, IdCard, UsersRound, Sprout } from 'lucide-react';

function TravelArtwork() {
  return (
    <div className="art art-travel">
      <svg className="travel-landscape" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="travelSky" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#edc9aa"/><stop offset=".55" stopColor="#d69a7e"/><stop offset="1" stopColor="#696a61"/></linearGradient>
          <linearGradient id="rockFace" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#715d4c"/><stop offset=".45" stopColor="#b17d55"/><stop offset="1" stopColor="#403b37"/></linearGradient>
          <linearGradient id="forest" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#354d3c"/><stop offset="1" stopColor="#152825"/></linearGradient>
          <filter id="travelBlur"><feGaussianBlur stdDeviation="14"/></filter>
        </defs>
        <rect width="800" height="520" fill="url(#travelSky)"/>
        <circle cx="575" cy="127" r="80" fill="#ffe4bb" opacity=".77"/>
        <circle cx="575" cy="127" r="128" fill="#ffdeb0" opacity=".25" filter="url(#travelBlur)"/>
        <path d="M0 315Q80 265 185 296T395 293T610 283T800 297V520H0Z" fill="#677063" opacity=".4"/>
        <path d="M0 359Q160 310 310 348T590 333T800 344V520H0Z" fill="#4b6254" opacity=".65"/>
        <path d="M219 351C235 312 250 286 257 247L276 198Q286 175 302 177L319 143L330 150L360 140L385 146L403 138L429 154L442 145L462 159L472 186L483 231L512 278L534 359Z" fill="url(#rockFace)"/>
        <path d="M282 196L302 177L319 143L332 149L359 140L388 148L401 138L425 154L444 147L462 158L472 186Q371 174 282 196Z" fill="#645341"/>
        <path d="M291 206Q323 202 344 203M377 195Q414 199 452 203M305 240Q342 229 379 233M423 232L460 237M317 278Q349 262 380 272M421 279L487 285" fill="none" stroke="#d0a77b" strokeWidth="5" opacity=".28"/>
        <path d="M0 413Q95 371 198 408T389 395T580 393T800 402V520H0Z" fill="url(#forest)"/>
        <path d="M0 445Q102 409 184 434T345 430T520 432T800 425V520H0Z" fill="#18372d"/>
        {Array.from({length: 30}, (_, i) => {
          const x = ((i * 83) + 19) % 800;
          const y = 426 + ((i * 37) % 60);
          return <path key={i} d={`M${x} ${y+35}v-27m-13 18l13-34 13 34m-9-13l9-19 9 19`} stroke="#102c25" fill="none" strokeWidth={i%3===0?5:3} strokeLinecap="round" opacity=".9"/>;
        })}
        <path d="M635 127q7-7 14 0m16-7q7-7 14 0" stroke="#614f4a" fill="none" strokeWidth="2"/>
      </svg>
      <div className="travel-top"><span>CEYLON<span className="travel-dot">.</span></span><span>EXPLORE / DISCOVER / FEEL</span></div>
      <div className="travel-copy"><span className="art-mini-label">THE ISLAND IS CALLING</span><strong>WILDLY<br/><i>BEAUTIFUL.</i></strong><span className="travel-pill">EXPLORE SRI LANKA <ArrowUpRight size={14}/></span></div>
      <span className="travel-coordinates">07°57'21.9" N &nbsp; 80°45'34.2" E</span>
    </div>
  );
}

function AgriArtwork() {
  return (
    <div className="art art-agri">
      <div className="agri-grid" />
      <div className="agri-top"><span className="agri-brand"><Leaf size={21} strokeWidth={2.5}/> AgriTwin<span>AI</span></span><div className="agri-avatar">S</div></div>
      <div className="agri-display">
        <div className="agri-intro"><div className="agri-eyebrow">GOOD MORNING, FARMER <span className="blinking-dot"/></div><h3>Your farm,<br/><em>reimagined.</em></h3><p>Precision intelligence for a greener tomorrow.</p></div>
        <div className="agri-metrics">
          <div className="agri-metric"><div><span>FIELD HEALTH</span><Activity size={15}/></div><strong>94<span>%</span></strong><small>↑ +6.2% THIS WEEK</small></div>
          <div className="agri-metric"><div><span>WEATHER TODAY</span><CloudSun size={17}/></div><strong>28<span>°C</span></strong><small>PARTLY CLOUDY</small></div>
        </div>
      </div>
      <div className="agri-bottom">
        <div className="agri-scan"><div className="agri-scan-head"><ScanLine size={17}/> CROP INTELLIGENCE <span>LIVE SCAN</span></div><svg viewBox="0 0 390 91" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="agriGraph" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#baf58d" stopOpacity=".26"/><stop offset="1" stopColor="#baf58d" stopOpacity="0"/></linearGradient></defs><path d="M0 75L32 69L64 74L95 42L129 51L162 43L195 56L227 32L260 36L291 15L326 24L359 8L390 13V91H0Z" fill="url(#agriGraph)"/><path d="M0 75L32 69L64 74L95 42L129 51L162 43L195 56L227 32L260 36L291 15L326 24L359 8L390 13" fill="none" stroke="#baf58d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        <div className="agri-circle"><div className="agri-sun">☀</div><span>GROWTH<br/>FORECAST</span><strong>+18%</strong></div>
      </div>
      <div className="agri-label-side">FUTURE OF AGRICULTURE / 2026</div>
    </div>
  );
}

function VogueArtwork() {
  return (
    <div className="art art-vogue">
      <div className="vogue-top"><span>NEW SEASON / VOL. 01</span><span>✳︎ &nbsp; THE EDIT</span></div>
      <div className="vogue-huge">VOGUE<span>®</span></div>
      <svg viewBox="0 0 700 490" className="vogue-fashion" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="coat" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#45433f"/><stop offset=".52" stopColor="#242525"/><stop offset="1" stopColor="#51534b"/></linearGradient>
          <linearGradient id="dress" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c7aa94"/><stop offset="1" stopColor="#8e6f62"/></linearGradient>
          <filter id="fashionShadow"><feGaussianBlur stdDeviation="12"/></filter>
        </defs>
        <ellipse cx="290" cy="476" rx="145" ry="14" fill="#5e514b" opacity=".15" filter="url(#fashionShadow)"/>
        <ellipse cx="518" cy="473" rx="95" ry="12" fill="#5e514b" opacity=".12" filter="url(#fashionShadow)"/>
        <path d="M286 115Q280 85 282 56Q294 22 319 25Q351 34 351 64L345 116L319 139Z" fill="#292822"/>
        <ellipse cx="319" cy="86" rx="29" ry="41" fill="#b88b72"/>
        <path d="M290 56Q298 22 320 28Q347 29 353 60Q330 54 313 48Q302 63 291 66Z" fill="#232321"/>
        <path d="M303 123L305 152L330 163L342 139L337 122Z" fill="#ac7b68"/>
        <path d="M304 145L270 147L233 180L208 346L244 359L262 289L253 478H382L375 280L399 349L433 339L412 180L361 146L339 138L321 163Z" fill="url(#coat)"/>
        <path d="M304 145L321 163L337 139L358 148L346 330L318 472L299 329L270 147" fill="#5b5952"/>
        <path d="M315 173L300 278L318 323L340 276L331 173Z" fill="#d0c3b2"/>
        <path d="M280 156L319 324L273 277L260 204M363 152L319 324L374 272L382 207" fill="none" stroke="#929086" strokeWidth="4"/>
        <path d="M315 312V473M364 293L379 473" stroke="#74746e" strokeWidth="2" opacity=".8"/>
        <circle cx="321" cy="333" r="4" fill="#c9bda7"/><circle cx="319" cy="370" r="4" fill="#c9bda7"/>
        <path d="M521 161Q513 124 519 100Q529 78 546 86Q568 95 569 126L565 171Z" fill="#342e2b"/>
        <ellipse cx="541" cy="131" rx="22" ry="29" fill="#b28269"/>
        <path d="M518 116Q523 83 543 85Q564 84 570 116L555 101L533 102L521 128Z" fill="#332c28"/>
        <path d="M530 154L533 178H550L554 157Z" fill="#b88f74"/>
        <path d="M532 169Q522 175 507 186L492 255L471 460L584 462L576 254L561 186L553 172L542 195Z" fill="url(#dress)"/>
        <path d="M507 192L480 267L459 256L483 197L528 169M558 170L578 188L606 254L588 265L560 206" fill="#bfa28d"/>
        <path d="M542 196L526 231L545 269L558 231Z" fill="#e4cebe" opacity=".7"/>
        <path d="M516 289Q540 310 567 289M496 380Q539 392 581 376" fill="none" stroke="#dfc4ae" strokeWidth="3" opacity=".4"/>
      </svg>
      <div className="vogue-left"><span>01 / FALL — WINTER</span><b>LESS,<br/><i>BUT BETTER.</i></b></div>
      <div className="vogue-bottom"><span>AN EDITORIAL EXPERIENCE</span><span>DISCOVER COLLECTION &nbsp; ↗</span></div>
    </div>
  );
}

function WeddingArtwork() {
  const leaves = Array.from({length: 14}, (_, i) => i);
  return (
    <div className="art art-wedding">
      <div className="wedding-noise" />
      <svg className="wedding-botanical wedding-botanical-a" viewBox="0 0 230 260" aria-hidden="true"><path d="M28 263Q97 132 193 24" fill="none" stroke="#7c7865" strokeWidth="2"/>{leaves.map(i => <ellipse key={i} cx={42 + i*10} cy={235-i*14} rx="20" ry="9" transform={`rotate(${i%2===0?-51:51} ${42+i*10} ${235-i*14})`} fill={i%3===0?'#a2a38e':'#c7b7a5'} opacity=".75"/>)}</svg>
      <svg className="wedding-botanical wedding-botanical-b" viewBox="0 0 230 260" aria-hidden="true"><path d="M28 263Q97 132 193 24" fill="none" stroke="#7c7865" strokeWidth="2"/>{leaves.map(i => <ellipse key={i} cx={42 + i*10} cy={235-i*14} rx="20" ry="9" transform={`rotate(${i%2===0?-51:51} ${42+i*10} ${235-i*14})`} fill={i%3===0?'#bca8a4':'#d0bfad'} opacity=".7"/>)}</svg>
      <span className="wedding-edition">THE WEDDING EDITION &nbsp; • &nbsp; 2026</span>
      <div className="wedding-invite"><Sparkles size={18} strokeWidth={1}/><span className="wedding-serif tiny">Together with their families</span><span className="wedding-monogram">A <em>&</em> S</span><span className="wedding-serif">invite you to celebrate</span><div className="wedding-rule"/><strong>A LOVE STORY</strong><span className="wedding-serif tiny">The beginning of always</span></div>
      <span className="wedding-est">AN INTERACTIVE INVITATION EXPERIENCE ↗</span>
    </div>
  );
}

function SimpleArtwork({ kind }: { kind: 'arduino' | 'gallery' | 'passport' | 'management' }) {
  const configurations = {
    arduino: { icon: Sprout, label: 'SMART IRRIGATION', title: 'PLANT WATERING', color: '#a2ebc8' },
    gallery: { icon: Images, label: 'EXPLORE THE COLLECTION', title: 'WALLPAPER GALLERY', color: '#a5d2ff' },
    passport: { icon: IdCard, label: 'DIGITAL SERVICES', title: 'E-PASSPORT SRI LANKA', color: '#b2b0ff' },
    management: { icon: UsersRound, label: 'WORKFORCE OPERATIONS', title: 'EMPLOYEE MANAGEMENT', color: '#d2b4ff' },
  };
  const { icon: Icon, label, title, color } = configurations[kind];
  return <div className="art" style={{ background: 'radial-gradient(circle at 75% 18%, #354069, #11182e 65%)', color: '#fff', padding: '9%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <span style={{fontSize: 11, letterSpacing: '.19em', color }}>{label}</span>
    <Icon size={90} strokeWidth={1} color={color} aria-hidden="true" />
    <strong style={{fontSize: 'clamp(25px, 3.5vw, 48px)', lineHeight: 1.1, maxWidth: 490 }}>{title}</strong>
  </div>;
}

export default function ProjectArtwork({ kind }: { kind: ArtworkType }) {
  switch (kind) {
    case 'travel': return <TravelArtwork />;
    case 'agri': return <AgriArtwork />;
    case 'vogue': return <VogueArtwork />;
    case 'wedding': return <WeddingArtwork />;
    case 'arduino':
    case 'gallery':
    case 'passport':
    case 'management': return <SimpleArtwork kind={kind} />;
  }
}
