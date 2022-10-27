const service = require("./reviews.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

const reduceCritics = reduceProperties("movie_id",{
    review_id: ["reviews", null, "review_id"],
    content: ["reviews", null, "content"],
    score: ["reviews", null, "score"], 
    created_at: ["reviews", null, "created_at"],
    updated_at: ["reviews", null, "updated_at"],
    critic_id: ["reviews", null, "critic_id"],
    movie_id: ["reviews", null, "movie_id"],
    
    critic_id: ["critic", null, "critic_id"],
    preferred_name: ["critic", null, "preferred_name"],
    surname: ["critic", null, "surname"],
    organization_name: ["critic", null, "organization_name"],
    created_at: ["critic", null, "created_at"],
    updated_at: ["critic", null, "updated_at"]
   
  });

async function list(req, res,next){
    const {movieId} = req.params;
    if(movieId){
        const data = await service.reviewsForMovie(movieId);
      
        const spreadData = [...data];
        console.log(spreadData)
       const formattedData = reduceCritics(spreadData);
       res.json({data:formattedData});
    }
    else{
    const data = await service.list();
    res.json({data});
    }
}
async function reviewExists(req, res, next){
    const {reviewId}= req.params;
    const existingReview = await service.read(reviewId);
    if(existingReview){
        res.locals.review = existingReview;
        return next();
    }
    return next({status: 404, message: `Review cannot be found`});
}

async function read(req, res, next){
    const {review} = res.locals;
    res.json({data:review});
}
async function update(req, res) {
    const updatedReview = { ...res.locals.review, ...req.body.data };
    await service.update(updatedReview);
    const reviewToReturn = await service.read(
    res.locals.review.review_id
    );
    //const formattedReview = reduceCritics(reviewToReturn);
    res.json({ data: reviewToReturn });
    }

async function destroy(req, res, next){
    const {review} = res.locals;
    await service.delete(review.review_id);
    res.sendStatus(204);
    
}

module.exports = {
    list: asyncErrorBoundary(list),
    destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    read: [asyncErrorBoundary(reviewExists), read],
    update:[asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
}