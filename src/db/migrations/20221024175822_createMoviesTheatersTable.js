
exports.up = function(knex) {
  return knex.schema.createTable("movies_theaters", (table)=>{
    table.foreign("movie_id").references("movies.movie_id").notNullable();
    table.foreign("theater_id").references("theaters.theater_id").notNullable();
    table.boolean("is_showing").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters");
};
