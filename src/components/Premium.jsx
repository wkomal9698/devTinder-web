import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios"

const Premium = () => {

    const [isPremium, setIsPremium] = useState(false);

    useEffect(()=>{
        verifyPremiumUser()
    }, [])

    const verifyPremiumUser = async () => {
        const res = await axios.get(BASE_URL+"/premium/verify", {withCredentials: true})
        const data = await res.json()

        if(data.data.isPremium) {
            setIsPremium(true)
        }
    }

    const handleBuyClick = async (type) => {
        try {
            const order = await axios.post(BASE_URL+'/payment/create', {type}, {withCredentials: true});

            // It should open Razorpay dialog box
            const {amount, keyId, currency, notes, orderId} = order.data;

            const options = {
                key: keyId,
                amount,
                currency,
                name: 'Dev Tinder',
                description: 'Connect to other developers',
                order_id: orderId, 
                prefill: {
                  name: notes.firstName+" "+notes.lastName,
                  email: notes.emailId,
                  contact: '9999999999'
                },
                theme: {
                  color: '#F37254'
                },
                handler: verifyPremiumUser
              };
            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch(err) {
            console.log("ERROR: ", err)
        }
    }

  return isPremium ? "You are already a Premium user" : (<div className="flex w-full m-10">
      <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
        <h1 className="font-bold text-3xl">SILVER MEMBERSHIP</h1>
        <ul>
          <li>- Chat with other people</li>
          <li>- Send 100 connection requests per day</li>
          <li>- Blue tick</li>
          <li>- 3 months</li>
        </ul>
        <button className="btn btn-primary" onClick={()=> handleBuyClick("silver")}>Buy Silver</button>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
        <h1 className="font-bold text-3xl">GOLD MEMBERSHIP</h1>
        <ul>
          <li>- Chat with other people</li>
          <li>- Send infinite connection requests per day</li>
          <li>- Blue tick</li>
          <li>- 6 months</li>
        </ul>
        <button className="btn btn-secondary" onClick={()=> handleBuyClick("gold")}>Buy Gold</button>
      </div>
    </div>
  );
};

export default Premium;
