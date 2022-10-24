
exports.up = function(knex) {
  return knex.schema.createTable("critics", (table)=>{
table.increments("critics_id").primary();
table.string("preferred_name").notNullable();
table.string("surname").notNullable();
table.string("organization_name").notNullable();
table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("critics");
};
