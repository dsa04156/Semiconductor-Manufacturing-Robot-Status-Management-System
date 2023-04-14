import { configureStore} from '@reduxjs/toolkit'
import Reducer from './reducer/Reducer'



const store = configureStore({
  reducer: Reducer,
})

export default store