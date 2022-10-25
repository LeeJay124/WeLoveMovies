//create movies table
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

  //create theaters table

exports.up = function (knex) {
    return knex.schema.createTable("theaters", (table) => {
        table.increments("theater_id").primary();
        table.string("name").notNullable();
        table.string("address_line_1").notNullable();
        table.string("address_line_2");
        table.string("city").notNullable();
        table.string("state").notNullable();
        table.string("zip").notNullable();
        table.timestamps(true, true);
    }
    )
}
exports.down = function (knex) {
    return knex.schema.dropTable("theaters");
};


//create critics table


exports.up = function(knex) {
    return knex.schema.createTable("critics", (table)=>{
  table.increments("critic_id").primary();
  table.string("preferred_name").notNullable();
  table.string("surname").notNullable();
  table.string("organization_name").notNullable();
  table.timestamps(true, true);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("critics");
  };

  
  //create reviews table


  exports.up = function(knex) {
    return knex.schema.createTable("reviews", (table)=>{
      table.increments("review_id").primary();
  table.text("content").notNullable();
  table.integer("score").notNullable();
  table.integer("critic_id").unsigned().notNullable();
  table.integer("movie_id").unsigned().notNullable();
  table.foreign().references("critics.critic_id");
  table.foreign().references("movies.movie_id");
  table.timestamps(true, true);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
  };


//create movies theaters table


exports.up = function(knex) {
    return knex.schema.createTable("movies_theaters", (table)=>{
        table.integer("movie_id").unsigned().notNullable();
        table.integer("theater_id").unsigned().notNullable();
      table.foreign("movie_id").references("movie_id").inTable("movies");
      table.foreign("theater_id").references("theater_id").inTable("theaters");
      table.boolean("is_showing");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("movies_theaters");
  };
  