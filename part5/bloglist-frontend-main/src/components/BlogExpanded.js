const BlogExpanded = ({ blog }) => (
  <div className="BlogExpanded">
    <div>{blog.url}</div>

    <div>
      likes: {blog.likes} <button>Like</button>
    </div>
    <div>{blog.user.name}</div>
  </div>
);

export default BlogExpanded;
