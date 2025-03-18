import styles from './Blog.module.css'
import { useState, useEffect } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap'

const Blog = (props) => {
  const { id } = useParams()
  const blogs = useSelector(state => state.blogs)
  const navigate = useNavigate()
  const [newComment, setNewComment] = useState('')

  let blog = props.blog
  if (!blog && id) {
    blog = blogs.find(b => b.id === id)
  }

  useEffect(() => {
    if (!blog) {
      navigate('/')
    }
  }, [blog, navigate])

  if (!blog) {
    return null
  }

  const [visible, setVisible] = useState(false)
  const loggedUser = useSelector(state => state.user)

  useEffect(() => {
    if (loggedUser.id === blog.user.id) {
      setVisible(true)
    }
  }, [loggedUser, blog.user.id])

  const dispatch = useDispatch()

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`blog ${blog.title} liked`,'success', 5))
  }

  const handleAddComment = async (blog) => {
    try {
      await dispatch(commentBlog(blog, newComment))
      setNewComment('')
    } catch (error) {
      dispatch(setNotification(`${error.response?.data?.error || 'Error al agregar comentario'}`,'error', 5))
    }
  }

  const handleDelete = (blog) => {
    dispatch(deleteBlog(blog))
    dispatch(setNotification(`blog ${blog.title} deleted`, 5))
    navigate('/')
  }

  return (
    <Card className={`mt-4 ${styles.blog}`} data-testid="blog">
      <Card.Header>
        <Card.Title>{blog.title} - {blog.author}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>URL:</strong> {blog.url}
        </Card.Text>
        <Card.Text>
          <strong>Likes:</strong> {blog.likes}{' '}
          <Button variant="outline-primary" size="sm" onClick={() => handleLike(blog)}>
            Like
          </Button>
        </Card.Text>
        <Card.Text>
          <strong>Created by:</strong> {blog.user.name}
        </Card.Text>
        {visible && (
          <Button variant="danger" onClick={() => handleDelete(blog)} className="mb-3">
            Delete
          </Button>
        )}
        <hr />
        <h5>Comments</h5>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Add a comment"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
          <Button variant="primary" onClick={() => handleAddComment(blog)}>
            Add comment
          </Button>
        </InputGroup>
        <ListGroup>
          {blog.comments.map(comment => (
            <ListGroup.Item key={comment._id}>
              {comment.content}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default Blog
