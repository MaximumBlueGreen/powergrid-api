exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('t_users', function (table) {
      table.increments();
      table.string('handle', 32).notNullable();
      table.string('email', 64).notNullable();
      table.string('name', 64).notNullable();
      table.timestamps();

      table.unique('email');
      table.unique('handle');
    })
    .createTable('t_clues', function(table) {
      table.increments();
      table.string('entry', 32).notNullable();
      table.string('clue', 128).notNullable();
      table.timestamps();

      table.unique(['entry', 'clue']);
    })
    .createTable('t_clues_publishers', function(table) {
      table.integer('clue_id').unsigned().notNullable();
      table.string('publisher_name', 64).notNullable();
      table.integer('count').unsigned().notNullable().defaultTo(0);
      table.timestamps();

      table.foreign('clue_id').references('t_clues.id');
    })
    .createTable('t_entries', function(table) {
      table.increments();
      table.string('entry', 32).notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.integer('score').notNullable().defaultTo(0);
      table.timestamps();

      table.foreign('user_id').references('t_users.id');
    })
    .createTable('t_puzzles', function(table) {
      table.increments();
      table.integer('creator_id').unsigned().notNullable();
      table.string('puzzle', 2048).notNullable();
      table.string('title', 64);
      table.text('notepad');
      table.text('notes');
      table.timestamps();

      table.foreign('creator_id').references('t_users.id');
    })
    .createTable('t_puzzles_permissions', function(table) {
      table.integer('puzzle_id').unsigned().notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.enu('permission_level', ['NONE', 'COMMENT', 'EDIT', 'READ'], { useNative: true, enumName: 'permission_level' }).notNullable().defaultTo('NONE');
      table.timestamps();

      table.foreign('puzzle_id').references('t_puzzles.id');
      table.foreign('user_id').references('t_users.id');
    })
}

exports.down = function(knex, Promise) {
  /* Drop tables in reverse order of creation to prevent reference errors */
  return knex.schema
    .dropTable('t_puzzles_permissions')
    .dropTable('t_puzzles')
    .dropTable('t_entries')
    .dropTable('t_clues_publishers')
    .dropTable('t_clues')
    .dropTable('t_users')
    .raw('DROP TYPE permission_level');
};
