const knex = require("../db/connection");

function list(){
    return knex("reviews").select("*");
}
function reviewsForMovie(movieId){
    return knex
    .select("reviews.review_id","reviews.content", 
    "reviews.score", "reviews.created_at", "reviews.updated_at", 
    "reviews.critic_id", "reviews.movie_id", "critics.critic_id", 
    "critics.preferred_name", "critics.surname", "critics.created_at", "critics.updated_at", "critics.organization_name")
    .from("reviews")
    .leftJoin("critics", "critics.critic_id", "=", "reviews.critic_id")
    .where({"reviews.movie_id": movieId})
    
}

function read(reviewId){
    return knex("reviews")
    .select("*")
    .where({review_id:reviewId})
    .first();
}

function update(updatedReview){
    return knex("reviews")
    .select("*")
    .where({review_id: updatedReview.review_id})
    .update(updatedReview, ["content", "score"])
    .then((data)=> data[0]);
}
function destroy(review_id){
    return knex("reviews").where({review_id}).del();
}

module.exports = {
    list, reviewsForMovie, delete:destroy,
    read, update
}