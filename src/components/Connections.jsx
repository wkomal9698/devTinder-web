import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const connectionData = useSelector(store => store.connection)
    const dispatch = useDispatch();

    useEffect(() => {
        fetchConnections()
    }, [])

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL+"/user/connections", {withCredentials: true})
            dispatch(addConnections(res.data.data))
        } catch(err) {
            console.log("ERROR: ", err)
        }
    }

    if(!connectionData) return

    if(connectionData.length === 0) return <h1 className="flex justify-center my-10">No connections found</h1>

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-3xl">Connections</h1>
            {connectionData.map(connection => {
                const {_id, firstName, lastName, photoUrl, age, gender, about} = connection;
                return (
                    <div key={_id} className="flex m-4 p-4 bg-base-200 w-1/2 mx-auto">
                        <img alt="Profile picture" src={photoUrl} className="w-20 h-20 rounded-full"></img>
                        <div className="text-left mx-4">
                        <h2 className="text-bold text-xl">{firstName} {lastName}</h2>
                        {age && gender && <p>{age}, {gender}</p>}
                        <p>{about}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Connections;