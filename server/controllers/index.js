const db = require("../db");

const getAllRestaurants = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM restaurants;")
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

module.exports = {
    getAllRestaurants
}