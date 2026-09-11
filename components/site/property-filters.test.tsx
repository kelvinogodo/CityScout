import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PropertyFilters } from "./property-filters";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("PropertyFilters", () => {
  it("pushes a query string built from the filled fields", async () => {
    const user = userEvent.setup();
    render(<PropertyFilters />);

    await user.type(screen.getByLabelText(/filter by location/i), "Abakaliki");
    await user.selectOptions(
      screen.getByLabelText(/filter by property type/i),
      "house",
    );
    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(push).toHaveBeenCalledWith("/properties?location=Abakaliki&type=house");
  });

  it("omits empty fields from the query string", async () => {
    const user = userEvent.setup();
    render(<PropertyFilters />);

    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(push).toHaveBeenCalledWith("/properties?");
  });
});
