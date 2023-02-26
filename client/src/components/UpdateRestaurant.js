import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import RestaurantAPI from "../api/RestaurantAPI";

const UpdateRestaurant = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => setFormData(prevState => ({...prevState, [event.target.name]: event.target.value}))

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await RestaurantAPI.get(`/${id}`)
                setFormData(response.data.data.restaurant || {})
                setLoading(false)
            } catch (error) {
                setError(error)
            }
        }

        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await RestaurantAPI.put(`/${id}`, {...formData})
            navigate('/')
        } catch (error) {
            setError(error)
        }
    }

    if (loading && !error) return <div className={"text-center"}>
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>

    return (
        <div>
            {error && <div className="alert alert-warning" role="alert">
                Data fetching error: {error.message}. Try again later...
            </div>}
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id={"name"}
                        type="text"
                        placeholder={"Name"}
                        name={"name"}
                        value={formData.name}
                        onChange={handleChange}
                        className={"form-control"}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        id={"location"}
                        type="text"
                        placeholder={"Location"}
                        className={"form-control"}
                        name={"location"}
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input
                        id={"price_range"}
                        placeholder={3}
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