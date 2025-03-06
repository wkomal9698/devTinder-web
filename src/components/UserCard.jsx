const UserCard = ({cardData, showRequestActions=false}) => {
    const {firstName, lastName, photoUrl, age, gender, about, skills} = cardData;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
    <figure>
      <img
        src={photoUrl}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName} {lastName}</h2>
      <p>{age}, {gender}</p>
      <p>{about}</p>
      <p>{skills?.join(", ")}</p>
      {showRequestActions && <div className="card-actions justify-end">
        <button className="btn btn-ghost">Ignore</button>
        <button className="btn btn-primary">Send request</button>
      </div>}
    </div>
  </div>
  )
}

export default UserCard