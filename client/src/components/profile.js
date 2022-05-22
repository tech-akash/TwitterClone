import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import { AuthContext } from "../contexts/AuthContext";
// useParams
import {
    Col,
    Row,
} from 'react-bootstrap'
import { useParams } from "react-router-dom";
// import Tweet from "../components/Tweet";
import SingleTweet from "../components/singleTweet";
function Profile() {
    const { id } = useParams()
    const { authToken } = useContext(AuthContext)
    const [data, Setdata] = useState()
    const { content, setContent } = useState()
    async function getData() {
        try {

            const Response = await axios.get(`http://127.0.0.1:8000/profile/${id}/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + String(authToken.access)
                }
            })
            console.log(Response.data)
            Setdata(Response.data)

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    if (data) {
        console.log(data['0'])
    }

    return (
        <div>
            {data&&<div>
                {data['username']}
                {data['email']}
                {data['']}
            </div>}
        </div>
    );
}

// export default TweetDetail
export default Profile