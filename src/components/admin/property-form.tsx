"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Property } from "@/lib/data/properties";
import {
  LISTING_STATUS_LABELS,
  TITLE_DOCUMENT_LABELS,
} from "@/lib/listing-labels";
import type { ActionState } from "@/app/admin/(dashboard)/properties/actions";

const selectClass =
  "flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function PropertyForm({
  property,
  action,
}: {
  property?: Property;
  action: (
    prevState: ActionState,
    formData: FormData,
  ) => Promise<ActionState>;
}) {
  const [state, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          defaultValue={property?.location}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price (NGN)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            defaultValue={property?.price}
            required
          />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="priceNegotiable"
              defaultChecked={property?.price_negotiable ?? false}
              className="h-4 w-4 accent-[hsl(var(--accent))]"
            />
            Price is negotiable
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            name="type"
            defaultValue={property?.type ?? "house"}
            className={selectClass}
          >
            <option value="house">House</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="listingStatus">Listing status</Label>
          <select
            id="listingStatus"
            name="listingStatus"
            defaultValue={property?.listing_status ?? "for_sale"}
            className={selectClass}
          >
            {Object.entries(LISTING_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min={0}
            max={50}
            defaultValue={property?.bedrooms ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            type="number"
            min={0}
            max={50}
            defaultValue={property?.bathrooms ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="landSizeSqm">Land size (sqm)</Label>
          <Input
            id="landSizeSqm"
            name="landSizeSqm"
            type="number"
            min={1}
            step="any"
            defaultValue={property?.land_size_sqm ?? ""}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="titleDocument">Title document</Label>
        <select
          id="titleDocument"
          name="titleDocument"
          defaultValue={property?.title_document ?? ""}
          className={selectClass}
        >
          <option value="">Not specified</option>
          {Object.entries(TITLE_DOCUMENT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={property?.description}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="frontViewImage">
            Front view {property && "(leave blank to keep current)"}
          </Label>
          <Input
            id="frontViewImage"
            name="frontViewImage"
            type="file"
            accept="image/*"
            required={!property}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sideViewImage">
            Side view {property && "(leave blank to keep current)"}
          </Label>
          <Input
            id="sideViewImage"
            name="sideViewImage"
            type="file"
            accept="image/*"
            required={!property}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="backViewImage">
            Back view {property && "(leave blank to keep current)"}
          </Label>
          <Input
            id="backViewImage"
            name="backViewImage"
            type="file"
            accept="image/*"
            required={!property}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={property?.is_published ?? true}
          className="h-4 w-4 accent-[hsl(var(--accent))]"
        />
        Published (untick to keep this listing as a draft, hidden from the public)
      </label>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={isPending}>
        {isPending
          ? "Saving..."
          : property
            ? "Save changes"
            : "Create property"}
      </Button>
    </form>
  );
}
