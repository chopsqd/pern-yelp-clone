import React, {useState} from 'react';
import RestaurantAPI from "../api/RestaurantAPI";
import {useNavigate, useParams} from "react-router-dom";

const AddReview = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)

    const handleChange = (event) => setFormData(prevState => ({...prevState, [event.target.name]: event.target.value}))

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await RestaurantAPI.post(`/${id}/reviews`, {...formData})
            navigate('/')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className={"mb-2"}>
            {error && <div className="alert alert-warning mt-3" role="alert">{error}</div>}
            <form>
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input
                            id={"name"}
                            type="text"
                            placeholder={"Name"}
                            className={"form-control"}
                            name={"name"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select
                            id={"rating"}
                            name={"rating"}
                            className={"custom-select"}
                            onChange={handleChange}
                        >
                            <option disabled>Rating</option>
                            <option value={"1"}>1</option>
                            <option value={"2"}>2</option>
                            <option value={"3"}>3</option>
                            <option value={"4"}>4</option>
                            <option value={"5"}>5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea
                        name="review"
                        id="review"
                        cols="30"
                        rows="5"
                        onChange={handleChange}
                        className={"form-control"}
                    />
                </div>
                <button onClick={handleSubmit} type={"submit"} className={"btn btn-primary"}>Submit</button>
            </form>
        </div>
    );
};

export default AddReview;