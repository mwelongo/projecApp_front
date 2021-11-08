import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import ShowIndex from "./components/ShowIndex"

const url = 'https://enigmatic-anchorage-22310.herokuapp.com/posts';
const App = () => {

  //handle state of showing form
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)
  //state of variables on intial create form
  const [creator, setCreator] = useState('')
  const [image, setImage] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [posts, setPosts] = useState([])

  //state of variables on update form
  const [editedCreator, setEditCreator] = useState('');
  const [editedImage, setEditedImage] = useState('')
  const [editedCountry, setEditedCountry] = useState('')
  const [editedCity, setEditedCity] = useState('')
  const [editedTitle, setEditedTitle] = useState('')
  const [editedDescription, setEditedDescription] = useState('')
  //sets state of spcific post to edit
  const [postToEdit, setPostToEdit] = useState('')

  // handle create
  const handlePostSubmit = (e) => {
    e.preventDefault();
    axios.post('https://enigmatic-anchorage-22310.herokuapp.com/posts',
      {
        title: title,
        description: description,
        image: image,
        country: country,
        city: city
      }
    ).then(() => {
      axios
      .get('https://enigmatic-anchorage-22310.herokuapp.com/posts')
      .then((response) => {
        setPosts(response.data)
        setTitle('');
        setDescription('');
        setImage('');
        setCountry('');
        setCity('')
        console.log(response.data)
      })
    })
  }

  //handle update will handle update form
  const handleUpdate = (e) => {
    e.preventDefault()
    axios
      .put(`https://enigmatic-anchorage-22310.herokuapp.com/posts/${postToEdit}`,
        {
          title: editedTitle,
          description: editedDescription,
          image: editedImage,
          country: editedCountry,
          city: editedCity
        }
      )
      .then(() => {
        axios
        .get(url)
        .then((response) => {
          setPosts(response.data)
          setTitle('');
          setDescription('');
          setImage('');
          setCountry('');
          setCity('')
        })

      })
  }

  //function to pass handle update
  const editButton = (postData) => {
    const toggleEditForm = () => {
      if (showEditForm === false) {
        setShowEditForm(true)
      } if (showEditForm === true) {
        setShowEditForm(false)
      }
    }
    toggleEditForm()

    setPostToEdit(postData._id)
    setEditedTitle(postData.title)
    setEditedDescription(postData.description)
    setEditedCountry(postData.country)
    setEditedCity(postData.city)
    setEditedImage(postData.image)
    console.log(postData)
  }

  //function to open the show-page modal of each post
  const showPostButton = (data) => {
    const toggleShowPostModal = () => {
      if (showPostModal === false) {
        setShowPostModal(true)
      } if (showPostModal === true) {
        setShowPostModal(false)
      }
    }
    toggleShowPostModal()

    // setPosts(data._id)
    setTitle(data.title)
    setDescription(data.description)
    setCountry(data.country)
    setCity(data.city)
    setImage(data.image)
  }
  // Close button for the Show Page
  const toggleCloseShowPost = () => {
    if (showPostModal === false) {
      setShowPostModal(true)
    } if (showPostModal === true) {
      setShowPostModal(false)
    }

  }

  const toggleClose = () => {
    if (showEditForm === false) {
      setShowEditForm(true)
    } if (showEditForm === true) {
      setShowEditForm(false)
    }

  }

  //handle delete
  const handleDelete = (postData) => {//takes an argument that will be selected post
    axios
      .delete(`https://enigmatic-anchorage-22310.herokuapp.com/posts/${postData._id}`)
      .then(() => {
        axios
        .get(url)
        .then((response) => {
          setPosts(response.data)
        })
      })
  }


  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setPosts(response.data)
        console.log(posts)
      })
  },[])

  //handle nav
  const toggleForm = () => {
    if (showForm === false) {
      setShowForm(true)
    } if (showForm === true) {
      setShowForm(false)
    }
  }

  //for handlers, they can be passed through anonymous functions
  return (
    <div className="App">
      <nav>
        <h1>Travel App</h1>
        <button onClick={toggleForm}>Create Post</button>
      </nav>
      {
        posts.map((post) => {
          return (
            <div>{ post.country}</div>
          )
        })
      }

      {
        showForm ? (
          <div className="modal">
            <button onClick={toggleForm}>Close</button>
            <div className="form_wrap">
              <form onSubmit={handlePostSubmit}>
                <label >Title</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
                <label >Country</label>
                <input type="text" onChange={(e) => setCountry(e.target.value)} value={country} />
                <label >City</label>
                <input type="text" onChange={(e) => setCity(e.target.value)} value={city} />
                <label >Description</label>
                <input type="textarea" onChange={(e) => setDescription(e.target.value)} value={description} />
                <label>Image</label>
                <input type="text" onChange={(e) => setImage(e.target.value)} value={image} />
                <input type="submit" value="submit" className="button"/>
              </form>
            </div>
          </div>

        ) :
          (
            <></>
          )
      }
      {/* this will be the edit form */}

      {
        showEditForm ? (
          <div className="modal">
            <h3>Edit</h3>
            <button onClick={toggleClose}>Close</button>
            <form className="form_wrap" onSubmit={handleUpdate}>
              <label >Title</label>
              <input type="text" onChange={(e) => setEditedTitle(e.target.value)} value={editedTitle} />
              <label >Country</label>
              <input type="text" onChange={(e) => setEditedCountry(e.target.value)} value={editedCountry} />
              <label >City</label>
              <input type="text" onChange={(e) => setEditedCity(e.target.value)} value={editedCity} />
              <label >Description</label>
              <input type="textarea" onChange={(e) => setEditedDescription(e.target.value)} value={editedDescription} />
              <label>Image</label>
              <input type="text" onChange={(e) => setEditedImage(e.target.value)} value={editedImage} /><br />
              <input type="submit" value="edit" />
            </form>
          </div>

        ) : (
          <></>
        )
      }

      {
        showPostModal ? (
          <div className="modal">
            <button onClick={toggleCloseShowPost}>Close</button>
            <h1>{title}</h1>
            <div className="detailed-post-container">
              <div className="detailed-post-desc">
                <img src={image}/>
                <h6>{description}</h6>
              </div>
              <div className="detailed-post-desc">
                <h2>{city}, {country}</h2>
                <h3>Sub-title here ... </h3>
                <h5>Comment</h5>
              </div>
            </div>

          </div>
        ) : (<></>)
      }

      <ShowIndex
        posts={posts}
        //possing down handelers
        handleDelete={handleDelete}
        editButton={editButton}
        showPostButton={showPostButton}
      />


      <footer>
        <p>A project by <a href="https://www.linkedin.com/in/domacor-mentee-7aa486126/" target="_blank">Dom</a> and <a href="https://www.linkedin.com/in/muzabelwelongo/" target="_blank">Muzabel</a></p>
      </footer>

    </div>
  );
}

export default App;
