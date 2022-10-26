const service = require("./theaters.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");
const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
  });
async function list(req, res,next){
    const {movieId} = req.params;
    if(movieId){
        const data = await service.theatersForMovie(movieId);
        res.json({data});
    }
    else{
        let data = await service.list();
        data = reduceMovies(data);
        res.json({data});
    }
   
}

module.exports = {
    list: asyncErrorBoundary(list),
}