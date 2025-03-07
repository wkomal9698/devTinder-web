import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({cardData, showRequestActions=false}) => {
  const dispatch = useDispatch();

    const {_id, firstName, lastName, photoUrl, age, gender, about, skills} = cardData;

    const handleSendRequest = async (status, _id) => {
      try {
        const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+_id, {}, {withCredentials: true})
        console.log(res)
        dispatch(removeUserFromFeed(_id))
      } catch(err) {
        console.log("ERROR: ", err)
      }
    }

  return (
    <div className="card bg-base-300 w-96 shadow-xl m-5">
    <figure>
      <img
        src={photoUrl}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName} {lastName}</h2>
      <p>{age}, {gender}</p>
      <p>{about}</p>
      <p>{skills?.join(", ")}</p>
      {showRequestActions && <div className="card-actions justify-end">
        <button onClick={() => handleSendRequest("ignored", _id)} className="btn btn-ghost">Ignore</button>
        <button onClick={() => handleSendRequest("interested", _id)} className="btn btn-primary">Send request</button>
      </div>}
    </div>
  </div>
  )
}

export default UserCard