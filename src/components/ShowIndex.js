import react from "react"
import '../css/post-card.css';

const ShowIndex = (props) => {
  return (
    <div>
      <h2>Show Posts</h2>
      <div className="main-container">
        {
          props.posts.map((post) => {
            return (
              <div className="post-card">
                <h3>{post.title}</h3>
                <h4>{post.country}</h4>
                <h4>{post.city}</h4>
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
