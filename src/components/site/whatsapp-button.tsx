"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/site-config";

export function WhatsAppButton() {
  const pathname = usePathname();
  const [nearBottom, setNearBottom] = useState(false);

  // The footer has its own large WhatsApp button; hide the floating one when
  // the reader reaches it so it never covers the footer links.
  useEffect(() => {
    const onScroll = () => {
      const distance =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      setNearBottom(distance < 420);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Property pages and the contact page already have their own prominent
  // WhatsApp button; a second floating one just overlaps it.
  if (pathname.startsWith("/properties/") || pathname === "/contact") {
    return null;
  }

  return (
    <motion.a
      href={whatsappLink("Hello CityScout Realtors, I'd like to make an enquiry.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with CityScout Realtors on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={
        nearBottom
          ? { opacity: 0, scale: 0.8, pointerEvents: "none" }
          : { opacity: 1, scale: 1, pointerEvents: "auto" }
      }
      transition={{ delay: nearBottom ? 0 : 0.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      tabIndex={nearBottom ? -1 : 0}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-black shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </motion.a>
  );
}
