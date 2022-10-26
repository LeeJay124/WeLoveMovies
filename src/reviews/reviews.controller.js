const service = require("./reviews.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");
const reduceCritics = reduceProperties("critic", {
    critic_id: ["critic", null, "critic_id"],
    preferred_name: ["critic", null, "preferred_name"],
    surname: ["critic", null, "surname"],
    organization_name: ["critic", null, "organization_name"],
    created_at: ["critic", null, "created_at"],
    updated_at: ["critic", null, "updated_at"],
  });

async function list(req, res,next){
    const {movieId} = req.params;
    if(movieId){
        const data = await service.reviewsForMovie(movieId);
        const reducedData = reduceCritics(data);
        console.log(reducedData);
       res.json({data:reducedData})
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
async function update(req,res,next){
    const data = await service.update(req.body.data);
    console.log(req.body.data);
    res.json({data});

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