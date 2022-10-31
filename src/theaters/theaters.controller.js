const service = require("./theaters.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");
//Reduce movies to group them together
const reduceMovies = reduceProperties("theater_id", {
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  });
  //List theaters depending on if movie id provided
async function list(req, res,next){
    const {movieId} = req.params;
    if(movieId){
        const data = await service.theatersForMovie(movieId);
        res.json({data});
    }
    else{
        const data = await service.list();
        const formattedData = reduceMovies(data);
        res.json({data:formattedData});
    }
   
}

module.exports = {
    list: asyncErrorBoundary(list),
}