import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SampleBadge } from "./sample-badge";

describe("SampleBadge", () => {
  it("renders the label when the item is a sample", () => {
    render(<SampleBadge show />);
    expect(screen.getByText("Sample listing")).toBeInTheDocument();
  });

  it("renders nothing for real items", () => {
    const { container } = render(<SampleBadge show={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when the flag is missing (column not migrated yet)", () => {
    const { container } = render(<SampleBadge />);
    expect(container).toBeEmptyDOMElement();
  });
});
