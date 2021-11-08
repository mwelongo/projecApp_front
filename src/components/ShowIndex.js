import React from "react"
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
                <div className="post-info">
                <h3>{post.title}</h3>
                <h5>Location: {post.city}, {post.country}</h5>
                </div>
                <img src={post.image}/>
                <p className="description">{post.description}</p>
                <button className="delete-edit-btn" onClick={(e) => { props.handleDelete(post) }}>Delete</button>
                <button className="delete-edit-btn" onClick={(e) => { props.editButton(post) }}>Edit</button>
                <button className="delete-edit-btn open-post-btn" onClick={(e) => { props.showPostButton(post) }}>Open Post</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ShowIndex;
