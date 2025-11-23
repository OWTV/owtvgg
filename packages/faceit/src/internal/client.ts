import { type Cache, NoCache } from "../cache";
import { NonRateLimiter, type RateLimiter } from "../ratelimit";
import {
	deserializeLeague,
	deserializeMatch,
	deserializeSeason,
	deserializeSeasonTree,
	type League,
	type Match,
	type Season,
	type SeasonTree,
} from "./api";

export class Client {
	public rateLimiter: RateLimiter;
	public cache: Cache;
	public basePath: string;

	public constructor(configuration?: {
		rateLimiter?: RateLimiter;
		cache?: Cache;
		basePath?: string;
	}) {
		this.rateLimiter = configuration?.rateLimiter ?? new NonRateLimiter();
		this.cache = configuration?.cache ?? new NoCache();
		this.basePath = configuration?.basePath ?? "https://www.faceit.com/api";
	}

	public async fetch(
		request: string | URL | Request,
		init: RequestInit = {},
	): Promise<Response> {
		if (typeof request === "string" && request.startsWith("/")) {
			request = `${this.basePath}${request}`;
		}

		let response = await this.cache.get(request, init);
		if (response !== undefined) {
			return response;
		} else {
			await this.rateLimiter.limit();
			response = await fetch(request, init);
			await this.cache.put(response, request, init);
			return response;
		}
	}

	public async getLeague(leagueId: string): Promise<League> {
		const response = await this.fetch(`/team-leagues/v2/leagues/${leagueId}`);
		if (response.status >= 200 && response.status < 300) {
			const data = await response.json();
			return deserializeLeague(data.payload);
		} else {
			throw response;
		}
	}

	public async getLeagueSeasons(leagueId: string): Promise<Array<Season>> {
		const response = await this.fetch(
			`/team-leagues/v2/leagues/${leagueId}/seasons`,
		);
		if (response.status >= 200 && response.status < 300) {
			const data = await response.json();
			return data.payload.map(deserializeSeason);
		} else {
			throw response;
		}
	}

	public async getSeasonTree(seasonId: string): Promise<SeasonTree> {
		const response = await this.fetch(
			`/team-leagues/v2/seasons/tree?entityType=season&entityId=${seasonId}`,
		);
		if (response.status >= 200 && response.status < 300) {
			const data = await response.json();
			return deserializeSeasonTree(data.payload);
		} else {
			throw response;
		}
	}

	public async getMatch(matchId: string): Promise<Match> {
		const response = await this.fetch(`/match/v2/match/${matchId}`);
		if (response.status >= 200 && response.status < 300) {
			const data = await response.json();
			return deserializeMatch(data.payload);
		} else {
			throw response;
		}
	}
}
