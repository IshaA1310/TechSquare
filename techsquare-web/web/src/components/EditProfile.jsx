import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserFeed from "./UserFeed";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState('');
  const BearerToken = localStorage.getItem('token');

  const back = () => {
    navigate('/profile');
  }

  const updateProfile = async () => {
    setError('');
    try {
      const data = {
        firstName,
        lastName,
        age,
        gender,
        about,
        photoUrl
      }
      const res = await axios.patch(BASE_URL + "/profile/edit", data, {
        headers: {
          'authorization': BearerToken
        },
        withCredentials: true
      });
      dispatch(addUser(res.data.data));
      if(res) navigate('/profile');
    } catch (error) {
      // console.error(error);
      setError(error.message);
    }
  }

  const fetchUser = async () => {
    try {
      if(!BearerToken) navigate('/login');
      const res = await axios.get(BASE_URL + '/profile/view', {
        headers: {
          'Authorization': `${BearerToken}`
        },
        withCredentials: true
      });
      dispatch(addUser(res.data.data));
    } catch(err) {
      if(err.status === 401 || err.status === 500) navigate("/login");
      console.error(err);
    }
  }

  useEffect(() => {
    if(!user) fetchUser();
  }, []);

  return (
    (user && <div className="flex justify-center my-2">
      <div className="place-items-center-safe mx-2">
        <div className="card card-dash bg-base-300 w-96 mx-6">
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
              <legend className="fieldset-legend text-sm">Age</legend>
              <input type="Number" value={age} className="input" placeholder="Type here" onChange={(e) => setAge(e.target.value)} required />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">Photo Url</legend>
              <input type="text" value={photoUrl} className="input" placeholder="Type here" onChange={(e) => setphotoUrl(e.target.value)} required />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">Gender</legend>
              <div>
                <input type="radio" name="radio-1" value="male" className="radio radio-primary mx-1" onChange={(e) => setGender(e.target.value)} />Male 
                <input type="radio" name="radio-1" value="female" className="radio radio-primary mx-1" onChange={(e) => setGender(e.target.value)} />Female 
                <input type="radio" name="radio-1" value="others" className="radio radio-primary mx-1" onChange={(e) => setGender(e.target.value)} />Others
              </div>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">About</legend>
              <input type="text" value={about} className="input" placeholder="About" onChange={(e) => setAbout(e.target.value)} required />
              {/* <textarea className="textarea" value={about} placeholder="About" onChange={(e) => setAbout(e.target.value)}></textarea> */}
            </fieldset>
            <p className="text-red-500">{ error }</p>
            <div className="card-actions justify-center my-2">
              <button className="btn btn-secondary" onClick={back}>Back</button>
              <button className="btn btn-primary" onClick={updateProfile}>Update Profile</button>
            </div>
          </div>
        </div>
      </div>
      {/* {photoUrl, firstName, lastName, about, age, gender} */}
      <UserFeed user={ {photoUrl, firstName, lastName, about, age, gender} }/>
      {/* <UserFeed user={ user }/> */}
    </div>)
  )
}

export default EditProfile;
