const service = require("./movies.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res,next){
    const {is_showing} = req.query;
    console.log(is_showing);
    if(is_showing == "true"){
         const data = await service.isShowing();
         res.json({data});
    }else{
     const data = await service.list();
     res.json({data});
    }
    
}
async function movieExists(req, res,next){
    const {movieId} = req.params;
    const movie = await service.read(movieId);
    if(movie){
        res.locals.movie = movie;
        return next();
    }
    return next({status: 404, message: `Movie does not exist`})

}
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