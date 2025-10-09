import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserFeed from "./UserFeed";

const EditProfile = () => {
  const bearerToken = localStorage.getItem('token');
  const user = useSelector((store) => store.user);
  const profile = 'profile';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState('');
  const [photoUrl, setphotoUrl] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState(false);

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
          'authorization': bearerToken
        },
        withCredentials: true
      });
      dispatch(addUser(res.data.data));
      setToast(true);
      setTimeout(()=> {
        setToast(false);
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  }

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + '/profile/view', {
        headers: {
          'authorization': bearerToken
        },
        withCredentials: true
      });
      dispatch(addUser(res.data.data));
    } catch(err) {
      console.log(err.message, ' error message');
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(()=> {
    if(user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setAge(user.age || '');
      setphotoUrl(user.photoUrl || '');
      setGender(user.gender || '');
      setAbout(user.about || '');
    }
  }, [user]);

  return (
    (user && <div className="flex justify-center my-3 px-2">
      <div className="place-items-center-safe mx-2">
        <div className="card card-dash bg-base-300 w-96 mx-2 p-2">
          <div className="card-body">
            {/* <h2 className="card-title justify-center text-2xl">EDIT PROFILE</h2> */}
            <fieldset className="mb-2 p-0">
              <legend className="text-sm font-medium">FirstName</legend>
              <input type="text" value={firstName} className="input px-2 py-1 text-sm" placeholder="Type FirstName" onChange={(e) => setFirstName(e.target.value)} required />
            </fieldset>
            <fieldset className="mb-2 p-0">
              <legend className="text-sm font-medium">LastName</legend>
              <input type="text" value={lastName} className="input px-2 py-1 text-sm" placeholder="Type LastName" onChange={(e) => setLastName(e.target.value)} required />
            </fieldset>
            <fieldset className="mb-2 p-0">
              <legend className="text-sm font-medium">Photo Url</legend>
              <input type="text" value={photoUrl} className="input px-2 py-1 text-sm" placeholder="Type Photo Url" onChange={(e) => setphotoUrl(e.target.value)} required />
            </fieldset>
            <fieldset className="mb-2 p-0">
              <legend className="text-sm font-medium">Age</legend>
              <input type="Number" value={age} className="input px-2 py-1 text-sm" placeholder="Type Age" onChange={(e) => setAge(e.target.value)} required />
            </fieldset>
            <fieldset className="mb-2 p-0">
              <legend className="text-sm font-medium">Gender</legend>
              <div>
                <input type="radio" name="radio-1" value="male" className="radio radio-primary mx-1" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />Male
                <input type="radio" name="radio-1" value="female" className="radio radio-primary mx-1" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />Female
                <input type="radio" name="radio-1" value="others" className="radio radio-primary mx-1" checked={gender === 'others'} onChange={(e) => setGender(e.target.value)} />Others
              </div>
            </fieldset>
            <fieldset className="mb-2 p-0">
              <legend className="text-sm font-medium">About</legend>
              <input type="text" value={about} className="input px-2 py-1 text-sm" placeholder="Type About" onChange={(e) => setAbout(e.target.value)} required />
              {/* <textarea className="textarea" value={about} placeholder="Type About" onChange={(e) => setAbout(e.target.value)}></textarea> */}
            </fieldset>
            <p className="text-red-500">{ error }</p>
            <div className="card-actions justify-center my-2">
              <button className="btn btn-secondary" onClick={back}>Back</button>
              <button className="btn btn-primary" onClick={updateProfile}>Update Profile</button>
            </div>
          </div>
        </div>
      </div>
      <UserFeed user={ { photoUrl, firstName, lastName, about, age, gender, profile } }/>
      {toast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile updated successfully.</span>
        </div>
      </div>}
      {/* <UserFeed user={ user }/> */}
    </div>)
  )
}

export default EditProfile;
