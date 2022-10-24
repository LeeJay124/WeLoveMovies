const knex = require("../db/connection");

function list(){
    return knex("reviews").select("*");
}



module.exports = {
    list, 
}