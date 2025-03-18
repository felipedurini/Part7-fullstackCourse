import { createContext, useState } from "react"
import loginService from "./services/login"
import blogService from "./services/blogs"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser")
    return loggedUser ? JSON.parse(loggedUser) : null
  })

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      console.log('Usuario logueado, token:', user.token);

    } catch (error) {
      console.log("wrong credentials")
    }
  }

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext


