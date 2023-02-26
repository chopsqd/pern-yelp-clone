import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {RestaurantsContext} from "../context/RestaurantsContext";
import RestaurantAPI from "../api/RestaurantAPI";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const DetailPage = () => {
    const {id} = useParams()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await RestaurantAPI.get(`/${id}`)
                setSelectedRestaurant(response.data.data || {})
                setLoading(false)
            } catch (error) {
                setError(error)
            }
        }

        fetchData()
    }, [])

    if (loading && !error) return <div className={"text-center"}>
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>

    return (
        <>
            <h1 className={"text-center display-1"}>{selectedRestaurant.restaurant.name}</h1>
            <Reviews reviews={selectedRestaurant.reviews}/>
            <AddReview />

            {error && <div className="alert alert-warning" role="alert">
                Data fetching error: {error.message}. Try again later...
            </div>}
        </>
    );
};

export default DetailPage;