import react from "react"

const ShowIndex = (props) => {
  return (
    <div>
      <h2>Show Posts</h2>
        {
          props.posts.map((post) => {
            return (
              <div className="post-card">
                <h4>{post.title}</h4>
                <h4>{post.country}</h4>
                <h4>{post.city}</h4>
                <img src={post.image}/>
                <h6>{post.description}</h6>
                <button onClick={(e) => { props.handleDelete(post) }}>Delete</button>
                <button onClick={(e) => { props.editButton(post) }}>Edit</button>
              </div>
            )
          })
        }
    </div>
  )
}

export default ShowIndex;
