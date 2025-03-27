import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import NavBar from "./NavBar"

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId, password
      }, {
        withCredentials: true
      })
      console.log("LOGIN: ", res)
      dispatch(addUser(res.data));
      return navigate("/profile")
    } catch(err) {
      console.log("ERROR: ", err)
      setError(err?.response?.data || "Something went wrong!")
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL+"/signup", {
        firstName, lastName, emailId, password
      },{withCredentials: true})
      console.log("SIGNUP: ", res)
      // setIsLogin(true)
      dispatch(addUser(res.data));
      return navigate("/profile")
    } catch(err) {
      console.log("ERROR: ", err)
      setError(err?.response?.data || "Something went wrong!")
    }
  }

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLogin ? "Login" : "Sign Up"}</h2>
          <h2 className="card-title justify-center">{console.log("same text")} Same text</h2>
          {!isLogin && <><label className="form-control w-full max-w-xs">
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
          </label></>}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID:</span>
            </div>
            <input
              type="text"
              value={emailId}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmailId(e.target.value)}
            />
            <div className="label"></div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password:</span>
            </div>
            <input
              type="password"
              value={password}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="label"></div>
          </label>
          {error && <p className="text-red-500 flex justify-center">{error}</p>}
          <p className=" text-blue-800 flex justify-center cursor-pointer" onClick={() => setIsLogin(value => !value)}>{isLogin ? "New to DevTinder? Sign up here!": "Already registered? Login here!"}</p> 
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLogin? handleLogin : handleSignUp}>{isLogin? "Login" : "Sign Up"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
