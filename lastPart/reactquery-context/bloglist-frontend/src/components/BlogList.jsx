import Blog from './Blog'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotify } from '../NotificationContext'

const BlogList = () => {
    const notifyWith = useNotify()

    const queryClient = useQueryClient()
    const { data: blogs, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
    })

    const likeMutation = useMutation({
        mutationFn: (blog) =>
            blogService.update({ ...blog, likes: blog.likes + 1 }),
        onSuccess: (returnedBlog) => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
            notifyWith(`blog '${returnedBlog.title}' liked`)
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (blog) => blogService.erase(blog),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        },
    })

    const toggleMutation = useMutation({
        mutationFn: (blog) => {
            const updatedBlog = { ...blog, showAllAttributes: !blog.showAllAttributes }
            return blogService.update(blog.id, updatedBlog)
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
    })

    const handleLike = (blog) => likeMutation.mutate(blog)
    const handleDelete = (blog) => {
        if (window.confirm('Delete this blog?')) deleteMutation.mutate(blog)
    }
    const handleToggleAttributes = (blog) => toggleMutation.mutate(blog)

    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                    handleToggleAttributes={handleToggleAttributes}
                />
            ))}
        </div>
    )
}

export default BlogList
