import * as fs from "node:fs/promises";

export abstract class Cache {
	public abstract put(
		response: Response,
		request: string | URL | Request,
		init?: RequestInit,
	): Promise<void>;
	public abstract get(
		request: string | URL | Request,
		init?: RequestInit,
	): Promise<Response | undefined>;
}

export class NoCache extends Cache {
	public override async put(
		_response: Response,
		_request: string | URL | Request,
		_init?: RequestInit,
	): Promise<void> {}
	public override async get(
		_request: string | URL | Request,
		_init?: RequestInit,
	): Promise<Response | undefined> {
		return undefined;
	}
}

export class FilesystemURLCache extends Cache {
	public path: string;
	public expiryMs: number | undefined;

	public constructor(configuration: {
		path?: string;
		expiryMs?: number | undefined;
	}) {
		super();
		this.path = configuration.path ?? ".cache";
		this.expiryMs = configuration.expiryMs;
	}

	public static key(
		request: string | URL | Request,
		_init?: RequestInit,
	): string | null {
		if (typeof request === "string") {
			return encodeURIComponent(request);
		} else if (request instanceof URL) {
			return encodeURIComponent(request.toString());
		} else if (request instanceof Request) {
			return encodeURIComponent(request.url);
		} else {
			return null;
		}
	}

	public override async put(
		response: Response,
		request: string | URL | Request,
		init?: RequestInit,
	): Promise<void> {
		const key = FilesystemURLCache.key(request, init);
		if (key !== null) {
			await fs.mkdir(this.path, { recursive: true });
			const path = `${this.path}/${key}.json`;
			await fs.writeFile(
				path,
				JSON.stringify(await response.clone().json(), null, 2),
			);
			console.debug(`Cached ${path} for ${request}`);
		}
	}

	public override async get(
		request: string | URL | Request,
		init?: RequestInit,
	): Promise<Response | undefined> {
		const key = FilesystemURLCache.key(request, init);
		if (key !== null) {
			const path = `${this.path}/${key}.json`;
			const stat = await fs.stat(path).catch(() => undefined);
			if (
				stat &&
				(this.expiryMs === undefined ||
					Date.now() - stat.mtime.getTime() < this.expiryMs)
			) {
				console.debug(`Retrieved ${path} for ${request}`);
				return new Response((await fs.readFile(path)).toString(), {
					status: 200,
					statusText: "OK (cached)",
				});
			}
		}
		return undefined;
	}
}
