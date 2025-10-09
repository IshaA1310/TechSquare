import { useEffect, useState } from "react";
import UserFeed from "./UserFeed"
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const userFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/feed', {
        headers: {
          'authorization': token
        },
        withCredentials: true
      });
      dispatch(addFeed(res.data.data));
    } catch(err) {
      <p className="text-red-500">{setError(error.message)}</p>
    }
  }

  useEffect(() => {
    if(!feed) userFeed();
  }, []);

  if(!feed) return;
  if(feed.length === 0) return <div className="flex justify-center m-20 text-xl font-bold">No More Users!</ div>
  return (

    (feed && <div className="flex justify-center my-6">
      <UserFeed user={feed[0]}/>
    </div>)
  )
}

export default Feed;
