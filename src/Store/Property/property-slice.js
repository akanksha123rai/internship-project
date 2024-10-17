import { createSlice } from "@reduxjs/toolkit";


const propertySlice= createSlice({

    //Slice name:
    name:"property",
    //Initial state for the property slice

    initialState: {
        properties:[],
        totalProperties: 0,
        searchParams:{}, //parameter for used to search
        error:null, //error state
        loading:false, //loading state
    },
// reducers function to handle different function
    reducers:{
     getRequest(state){
        state.loading= true;
     },
    //action to update properties state with fetched data
     getProperties(state,action){
        state.properties = action.payload.data;
        state.totalProperties= action.payload.all_properties;
        state.loading = false;
     },

     //Action to search parameter
     updateSearchParams: (state,action) =>{
        state.searchParams = Object.keys(action.payload).length ===0 ? {}:{
            ...state.searchParams,
            ...action.payload,
        }
     },

     //action to update the error state
     getErrors(state,action) {
        state.error = action.payload;
     }
    }
})

export const propertyAction = propertySlice.actions;

export default propertySlice;