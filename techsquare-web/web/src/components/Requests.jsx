import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";
import axios from "axios";
const bearerToken = localStorage.getItem('token');

const Requests = () => {

  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchRequests = async() => {
    try{
      const res = await axios.get(BASE_URL + '/user/requests/received', {
        headers: {
          'authorization': bearerToken
        },
        withCredentials: true
      })
      dispatch(addRequest(res.data.data));
    } catch(err) {
      setError(err.message);
    }
  }

  const handleRequest = async(request, id) => {
    setError('');
    try {
      let url = ''; 
      if (request === 'Accepted') url = BASE_URL + `/request/review/Accepted/${id}`
      else if (request === 'Rejected') url = BASE_URL + `/request/review/Rejected/${id}`
      const res = await axios.post(url, 'request', {
        headers: {
          'authorization': bearerToken
        },
        withCredentials: true
      });
      setToastMessage(res.data.message);
      setToast(true);
      dispatch(removeRequest(id));
      setTimeout(()=> {
        setToast(false);
        setToastMessage('');
      }, 2000);
    } catch(error) {
      console.log(error, 'error.message')
      setError(error.response.data.message);
      setTimeout(()=> {
        setError('');
      }, 2000);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  if(!requests) return;

  if(requests.length === 0) return <div className="flex justify-center m-20 text-xl text-red-500 font-bold">No Requests Found!</ div>

  return (
    (requests && <div>
      <li className="p-4 pb-2 text-xl text-center tracking-wide">Connection Requests</li>
      <ul className="list bg-base-200 rounded-box shadow-md">
        {requests.map((request, index) => (
          <li key={index} className="list-row p-5 border-b-8 border-gray-100">
            <div className="flex gap-4">
              <img className="size-10 rounded-box" src={request.fromUserId.photoUrl} alt={request.fromUserId.name} />
              <div className="flex flex-col justify-between w-full">
                <div>
                  <div className="text-xs uppercase font-semibold">{request.fromUserId.firstName} {request.fromUserId.lastName}</div>
                  <div className="text-xs font-semibold opacity-90">{request.fromUserId.age}, {request.fromUserId.gender}</div>
                  <div className="text-xs opacity-90">{request.fromUserId.about}</div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="btn btn-secondary btn-sm" onClick={()=>handleRequest('Accepted', request.fromUserId._id)}>Accept</button>
                  <button className="btn btn-primary btn-sm" onClick={()=>handleRequest('Rejected', request.fromUserId._id)}>Reject</button>
                </div>
              </div>
            </div>
            {/* <div className="text-red-500">{error}</div>
            {toast && <div className="toast toast-top toast-center">
              <div className="alert alert-success">
                <span>{toastMessage}</span>
              </div>
            </div>} */}
          </li>
        ))}
      </ul>
      {/* <div className="text-red-500">{error}</div> */}
       {error && <div className="toast toast-top toast-center">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>}
      {toast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>{toastMessage}</span>
        </div>
      </div>}
    </div>)
  )
};

export default Requests;
