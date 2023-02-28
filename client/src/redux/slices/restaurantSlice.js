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

export const fetchOneRestaurant = createAsyncThunk('restaurant/fetchOneRestaurant', async (id, {rejectWithValue}) => {
    try {
        const {data} = await RestaurantAPI.get(`/${id}`)
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const addRestaurant = createAsyncThunk('restaurant/addRestaurant', async (formData, {rejectWithValue}) => {
    try {
        const {data} = await RestaurantAPI.post('/', {...formData})
        return data
    } catch (error) {
        return rejectWithValue(String(error))
    }
})

export const updateRestaurant = createAsyncThunk('restaurant/updateRestaurant', async ({id, formData}, {rejectWithValue}) => {
    try {
        await RestaurantAPI.put(`/${id}`, {...formData})
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deleteRestaurant = createAsyncThunk('restaurant/deleteRestaurant', async (id, {rejectWithValue}) => {
    try {
        const {data} = await RestaurantAPI.delete(`/${id}`)
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const addReview = createAsyncThunk('restaurant/addReview', async ({id, formData}, {rejectWithValue}) => {
    try {
        await RestaurantAPI.post(`/${id}/reviews`, {...formData})
    } catch (error) {
        return rejectWithValue(String(error))
    }
})

export const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchRestaurants.pending]: (state) => {
            state.loading = true
        },
        [fetchRestaurants.fulfilled]: (state, action) => {
            state.restaurants = action.payload.data.restaurants || []
            state.loading = false
        },
        [fetchRestaurants.rejected]: (state, action) => {
            state.error = action.payload
        },

        [fetchOneRestaurant.pending]: (state) => {
            state.loading = true
        },
        [fetchOneRestaurant.fulfilled]: (state, action) => {
            state.selectedRestaurant = action.payload.data
            state.loading = false
        },
        [fetchOneRestaurant.rejected]: (state, action) => {
            state.error = action.payload
        },

        [addRestaurant.pending]: (state) => {
            state.loading = true
        },
        [addRestaurant.fulfilled]: (state, action) => {
            state.restaurants = [...state.restaurants, action.payload.data.restaurant]
            state.loading = false
        },
        [addRestaurant.rejected]: (state, action) => {
            state.error = action.payload
        },

        [updateRestaurant.rejected]: (state, action) => {
            state.error = action.payload
        },

        [deleteRestaurant.pending]: (state) => {
            state.loading = true
        },
        [deleteRestaurant.fulfilled]: (state, action) => {
            state.restaurants = state.restaurants.filter(restaurant => restaurant.id !== action.payload.data.restaurant.id)
            state.loading = false
        },
        [deleteRestaurant.rejected]: (state, action) => {
            state.error = action.payload
        },

        [addReview.rejected]: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setSelectedRestaurant, newRestaurant, removeRestaurant } = restaurantSlice.actions
export default restaurantSlice.reducer