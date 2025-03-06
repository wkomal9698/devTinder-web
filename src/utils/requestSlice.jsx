import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequests: (state, action) => {
            return action.payload
        },
        removeRequest: (state, action) => {
            const newStateArray = state.filter(st => st._id !== action.payload)
            return newStateArray
        }
    }
})

export const {addRequests, removeRequest} = requestSlice.actions;
export default requestSlice.reducer;