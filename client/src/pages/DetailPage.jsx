import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {RestaurantsContext} from "../context/RestaurantsContext";
import RestaurantAPI from "../api/RestaurantAPI";
import {Reviews, AddReview, StarRating, ErrorAlert, Loader} from "../components";

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

    if (loading && !error) return <Loader />

    return (
        <>
            <h1 className={"text-center display-1"}>{selectedRestaurant?.restaurant?.name || 'Detail Page'}</h1>
            <div className={"text-center"}>
                <StarRating rating={selectedRestaurant?.restaurant?.average_rating}/>
                <span className={"text-warning ml-1"}>
                    {selectedRestaurant?.restaurant?.count ? `(${selectedRestaurant?.restaurant?.count})` : '(0)'}
                </span>
            </div>

            <Reviews reviews={selectedRestaurant.reviews}/>
            <AddReview/>

            {error && <ErrorAlert error={error.message} />}
        </>
    );
};

export default DetailPage;