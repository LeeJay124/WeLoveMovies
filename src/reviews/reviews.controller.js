const service = require("./reviews.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res,next){
    const {movieId} = req.params;
    if(movieId){
        const data = await service.reviewsForMovie(movieId);

        const formattedReviews = data.map((item)=>{
          return  {
    review_id: item.review_id,
    content: item.content,
    score: item.score, 
    created_at: item.created_at,
    updated_at: item.updated_at,
    critic_id: item.critic_id,
    movie_id: item.movie_id,
    critic: {
    critic_id: item.critic_id,
    preferred_name: item.preferred_name,
    surname: item.surname,
    organization_name: item.organization_name,
    created_at: item.created_at,
    updated_at: item.updated_at
      }  }
 
        })
       res.json({data:formattedReviews});
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
    const reviewToReturn = await service.updatedReviewWithCritic(
    res.locals.review.review_id
    );
   
    
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