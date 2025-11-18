import { describe, expect, it } from "vitest";
import { LoginSchema } from "../schema";

describe("LoginSchema", () => {
	it("should validate a correct email and password", () => {
		const result = LoginSchema.safeParse({
			email: "test@example.com",
			password: "password123",
		});
		expect(result.success).toBe(true);
	});

	it("should reject an invalid email", () => {
		const result = LoginSchema.safeParse({
			email: "not-an-email",
			password: "password123",
		});
		expect(result.success).toBe(false);
		expect(result.error?.issues[0].message).toBe("Invalid email address");
	});

	it("should reject an empty password", () => {
		const result = LoginSchema.safeParse({
			email: "test@example.com",
			password: "",
		});
		expect(result.success).toBe(false);
		expect(result.error?.issues[0].message).toBe("Password is required");
	});
});
