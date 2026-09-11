"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        action={formAction}
        className="w-full max-w-sm space-y-4 rounded-lg border border-border bg-surface p-8"
      >
        <div className="space-y-1 text-center">
          <h1 className="text-xl font-semibold">Admin sign in</h1>
          <p className="text-sm text-muted-foreground">
            CityScout Realtors dashboard
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </div>
        {state?.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </main>
  );
}
