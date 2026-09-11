"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function HeroSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex max-w-xl flex-col gap-2 rounded-lg bg-background/95 p-2 shadow-lg sm:flex-row"
    >
      <Input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Search by location…"
        aria-label="Search by location"
        className="border-0 bg-transparent text-foreground shadow-none focus-visible:ring-0"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        aria-label="Property type"
        className="h-10 rounded-md border border-border bg-surface px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:border-0 sm:bg-transparent"
      >
        <option value="">Any type</option>
        <option value="house">House</option>
        <option value="land">Land</option>
      </select>
      <Button type="submit" variant="accent" className="gap-2 sm:shrink-0">
        <Search className="h-4 w-4" />
        Search
      </Button>
    </form>
  );
}
