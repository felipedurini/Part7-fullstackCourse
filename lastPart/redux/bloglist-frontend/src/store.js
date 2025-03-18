import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

export default configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    blogs: blogReducer,
    notification: notificationReducer
  }
})