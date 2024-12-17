// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './css/videos.css'
// import Navbar from './Navbar';


// const Videos = () => {
//   const [videos, setVideos] = useState([]);
//   const [video, setVideo] = useState({
//     title: '',
//     genre: '',
//     copies: 0,
//     rentalPrice: 0,
//     rating: 0,
//     image: null,
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   // Fetch videos on component mount
//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/videos')
//       .then((response) => setVideos(response.data))
//       .catch((error) => console.error('Error fetching videos!', error));
//   }, []);

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === 'image') {
//       setVideo({ ...video, image: files[0] });
//     } else {
//       setVideo({ ...video, [name]: value });
//     }
//   };

//   // Add or update video
//   const createOrUpdateVideo = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', video.title);
//     formData.append('genre', video.genre);
//     formData.append('copies', video.copies);
//     formData.append('rentalPrice', video.rentalPrice);
//     formData.append('rating', video.rating);
//     if (video.image) formData.append('image', video.image);

//     if (isEditing) {
//       axios
//         .put(`http://localhost:5000/api/videos/${editId}`, formData)
//         .then((response) => {
//           setVideos(videos.map((v) => (v._id === editId ? response.data : v)));
//           resetForm();
//         })
//         .catch((error) => console.error('Error updating video!', error));
//     } else {
//       axios
//         .post('http://localhost:5000/api/videos', formData)
//         .then((response) => {
//           setVideos([...videos, response.data]);
//           resetForm();
//         })
//         .catch((error) => console.error('Error creating video!', error));
//     }
//   };

//   // Edit existing video
//   const handleEdit = (video) => {
//     setShowForm(true);
//     setVideo({
//       title: video.title,
//       genre: video.genre,
//       copies: video.copies,
//       rentalPrice: video.rentalPrice,
//       rating: video.rating,
//       image: null, // Don't prepopulate the image
//     });
//     setEditId(video._id);
//     setIsEditing(true);
//   };
//   // Add or update video
// const createOrUpdateVideo = async (e) => {
//   e.preventDefault();

//   const formData = new FormData();
//   formData.append('title', video.title);
//   formData.append('genre', video.genre);
//   formData.append('copies', video.copies);
//   formData.append('rentalPrice', video.rentalPrice);
//   formData.append('rating', video.rating);
//   if (video.image) formData.append('image', video.image);

//   try {
//     if (isEditing) {
//       const response = await axios.put(
//         `http://localhost:5000/api/videos/${editId}`,
//         formData
//       );
//       setVideos(videos.map((v) => (v._id === editId ? response.data : v)));
//     } else {
//       const response = await axios.post(
//         'http://localhost:5000/api/videos/create',
//         formData
//       );
//       setVideos([...videos, response.data]);
//     }
//     resetForm();
//   } catch (error) {
//     console.error('Error saving video!', error);
//   }
// };


//   // Delete a video
//   const deleteVideo = (id) => {
//     axios
//       .delete(`http://localhost:5000/api/videos/${id}`)
//       .then(() => {
//         setVideos(videos.filter((v) => v._id !== id));
//       })
//       .catch((error) => console.error('Error deleting video!', error));
//   };

//   // Reset form and close it
//   const resetForm = () => {
//     setVideo({
//       title: '',
//       genre: '',
//       copies: 0,
//       rentalPrice: 0,
//       rating: 0,
//       image: null,
//     });
//     setShowForm(false);
//     setIsEditing(false);
//     setEditId(null);
//   };

//   return (
//     <div>
//       <Navbar/>
//       <h1 style={{textAlign:"center"}}>Create Video</h1>
//       <button  className="add-video-button" onClick={() => setShowForm(!showForm)}>
//         {showForm ? 'Close Form' : 'Add Video'}
//       </button>
//       {showForm && (
//         <form onSubmit={createOrUpdateVideo} className="video-form">
//           <div>
//             <label style={{ color: "gray" }}>Title:</label>
//             <input
//               type="text"
//               name="title"
//               placeholder="Title"
//               value={video.title}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label style={{ color: "gray" }}>Genre:</label>

//           </div>
//           <input
//             type="text"
//             name="genre"
//             placeholder="Genre"
//             value={video.genre}
//             onChange={handleChange}
//             required
//           />

//           <div>
//             <label style={{ color: "gray" }}>Copies:</label>
//             <input
//               type="number"
//               name="copies"
//               placeholder="Copies"
//               value={video.copies}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label style={{ color: "gray" }}>Rental price:</label>
//             <input
//               type="number"
//               name="rentalPrice"
//               placeholder="Rental Price"
//               value={video.rentalPrice}
//               onChange={handleChange}
//               required
//             />

//           </div>

//           <div>
//             <label style={{ color: "gray" }}>Rating:</label>
//             <input
//               type="number"
//               name="rating"
//               placeholder="Rating (1-5)"
//               value={video.rating}
//               onChange={handleChange}
//               required
//             />
//           </div>


//           <div>
//             <label style={{ color: "gray" }}>Image:</label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleChange}
//             />
//           </div>

//           <button type="submit">{isEditing ? 'Update Video' : 'Add Video'}</button>
//         </form>
//       )}
//       <div className="movies-holder" >
//         {videos.map((v) => (
//           <div className="card" key={v._id}>
//             {/* <li  className="video-card"> */}
//             {v.image && (
//               <img
//                 src={`http://localhost:5000/${v.image}`}
//                 alt={v.title}
//                 style={{ width: '150px' }}
//               />
//             )}
//             <h3>{v.title}</h3>
//             <p>Genre: {v.genre}</p>
//             <p>Copies: {v.copies}</p>
//             <p>Rental Price: ${v.rentalPrice}</p>
//             <p>
//               Rating:{' '}
//               <span style={{ color: 'gold', fontWeight: 'bold' }}>
//                 {'★'.repeat(v.rating)}{' '}
//               </span>
//             </p>

//             <div className="buttons-edit">

//               <button onClick={() => handleEdit(v)}>Edit</button>
//               <button onClick={() => deleteVideo(v._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Videos;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/videos.css';
import Navbar from './Navbar';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState({
    title: '',
    genre: '',
    copies: 0,
    rentalPrice: 0,
    rating: 0,
    image: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos!', error);
      }
    };

    fetchVideos();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setVideo({ ...video, image: files[0] });
    } else {
      setVideo({ ...video, [name]: value });
    }
  };

  // Add or update video
  const createOrUpdateVideo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', video.title);
    formData.append('genre', video.genre);
    formData.append('copies', video.copies);
    formData.append('rentalPrice', video.rentalPrice);
    formData.append('rating', video.rating);
    if (video.image) formData.append('image', video.image);

    try {
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:5000/api/videos/${editId}`,
          formData
        );
        setVideos(videos.map((v) => (v._id === editId ? response.data : v)));
      } else {
        const response = await axios.post(
          'http://localhost:5000/api/videos/create',
          formData
        );
        setVideos([...videos, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving video!', error);
    }
  };

  // Edit existing video
  const handleEdit = (video) => {
    setShowForm(true);
    setVideo({
      title: video.title,
      genre: video.genre,
      copies: video.copies,
      rentalPrice: video.rentalPrice,
      rating: video.rating,
      image: null,
    });
    setEditId(video._id);
    setIsEditing(true);
  };

  // Delete a video
  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      setVideos(videos.filter((v) => v._id !== id));
    } catch (error) {
      console.error('Error deleting video!', error);
    }
  };

  // Reset form and close it
  const resetForm = () => {
    setVideo({
      title: '',
      genre: '',
      copies: 0,
      rentalPrice: 0,
      rating: 0,
      image: null,
    });
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center', color:"white" }}>Create Video</h1>
      <button className="add-video-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Video'}
      </button>

      {showForm && (
        <form onSubmit={createOrUpdateVideo} className="video-form">
          <div>
            <label style={{ color: 'gray' }}>Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={video.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ color: 'gray' }}>Genre:</label>
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={video.genre}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ color: 'gray' }}>Copies:</label>
            <input
              type="number"
              name="copies"
              placeholder="Copies"
              value={video.copies}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ color: 'gray' }}>Rental price:</label>
            <input
              type="number"
              name="rentalPrice"
              placeholder="Rental Price"
              value={video.rentalPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ color: 'gray' }}>Rating:</label>
            <input
              type="number"
              name="rating"
              placeholder="Rating (1-5)"
              value={video.rating}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ color: 'gray' }}>Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button type="submit">{isEditing ? 'Update Video' : 'Add Video'}</button>
        </form>
      )}

      <div className="movies-holder">
        {videos.map((v) => (
          <div className="card" key={v._id}>
            {v.image && (
              <img
                src={`http://localhost:5000/${v.image}`}
                alt={v.title}
                style={{ width: '150px' }}
              />
            )}
            <h3>{v.title}</h3>
            <p>Genre: {v.genre}</p>
            <p>Copies: {v.copies}</p>
            <p>Rental Price: ${v.rentalPrice}</p>
            <p>
              Rating: <span style={{ color: 'gold', fontWeight: 'bold' }}>{'★'.repeat(v.rating)}</span>
            </p>
            <div className="buttons-edit">
              <button onClick={() => handleEdit(v)}>Edit</button>
              <button onClick={() => deleteVideo(v._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
