CREATE TABLE `selections` (
	`card_id` integer PRIMARY KEY NOT NULL,
	`team_name` text NOT NULL,
	`device_id` text NOT NULL,
	`selected_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `selections_device_id_unique` ON `selections` (`device_id`);