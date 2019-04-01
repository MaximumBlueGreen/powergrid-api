exports.up = function(knex) {
	return knex.schema
		.alterTable("t_users", function (table) {
			table.dropTimestamps();
		})
		.alterTable("t_clues", function(table) {
			table.dropTimestamps();
		})
		.alterTable("t_clues_publishers", function(table) {
			table.dropTimestamps();
		})
		.alterTable("t_entries", function(table) {
			table.dropTimestamps();
		})
		.alterTable("t_puzzles", function(table) {
			table.dropTimestamps();
		})
		.alterTable("t_puzzles_permissions", function(table) {
			table.dropTimestamps();
		})
		.alterTable("t_users", function (table) {
			table.timestamps(true, true);
		})
		.alterTable("t_clues", function(table) {
			table.timestamps(true, true);
		})
		.alterTable("t_clues_publishers", function(table) {
			table.timestamps(true, true);
		})
		.alterTable("t_entries", function(table) {
			table.timestamps(true, true);
		})
		.alterTable("t_puzzles", function(table) {
			table.timestamps(true, true);
		})
		.alterTable("t_puzzles_permissions", function(table) {
			table.timestamps(true, true);
		});
};

exports.down = function(knex) {
	return knex.schema
		.alterTable("t_users", function (table) {
			table.dropTimestamps();
		})
		.alterTable("t_clues", function(table) {
			table.dropTimestamps();
		})
		.alterTable("t_clues_publishers", function(table) {
			table.dropTimestamps();
		})
		.alterTable("t_entries", function(table) {
			table.dropTimestamps();
		})
		.alterTable("t_puzzles", function(table) {
			table.dropTimestamps();
		})
		.alterTable("t_puzzles_permissions", function(table) {
			table.dropTimestamps();
		})
		.alterTable("t_users", function (table) {
			table.timestamps();
		})
		.alterTable("t_clues", function(table) {
			table.timestamps();
		})
		.alterTable("t_clues_publishers", function(table) {
			table.timestamps();
		})
		.alterTable("t_entries", function(table) {
			table.timestamps();
		})
		.alterTable("t_puzzles", function(table) {
			table.timestamps();
		})
		.alterTable("t_puzzles_permissions", function(table) {
			table.timestamps();
		});
};
