import axios from "axios";
import {useEffect} from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
    const requestsData = useSelector(store => store.request)
    const dispatch = useDispatch();

    useEffect(() => {
        fetchRequests()
    }, [])

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id, {}, {withCredentials:true})
            console.log("resss::", res)
            dispatch(removeRequest(_id))
        } catch(err) {
            console.log("ERROR:", err)
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL+"/user/requests/received", {withCredentials: true})
            dispatch(addRequests(res.data.data))
        } catch(err) {
            console.log("ERROR: ", err)
        }
    }

    if(!requestsData) return;

    if(requestsData.length === 0) return <h1 className="flex justify-center my-10">No pending requests!</h1>

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-3xl">Requests</h1>
            {requestsData.map(request => {
                const {_id, firstName, lastName, photoUrl, age, gender, about} = request?.fromUserId;
                const requestId = request?._id;
                return (
                    <div key={_id} className="flex justify-between items-center m-4 p-4 bg-base-200 w-2/3 mx-auto">
                        <img alt="Profile picture" src={photoUrl} className="w-20 h-20 rounded-full"></img>
                        <div className="text-left mx-4 w-2/3">
                        <h2 className="text-bold text-xl">{firstName} {lastName}</h2>
                        {age && gender && <p>{age}, {gender}</p>}
                        <p>{about}</p>
                        </div>
                        <div className="">
                        <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", requestId)}>Reject</button>
                        <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("accepted", requestId)}>Accept</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Requests;