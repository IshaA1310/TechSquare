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
    console.log(users.data.data, 'users lisst')
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
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">OUR USERS</li>
        {users.map((user, index) => (
          <li key={index} className="list-row flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <img className="size-10 rounded-box" src={user.photoUrl} alt={user.name} />
              <div>
                <div>{user.firstName} {user.lastName} ({user.email})</div>
                <div className="text-xs uppercase font-semibold opacity-60">{user.song}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
              </button>
              <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
