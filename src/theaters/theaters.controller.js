const service = require("./theaters.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res,next){
    const {movieId} = req.params;
    if(movieId){
        const data = await service.theatersForMovie(movieId);
        res.json({data});
    }
    else{
        const data = await service.list();
        res.json({data});
    }
   
}

module.exports = {
    list: asyncErrorBoundary(list),
}