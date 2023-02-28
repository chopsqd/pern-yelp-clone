import React, {useState} from 'react';
import {ErrorAlert} from "./index";
import {useDispatch, useSelector} from "react-redux";
import {addRestaurant} from "../redux/slices/restaurantSlice";

const AddRestaurant = () => {
    const [formData, setFormData] = useState({})
    const {error} = useSelector(state => state.restaurants)
    const dispatch = useDispatch()

    const handleChange = (event) => setFormData(prevState => ({...prevState, [event.target.name]: event.target.value}))

    const handleSubmit = async (event) => {
        event.preventDefault()
        dispatch(addRestaurant(formData))
    }

    return (
        <div className={"mb-4"}>
            <form className={"mb-2"}>
                <div className="form-row d-flex justify-content-between align-items-center">
                    <div className="col">
                        <input
                            type="text"
                            placeholder={"Name"}
                            className={"form-control"}
                            name={"name"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            placeholder={"Location"}
                            className={"form-control"}
                            name={"location"}
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

            {error && <ErrorAlert error={error} />}
        </div>
    );
};

export default AddRestaurant;