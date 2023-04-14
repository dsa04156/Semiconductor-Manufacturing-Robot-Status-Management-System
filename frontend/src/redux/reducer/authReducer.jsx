import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from 'jwt-decode'


let initialState = {
  isLogined: false,
  email: '',
  nickname: ''
}




const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLogined = true
      state.email = action.payload.data.sub
      state.nickname = action.payload.data.jti
    },

    logOut(state) {
      state.isLogined = false
      state.email = ''
      state.nickname = ''
      localStorage.setItem('accessToken','')
      localStorage.setItem('refreshToken','')
      // api 요청 필요
    },
    

    checkAccessToken(state) {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return;
      }
      
      try {
        // 나중에 만료시간 관련 처리도 해야한다
        const data_ = jwtDecode(localStorage.getItem('accessToken') ?? '') as DecodedToken;
        state.isLogined = true;
        state.email = data_.sub;
        state.nickname = data_.jti;
      } catch (error) {
        // 에러 처리
        console.log(error);
      }
    }
    
    

  }
});

export const authActions = authReducer.actions
export default authReducer.reducer;