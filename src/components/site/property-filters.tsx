"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const selectClass =
  "flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(
    searchParams.get("location") ?? "",
  );
  const [type, setType] = useState(searchParams.get("type") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  function applyFilters(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (status) params.set("status", status);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <form
      onSubmit={applyFilters}
      className="grid gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <Input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        aria-label="Filter by location"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        aria-label="Filter by property type"
        className={selectClass}
      >
        <option value="">Any type</option>
        <option value="house">House</option>
        <option value="land">Land</option>
      </select>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        aria-label="Filter by sale or rent"
        className={selectClass}
      >
        <option value="">For sale or rent</option>
        <option value="for_sale">For sale</option>
        <option value="for_rent">For rent</option>
      </select>
      <select
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
        aria-label="Minimum bedrooms"
        className={selectClass}
      >
        <option value="">Any bedrooms</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}+ bedrooms
          </option>
        ))}
      </select>
      <Input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        aria-label="Minimum price"
      />
      <Input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        aria-label="Maximum price"
      />
      <Button type="submit" className="gap-2 sm:col-span-2 lg:col-span-2">
        <Search className="h-4 w-4" />
        Search
      </Button>
    </form>
  );
}
