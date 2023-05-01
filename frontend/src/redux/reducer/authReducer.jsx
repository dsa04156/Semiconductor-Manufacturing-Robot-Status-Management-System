import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from 'jwt-decode'


let initialState = {
  isLogined: false,
  email:""

}

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLogined = true

    },
    logOut(state,action) {
      state.isLogined = false
      state.email=""
      localStorage.clear()
      
      // localStorage.setItem('accessToken','')
      // localStorage.setItem('refreshToken','')
      // api 요청 필요
    },
    findPW(state, action) {
      state.email = action.payload;
      
    },
    
    checkAccessToken(state) {
      console.log(state)
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return;
      }
      
      try {
        const data_ = jwtDecode(localStorage.getItem('accessToken') ?? '') ;
        state.isLogined = true;
        state.email = data_.sub;


      } catch (error) {
        // 에러 처리
        console.log(error);
      }
    }
    
    

  }
});

export const authActions = authReducer.actions
export default authReducer.reducer;