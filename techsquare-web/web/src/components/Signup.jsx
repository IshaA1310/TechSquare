import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        email,
        age,
        password
      });
      if(res) navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="place-items-center-safe my-4">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          {/* <h2 className="card-title justify-center text-2xl">REGISTER YOURSELF!!</h2> */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">FirstName</legend>
            <input type="text" value={firstName} className="input" placeholder="Type here" onChange={(e) => setFirstName(e.target.value)} required />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">LastName</legend>
            <input type="text" value={lastName} className="input" placeholder="Type here" onChange={(e) => setLastName(e.target.value)} required />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">Email</legend>
            <input type="text" value={email} className="input" placeholder="Type here" onChange={(e) => setEmail(e.target.value)} required />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">Age</legend>
            <input type="Number" value={age} className="input" placeholder="Type here" onChange={(e) => setAge(e.target.value)} required />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">Password</legend>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor" >
                  <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input type="password" value={password} placeholder="Password" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
            </p>
          </fieldset>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={handleRegister}>Signup</button>
          </div>
          <div className="card-actions justify-center text-sm">
            <span>Have an account? </span>
            <span className="font-medium"><Link to="/login">Login</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
