// biome-ignore-all lint/suspicious/noExplicitAny: deserialization of unknown APIs

export interface Organizer {
	id: string;
	name: string;
	is_verified: boolean;
	level: number;
	avatar_url: string;
	cover_url: string;
}

export function deserializeOrganizer(league: any): League {
	return league;
}

export interface League {
	league_id: string;
	organizer_id: string;
	organizer_details: Organizer;
	name: string;
	season_number: number;
	current_season_id: string;
	gamemode_group_id: string;
	championship_config_id: string;
	features: string;
	game_id: string;
	banner_image_url: string;
	players_per_team: number;
	anticheat_required: boolean;
	skill_levels: Array<string>;
	minimum_age: number;
	starting_division: string;
	subscription_types_allowed: string;
	description: string;
	created_at: string;
	updated_at: string;
}

export function deserializeLeague(league: any): League {
	return league;
}

export interface Season {
	id: string;
	league_id: string;
	season_number: number;
	time_start: Date;
	time_end: Date;
	published_at: Date;
	registration_start: Date;
	registration_end: Date;
	roster_lock_at: Date;
	user_new_team_cooldown: number;
	global_hijack_policy: number;
	roster_max_size: number;
	roster_season_join_limit: number;
	roster_join_cooldown_duration: number;
	roster_cooldown_join_limit: number;
	current_team_count: number;
	total_prize_pool: number;
	created_at: Date;
	updated_at: Date;
	header_image_url: string;
	thumbnail_url: string;
	rules_id: string;
	season_name: string;
	players_per_team: number;
	substitutes_max_size: number;
	coaches_max_size: number;
	status: string;
	forfeits_max_allowed: number;
}

export function deserializeSeason(season: any): Season {
	season.time_start = new Date(season.time_start);
	season.time_end = new Date(season.time_end);
	season.published_at = new Date(season.published_at);
	season.registration_start = new Date(season.registration_start);
	season.registration_end = new Date(season.registration_end);
	season.roster_lock_at = new Date(season.roster_lock_at);
	season.created_at = new Date(season.created_at);
	season.updated_at = new Date(season.updated_at);
	return season;
}

export interface SeasonTree {
	id: string;
	name: string;
	number: number;
	league_id: string;
	league_name: string;
	organizer_id: string;
	forfeits_max_allowed: number;
	published_at: Date;
	regions: Array<SeasonTreeRegion>;
}

export function deserializeSeasonTree(seasonTree: any): SeasonTree {
	seasonTree.published_at = new Date(seasonTree.published_at);
	seasonTree.regions = seasonTree.regions.map(deserializeSeasonTreeRegion);
	return seasonTree;
}

export interface SeasonTreeRegion {
	id: string;
	name: string;
	code: string;
	server_code: string;
	divisions: Array<SeasonTreeRegionDivision>;
}

export function deserializeSeasonTreeRegion(region: any): SeasonTree {
	region.divisions = region.divisions.map(deserializeSeasonTreeRegionDivision);
	return region;
}

export interface SeasonTreeRegionDivision {
	id: string;
	name: string;
	order: number;
	stages: Array<SeasonTreeRegionDivisionStage>;
}

export function deserializeSeasonTreeRegionDivision(
	division: any,
): SeasonTreeRegionDivision {
	division.stages = division.stages.map(
		deserializeSeasonTreeRegionDivisionStage,
	);
	return division;
}

export interface SeasonTreeRegionDivisionStage {
	id: string;
	name: string;
	phase: number;
	registration_mode: string;
	registration_opened_at: Date;
	registration_closed_at: Date;
	started_at: Date;
	ended_at: Date;
	forfeits_max_allowed: number;
	conferences: Array<SeasonTreeRegionDivisionStageConference>;
}

export function deserializeSeasonTreeRegionDivisionStage(
	stage: any,
): SeasonTreeRegionDivisionStage {
	stage.registration_opened_at = new Date(stage.registration_opened_at);
	stage.registration_closed_at = new Date(stage.registration_closed_at);
	stage.started_at = new Date(stage.started_at);
	stage.ended_at = new Date(stage.ended_at);
	stage.conferences = stage.conferences.map(
		deserializeSeasonTreeRegionDivisionStageConference,
	);
	return stage;
}

export interface SeasonTreeRegionDivisionStageConference {
	id: string;
	name: string;
	championship_id: string;
	bracket_style: string;
	started_at: Date;
	ended_at: Date;
}

export function deserializeSeasonTreeRegionDivisionStageConference(
	conference: any,
): SeasonTreeRegionDivisionStageConference {
	conference.started_at = new Date(conference.started_at);
	conference.ended_at = new Date(conference.ended_at);
	return conference;
}

// I really don't want to bother typing this when we only need it for coaches and substitutes.
// https://www.faceit.com/api/match/v2/match/1-1ad07481-c723-4251-88a9-5fbb0827213d
export interface Match {
	teams: { [key: string]: MatchTeam | undefined };
}

export function deserializeMatch(match: any): Match {
	Object.keys(match.teams).forEach((key) => {
		match.teams[key] = deserializeMatchTeam(match.teams[key]);
	});
	return match;
}

export interface MatchTeam {
	id: string;
	type: string;
	name: string;
	avatar: string;
	leader: string;
	roster: MatchTeamRoster[];
	substitutes: MatchTeamSubstitute[];
	coaches: MatchTeamCoach[];
	usersPermissions: UsersPermissions;
	substituted: boolean;
}

export function deserializeMatchTeam(matchTeam: any): MatchTeam {
	matchTeam.roster = matchTeam.roster?.map(deserializeMatchTeamRoster);
	matchTeam.substitutes = matchTeam.substitutes?.map(
		deserializeMatchTeamSubstitute,
	);
	matchTeam.coaches = matchTeam.coaches?.map(deserializeMatchTeamCoach);
	return matchTeam;
}

export interface MatchTeamRoster {
	id: string;
	nickname: string;
	avatar: string;
	gameId: string;
	gameName: string;
	memberships: string[];
	elo: number;
	gameSkillLevel: number;
	acReq: boolean;
	streaming: boolean;
}

export function deserializeMatchTeamRoster(
	matchTeamRoster: any,
): MatchTeamRoster {
	return matchTeamRoster;
}

export interface MatchTeamSubstitute {
	id: string;
	nickname: string;
	avatar?: string;
	gameId: string;
	gameName: string;
	memberships: string[];
	elo: number;
	gameSkillLevel: number;
	acReq: boolean;
	streaming: boolean;
}

export function deserializeMatchTeamSubstitute(
	matchTeamSubstitute: any,
): MatchTeamSubstitute {
	return matchTeamSubstitute;
}

export interface MatchTeamCoach {
	id: string;
	nickname: string;
	avatar: string;
	gameId: string;
	gameName: string;
	memberships: string[];
	elo: number;
	gameSkillLevel: number;
	acReq: boolean;
	streaming: boolean;
}

export function deserializeMatchTeamCoach(matchTeamCoach: any): MatchTeamCoach {
	return matchTeamCoach;
}

export interface UsersPermissions {
	[key: string]: string[];
}
