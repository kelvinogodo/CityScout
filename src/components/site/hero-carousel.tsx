"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const slides = [
  "/images/hero/abuja-hillside.jpg",
  "/images/hero/lagos-ikoyi.jpg",
  "/images/hero/abuja-bungalows.jpg",
  "/images/hero/city-palms.jpg",
  "/images/hero/lagos-dusk.jpg",
];

const SLIDE_MS = 6000;

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <AnimatePresence>
        <motion.div
          key={active}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1.14 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.4 },
            scale: { duration: SLIDE_MS / 1000 + 1.5, ease: "linear" },
          }}
        >
          <Image
            src={slides[active]!}
            alt=""
            fill
            priority={active === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            onClick={() => setActive(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              index === active ? "w-8 bg-white" : "w-4 bg-white/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
