import React, { useState, useEffect, useContext } from "react";
import { Card, ButtonGroup, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import MyVerticallyCenteredModal from '../components/modal';
import axios from "axios";
function Tweet(props) {
    const { authToken } = useContext(AuthContext)
    const [modalShow, setModalShow] = useState(false);
    const [clickObjId, setclickObjId] = useState(null);
    var data=null;
    async function handleLike(id) {
        try {

            let response = await axios.get(`http://127.0.0.1:8000/like/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authToken.access)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
    async function handleretweet(id) {
        try {

            let response = await axios.post(`http://127.0.0.1:8000/retweet/${id}/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authToken.access)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
    function handlereply(id) {
        setclickObjId(id);
        setModalShow(true);
        
    }

    return (
        <div>
            <Card>
                {props.image && <Card.Img variant="top" src={`http://127.0.0.1:8000/${props.image}`} />}
                <Card.Body>
                    <Card.Title><Link to={`/profile/${props.username}`}>{props.username}</Link></Card.Title>
                    {props.content && <Card.Text>
                        {props.content}
                    </Card.Text>}
                </Card.Body>
                <ButtonGroup aria-label="Basic example" className='btn-grp' >
                    <Button className='btn tweetbtn like' onClick={() => handleLike(props.id)}>{props.likes} <i class="bi bi-heart"></i></Button>
                    <Button className='btn tweetbtn retweet' onClick={() => handleretweet(props.id)}><i class="bi bi-arrow-repeat"></i></Button>
                    <Button className='btn tweetbtn reply' onClick={() => { handlereply(props.id) }}><i class="bi bi-reply"></i></Button>
                    <Button className='btn tweetbtn share' ><i class="bi bi-share"></i></Button>
                </ButtonGroup>
            </Card>
            {clickObjId && <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={props.data}
                id={clickObjId}
            />}

        </div>
    );
}

export default Tweet;