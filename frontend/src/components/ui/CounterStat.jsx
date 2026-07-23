import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const CounterStat = ({ end, suffix = '', prefix = '', label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const numericEnd = parseFloat(end);
    const isDecimal = String(end).includes('.');
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericEnd;
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(numericEnd);
    };

    requestAnimationFrame(tick);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-5xl md:text-6xl font-display font-bold text-amber-400 mb-3 tabular-nums">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs tracking-[0.2em] text-gray-400 uppercase font-light">{label}</div>
    </div>
  );
};

export default CounterStat;
