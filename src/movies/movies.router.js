const router = require("express").Router({mergeParams: true});
const controller = require("./movies.controller");
const theaterRouter = require("../theaters/theaters.router");
const reviewRouter = require("../reviews/reviews.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.use("/:movieId/theaters", controller.movieExists, theaterRouter);
router.use("/:movieId/reviews", controller.movieExists, reviewRouter);

module.exports = router;