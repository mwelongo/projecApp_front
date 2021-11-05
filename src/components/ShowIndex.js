import react from "react"
import '../css/post-card.css';

const ShowIndex = (props) => {
  return (
    <div className="container">
      <h2>Show Posts</h2>
      <div className="main-container">
        {
          props.posts.map((post) => {
            return (
              <div className="post-card">
                <div className="post-info">
                <h3>{post.title}</h3>
                <span>Country: {post.country}</span>
                <span>City: {post.city}</span>
                </div>
                <img src={post.image}/>
                <p>{post.description}</p>
                <button onClick={(e) => { props.handleDelete(post) }}>Delete</button>
                <button onClick={(e) => { props.editButton(post) }}>Edit</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ShowIndex;
