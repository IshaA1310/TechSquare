const UserFeed = ({user}) => {
  const {photoUrl, firstName, lastName, about, age, gender} = user;
  return (
    <div className="card bg-base-200 w-70 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + " " + lastName}
          {/* <div className="badge badge-accent">{skills[0]}</div> */}
        </h2>
        <div>
          {age && gender && <p>{age}, {gender}</p>}
          <p>{about}</p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  )
};

export default UserFeed;
