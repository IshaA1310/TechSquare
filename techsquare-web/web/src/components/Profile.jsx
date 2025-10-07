import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const editProfile = () => {
    navigate("/editProfile");
  }

  return (
    (userData && <div className="hero bg-base-300 my-15">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={userData.photoUrl}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h1>
          <p className="py-6">
            {userData.about}
          </p>
          <button className="btn btn-primary" onClick={editProfile}>Edit Profile</button>
        </div>
      </div>
    </div>)
  )
}

export default Profile;
