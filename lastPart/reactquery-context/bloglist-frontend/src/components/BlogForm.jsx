import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotify } from '../NotificationContext'

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const queryClient = useQueryClient()
  const notifyWith = useNotify()

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      notifyWith(`blog '${blog.title}' created`)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlogMutation.mutate({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title
          <input
            data-testid="title"
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          author
          <input
            data-testid="author"
            type="text"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          url
          <input data-testid="url" type="text" value={newUrl} onChange={(event) => setNewUrl(event.target.value)} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
