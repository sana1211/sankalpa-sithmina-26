import { motion, useScroll, useSpring } from 'motion/react';

export default function Progress() {
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress,{stiffness:140,damping:30});
  return <motion.div className="scroll-progress" style={{scaleX}}/>;
}
