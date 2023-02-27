import { configureStore } from '@reduxjs/toolkit'
import restaurantSlice from "./slices/restaurantSlice";

export const store = configureStore({
    reducer: {
        restaurants: restaurantSlice
    },
})