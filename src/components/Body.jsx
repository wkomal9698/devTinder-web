import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios"
import {BASE_URL} from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import {addUser} from "../utils/userSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);


  const fetchUser = async () => {
    console.log("ERROR:!")
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      });
      dispatch(addUser(res.data));
    } catch(err) {
      if(err.status === 401) {
        navigate("/login")
      }
      console.log("ERROR:" + err)
    }
  }

  useEffect(() => {
    console.log("ERROR: in effect" + userData)
    if(!userData) {
      console.log("ERROR: in effect")
      fetchUser();
    }  
  }, []);

  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body