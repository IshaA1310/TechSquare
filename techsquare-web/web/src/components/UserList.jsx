import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const UserList = () => {

  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const getUsers = async() => {
    const users = await axios.get(BASE_URL + '/usersList', {
      headers:{
        'authorization': token
      },
      withCredentials: true
    })
    // Safe access
    const userList = Array.isArray(users.data.data) ? users.data.data : [];
    setUsers(userList);
  }
  useEffect(()=> {
    getUsers();
  }, []);

return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xl text-center opacity-60 tracking-wide">OUR USERS</li>
        {users.map((user, index) => (
          <li key={index} className="list-row flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <img className="size-10 rounded-box" src={user.photoUrl} alt={user.name} />
              <div>
                <div>{user.firstName} {user.lastName} ({user.email})</div>
                {/* <div className="text-xs uppercase font-semibold opacity-60">{user.song}</div> */}
              </div>
            </div>
            <div className="flex items-center gap-2">
                <div>{user.age},  {user.gender} </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
