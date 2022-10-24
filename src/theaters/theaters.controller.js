const service = require("./theaters.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res,next){
    const data = await service.list();
    res.json({data});
}

module.exports = {
    list: asyncErrorBoundary(list),
}