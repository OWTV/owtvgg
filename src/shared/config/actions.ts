import type z from "zod";

export type TreeifiedError<T> = ReturnType<typeof z.treeifyError<T>>;

export type ActionState<T extends z.ZodTypeAny | null = null> = {
	success: boolean | null;
	message?: string;
	errors?: T extends z.ZodTypeAny ? TreeifiedError<z.infer<T>> : never;
};

export const ACTION_STATE: ActionState = {
	success: null,
};
