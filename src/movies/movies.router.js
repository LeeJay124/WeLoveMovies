const router = require("express").Router({mergeParams: true});
const controller = require("./movies.controller");
const theaterRouter = require("../theaters/theaters.router");
const reviewRouter = require("../reviews/reviews.router");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

//Use CORS
router.use(cors());
router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
//Routes that require merging parameters
router.use("/:movieId/theaters", controller.movieExists, theaterRouter);
router.use("/:movieId/reviews", controller.movieExists, reviewRouter);

module.exports = router;