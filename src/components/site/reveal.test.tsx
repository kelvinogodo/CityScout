import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Entrance, Reveal, RevealGroup, RevealItem } from "./reveal";

describe("reveal wrappers", () => {
  it("Entrance renders its children", () => {
    render(<Entrance>hello</Entrance>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("Reveal renders its children", () => {
    render(<Reveal>scroll content</Reveal>);
    expect(screen.getByText("scroll content")).toBeInTheDocument();
  });

  it("RevealGroup renders every RevealItem", () => {
    render(
      <RevealGroup>
        <RevealItem>one</RevealItem>
        <RevealItem>two</RevealItem>
      </RevealGroup>,
    );
    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();
  });
});
