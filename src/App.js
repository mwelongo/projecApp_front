import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import ShowIndex from "./components/ShowIndex"



const App = () => {
  //state of variables on intial create form
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [posts, setPosts] = useState([])

  //state of variables on update form
  const [editedTitle, setEditTitle] = useState('')
  const [editedDescription, setEditedDescription] = useState('')
  //sets state of spcific post to edit
  const [postToEdit, setPostToEdit] = useState('')


  // handle create
  const handlePostSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/posts',
      {
        title: title,
        description: description
      }
    ).then(() => {
      axios
      .get('http://localhost:3001/posts')
      .then((response) => {
        setPosts(response.data)
        console.log(posts)
      })
    })
    e.currentTarget.reset()
  }

  //handle update will handle update form
  const handleUpdate = (e) => {
    e.preventDefault()
    axios
      .put(`http://localhost:3001/posts/${postToEdit}`,//argument for post that will be eddited
        {
          title: editedTitle,
          description: editedDescription
        }
      )
      .then(() => {
        axios
        .get('http://localhost:3001/posts')
        .then((response) => {
          setPosts(response.data)
        })

      })

  }
  //function to pass handle update
  const editButton = (postData) => {
    setPostToEdit(postData._id)
    setEditTitle(postData.title)
    setEditedDescription(postData.description)
    console.log(postData)
  }

  //handle delete
  const handleDelete = (postData) => {//takes an argument that will be selected post
    axios
      .delete(`http://localhost:3001/posts/${postData._id}`)
      .then(() => {
        axios
        .get('http://localhost:3001/posts')
        .then((response) => {
          setPosts(response.data)
        })
      })
  }


  useEffect(() => {
    axios
      .get('http://localhost:3001/posts')
      .then((response) => {
        setPosts(response.data)
        console.log(posts)
      })
  },[])
  //for handlers, they can be passed through anonymous functions
  return (
    <div className="App">
      <h1>Travel App</h1>

      {/* create form */}
      <div className="form_wrap">
        <form onSubmit={handlePostSubmit}>
          <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
          <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
          <input type="submit" value="submit" className="button"/>
        </form>
      </div>

      {/* this will be the edit form */}
      <div className="updateForm">
        <h3>Edit</h3>
        <form onSubmit={handleUpdate}>
          <input type="text" onChange={(e) => setEditTitle(e.target.value)} value={editedTitle}/>
          <input type="text" onChange={(e) => setEditedDescription(e.target.value)} value={editedDescription} />
          <input type="submit" value="edit"/>
        </form>
      </div>

      <ShowIndex
        posts={posts}
        //possing down handelers
        handleDelete={handleDelete}
        editButton={editButton}
      />


    </div>
  );
}

export default App;
