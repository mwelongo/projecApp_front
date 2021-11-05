import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import ShowIndex from "./components/ShowIndex"

const url = 'https://enigmatic-anchorage-22310.herokuapp.com/posts'
const App = () => {
  //state of variables on intial create form
  const [creator, setCreator] = useState('');
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
    axios.post(url,
      {
        creator: creator,
        title: title,
        description: description,
        image: image,
        country: country,
        city: city
      }

    ).then(() => {
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

  //handle update will handle update form
  const handleUpdate = (e) => {
    e.preventDefault()
    axios
      .put(`https://enigmatic-anchorage-22310.herokuapp.com/posts/${postToEdit}`,//argument for post that will be eddited
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
    setPostToEdit(postData._id)
    setEditedTitle(postData.title)
    setEditedDescription(postData.description)
    setEditedCountry(postData.country)
    setEditedCity(postData.city)
    setEditedImage(postData.image)
    console.log(postData)
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
  //for handlers, they can be passed through anonymous functions
  return (
    <div className="App">
      <h1>Travel App</h1>

      {/* create form */}
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

      {/* this will be the edit form */}
      <div className="updateForm">
        <h3>Edit</h3>
        <form onSubmit={handleUpdate}>
          <label >Title</label>
          <input type="text" onChange={(e) => setEditedTitle(e.target.value)} value={editedTitle} />
          <label >Country</label>
          <input type="text" onChange={(e) => setEditedCountry(e.target.value)} value={editedCountry} />
          <label >City</label>
          <input type="text" onChange={(e) => setEditedCity(e.target.value)} value={editedCity} />
          <label >Description</label>
          <input type="text" onChange={(e) => setEditedDescription(e.target.value)} value={editedDescription} />
          <input type="submit" value="edit"/>
          <label>Image</label>
          <input type="text" onChange={(e) => setEditedImage(e.target.value)} value={editedImage} />
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
