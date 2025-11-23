export function now(): number {
	return Date.now(); // So I don't have to look at `new` everywhere
}

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export abstract class RateLimiter {
	public abstract limit(): Promise<void>;
}

export class NonRateLimiter extends RateLimiter {
	public override async limit(): Promise<void> {}
}

export class SlidingRateLimiter extends RateLimiter {
	protected readonly buffer: Array<number>;
	protected readonly ms: number;
	protected readonly tag: string | null;
	protected cursor: number;

	public constructor(count: number, ms: number, tag: string | null = null) {
		super();
		this.tag = tag;
		this.buffer = new Array(count).fill(0);
		this.ms = ms;
		this.cursor = 0;
	}

	public async sleep(ms: number): Promise<void> {
		const space = this.tag !== null ? " " : "";
		const frequency =
			Math.round((this.buffer.length / (this.ms / 1000 / 60)) * 10) / 10;
		console.log(
			`Sleeping ${Math.round(ms) / 1000} seconds for ${this.tag}${space}(${frequency} request/min)`,
		);
		await sleep(ms);
	}

	public override async limit(): Promise<void> {
		while (now() - this.buffer[this.cursor] < this.ms) {
			await this.sleep(now() - this.buffer[this.cursor]);
		}
		this.buffer[this.cursor] = now();
		this.cursor = (this.cursor + 1) % this.buffer.length;
	}
}
