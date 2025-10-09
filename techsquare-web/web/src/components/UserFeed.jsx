import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeOneFeed } from "../utils/feedSlice"
import axios from "axios"

const UserFeed = ({user}) => {

  const dispatch = useDispatch();
  const bearerToken = localStorage.getItem('token');
  const [error, setError] = useState('');
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { photoUrl, firstName, lastName, about, age, gender, _id, profile } = user;

  const handleRequest = async(request) => {
    try {
      setError('');
      let url = '';
      if(request === 'Ignore') url = BASE_URL + `/connection/request/Ignored/${_id}`;
      else if(request === 'Interested') url = BASE_URL + `/connection/request/Interested/${_id}`;

      const res = await axios.post(url, request, {
        headers: {
          'authorization': bearerToken
        },
        withCredentials: true
      });

      setToastMessage(`Marked as ${request} Successfully!`)
      setToast(true);
      setTimeout(()=> {
        setToast(false);
        setToastMessage('');
      },2000);

      dispatch(removeOneFeed(_id));

    } catch(error) {
      console.log(error, ' error')
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="card bg-base-200 w-70 shadow-sm">
        {photoUrl && <figure>
          <img src={photoUrl} alt="Photo" />
        </figure>}
        <div className="card-body">
          <h2 className="card-title">
            {firstName + " " + lastName}
            {/* <div className="badge badge-accent">{skills[0]}</div> */}
          </h2>
          <div>
            {age && gender && <p>{age}, {gender}</p>}
            <p>{about}</p>
          </div>
          {!profile && <div className="card-actions justify-end">
            <button className="btn btn-secondary" onClick={()=>handleRequest('Ignore')}>Ignore</button>
            <button className="btn btn-primary" onClick={()=>handleRequest('Interested')}>Interested</button>
          </div>}
        </div>
      </div>
      <p className="text-red-500">{error}</p>
      {toast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>{toastMessage}</span>
        </div>
      </div>}
    </div>
  )
};

export default UserFeed;
