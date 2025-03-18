import { useState, useRef, useContext } from 'react'

import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import UserContext from './UserContext'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  const { user, logout } = useContext(UserContext)

  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
  }
  

  const loginForm = () => {
    return (
      <div>
        {!loginVisible ? (
          <button onClick={() => setLoginVisible(true)}>log in</button>
        ) : (
          <>
            <LoginForm />
            <button onClick={() => setLoginVisible(false)}>cancel</button>
          </>
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification/>
      {user === null ? (
        loginForm()
      ) : (
        <>
          <h2>blogs</h2>
          <p>{user.name} logged-in</p>
          <button onClick={logout}>logout</button>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <BlogList />
        </>
      )}
    </div>
  )
}

export default App
