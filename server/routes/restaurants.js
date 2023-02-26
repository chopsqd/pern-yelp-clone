const express = require('express')
const router = express.Router()

const RestaurantsController = require("../controllers/RestaurantsController");

router.route('/')
    .get(RestaurantsController.getAllRestaurants)
    .post(RestaurantsController.createRestaurant)

router.route('/:id')
    .get(RestaurantsController.getOneRestaurant)
    .put(RestaurantsController.updateRestaurant)
    .delete(RestaurantsController.deleteRestaurant)

router.route('/:id/reviews')
    .post(RestaurantsController.createRestaurantReview)

module.exports = router