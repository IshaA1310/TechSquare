import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice"

const Navbar = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      const BearerToken = localStorage.getItem('token');
      await axios.patch(BASE_URL + '/logout', {
        headers: {
          'authorization': BearerToken
        },
        withCredentials: true
      })
      localStorage.removeItem('token');
      dispatch(removeUser());
      return navigate('/login');

    } catch(error) {
      // may be error page we have to show
    }
  }

  return (
    <>
    <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-2xl">Tech Square 👩‍💻</Link>
        </div>
        {user && (<div className="flex gap-2">
          <span className="content-center text-xl">Welcome, {user.firstName}</span>
          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Photo Url"
                  src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">Profile</Link>
              </li>
              <li><a>Settings</a></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>) }
      </div>
    </>
  )
}

export default Navbar;
