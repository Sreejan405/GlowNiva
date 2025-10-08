"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedHero({ children }: { children: React.ReactNode }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
}
