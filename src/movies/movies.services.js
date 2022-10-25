const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
}
function isShowing() {
  return knex
  .select("m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
  .from("movies as m")
  .leftJoin("movies_theaters as mt", "m.movie_id", "=", "mt.movie_id")
  .where({"mt.is_showing" : true})
  .groupBy("m.movie_id")
  .orderBy("m.movie_id");
}

function read(movie_id){
    return knex
    .select("*")
    .from("movies as m")
    .where({"m.movie_id":movie_id})
    .first();

}

module.exports = {
    list, isShowing, read
}