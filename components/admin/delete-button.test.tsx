import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeleteButton } from "./delete-button";

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

describe("DeleteButton", () => {
  it("does not call the action when the confirm dialog is cancelled", async () => {
    const action = vi.fn().mockResolvedValue(undefined);
    window.confirm = vi.fn().mockReturnValue(false);
    const user = userEvent.setup();

    render(<DeleteButton action={action} confirmMessage="Delete?" />);
    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(action).not.toHaveBeenCalled();
  });

  it("calls the action when the confirm dialog is accepted", async () => {
    const action = vi.fn().mockResolvedValue(undefined);
    window.confirm = vi.fn().mockReturnValue(true);
    const user = userEvent.setup();

    render(<DeleteButton action={action} confirmMessage="Delete?" />);
    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(action).toHaveBeenCalledTimes(1);
  });
});
