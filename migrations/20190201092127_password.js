
exports.up = function(knex) {
	return knex.schema.alterTable("t_users", function(t) {
		t.specificType("password", "CHAR(256)").notNullable();
		t.specificType("salt", "CHAR(64)").notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.alterTable("t_users", function(t) {
		t.dropColumn("password");
		t.dropColumn("salt");
	});
};
