import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useRef } from 'react'
import { Container, ListGroup } from 'react-bootstrap'

const BlogList = () => {
    const blogsToShow = useSelector(state => state.blogs)
    const blogFormRef = useRef()

    const blogForm = () => (
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm />
        </Togglable>
    )

    return (
        <Container className="mt-4">
            {blogForm()}
            <ListGroup className="mt-4">
                {blogsToShow.map(blog => (
                    <ListGroup.Item key={blog.id}>
                        <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
                            {blog.title}
                        </Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
}

export default BlogList
