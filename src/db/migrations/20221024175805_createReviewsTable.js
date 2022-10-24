
exports.up = function(knex) {
  return knex.schema.createTable("reviews", (table)=>{
    table.increments("review_id").primary();
table.text("content").notNullable();
table.integer("score").notNullable();
table.foreign("critic_id").references("critics.critics_id").notNullable();
table.foreign("movie_id").references("movies.movie_id").notNullable();
table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("reviews");
};
