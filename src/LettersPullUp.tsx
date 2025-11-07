'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';

export function LettersPullUp({text}: {
  text: string;
  className?: string;
}) {

  const splittedText = text.split('');
  const pullupVariant = {
    initial: { y: 7, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.03,
      },
    }),
  };

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
      <span className="flex justify-center overflow-hidden">
        {splittedText.map((current, i) => (
            <motion.span
                key={i}
                ref={ref}
                variants={pullupVariant}
                initial="initial"
                animate={isInView ? 'animate' : ''}
                custom={i}
            >
              {current == ' ' ? <span>&nbsp;</span> : current}
            </motion.span>
        ))}
      </span>
  );
}