import axios from 'axios';
import { BASE_URL } from '../utils/constants'
import { useState } from 'react';
import { useEffect } from 'react';
const token = localStorage.getItem('token');

const Premium = () => {
  const [isPremium , setIsPremium] = useState(false);
  useEffect(()=> {
    verifyPremium();
  },[]);
  const verifyPremium = async () => {
    const res = await axios.get(BASE_URL + '/premium/verify', {
      headers: {
        'authorization': token
      }
    });
    if(res.data.isPremium === true) {
      setIsPremium(true)
    }
  }
  const handlePayment = async (type) => {
    const membershipType = {type};
    const orderRes = await axios.post(BASE_URL + '/create/payment', membershipType, {
      headers: {
        'authorization': token
      }
    })
    console.log(orderRes, ' orderRes');
    const { amount, currency, notes, orderId, keyId  } = orderRes.data.data;
    // Open Razorpay Checkout
    const options = {
      key: orderRes.data.keyId,
      amount,
      currency,
      name: 'techsquare',
      description: 'Connecting with payment gateway',
      order_id: orderId,
      prefill: {
        name: notes.firstName,
        lastName: notes.lastName,
        // email: notes.email
      },
      theme: {
        color: '#F37254'
      },
      handler: verifyPremium
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
  return (isPremium ? (<div className="flex justify-center m-20 text-xl text-red-500 font-bold">
    'You are already our member'
  </div>) : (
    <div className="my-10">
      <div className="flex w-full">
        <div className="card bg-base-200 rounded-box grid h-80 grow place-items-center">
          <h1 className="text-3xl">Silver Membership</h1>
          <li>100 connection requests per day</li>
          <li>Chat with people's</li>
          <li>3 months Validity</li>
          <li>Blue Tick</li>
          <button className="btn btn-secondary" onClick={() => handlePayment('Silver')}>Buy Silver</button>
          {/* <button onClick={handlePurchasePlan}>Buy Silver</button> */}
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-200 rounded-box grid h-80 grow place-items-center">
          <h1 className="text-3xl">Gold Membership</h1>
          <li>Infinite connection requests per day</li>
          <li>Chat with people's</li>
          <li>6 months Validity</li>
          <li>Blue Tick</li>
          <button className="btn btn-primary" onClick={() => handlePayment('Gold')}>Buy Gold</button>
          {/* <button onClick={handlePurchasePlan}>Buy Gold</button> */}
        </div>
      </div>
    </div>
  ))
}

export default Premium;
