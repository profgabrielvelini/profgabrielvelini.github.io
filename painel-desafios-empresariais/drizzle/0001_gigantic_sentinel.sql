CREATE TABLE `game_state` (
	`id` integer PRIMARY KEY NOT NULL,
	`current_round` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
DROP INDEX `selections_device_id_unique`;--> statement-breakpoint
ALTER TABLE `selections` ADD `round` integer DEFAULT 1 NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `selections_device_round_unique` ON `selections` (`device_id`,`round`);