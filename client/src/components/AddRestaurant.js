import React, {useState, useContext} from 'react';
import RestaurantAPI from "../api/RestaurantAPI";
import {RestaurantsContext} from "../context/RestaurantsContext";

const AddRestaurant = () => {
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({})
    const {addRestaurant} = useContext(RestaurantsContext)

    const handleChange = (event) => setFormData(prevState => ({...prevState, [event.target.name]: event.target.value}))

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await RestaurantAPI.post('/', {...formData})
            addRestaurant(response.data.data.restaurant)
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div className={"mb-4"}>
            <form>
                <div className="form-row d-flex justify-content-between align-items-center">
                    <div className="col">
                        <input
                            type="text"
                            placeholder={"Name"}
                            className={"form-control"}
                            name={"name"}
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            placeholder={"Location"}
                            className={"form-control"}
                            name={"location"}
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <select
                            name={"price_range"}
                            className={"custom-select my-1 mr-sm-2"}
                            onChange={handleChange}
                        >
                            <option disabled>Price Range</option>
                            <option value={"1"}>$</option>
                            <option value={"2"}>$$</option>
                            <option value={"3"}>$$$</option>
                            <option value={"4"}>$$$$</option>
                            <option value={"5"}>$$$$$</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} type={"submit"} className={"btn btn-primary"}>Add</button>
                </div>
            </form>

            {error && <div className="alert alert-warning mt-3" role="alert">{error}</div>}
        </div>
    );
};

export default AddRestaurant;