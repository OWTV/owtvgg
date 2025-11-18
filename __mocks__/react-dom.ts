import { vi } from "vitest";

export const useFormStatus = vi.fn(() => ({
	pending: false,
	data: null,
	method: null,
	action: null,
}));
