import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_game_maps_type" AS ENUM('control', 'escort', 'hybrid', 'push', 'flashpoint', 'clash');
  CREATE TABLE "game_maps" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"type" "enum_game_maps_type" NOT NULL,
  	"image" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "matches_maps_played" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"map_id" integer NOT NULL,
  	"winner_id" integer,
  	"score" varchar
  );
  
  CREATE TABLE "player_match_stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tournament_id" integer NOT NULL,
  	"round_id" integer NOT NULL,
  	"match_id" integer NOT NULL,
  	"map_id" integer NOT NULL,
  	"map_number" numeric NOT NULL,
  	"player_id" integer NOT NULL,
  	"team_id" integer NOT NULL,
  	"fantasy_points" numeric DEFAULT 0 NOT NULL,
  	"stats_kills" numeric DEFAULT 0,
  	"stats_deaths" numeric DEFAULT 0,
  	"stats_assists" numeric DEFAULT 0,
  	"stats_damage" numeric DEFAULT 0,
  	"stats_healing" numeric DEFAULT 0,
  	"stats_mitigated" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "game_maps_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "player_match_stats_id" integer;
  ALTER TABLE "matches_maps_played" ADD CONSTRAINT "matches_maps_played_map_id_game_maps_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."game_maps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "matches_maps_played" ADD CONSTRAINT "matches_maps_played_winner_id_teams_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "matches_maps_played" ADD CONSTRAINT "matches_maps_played_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."matches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "player_match_stats" ADD CONSTRAINT "player_match_stats_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "player_match_stats" ADD CONSTRAINT "player_match_stats_round_id_tournament_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."tournament_rounds"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "player_match_stats" ADD CONSTRAINT "player_match_stats_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "player_match_stats" ADD CONSTRAINT "player_match_stats_map_id_game_maps_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."game_maps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "player_match_stats" ADD CONSTRAINT "player_match_stats_player_id_tournament_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."tournament_players"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "player_match_stats" ADD CONSTRAINT "player_match_stats_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "game_maps_name_idx" ON "game_maps" USING btree ("name");
  CREATE INDEX "game_maps_updated_at_idx" ON "game_maps" USING btree ("updated_at");
  CREATE INDEX "game_maps_created_at_idx" ON "game_maps" USING btree ("created_at");
  CREATE INDEX "matches_maps_played_order_idx" ON "matches_maps_played" USING btree ("_order");
  CREATE INDEX "matches_maps_played_parent_id_idx" ON "matches_maps_played" USING btree ("_parent_id");
  CREATE INDEX "matches_maps_played_map_idx" ON "matches_maps_played" USING btree ("map_id");
  CREATE INDEX "matches_maps_played_winner_idx" ON "matches_maps_played" USING btree ("winner_id");
  CREATE INDEX "player_match_stats_tournament_idx" ON "player_match_stats" USING btree ("tournament_id");
  CREATE INDEX "player_match_stats_round_idx" ON "player_match_stats" USING btree ("round_id");
  CREATE INDEX "player_match_stats_match_idx" ON "player_match_stats" USING btree ("match_id");
  CREATE INDEX "player_match_stats_map_idx" ON "player_match_stats" USING btree ("map_id");
  CREATE INDEX "player_match_stats_player_idx" ON "player_match_stats" USING btree ("player_id");
  CREATE INDEX "player_match_stats_team_idx" ON "player_match_stats" USING btree ("team_id");
  CREATE INDEX "player_match_stats_fantasy_points_idx" ON "player_match_stats" USING btree ("fantasy_points");
  CREATE INDEX "player_match_stats_updated_at_idx" ON "player_match_stats" USING btree ("updated_at");
  CREATE INDEX "player_match_stats_created_at_idx" ON "player_match_stats" USING btree ("created_at");
  CREATE INDEX "match_mapNumber_idx" ON "player_match_stats" USING btree ("match_id","map_number");
  CREATE INDEX "player_round_idx" ON "player_match_stats" USING btree ("player_id","round_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_game_maps_fk" FOREIGN KEY ("game_maps_id") REFERENCES "public"."game_maps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_player_match_stats_fk" FOREIGN KEY ("player_match_stats_id") REFERENCES "public"."player_match_stats"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_game_maps_id_idx" ON "payload_locked_documents_rels" USING btree ("game_maps_id");
  CREATE INDEX "payload_locked_documents_rels_player_match_stats_id_idx" ON "payload_locked_documents_rels" USING btree ("player_match_stats_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "game_maps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "matches_maps_played" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "player_match_stats" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "game_maps" CASCADE;
  DROP TABLE "matches_maps_played" CASCADE;
  DROP TABLE "player_match_stats" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_game_maps_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_player_match_stats_fk";
  
  DROP INDEX "payload_locked_documents_rels_game_maps_id_idx";
  DROP INDEX "payload_locked_documents_rels_player_match_stats_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "game_maps_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "player_match_stats_id";
  DROP TYPE "public"."enum_game_maps_type";`)
}
