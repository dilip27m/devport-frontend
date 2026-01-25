"use client";

import { motion } from "framer-motion";
import React from "react";

interface BubbleCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function BubbleCard({ children, className = "", delay = 0 }: BubbleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, type: "spring", bounce: 0.4 }}
      whileHover={{ scale: 1.02, translateY: -5 }}
      className={`bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 shadow-xl rounded-3xl p-6 hover:border-yellow-500/50 transition-colors ${className}`}
    >
      {children}
    </motion.div>
  );
}