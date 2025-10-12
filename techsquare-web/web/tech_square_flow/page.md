
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const BearerToken = localStorage.getItem('token');

  const fetchConnections = async (page) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections?page=${page}&limit=10`, {
        headers: { 'authorization': BearerToken },
        withCredentials: true
      });

      setConnections(res.data.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchConnections(page);
  }, [page]);

  if (!connections) return null;

  if (connections.length === 0) return (
    <div className="flex justify-center m-20 text-xl text-red-500 font-bold">No Connections Found!</div>
  );

  return (
    <div>
      <li className="p-4 pb-2 text-xl text-center opacity-60 tracking-wide">My Connections</li>
      <ul className="list bg-base-200 rounded-box shadow-md">
        {connections.map((connection, index) => (
          <li key={index} className="list-row flex justify-between p-4 border-b-8 border-gray-100">
            <div className="flex items-center gap-4">
              <img className="size-10 rounded-box" src={connection.photoUrl} alt={connection.firstName} />
              <div>
                <div className="text-xs uppercase font-semibold">{connection.firstName} {connection.lastName}</div>
                <div className="text-xs font-semibold opacity-90">{connection.age}, {connection.gender}</div>
                <div className="text-xs">{connection.about}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="join mt-6 flex justify-center">
        <button
          className="join-item btn"
          disabled={page === 1}
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        >«</button>

        <button className="join-item btn cursor-default">Page {page} of {totalPages}</button>

        <button
          className="join-item btn"
          disabled={page === totalPages}
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
        >»</button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default Connections;
