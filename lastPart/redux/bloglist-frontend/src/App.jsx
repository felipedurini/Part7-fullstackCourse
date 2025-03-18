import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Button, Navbar, Nav } from 'react-bootstrap'

import { Routes, Route, Link } from 'react-router-dom'

import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {

      dispatch(initializeBlogs(blogs))
    })
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then(users => {

      dispatch(initializeUsers(users))
    })
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])



  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(setUser(null))
  }

  const padding = {
    padding: 5
  }
  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Navbar.Brand as={Link} to="/">Blog App</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
          <Nav.Link as={Link} to="/users">Users</Nav.Link>
        </Nav>
        {user && (
          <span className="text-light">
            {user.name} logged-in
            <Button variant="outline-light" size="sm" onClick={handleLogout} className="ms-2">
              Logout
            </Button>
          </span>
        )}
      </Navbar>

      <Notification />

      {user === null ? (
        <div className="text-center">
          <Button onClick={() => setLoginVisible(!loginVisible)}>Log in</Button>
          {loginVisible && (
            <div className="mt-3">
              <LoginForm />
              <Button variant="secondary" onClick={() => setLoginVisible(false)} className="mt-2">
                Cancel
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Routes>
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<h2>Welcome to the Blog App</h2>} />
        </Routes>
      )}
    </Container>
  )
}

export default App
