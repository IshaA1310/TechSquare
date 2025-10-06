const UserFeed = ({user}) => {
  return (
    <div className="card bg-base-200 w-70 shadow-sm">
      <figure>
        <img src={user.photoUrl} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName + " " + user.lastName}
          <div className="badge badge-accent">{user.skills[0]}</div>
        </h2>
        <p>Age: {user.age}</p>
        <p>{user.about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  )
};

export default UserFeed;
