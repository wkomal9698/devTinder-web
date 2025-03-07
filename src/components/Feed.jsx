import axios from "axios"
import { useEffect } from "react"
import {BASE_URL} from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import UserCard from "./UserCard"

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector(store => store.feed) || [];

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {withCredentials: true})
    dispatch(addFeed(res?.data))
    } catch(err) {
      console.log("ERROR: ", err)
    }
  }

  useEffect(() => {
    if(!userFeed.length) {
      fetchFeed();
    }
  }, [])

  if(!userFeed)  return

  if(userFeed.length <= 0) return <h1 className="flex justify-center my-10">No new users found!</h1>

  return (
    <div className="flex justify-center my-auto">
      {userFeed.length && <UserCard showRequestActions={true} cardData={userFeed[0]} key={userFeed[0]?._id}/>}
      </div>
  )
}

export default Feed