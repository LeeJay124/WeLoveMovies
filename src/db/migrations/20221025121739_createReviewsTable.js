exports.up = function(knex) {
    return knex.schema.createTable("reviews", (table)=>{
      table.increments("review_id").primary();
  table.text("content").notNullable();
  table.integer("score").notNullable();
  table.integer("critic_id").unsigned().notNullable();
  table.integer("movie_id").unsigned().notNullable();
  table.foreign("critic_id").references("critic_id").inTable("critics").onDelete("CASCADE");
  table.foreign("movie_id").references("movie_id").inTable("movies").onDelete("CASCADE");
  table.timestamps(true, true);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
  };