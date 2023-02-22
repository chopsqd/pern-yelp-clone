const db = require("../db");

const getAllRestaurants = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM restaurants")
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
        const result = await db.query(
            "SELECT * FROM restaurants WHERE id = $1",
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

const createRestaurant = async (req, res) => {
    try {
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

module.exports = {
    getAllRestaurants,
    getOneRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
}