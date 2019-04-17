const { bookshelf } = require("../knexfile");

const Entry = bookshelf.Model.extend({
	tableName: "t_entries",
	user: function() {
		return this.belongsTo(User);
	},
});
const Puzzle = bookshelf.Model.extend({
	accessors: function() {
		return this.belongsToMany(User, "t_puzzles_permissions", "puzzle_id", "user_id");
	},
	creator: function() {
		return this.belongsTo(User, "creator_id");
	},
	parse: function(response) {
		return response.puzzle ? Object.assign(JSON.parse(response.puzzle), Object.assign(response, { puzzle: undefined })) : response;
	},
	tableName: "t_puzzles",
});

const User = bookshelf.Model.extend({
	entries: function() {
		return this.hasMany(Entry);
	},
	hidden: ["password", "salt"],
	puzzles: function () {
		return this.hasMany(Puzzle);
	},
	tableName: "t_users",
});

module.exports = Puzzle;
