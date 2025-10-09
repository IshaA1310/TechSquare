import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";

const Connections = () => {

  const connections = useSelector((store) => store.connection);
  const BearerToken = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        headers: {
          'authorization': BearerToken
        },
        withCredentials: true
      });
      dispatch(addConnection(res.data.data));
    } catch(err) {
      setError(err.message);
    }
  }

  useEffect(()=>{
    fetchConnections();
  },[])

  if(!connections) return;

  if(connections.length === 0) return <div className="flex justify-center m-20 text-xl text-red-500 font-bold">No Connections Found!</ div>

  return (
    (connections && <div>
      <li className="p-4 pb-2 text-xl text-center opacity-60 tracking-wide">My Connections</li>
      <ul className="list bg-base-200 rounded-box shadow-md">
        {connections.map((connection, index) => (
          <li key={index} className="list-row justify-between p-4 border-b-8 border-gray-100">
              <img className="size-10 rounded-box" src={connection.photoUrl} alt={connection.name} />
            <div>
              <div className="text-xs uppercase font-semibold">{connection.firstName} {connection.lastName}</div>
              <div className="text-xs font-semibold opacity-90">{connection.age}, {connection.gender}</div>
              <div className="text-xs">{connection.about}</div>
            </div>
            <div className="flex items-center uppercase gap-2">
                <div>{connection.age},  {connection.gender} </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-red-500">{error}</p>
    </div>)
  )
}

export default Connections;
