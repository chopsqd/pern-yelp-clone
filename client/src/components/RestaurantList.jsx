import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {ErrorAlert, Loader, StarRating} from "./index";
import {useDispatch, useSelector} from "react-redux";
import {deleteRestaurant, fetchRestaurants} from "../redux/slices/restaurantSlice";

const RestaurantList = () => {
    const navigate = useNavigate()
    const {loading, error, restaurants} = useSelector(state => state.restaurants)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRestaurants())
    }, [])

    const handleDelete = async (event, id) => {
        event.stopPropagation()
        if (!window.confirm('Are you sure you want to delete this restaurant?')) return
        dispatch(deleteRestaurant(id))
    }

    const handleUpdate = (event, id) => {
        event.stopPropagation()
        navigate(`/restaurants/${id}/update`)
    }

    const renderRating = (restaurant) => {
        if (!restaurant.count) {
            return <span className={"text-warning ml-1"}>0 reviews</span>
        }

        return <>
            <StarRating rating={restaurant.average_rating}/>
            <span className={"text-warning ml-1"}>({restaurant.count})</span>
        </>
    }

    if (loading && !error) return <Loader/>

    return (
        <div className={"list-group"}>
            {error && <ErrorAlert error={error.message}/>}
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
                    <tr key={restaurant.id} onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                        style={{cursor: 'pointer'}}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>{renderRating(restaurant)}</td>
                        <td>
                            <button onClick={(event) => handleUpdate(event, restaurant.id)}
                                    className="btn btn-warning">Update
                            </button>
                        </td>
                        <td>
                            <button onClick={(event) => handleDelete(event, restaurant.id)}
                                    className="btn btn-danger">Delete
                            </button>
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