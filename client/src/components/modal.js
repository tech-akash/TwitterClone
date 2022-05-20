import React from 'react';
import { useState, useEffect, useContext } from "react";
import { Form, 
    Container,
     Col,
      Row,
       Card, Nav, Navbar, ButtonGroup,Modal,Button } from 'react-bootstrap'
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

function MyVerticallyCenteredModal(props) {
    // useEffect(()=>{
        const {authToken}=useContext(AuthContext)
        var result;
        if(props.data&&props.id){
            result = props.data.filter(obj => {
                return obj.id === props.id
              })

            console.log(result['0']['id'])
        }
        const [content,setContent]=useState()

        async function handleClick(){
            try{
                let data={content}
                console.log(data)
                const response = await axios.post(`http://127.0.0.1:8000/reply/${result['0']['id']}/`,data,{
                    headers:{
                        "Content-Type": "multipart/form-data",
                        'Authorization':"Bearer "+String(authToken.access)
                    }
                })
            }catch(e){
                console.log(e)
            }


            // console.log(content)
            props.onHide()

        }
    // },[])
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Reply
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* {props.data && props.data.map(({ image, content, id, likes,user }) => ( */}
             {result&&<Card  style={{ width: "100%", margin: "10px" }} className='card'>
                {/* {image && <Card.Img variant="top" src={`http://127.0.0.1:8000/${image}`} />} */}

                <Card.Body>
                  <Card.Title>{result['0']['user']}</Card.Title>
                  {result['0']['content'] && <Card.Text>
                    {result['0']['content']}
                  </Card.Text>}
                {/* <Form> */}
            
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            > */}
              {/* <Form.L   abel>Example textarea</Form.L> */}
              <Form.Control style={{border:"none"}} value={content} onChange={(e)=>setContent(e.target.value)}as="textarea"placeholder="Tweet Your Reply" rows={3} autoFocus/>
            {/* </Form.Group> */}
            {/* <Button variant="primary" type="submit">
    Submit
  </Button> */}
          {/* </Form> */}

                  {/* <ButtonGroup aria-label="Basic example" style={{ paddingRight: "20%" }} > */}
                    {/* <Button className='tweetbtn like btn' onClick={() => handleLike(id)}>{likes} <i class="bi bi-heart"></i></Button>
                    <Button className='tweetbtn retweet btn 'onClick={() => handleretweet(id)}><i class="bi bi-arrow-repeat"></i></Button>
                    <Button className='tweetbtn reply btn' onClick={() => setModalShow(true)}><i class="bi bi-reply"></i></Button>
                    <Button className='tweetbtn share btn'><i class="bi bi-share"></i></Button> */}
                    {/* <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={data}
      /> */}
                  {/* </ButtonGroup> */}
                </Card.Body>
              </Card>} 
            {/* ))} */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Reply</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal