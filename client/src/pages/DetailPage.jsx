import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {AddReview, ErrorAlert, Loader, Reviews, StarRating} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {fetchOneRestaurant} from "../redux/slices/restaurantSlice";

const DetailPage = () => {
    const {id} = useParams()
    const {loading, error, selectedRestaurant} = useSelector(state => state.restaurants)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOneRestaurant(id))
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