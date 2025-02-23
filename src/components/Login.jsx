import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
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
      navigate("/")
    } catch(err) {
      console.log("ERROR: ", err)
      setError(err?.response?.data || "Something went wrong!")
    }
  }

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID: {emailId}</span>
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
              <span className="label-text">Password: {password}</span>
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
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={() => handleLogin()}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
