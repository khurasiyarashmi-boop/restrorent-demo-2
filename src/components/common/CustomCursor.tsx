import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'click'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Detect touch screens / mobile
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    if (checkTouch()) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('[data-cursor]');
        if (interactive) {
          const type = interactive.getAttribute('data-cursor');
          setCursorType(type === 'view' ? 'view' : 'click');
        } else if (target.closest('button, a, input, select, textarea, [role="button"]')) {
          setCursorType('click');
        } else {
          setCursorType('default');
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none transition-transform duration-75 ease-out"
        style={{
          x: position.x - (cursorType === 'view' ? 32 : cursorType === 'click' ? 18 : 10),
          y: position.y - (cursorType === 'view' ? 32 : cursorType === 'click' ? 18 : 10),
        }}
      >
        {cursorType === 'view' ? (
          <div className="w-16 h-16 rounded-full bg-[#3B281C]/90 text-[#FAF7F2] text-[10px] font-mono tracking-widest uppercase flex items-center justify-center border border-[#C4B099]/40 shadow-xl backdrop-blur-sm">
            VIEW
          </div>
        ) : cursorType === 'click' ? (
          <div className="w-9 h-9 rounded-full border border-[#7A5A43] bg-[#7A5A43]/15 transition-all" />
        ) : (
          <div className="w-4 h-4 rounded-full bg-[#4A3222]/80 border border-[#FAF7F2]/50 shadow-sm" />
        )}
      </motion.div>
    </div>
  );
};
