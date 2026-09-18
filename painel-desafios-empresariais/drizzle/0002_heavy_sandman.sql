ALTER TABLE `game_state` ADD `timer_status` text DEFAULT 'idle' NOT NULL;--> statement-breakpoint
ALTER TABLE `game_state` ADD `timer_duration` integer DEFAULT 300 NOT NULL;--> statement-breakpoint
ALTER TABLE `game_state` ADD `timer_remaining` integer DEFAULT 300 NOT NULL;--> statement-breakpoint
ALTER TABLE `game_state` ADD `timer_end_at` integer;--> statement-breakpoint
ALTER TABLE `game_state` ADD `pin_hash` text;