
exports.up = function(knex) {
  return knex.schema.createTable("movies", (table)=> {
    table.increments("movie_id").primary();
    table.string("title").notNullable();
    table.integer("runtime_in_minutes");
    table.string("rating");
    table.text("description").notNullable();
    table.string("image_url");
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("movies");
};
