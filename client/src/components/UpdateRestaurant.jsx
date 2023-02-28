import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ErrorAlert, Loader} from "./index";
import {useDispatch, useSelector} from "react-redux";
import {fetchOneRestaurant, updateRestaurant} from "../redux/slices/restaurantSlice";

const UpdateRestaurant = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})

    const {loading, error, selectedRestaurant} = useSelector(state => state.restaurants)
    const dispatch = useDispatch()

    const handleChange = (event) => setFormData(prevState => ({...prevState, [event.target.name]: event.target.value}))

    useEffect(() => {
        dispatch(fetchOneRestaurant(id))
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        dispatch(updateRestaurant({id, formData}))
        navigate('/')
    }

    if (loading && !error) return <Loader />

    return (
        <div>
            {error && <ErrorAlert error={error.message} />}
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id={"name"}
                        type="text"
                        placeholder={selectedRestaurant?.restaurant?.name}
                        name={"name"}
                        onChange={handleChange}
                        className={"form-control"}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        id={"location"}
                        type="text"
                        placeholder={selectedRestaurant?.restaurant?.location}
                        className={"form-control"}
                        name={"location"}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input
                        id={"price_range"}
                        placeholder={selectedRestaurant?.restaurant?.price_range}
                        min={0}
                        max={5}
                        type="number"
                        name={"price_range"}
                        className={"form-control"}
                        onChange={handleChange}
                    />
                </div>
                <button type={"submit"} onClick={handleSubmit} className={"btn btn-primary"}>Submit</button>
            </form>
        </div>
    );
};

export default UpdateRestaurant;