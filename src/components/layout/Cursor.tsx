import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = -80, y = -80, rx = -80, ry = -80, frame = 0;
    let hovered = false;
    const onMove = (e: globalThis.MouseEvent) => {
      x = e.clientX; y = e.clientY;
      dot.current?.style.setProperty('transform', `translate3d(${x}px,${y}px,0)`);
      document.documentElement.style.setProperty('--cursor-x', `${x}px`);
      document.documentElement.style.setProperty('--cursor-y', `${y}px`);
    };
    const onOver = (e: globalThis.MouseEvent) => {
      hovered = Boolean((e.target as HTMLElement).closest('a,button,[data-cursor]'));
      ring.current?.classList.toggle('cursor-ring-hover', hovered);
    };
    const loop = () => {
      rx += (x-rx)*.14; ry += (y-ry)*.14;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      frame = requestAnimationFrame(loop);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    frame = requestAnimationFrame(loop);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver); cancelAnimationFrame(frame); };
  }, []);
  return <><div ref={dot} className="cursor-dot" aria-hidden="true"/><div ref={ring} className="cursor-ring" aria-hidden="true"/></>;
}
