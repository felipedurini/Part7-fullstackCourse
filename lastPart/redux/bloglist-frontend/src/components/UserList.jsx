import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Container, Table, Card, ListGroup, Button } from 'react-bootstrap'

const UserList = () => {
    const users = useSelector(state => state.users)
    const { id } = useParams()

    if (!users) return null

    if (id) {
        const user = users.find(u => u.id === id)
        if (!user) return <div>Usuario no encontrado</div>
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
                                <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Button as={Link} to="/" variant="secondary" className="mt-3">
                            Volver a la lista
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        )
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-3">Users</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>{user.name}</Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default UserList
