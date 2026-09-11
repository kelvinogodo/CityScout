"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Property } from "@/lib/data/properties";
import type { ActionState } from "@/app/admin/(dashboard)/properties/actions";

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
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <select
          id="type"
          name="type"
          defaultValue={property?.type ?? "house"}
          className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <option value="house">House</option>
          <option value="land">Land</option>
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
