import { configureStore} from '@reduxjs/toolkit'
import Reducer from './reducer/Reducer'
import authReducer from './reducer/authReducer'



const store = configureStore({
  reducer: {
    red : Reducer,
    auth : authReducer
  }
})

export default store