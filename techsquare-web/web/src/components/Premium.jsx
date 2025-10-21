const Premium = () => {
  return (
    <div className="my-10">
      <div className="flex w-full">
        <div className="card bg-base-200 rounded-box grid h-80 grow place-items-center">
          <h1 className="text-3xl">Silver Membership</h1>
          <li>100 connection requests per day</li>
          <li>Chat with people's</li>
          <li>3 months Validity</li>
          <li>Blue Tick</li>
          <button className="btn btn-secondary">Buy Silver</button>
          {/* <button onClick={handlePurchasePlan}>Buy Silver</button> */}
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-200 rounded-box grid h-80 grow place-items-center">
          <h1 className="text-3xl">Gold Membership</h1>
          <li>Infinite connection requests per day</li>
          <li>Chat with people's</li>
          <li>6 months Validity</li>
          <li>Blue Tick</li>
          <button className="btn btn-primary">Buy Gold</button>
          {/* <button onClick={handlePurchasePlan}>Buy Gold</button> */}
        </div>
      </div>
    </div>
  )
}

export default Premium;