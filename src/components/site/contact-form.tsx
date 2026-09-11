"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    try {
      await emailjs.sendForm(
        "service_sa41ki7",
        "template_0nkkq14",
        formRef.current,
        "9GE27Lw_ZPrGHYHoM",
      );
      toast.success(
        "Your message has been sent — we'll get in touch soon.",
      );
      formRef.current.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
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
      <Button type="submit" disabled={isSending} className="w-full">
        {isSending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
