import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const userData = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
    await axios.post(BASE_URL + "/logout", {}, {withCredentials: true})
    dispatch(removeUser());
    navigate("/login")
    } catch(err) {
      console.log("ERROR: " + err)
    }
    
  }
    return (
        <div className="navbar bg-base-300">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">👩🏻‍💻DevTinder</Link>
  </div>
  <div className="flex-none gap-2">
  {userData && userData.firstName && <p >Welcome, {userData.firstName}!</p>}
  {userData && userData.photoUrl && <div className="dropdown dropdown-end mx-10">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Photo"
            src={userData.photoUrl}/>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections" >Connections</Link></li>
        <li><Link to="/requests" >Requests</Link></li>
        <li><Link to="/premium" >Premium</Link></li>
        <li><Link onClick={() => handleLogout()}>Logout</Link></li>
      </ul>
    </div>}
  </div>
</div>
    )
} 

export default NavBar;