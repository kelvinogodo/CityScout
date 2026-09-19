"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Real people take longer than this to fill in a form; most bots don't.
const MIN_FILL_MS = 3000;

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const openedAt = useRef(0);
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    // Honeypot: invisible to people, tempting to bots. Pretend it worked.
    const trap = form.elements.namedItem("company") as HTMLInputElement | null;
    if (trap?.value) {
      toast.success("Your message has been sent.");
      form.reset();
      return;
    }

    if (openedAt.current && Date.now() - openedAt.current < MIN_FILL_MS) {
      toast.error("Please take a moment to review your message, then send.");
      return;
    }

    setIsSending(true);
    try {
      await emailjs.sendForm(
        "service_sa41ki7",
        "template_0nkkq14",
        form,
        "9GE27Lw_ZPrGHYHoM",
      );
      toast.success(
        "Your message has been sent — we'll get in touch soon.",
      );
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again or use WhatsApp.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocusCapture={() => {
        if (!openedAt.current) openedAt.current = Date.now();
      }}
      className="space-y-4 rounded-lg border border-border bg-surface p-6"
    >
      <div className="space-y-2">
        <Label htmlFor="user_name">Name</Label>
        <Input id="user_name" name="user_name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone_number">Phone number</Label>
        <Input id="phone_number" name="phone_number" type="tel" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="user_email">Email</Label>
        <Input id="user_email" name="user_email" type="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <Button type="submit" disabled={isSending} className="w-full">
        {isSending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
