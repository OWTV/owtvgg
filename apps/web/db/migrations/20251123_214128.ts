import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'user');
  CREATE TYPE "public"."enum_tournaments_roster_structure_role" AS ENUM('tank', 'damage', 'support');
  CREATE TYPE "public"."enum_tournament_players_role" AS ENUM('tank', 'damage', 'support');
  CREATE TYPE "public"."enum_players_role" AS ENUM('tank', 'support', 'damage', 'flex');
  CREATE TABLE "users_role" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_role",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"players_id" integer
  );
  
  CREATE TABLE "draft_rosters_players" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" integer NOT NULL,
  	"assigned_role" varchar NOT NULL,
  	"is_captain" boolean DEFAULT false
  );
  
  CREATE TABLE "draft_rosters" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"tournament_id" integer NOT NULL,
  	"total_cost" numeric,
  	"is_valid" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "matches" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tournament_id" integer NOT NULL,
  	"round_id" integer NOT NULL,
  	"start_time" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone,
  	"home_team_id" integer NOT NULL,
  	"home_score" numeric DEFAULT 0,
  	"away_team_id" integer NOT NULL,
  	"away_score" numeric DEFAULT 0,
  	"winner_id" integer,
  	"external_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "published_rosters_roster_snapshot" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"player_id" integer NOT NULL,
  	"score" numeric DEFAULT 0,
  	"is_captain" boolean DEFAULT false
  );
  
  CREATE TABLE "published_rosters" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"round_id" integer NOT NULL,
  	"total_score" numeric DEFAULT 0,
  	"rank" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tournament_rounds" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"tournament_id" integer NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"lock_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tournaments_roster_structure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"role" "enum_tournaments_roster_structure_role" NOT NULL,
  	"count" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE "tournaments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"budget" numeric DEFAULT 100 NOT NULL,
  	"transfer_limit" numeric DEFAULT 2 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tournament_players_price_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"round_id" integer NOT NULL,
  	"price" numeric NOT NULL
  );
  
  CREATE TABLE "tournament_players" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tournament_id" integer NOT NULL,
  	"player_id" integer NOT NULL,
  	"team_id" integer NOT NULL,
  	"role" "enum_tournament_players_role" NOT NULL,
  	"current_price" numeric DEFAULT 10 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "players" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_players_role" NOT NULL,
  	"is_archived" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "teams" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "teams_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"players_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "draft_rosters_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "matches_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "published_rosters_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tournament_rounds_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tournaments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tournament_players_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "players_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "teams_id" integer;
  ALTER TABLE "users_role" ADD CONSTRAINT "users_role_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_players_fk" FOREIGN KEY ("players_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "draft_rosters_players" ADD CONSTRAINT "draft_rosters_players_item_id_tournament_players_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."tournament_players"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "draft_rosters_players" ADD CONSTRAINT "draft_rosters_players_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."draft_rosters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "draft_rosters" ADD CONSTRAINT "draft_rosters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "draft_rosters" ADD CONSTRAINT "draft_rosters_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "matches" ADD CONSTRAINT "matches_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "matches" ADD CONSTRAINT "matches_round_id_tournament_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."tournament_rounds"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "matches" ADD CONSTRAINT "matches_home_team_id_teams_id_fk" FOREIGN KEY ("home_team_id") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "matches" ADD CONSTRAINT "matches_away_team_id_teams_id_fk" FOREIGN KEY ("away_team_id") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "matches" ADD CONSTRAINT "matches_winner_id_teams_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "published_rosters_roster_snapshot" ADD CONSTRAINT "published_rosters_roster_snapshot_player_id_tournament_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."tournament_players"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "published_rosters_roster_snapshot" ADD CONSTRAINT "published_rosters_roster_snapshot_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."published_rosters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "published_rosters" ADD CONSTRAINT "published_rosters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "published_rosters" ADD CONSTRAINT "published_rosters_round_id_tournament_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."tournament_rounds"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tournament_rounds" ADD CONSTRAINT "tournament_rounds_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tournaments_roster_structure" ADD CONSTRAINT "tournaments_roster_structure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tournaments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tournament_players_price_history" ADD CONSTRAINT "tournament_players_price_history_round_id_tournament_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."tournament_rounds"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tournament_players_price_history" ADD CONSTRAINT "tournament_players_price_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tournament_players"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tournament_players" ADD CONSTRAINT "tournament_players_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tournament_players" ADD CONSTRAINT "tournament_players_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tournament_players" ADD CONSTRAINT "tournament_players_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "teams_rels" ADD CONSTRAINT "teams_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "teams_rels" ADD CONSTRAINT "teams_rels_players_fk" FOREIGN KEY ("players_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_role_order_idx" ON "users_role" USING btree ("order");
  CREATE INDEX "users_role_parent_idx" ON "users_role" USING btree ("parent_id");
  CREATE INDEX "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX "users_rels_players_id_idx" ON "users_rels" USING btree ("players_id");
  CREATE INDEX "draft_rosters_players_order_idx" ON "draft_rosters_players" USING btree ("_order");
  CREATE INDEX "draft_rosters_players_parent_id_idx" ON "draft_rosters_players" USING btree ("_parent_id");
  CREATE INDEX "draft_rosters_players_item_idx" ON "draft_rosters_players" USING btree ("item_id");
  CREATE INDEX "draft_rosters_user_idx" ON "draft_rosters" USING btree ("user_id");
  CREATE INDEX "draft_rosters_tournament_idx" ON "draft_rosters" USING btree ("tournament_id");
  CREATE INDEX "draft_rosters_updated_at_idx" ON "draft_rosters" USING btree ("updated_at");
  CREATE INDEX "draft_rosters_created_at_idx" ON "draft_rosters" USING btree ("created_at");
  CREATE UNIQUE INDEX "user_tournament_idx" ON "draft_rosters" USING btree ("user_id","tournament_id");
  CREATE INDEX "matches_tournament_idx" ON "matches" USING btree ("tournament_id");
  CREATE INDEX "matches_round_idx" ON "matches" USING btree ("round_id");
  CREATE INDEX "matches_home_team_idx" ON "matches" USING btree ("home_team_id");
  CREATE INDEX "matches_away_team_idx" ON "matches" USING btree ("away_team_id");
  CREATE INDEX "matches_winner_idx" ON "matches" USING btree ("winner_id");
  CREATE INDEX "matches_external_id_idx" ON "matches" USING btree ("external_id");
  CREATE INDEX "matches_updated_at_idx" ON "matches" USING btree ("updated_at");
  CREATE INDEX "matches_created_at_idx" ON "matches" USING btree ("created_at");
  CREATE INDEX "published_rosters_roster_snapshot_order_idx" ON "published_rosters_roster_snapshot" USING btree ("_order");
  CREATE INDEX "published_rosters_roster_snapshot_parent_id_idx" ON "published_rosters_roster_snapshot" USING btree ("_parent_id");
  CREATE INDEX "published_rosters_roster_snapshot_player_idx" ON "published_rosters_roster_snapshot" USING btree ("player_id");
  CREATE INDEX "published_rosters_user_idx" ON "published_rosters" USING btree ("user_id");
  CREATE INDEX "published_rosters_round_idx" ON "published_rosters" USING btree ("round_id");
  CREATE INDEX "published_rosters_total_score_idx" ON "published_rosters" USING btree ("total_score");
  CREATE INDEX "published_rosters_updated_at_idx" ON "published_rosters" USING btree ("updated_at");
  CREATE INDEX "published_rosters_created_at_idx" ON "published_rosters" USING btree ("created_at");
  CREATE UNIQUE INDEX "user_round_idx" ON "published_rosters" USING btree ("user_id","round_id");
  CREATE INDEX "tournament_rounds_tournament_idx" ON "tournament_rounds" USING btree ("tournament_id");
  CREATE INDEX "tournament_rounds_updated_at_idx" ON "tournament_rounds" USING btree ("updated_at");
  CREATE INDEX "tournament_rounds_created_at_idx" ON "tournament_rounds" USING btree ("created_at");
  CREATE INDEX "tournaments_roster_structure_order_idx" ON "tournaments_roster_structure" USING btree ("_order");
  CREATE INDEX "tournaments_roster_structure_parent_id_idx" ON "tournaments_roster_structure" USING btree ("_parent_id");
  CREATE INDEX "tournaments_updated_at_idx" ON "tournaments" USING btree ("updated_at");
  CREATE INDEX "tournaments_created_at_idx" ON "tournaments" USING btree ("created_at");
  CREATE INDEX "tournament_players_price_history_order_idx" ON "tournament_players_price_history" USING btree ("_order");
  CREATE INDEX "tournament_players_price_history_parent_id_idx" ON "tournament_players_price_history" USING btree ("_parent_id");
  CREATE INDEX "tournament_players_price_history_round_idx" ON "tournament_players_price_history" USING btree ("round_id");
  CREATE INDEX "tournament_players_tournament_idx" ON "tournament_players" USING btree ("tournament_id");
  CREATE INDEX "tournament_players_player_idx" ON "tournament_players" USING btree ("player_id");
  CREATE INDEX "tournament_players_team_idx" ON "tournament_players" USING btree ("team_id");
  CREATE INDEX "tournament_players_current_price_idx" ON "tournament_players" USING btree ("current_price");
  CREATE INDEX "tournament_players_updated_at_idx" ON "tournament_players" USING btree ("updated_at");
  CREATE INDEX "tournament_players_created_at_idx" ON "tournament_players" USING btree ("created_at");
  CREATE INDEX "tournament_role_idx" ON "tournament_players" USING btree ("tournament_id","role");
  CREATE INDEX "players_updated_at_idx" ON "players" USING btree ("updated_at");
  CREATE INDEX "players_created_at_idx" ON "players" USING btree ("created_at");
  CREATE INDEX "teams_updated_at_idx" ON "teams" USING btree ("updated_at");
  CREATE INDEX "teams_created_at_idx" ON "teams" USING btree ("created_at");
  CREATE INDEX "teams_rels_order_idx" ON "teams_rels" USING btree ("order");
  CREATE INDEX "teams_rels_parent_idx" ON "teams_rels" USING btree ("parent_id");
  CREATE INDEX "teams_rels_path_idx" ON "teams_rels" USING btree ("path");
  CREATE INDEX "teams_rels_players_id_idx" ON "teams_rels" USING btree ("players_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_draft_rosters_fk" FOREIGN KEY ("draft_rosters_id") REFERENCES "public"."draft_rosters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_matches_fk" FOREIGN KEY ("matches_id") REFERENCES "public"."matches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_published_rosters_fk" FOREIGN KEY ("published_rosters_id") REFERENCES "public"."published_rosters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tournament_rounds_fk" FOREIGN KEY ("tournament_rounds_id") REFERENCES "public"."tournament_rounds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tournaments_fk" FOREIGN KEY ("tournaments_id") REFERENCES "public"."tournaments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tournament_players_fk" FOREIGN KEY ("tournament_players_id") REFERENCES "public"."tournament_players"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_players_fk" FOREIGN KEY ("players_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_teams_fk" FOREIGN KEY ("teams_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_draft_rosters_id_idx" ON "payload_locked_documents_rels" USING btree ("draft_rosters_id");
  CREATE INDEX "payload_locked_documents_rels_matches_id_idx" ON "payload_locked_documents_rels" USING btree ("matches_id");
  CREATE INDEX "payload_locked_documents_rels_published_rosters_id_idx" ON "payload_locked_documents_rels" USING btree ("published_rosters_id");
  CREATE INDEX "payload_locked_documents_rels_tournament_rounds_id_idx" ON "payload_locked_documents_rels" USING btree ("tournament_rounds_id");
  CREATE INDEX "payload_locked_documents_rels_tournaments_id_idx" ON "payload_locked_documents_rels" USING btree ("tournaments_id");
  CREATE INDEX "payload_locked_documents_rels_tournament_players_id_idx" ON "payload_locked_documents_rels" USING btree ("tournament_players_id");
  CREATE INDEX "payload_locked_documents_rels_players_id_idx" ON "payload_locked_documents_rels" USING btree ("players_id");
  CREATE INDEX "payload_locked_documents_rels_teams_id_idx" ON "payload_locked_documents_rels" USING btree ("teams_id");
  ALTER TABLE "users" DROP COLUMN "role";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_role" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "draft_rosters_players" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "draft_rosters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "matches" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "published_rosters_roster_snapshot" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "published_rosters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tournament_rounds" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tournaments_roster_structure" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tournaments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tournament_players_price_history" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tournament_players" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "players" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "teams" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "teams_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_role" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "draft_rosters_players" CASCADE;
  DROP TABLE "draft_rosters" CASCADE;
  DROP TABLE "matches" CASCADE;
  DROP TABLE "published_rosters_roster_snapshot" CASCADE;
  DROP TABLE "published_rosters" CASCADE;
  DROP TABLE "tournament_rounds" CASCADE;
  DROP TABLE "tournaments_roster_structure" CASCADE;
  DROP TABLE "tournaments" CASCADE;
  DROP TABLE "tournament_players_price_history" CASCADE;
  DROP TABLE "tournament_players" CASCADE;
  DROP TABLE "players" CASCADE;
  DROP TABLE "teams" CASCADE;
  DROP TABLE "teams_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_draft_rosters_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_matches_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_published_rosters_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tournament_rounds_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tournaments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tournament_players_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_players_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_teams_fk";
  
  DROP INDEX "payload_locked_documents_rels_draft_rosters_id_idx";
  DROP INDEX "payload_locked_documents_rels_matches_id_idx";
  DROP INDEX "payload_locked_documents_rels_published_rosters_id_idx";
  DROP INDEX "payload_locked_documents_rels_tournament_rounds_id_idx";
  DROP INDEX "payload_locked_documents_rels_tournaments_id_idx";
  DROP INDEX "payload_locked_documents_rels_tournament_players_id_idx";
  DROP INDEX "payload_locked_documents_rels_players_id_idx";
  DROP INDEX "payload_locked_documents_rels_teams_id_idx";
  ALTER TABLE "users" ADD COLUMN "role" varchar DEFAULT 'user';
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "draft_rosters_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "matches_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "published_rosters_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tournament_rounds_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tournaments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tournament_players_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "players_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "teams_id";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_tournaments_roster_structure_role";
  DROP TYPE "public"."enum_tournament_players_role";
  DROP TYPE "public"."enum_players_role";`)
}
