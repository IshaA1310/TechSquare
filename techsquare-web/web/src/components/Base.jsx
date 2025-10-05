import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";

const Base = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store)=> store.user);
  const BEARER_TOKEN = localStorage.getItem('token');

  const fetchUser = async () => {
    try {
      if(!BEARER_TOKEN) navigate('/login');
      const res = await axios.get(BASE_URL + '/profile/view', {
        headers: {
          'Authorization': `${BEARER_TOKEN}`
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
    if(!userData) fetchUser();
  }, []);

  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
export default Base;