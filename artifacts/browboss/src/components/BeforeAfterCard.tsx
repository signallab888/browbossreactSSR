"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function BeforeAfterCard({
  label,
  before,
  after,
  posB = "center",
  posA = "center",
}: {
  label: string;
  before: string;
  after: string;
  posB?: string;
  posA?: string;
}) {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="cursor-pointer select-none"
      onClick={() => setShowAfter((v) => !v)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
        <img
          src={before}
          alt={`${label} before`}
          className={`absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-500 ${
            showAfter ? "opacity-0" : "opacity-100"
          }`}
          style={{ objectPosition: posB }}
        />
        <img
          src={after}
          alt={`${label} after`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            showAfter ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: posA }}
        />
        <div className="absolute bottom-0 left-0 right-0 flex">
          <div
            className={`flex-1 py-2 text-center text-[9px] tracking-[0.3em] uppercase font-medium transition-colors duration-300 ${
              !showAfter ? "bg-black text-white" : "bg-white/80 text-zinc-400"
            }`}
          >
            Before
          </div>
          <div
            className={`flex-1 py-2 text-center text-[9px] tracking-[0.3em] uppercase font-medium transition-colors duration-300 ${
              showAfter ? "bg-black text-white" : "bg-white/80 text-zinc-400"
            }`}
          >
            After
          </div>
        </div>
      </div>
      <p className="font-serif text-sm text-zinc-700 mt-4">{label}</p>
    </motion.div>
  );
}
