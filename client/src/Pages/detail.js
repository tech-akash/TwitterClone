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
import Tweet from "../components/Tweet";
import SingleTweet from "../components/singleTweet";
function TweetDetail() {
    const { id } = useParams()
    const { authToken } = useContext(AuthContext)
    const [data, Setdata] = useState()
    const { content, setContent } = useState()
    async function getData() {
        try {

            const Response = await axios.get(`http://127.0.0.1:8000/detail/${id}/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + String(authToken.access)
                }
            })
            if (Array.isArray(Response.data)) {

                Setdata(Response.data)
            } else {
                Setdata([Response.data])
            }

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
        <Row>
            <Col>
                <NavBar />
            </Col>
            <Col xs={6}>
                <h3 >Tweet</h3>
                {data && data['0']['parent'] && <Tweet data={data} />}
                {data && !data['0']['parent'] && <SingleTweet data={data} />}
                {/* <Tweet data={data}/> */}
            </Col>
            <Col>

            </Col>
        </Row>
    );
}

export default TweetDetail