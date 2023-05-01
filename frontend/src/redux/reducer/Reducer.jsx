import React from 'react'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api'

const initialState = {
  data:[],
}


const Reducer = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    
    
  }
})

export const newactions = Reducer.actions;
export default Reducer
