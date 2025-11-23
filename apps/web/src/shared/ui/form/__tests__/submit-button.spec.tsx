import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { useFormStatus } from "react-dom";
import { describe, expect, it, vi } from "vitest";
import { SubmitButton } from "../submit-button";

vi.mock("react-dom");

describe("SubmitButton", () => {
	it("should render correctly when not pending", () => {
		render(<SubmitButton>Save Changes</SubmitButton>);

		const button = screen.getByRole("button", { name: /Save Changes/i });
		expect(button).toBeInTheDocument();
		expect(button).not.toBeDisabled();

		const textSpan = screen.getByText("Save Changes");
		expect(textSpan).not.toHaveClass("invisible");

		const loader = button.querySelector("svg");
		expect(loader).toBeInTheDocument();
		expect(loader).toHaveClass("invisible");
	});

	it("should render in a pending (loading) state", () => {
		vi.mocked(useFormStatus).mockReturnValue({
			pending: true,
		} as never);

		render(<SubmitButton>Save Changes</SubmitButton>);

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();

		const textSpan = screen.getByText("Save Changes");
		expect(textSpan).toHaveClass("invisible");

		const loader = button.querySelector("svg");
		expect(loader).not.toHaveClass("invisible");
		expect(loader).toHaveClass("visible");
		expect(loader).toHaveClass("animate-spin");
	});

	it("should pass through additional props className", () => {
		render(<SubmitButton className="my-10">Delete</SubmitButton>);

		const button = screen.getByRole("button", { name: /Delete/i });
		expect(button).toHaveClass("my-10");
	});
});
