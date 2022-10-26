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
        res.json({data:[...reducedData]});
    }
    else{
    const data = await service.list();
    res.json({data});
    }
}

module.exports = {
    list: asyncErrorBoundary(list),
}