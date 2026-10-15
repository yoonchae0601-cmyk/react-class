function PostList({ posts }) {
  return (
    <section className="post-list">
      {posts.map((post) => (
        <article className="post-card" key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </section>
  )
}

export default PostList