import {useState, useEffect} from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({userData}) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [photoUrl, setPhotoUrl] = useState(userData.photoUrl);
  const [age, setAge] = useState(userData.age);
  const [gender, setGender] = useState(userData.gender);
  const [about, setAbout] = useState(userData.about);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showToast, setShowToast] = useState(false)

  const saveProfile = async () => {
    try {
      setError("")
      const res = await axios.put(BASE_URL + "/profile/edit", {
        firstName, lastName, photoUrl, age, gender, about
      }, {
        withCredentials: true
      });
      console.log("EDIT PROFILE: "+res?.data?.data)
      setSuccess(res?.data?.message || "Profile updated!")
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
      dispatch(addUser(res?.data?.data));
    } catch(err) {
      console.log("ERROR: ", err)
      setError(err?.response?.data || "Something went wrong!")
    }
  }

  return (
    <div className='flex justify-center my-10 space-x-4'>
    
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">First Name:</span>
            </div>
            <input
              type="text"
              value={firstName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <div className="label"></div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Last Name:</span>
            </div>
            <input
              type="text"
              value={lastName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="label"></div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Photo URL:</span>
            </div>
            <input
              type="text"
              value={photoUrl}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <div className="label"></div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Age:</span>
            </div>
            <input
              type="text"
              value={age}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setAge(e.target.value)}
            />
            <div className="label"></div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Gender:</span>
            </div>
            <input
              type="text"
              value={gender}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setGender(e.target.value)}
            />
            <div className="label"></div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">About:</span>
            </div>
            <input
              type="text"
              value={about}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setAbout(e.target.value)}
            />
            <div className="label"></div>
          </label>
          {error && <p className="text-red-500 flex justify-center">{error}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
          </div>
        </div>
      </div>
    </div>
    <UserCard cardData={{firstName, lastName, photoUrl, age, gender, about}}/>
    {showToast && <div className="toast toast-top toast-end">
  <div className="alert alert-success">
    <span>{success}</span>
  </div>
</div>}
    </div >
  )
}

export default EditProfile