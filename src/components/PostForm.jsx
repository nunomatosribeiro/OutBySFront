import { useContext, useState } from 'react'
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from 'react-router-dom';


const PostForm = ({ defaultPostValues, onSubmit, allMedia, setAllMedia }) => {
  const [title, setTitle] = useState(defaultPostValues || '')
  const [description, setDescription] = useState(defaultPostValues || '')
  const [category, setCategory] = useState(defaultPostValues || 'Tailor made')
  const [fullDescription, setFullDescription] = useState('')
 const [info, setInfo] = useState([{ duration: '', language: '', cancellation: '', other:'' }]);
const [included, setIncluded] = useState([{included:'', notIncluded:''}])
  const { user } = useContext(AuthContext);
 

  const handleInfoChange = (index, key, value) => {
    const updatedInfo = [...info];
    updatedInfo[index][key] = value;
    setInfo(updatedInfo);
  };

  const addInfoPair = () => {
    setInfo([...info, { duration: '', language: '', cancellation: '', other:'' }]);
  };
  const handleIncludedChange = (index, key, value) => {
    const updatedIncluded = [...included];
    updatedIncluded[index][key] = value;
    setIncluded(updatedIncluded);
  };
  const addIncludedPair = () => {
    setIncluded([...included, {included: '', notIncluded:''}]);
  };
  const handleSubmit = async e => {
    e.preventDefault()

    const updatedPostData = {
      title,
      description,
      category,
      allMedia,
      fullDescription,
      info,
      included,
    }

    onSubmit(updatedPostData)

  }
  const handleFileSelect = (e)=>{
  setAllMedia(e.target.files[0])
}


 /*  const canCreate = user.isAdmin; */
  return (
    <>

    {/* {canCreate ? ( */}
      <form className='post-form' onSubmit={handleSubmit}>
        <div className='form-field'>
          <input
            type='text'
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder='Title'
          />
        </div>
        <div className='form-field'>
          <textarea
            id='content'
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Description'
          />
        </div>

        <div className='form-field'>
          <select
            id='category'
            value={category}
            className='form-control'
            onChange={e => setCategory(e.target.value)}
          >
            <option value='Tailor made' >Tailor made</option>
            <option value='Food'>Food</option>
            <option value='Activities'>Activities</option>
            <option value='Tours'>Tours</option>
          </select>
        </div>
 <div className='form-field'>
          <textarea
            id='fullDescription'
            value={fullDescription}
            onChange={e => setFullDescription(e.target.value)}
            placeholder='Full Description'
          />
        </div>
        <div className='form-field'>
        {info.map((pair, index) => (
        <div key={index}>
          <input
            type="text"
            value={pair.duration}
            onChange={(e) => handleInfoChange(index, 'duration', e.target.value)}
            placeholder="Duration"
          />
          <input
            type="text"
            value={pair.language}
            onChange={(e) => handleInfoChange(index, 'language', e.target.value)}
            placeholder="Language"
          />
          <input
            type="text"
            value={pair.cancellation}
            onChange={(e) => handleInfoChange(index, 'cancellation', e.target.value)}
            placeholder="Cancellation"
          />
          <input
            type="text"
            value={pair.other}
            onChange={(e) => handleInfoChange(index, 'other', e.target.value)}
            placeholder="Other"
          />
        </div>
      ))}
      <button type="button" onClick={addInfoPair}>
        Add Info Pair
      </button>
        </div>
        <div className='form-field'>
          {included.map((pair, index)=>(
            <div key={index}>
            <textarea
            type="text"
            id='included'
            value={pair.included}
            onChange={(e) => handleIncludedChange(index, 'included', e.target.value)}
            placeholder='Included'
          />
          <textarea
            type="text"
            id='notIncluded'
            value={pair.notIncluded}
            onChange={(e) => handleIncludedChange(index, 'notIncluded', e.target.value)}
            placeholder='Not Included'
          />
          </div>
          ))}
          
          <button type="button" onClick={addIncludedPair}>
        Add Info Pair
      </button>
        </div>
        <input type='file' onChange={handleFileSelect} />
       {/*  <CloudinaryUpload initialMedia={[]} onMediaUpdated={updateMediaList} allowMultiple={true} /> */}
        <button type='submit'>Submit Post</button> 
      </form>
     {/*  ) : ( */}
        <p>You are not authorized to edit this post.</p>
    {/*   ) } */}
    </>
  )
}

export default PostForm
