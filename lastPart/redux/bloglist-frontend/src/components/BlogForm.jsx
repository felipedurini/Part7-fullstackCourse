import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';
import { Container, Form, Button } from 'react-bootstrap';

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      }));

      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');
      dispatch(setNotification(`blog ${newTitle} created`, 'success', 5));
    } catch (error) {
      dispatch(setNotification(`${error.response?.data?.error || 'Error al agregar blog'}`, 'error', 5));
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '500px' }}>
      <h2 className="mb-3">Create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter blog title"
            data-testid="title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author name"
            data-testid="author"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter blog URL"
            data-testid="url"
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default BlogForm;
