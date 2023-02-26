import React, {useEffect, useState, useContext} from 'react';
import RestaurantAPI from '../api/RestaurantAPI';
import {useNavigate} from 'react-router-dom'
import {RestaurantsContext} from "../context/RestaurantsContext";
import StarRating from "./StarRating";

const RestaurantList = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {restaurants, setRestaurants} = useContext(RestaurantsContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await RestaurantAPI.get('/')
                setRestaurants(response.data.data.restaurants)
                setLoading(false)
            } catch (error) {
                setError(error)
            }
        }

        fetchData()
    }, [])

    const handleDelete = async (event, id) => {
        event.stopPropagation()
        try {
            if(!window.confirm('Are you sure you want to delete this restaurant?')) return
            await RestaurantAPI.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => restaurant.id !== id))
        } catch (error) {
            setError(error)
        }
    }

    const handleUpdate = (event, id) => {
        event.stopPropagation()
        navigate(`/restaurants/${id}/update`)
    }

    const renderRating = (restaurant) => {
        if(!restaurant.count) {
            return <span className={"text-warning ml-1"}>0 reviews</span>
        }

        return <>
            <StarRating rating={restaurant.average_rating}/>
            <span className={"text-warning ml-1"}>({restaurant.count})</span>
        </>
    }

    if (loading && !error) return <div className={"text-center"}>
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>

    return (
        <div className={"list-group"}>
            {error && <div className="alert alert-warning" role="alert">
                Data fetching error: {error.message}. Try again later...
            </div>}
            <table className="table table-hover table-dark">
                <thead>
                <tr className={"bg-primary"}>
                    <th scope={"col"}>Restaurant</th>
                    <th scope={"col"}>Location</th>
                    <th scope={"col"}>Price Range</th>
                    <th scope={"col"}>Rating</th>
                    <th scope={"col"}>Edit</th>
                    <th scope={"col"}>Delete</th>
                </tr>
                </thead>
                <tbody>
                {restaurants && restaurants.map(restaurant =>
                    <tr key={restaurant.id} onClick={() => navigate(`/restaurants/${restaurant.id}`)} style={{cursor: 'pointer'}}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>{renderRating(restaurant)}</td>
                        <td>
                            <button onClick={(event) => handleUpdate(event, restaurant.id)} className="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button onClick={(event) => handleDelete(event, restaurant.id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {!restaurants.length && <b className={"text-center"}>There are no restaurants yet</b>}
        </div>
    );
};

export default RestaurantList;