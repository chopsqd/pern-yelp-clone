import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import RestaurantAPI from "../../api/RestaurantAPI";

const initialState = {
    error: null,
    loading: null,
    restaurants: [],
    selectedRestaurant: {}
}

export const fetchRestaurants = createAsyncThunk('restaurant/fetchRestaurants', async (_, {rejectWithValue}) => {
    try {
        const {data} = await RestaurantAPI.get('/')
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        setRestaurants: (state, action) => {
            state.restaurants = action.payload
        },
        setSelectedRestaurant: (state, action) => {
            state.selectedRestaurant = action.payload
        },
        addRestaurant: (state, action) => {
            state.restaurants = [...state.restaurants, action.payload]
        }
    },
    extraReducers: {
        [fetchRestaurants.pending]: (state) => {
            state.loading = true
        },
        [fetchRestaurants.fulfilled]: (state, action) => {
            state.loading = false
            state.restaurants = action.payload.data.restaurants || []
        },
        [fetchRestaurants.rejected]: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setRestaurants, setSelectedRestaurant, addRestaurant } = restaurantSlice.actions
export default restaurantSlice.reducer