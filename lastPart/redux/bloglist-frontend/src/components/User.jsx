import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Container, Card, ListGroup, Button } from 'react-bootstrap'

const User = (props) => {
    const { id } = useParams()
    const users = useSelector(state => state.users)
    const navigate = useNavigate()

    let user = props.user
    if (!user && id) {
        user = users.find(b => b.id === id)
    }

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    if (!user) {
        return null
    }

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header>
                    <Card.Title>{user.name}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-3">Blogs creados</Card.Subtitle>
                    <ListGroup variant="flush">
                        {user.blogs.map(blog => (
                            <ListGroup.Item key={blog.id}>
                                <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
                                    {blog.title}
                                </Link>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default User
