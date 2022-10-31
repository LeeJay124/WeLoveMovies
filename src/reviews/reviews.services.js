const knex = require("../db/connection");


//Knex query to list reviews
function list(){
    return knex("reviews").select("*");
}

//Knex query to list reviews for a specific movie
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

//Knex query to read a specific review based on review id provided
function read(reviewId){
    return knex("reviews")
    .select("*")
    .where({review_id:reviewId})
    .first();
}


//Knex query to update a specific review
function update(updatedReview){
    return knex("reviews")
    .select("*")
    .where({review_id: updatedReview.review_id})
    .update(updatedReview, ["content", "score"])
    .then((data)=> data[0]);
}

//Knex query to return updated review including the critic information
function updatedReviewWithCritic(reviewId){
    return knex
    .select("reviews.review_id","reviews.content", 
    "reviews.score", "reviews.created_at", "reviews.updated_at", 
    "reviews.critic_id", "reviews.movie_id", "critics.critic_id", 
    "critics.preferred_name", "critics.surname", "critics.created_at", "critics.updated_at", "critics.organization_name")
    .from("reviews")
    .leftJoin("critics", "critics.critic_id", "=", "reviews.critic_id")
    .where({review_id:reviewId})
    .first()
    .then((data)=>{
        return  {
            review_id: data.review_id,
            content: data.content,
            score: data.score, 
            created_at: data.created_at,
            updated_at: data.updated_at,
            critic_id: data.critic_id,
            movie_id: data.movie_id,
            critic: {
            critic_id: data.critic_id,
            preferred_name: data.preferred_name,
            surname: data.surname,
            organization_name: data.organization_name,
            created_at: data.created_at,
            updated_at: data.updated_at
              }  }
    });
}

//Knex query to delete a review 
function destroy(review_id){
    return knex("reviews").where({review_id}).del();
}

module.exports = {
    list, reviewsForMovie, delete:destroy,
    read, update, updatedReviewWithCritic
}