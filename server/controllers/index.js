const db = require("../db");

const getAllRestaurants = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM restaurants LEFT JOIN (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id")

        res.status(200).json({
            status: "success",
            data: {
                restaurants: result.rows
            },
            amount: result.rows.length
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getOneRestaurant = async (req, res) => {
    try {
        const restaurant = await db.query(
            "SELECT * FROM restaurants LEFT JOIN (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1",
            [req.params.id]
        );

        const reviews = await db.query(
            "SELECT * FROM reviews WHERE restaurant_id = $1",
            [req.params.id]
        )

        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const createRestaurant = async (req, res) => {
    try {
        if(!req.body.name || !req.body.location || !req.body.price_range) {
            return res.status(500).json({message: 'All fields must be filled in!'})
        }

        const result = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
            [req.body.name, req.body.location, req.body.price_range]
        )

        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateRestaurant = async (req, res) => {
    try {
        if(!req.body.name || !req.body.location || !req.body.price_range) {
            return res.status(500).json('All fields must be filled in!')
        }

        const result = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        )

        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deleteRestaurant = async (req, res) => {
    try {
        const result = await db.query(
            "DELETE FROM restaurants WHERE id = $1",
            [req.params.id]
        )

        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const createReview = async (req, res) => {
    try {
        if(!req.body.name || !req.body.rating || !req.body.review) {
            return res.status(500).json({message: 'All fields must be filled in!'})
        }

        const result = await db.query(
            "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *",
            [req.params.id, req.body.name, req.body.review, req.body.rating]
        )

        res.status(200).json({
            status: "success",
            data: {
                review: result.rows[0]
            }
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    getAllRestaurants,
    getOneRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createReview
}