import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {RestaurantsContext} from "../context/RestaurantsContext";
import RestaurantAPI from "../api/RestaurantAPI";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";
import StarRating from "../components/StarRating";

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
            <h1 className={"text-center display-1"}>{selectedRestaurant?.restaurant?.name}</h1>
            <div className={"text-center"}>
                <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
                <span className={"text-warning ml-1"}>
                    {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : '(0)'}
                </span>
            </div>

            <Reviews reviews={selectedRestaurant.reviews}/>
            <AddReview/>

            {error && <div className="alert alert-warning" role="alert">
                Data fetching error: {error.message}. Try again later...
            </div>}
        </>
    );
};

export default DetailPage;