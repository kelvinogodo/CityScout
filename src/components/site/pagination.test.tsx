import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pagination, buildPageHref, pageWindow } from "./pagination";

describe("buildPageHref", () => {
  it("omits the page param for page 1", () => {
    expect(buildPageHref("/properties", {}, 1)).toBe("/properties");
  });

  it("keeps existing filters and sets the page", () => {
    expect(buildPageHref("/properties", { type: "house", location: "Abakaliki" }, 3)).toBe(
      "/properties?type=house&location=Abakaliki&page=3",
    );
  });

  it("drops empty values and any stale page param", () => {
    expect(buildPageHref("/properties", { type: "", page: "9" }, 2)).toBe(
      "/properties?page=2",
    );
  });
});

describe("pageWindow", () => {
  it("always includes first, last and the neighbours of the current page", () => {
    expect(pageWindow(10, 20)).toEqual([1, 8, 9, 10, 11, 12, 20]);
  });

  it("handles a single page", () => {
    expect(pageWindow(1, 1)).toEqual([1]);
  });
});

describe("Pagination", () => {
  it("renders nothing for a single page", () => {
    const { container } = render(
      <Pagination page={1} totalPages={1} basePath="/blog" params={{}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("marks the current page and links to the next one", () => {
    render(<Pagination page={2} totalPages={3} basePath="/blog" params={{}} />);
    expect(screen.getByText("2")).toHaveAttribute("aria-current", "page");
    expect(screen.getByLabelText("Next page")).toHaveAttribute("href", "/blog?page=3");
    expect(screen.getByLabelText("Previous page")).toHaveAttribute("href", "/blog");
  });
});
