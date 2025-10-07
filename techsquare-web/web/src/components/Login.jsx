import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  const [email, setEmailId] = useState('isha@yopmail.com');
  const [password, setPassword] = useState('Isha@123');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post( BASE_URL + '/login', {email, password},{withCredentials: true});
      localStorage.setItem('token', res.data.token);
      dispatch(addUser(res.data.data))
      return navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.log(err.response.data, 'error')
    }
  }
  
  return (
    <div className="place-items-center-safe my-15">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">LOGIN</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Email</legend>
            <input type="text" value={email} className="input" placeholder="Type here" onChange={(e) => setEmailId(e.target.value)} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Password</legend>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor" >
                  <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input type="password" value={password} required placeholder="Password" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
            </p>
          </fieldset>
          <p className="text-red-700">{error}</p>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
          <div className="card-actions justify-center text-base">
            <span>Don't have an account? </span>
            <span className="font-medium"><Link to="/signup">Signup</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
