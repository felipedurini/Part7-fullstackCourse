import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const slice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like(state, action) {
      const id = action.payload
      const toLike = state.find(s => s.id === id )
      const liked = { ...toLike, likes: toLike.likes + 1 }
      return state.map(s => s.id===id ? liked : s)
    },
    toggle(state, action) {
      const id = action.payload
      const toToggle = state.find(s => s.id === id )
      const toggled = { ...toToggle, showAllAttributes: !toToggle.showAllAttributes }
      return state.map(s => s.id===id ? toggled : s)
    },
    replaceBlog(state, action) {
      const replaced = action.payload
      return state.map(s => s.id===replaced.id ? replaced : s)
    },
    eraseBlog(state, action) {
      const deleted = action.payload
      return state.filter(s => s.id !== deleted)
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (object) => {
  return async dispatch => {
    const blog = await blogService.create(object)
    dispatch(addBlog(blog))
  }
}

export const deleteBlog = (object) => {
  return async dispatch => {
    const blog = await blogService.erase(object)
    dispatch(eraseBlog(object.id))
  }
}

export const likeBlog = (object) => {
  const toLike = { ...object, likes: object.likes + 1 }
  return async dispatch => {
    const blog = await blogService.update(toLike)
    dispatch(replaceBlog(blog))
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(blog, comment)
    dispatch(replaceBlog(updatedBlog))
  }
}

export const toggleAttributes = (object) => {
  const toggled = { ...object, showAllAttributes: !object.showAllAttributes }
  return async dispatch => {
    const blog = await blogService.update(toggled)
    dispatch(replaceBlog(blog))
  }
}

export const { addBlog, replaceBlog, setBlogs, eraseBlog } = slice.actions
export default slice.reducer