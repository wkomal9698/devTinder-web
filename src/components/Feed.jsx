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

  return (
    <div className="flex flex-col justify-center my-auto">
      {userFeed.map(card => <UserCard cardData={card} key={card?._id}/>)}</div>
  )
}

export default Feed