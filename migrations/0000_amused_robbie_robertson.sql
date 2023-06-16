CREATE TABLE IF NOT EXISTS "todos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"password" text NOT NULL
);
