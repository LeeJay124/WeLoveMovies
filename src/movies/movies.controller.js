const service = require("./movies.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//List movies based on is showing
async function list(req, res,next){
    const {is_showing} = req.query;
    if(is_showing == "true"){
         const data = await service.isShowing();
         res.json({data});
    }else{
     const data = await service.list();
     res.json({data});
    }
    
}
//Check whether the movie exists
async function movieExists(req, res,next){
    const {movieId} = req.params;
    const movie = await service.read(movieId);
    if(movie){
        res.locals.movie = movie;
        return next();
    }
    return next({status: 404, message: `Movie does not exist`})

}
//Read movie based on movie id provided
async function read(req, res, next){
const {movieId} = req.params;
const data = await service.read(movieId);
res.json({data});
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    movieExists:[asyncErrorBoundary(movieExists)],
}