import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from 'jwt-decode'


let initialState = {
  isLogined: false,
  isFindID: false,
  isFindPassword : false,
  Gobackhome : false,
  Gobackhome2 : false,
  email: '',
}

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLogined = true // isLogined 속성을 true로 변경
      state.email = action.payload.data.email // action.payload는 'login' 액션 객체가 가진 'payload' 속성.
      // 이 'payload' 객체는 'dispatch(authActions.logIn({data: data_})) 에서 전달된 '{data: data_}' 객체임.
      

    },

    Gobackhome(state,action){
      state.Gobackhome = true
      state.isFindID = false
    },

    Gobackhome2(state,action){
      state.Gobackhome2 = true
      state.isFindPassword = false
    },

    FindID(state, action){
      state.isFindID = true
    },

    FindPassword(state, action){
      state.isFindPassword = true
      state.isFindID = false
      state.Gobackhome = false
    },
    logOut(state) {
      state.isLogined = false
      state.email = ''
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