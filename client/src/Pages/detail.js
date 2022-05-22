import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import { AuthContext } from "../contexts/AuthContext";
import {Col,Row,} from 'react-bootstrap'
import { useParams } from "react-router-dom";
import { Card, ButtonGroup, Button,Form } from 'react-bootstrap'
import { Link } from "react-router-dom";
import ThreadComments from "../components/ThreadComments";
function Detail() {
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
            // console.log(Response.data)
                Setdata(Response.data)
        } catch (e) {
            console.log(e)
        }
    }
    async function handlereply(tid) {
        try {
            let data = { content }
            console.log(data)
            const response = await axios.post(`http://127.0.0.1:8000/reply/${tid}/`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': "Bearer " + String(authToken.access)
                }
            })
        } catch (e) {
            console.log(e)
        }


        // console.log(content)


    }
    useEffect(() => {
        getData()
    }, [])

    if (data) {
        console.log(data)
    }
    function handleLike(id){
        console.log(id);
    }
    function handleretweet(id){
        console.log(id);
    }

    return (
        <Row>
            <Col>
                <NavBar />
            </Col>
            <Col xs={6}>
                <h3 >Tweet</h3>
                {data&&
                    <Card>
                {data['parent']['image'] && <Card.Img variant="top" src={`http://127.0.0.1:8000/${data['parent']['image']}`} />}
                <Card.Body>
                    <Card.Title><Link to={`/profile/${data['parent']['username']}`}>{data['parent']['username']}</Link></Card.Title>
                    {data['parent']['content'] && <Card.Text>
                        {data['parent']['content']}
                    </Card.Text>}
                </Card.Body>
                <ButtonGroup aria-label="Basic example" className='btn-grp' >
                    <Button className='btn tweetbtn like' onClick={() => handleLike(data['parent']['id'])}>{data['parent']['likes']} <i class="bi bi-heart"></i></Button>
                    <Button className='btn tweetbtn retweet' onClick={() => handleretweet(data['parent']['id'])}><i class="bi bi-arrow-repeat"></i></Button>
                    {/* <Button className='btn tweetbtn reply' onClick={() => { handlereply(props.id) }}><i class="bi bi-reply"></i></Button> */}
                    <Button className='btn tweetbtn share' ><i class="bi bi-share"></i></Button>
                </ButtonGroup>
            </Card>
                }
                {data&& 
                
                <Card>
                    <Card.Body>

                    {/* <Card.Title>Reply</Card.Title> */}
                        <div>Replying to <Link to={`/profile/${data['parent']['username']}`}>{data['parent']['username']}</Link> </div>
                        {/* <input value={content} onChange={(e) => setContent(e.target.value)}></input> */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            
                            <Form.Control as="textarea" rows="3" placeholder="Tweet Your Reply ....." value={content} onChange={(e) => setContent(e.target.value)}>
                            
                            </Form.Control>

                        </Form.Group>
                        <Button onClick={()=>handlereply(data['parent']['id'])}>Reply</Button>
                    </Card.Body>
                       
                    </Card>
                }
                {data &&<ThreadComments value={data['comments']}/>}
                

            </Col>
            <Col>

            </Col>
        </Row>
    );
}

export default Detail