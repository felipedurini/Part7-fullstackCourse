import styles from './Blog.module.css'
import { useState, useEffect, useContext } from 'react'
import UserContext from '../UserContext'

const Blog = ({ blog, handleLike, handleDelete, handleToggleAttributes }) => {
  const [visible, setVisible] = useState(false)
  const [showAllAttributes, setShowAllAttributes] = useState(blog.showAllAttributes || false)
  const { user: loggedUser } = useContext(UserContext)

  useEffect(() => {
    if (loggedUser?.id === blog.user.id) {
      setVisible(true)
    }
  }, [loggedUser, blog.user.id])

  const toggleAttributes = () => {
    setShowAllAttributes(!showAllAttributes)
    handleToggleAttributes(blog)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const label = showAllAttributes ? 'hide attributes' : 'show attributes'

  return (
    <div className={styles.blog} data-testid="blog">
      {blog.title} {blog.author}
      <button onClick={toggleAttributes}>{label}</button>
      {showAllAttributes && (
        <>
          <div>{blog.url}</div>
          <div>
            <p data-testid="likes">
              Likes {blog.likes}{' '}
              <button onClick={() => handleLike(blog)}>Like</button>
            </p>
          </div>
          <div>Created by {blog.user.name}</div>
        </>
      )}
      <button style={showWhenVisible} onClick={() => handleDelete(blog)}>
        Delete
      </button>
    </div>
  )
}

export default Blog
