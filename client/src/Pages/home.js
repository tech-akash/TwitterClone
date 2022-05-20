import React from 'react';
import { Form, 
  Container,
   Col,
    Row,
     Card, Nav, Navbar, ButtonGroup,Modal,Button } from 'react-bootstrap'
import { useState, useEffect, useContext } from "react";
import axios from "axios"
import { Link,Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyVerticallyCenteredModal from '../components/modal';
import NavBar from '../components/NavBar';
import '../style.scss'
// import { LoginContext } from "../contexts/AuthContext";
import { AuthContext } from '../contexts/AuthContext';

function Home() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState(null)
  const [content, setContent] = useState("")
  const [image, setImage] = useState(null)
  const { user, authToken, logout,SettweetDetail } = useContext(AuthContext)
  const [clickObjId,setclickObjId] = useState()
  // console.log(authToken.access)
  async function getdata() {
    // let data;
    try {

      let response = await axios.get(`http://127.0.0.1:8000/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access)
        }
      })
      setData(response.data)
    } catch (e) {
      // console.log(e)
      if (user && e.response.status === 401) {
        console.log("hiii")
        logout()
        // navigate("/");
        
      } else if (user && e.response.status <= 500) {
        alert(e.message)
      }
    }



  }

  useEffect(() => {
    getdata()
  }, [modalShow]

  );

  function handleimg(e) {
    // setImgUrl((e.target.files[0]))
    console.log(e.target.files[0])
    setImage(e.target.files[0]);
  }
  function handleSubmit(e) {
    // let productimg=URL.createObjectURL(imgUrl)
    e.preventDefault()
    let data = { content, image }
    console.log(data);
    const myNewModel = axios
      .post(`http://127.0.0.1:8000/createtweet/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': 'Bearer ' + String(authToken.access)
        },
      }).then((res) => {
        getdata();
        setImage(null);
        setContent("");
        return res;
      }).catch((error) => {
        return error.response;
      });
  }
  async function handleLike(id) {
    console.log(id)
    try {

      let response = await axios.get(`http://127.0.0.1:8000/like/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access)
        }
      })
      getdata()
      // setData(response.data)
    } catch (e) {
      console.log(e)
      // if(user &&e.response.status===401){
      //   logout()
      // }else if(user&&e.response.status<=500){
      //   alert(e.message)
      // }
    }
  }
  async function handleretweet(id) {
    console.log(id)
    try {

      let response = await axios.post(`http://127.0.0.1:8000/retweet/${id}/`,{} ,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access)
        }
      })
      getdata()
      // setData(response.data)
    } catch (e) {
      console.log(e)
      // if(user &&e.response.status===401){
      //   logout()
      // }else if(user&&e.response.status<=500){
      //   alert(e.message)
      // }
    }
  }
  if (data) {
    console.log(data)
  }
  function handlebtn(id){
    setclickObjId(id);
    setModalShow(true)
  }

  return (
    <Container className="App">

      <Row>
        <Col>
          <NavBar/>
        </Col>
        <Col xs={6}>
          <h3 >Home</h3>
          {/* {user && <h5>{user.username}</h5>} */}
          {user && <Form style={{ width: "100%", margin: "10px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tweet Content</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Type here ....." value={content} onChange={(e) => setContent(e.target.value)}>

              </Form.Control>

            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicfile">
              <Form.Label>Insert Image</Form.Label>
              <Form.Control type="file" accept="image/jpeg,image/png,image/gif" onChange={(e) => handleimg(e)} />
            </Form.Group>
            <Button variant="primary" className='btn' type="submit" onClick={(e) => handleSubmit(e)}>
              Tweet
            </Button>
          </Form>}



          <div>

            {data && data.map(({ image, content, id, likes,user,parent,is_retweet,is_reply,index }) => (
              < Card key={id} style={{ width: "100%", margin: "10px" }} className='card'>
                <Link to ={`/detail/${id}` } style={{textDecoration:"none", color:"black"}} > 
              {/* <Link to="/detail"> */}

                {image && <Card.Img variant="top" src={`http://127.0.0.1:8000/${image}`} />}
                {/* </Link> */}

                <Card.Body>
                {is_retweet&&!content&&<div><span><i class="bi bi-arrow-repeat"></i> {user} Retweeted </span>
                <Link to='/profile'>

                <Card.Title>{parent['username']}</Card.Title>
                </Link>
                  
                  {parent['content'] && <Card.Text>
                    {parent['content']}
                  </Card.Text>}
                  </div>}
                  {is_retweet&&content&&<Card>

                  </Card>}
                  
                  {!is_retweet&&<Card.Title>{user}</Card.Title>}
                  {/* {is_reply&&<span style={{color:"grey"}}>Replying to {parent['username']}</span>} */}
                  

                  {content && <Card.Text>
                    {content}
                  </Card.Text>}
                  
                  </Card.Body>
                  {/* <FaTwitter/> */}
                </Link>
                  <ButtonGroup aria-label="Basic example"  className='btn-grp'>
                    <Button className='btn tweetbtn like'  onClick={() => handleLike(id)}>{likes} <i class="bi bi-heart"></i></Button>
                    <Button className=' btn tweetbtn retweet'  onClick={() => handleretweet(id)}><i class="bi bi-arrow-repeat"></i></Button>
                    <Button className='btn tweetbtn reply'  onClick={() =>{ handlebtn(id)} }><i class="bi bi-reply"></i></Button>
                    <Button className='btn tweetbtn share'><i class="bi bi-share"></i></Button>
                  </ButtonGroup>
              
                  
                  
                  
                    
                
              </Card>
              
            ))}
                    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={data}
        id={clickObjId}
      />
          </div>
        </Col>
        <Col>3 of 3</Col>
      </Row>

    </Container>

  );
}

export default Home;
// {/* <Card key={id} style={{ width: "100%", margin: "10px" }} className='card'>
//                 {image && <Card.Img variant="top" src={`http://127.0.0.1:8000/${image}`} />}

//                 <Card.Body>
//                   <Card.Title>{user}</Card.Title>
//                   {content && <Card.Text>
//                     {content}
//                   </Card.Text>}

//                   {/* <ButtonGroup aria-label="Basic example" style={{ paddingRight: "20%" }} > */}
//                     <Button className='tweetbtn like btn' onClick={() => handleLike(id)}>{likes} <i class="bi bi-heart"></i></Button>
//                     <Button className='tweetbtn retweet btn 'onClick={() => handleretweet(id)}><i class="bi bi-arrow-repeat"></i></Button>
//                     <Button className='tweetbtn reply btn' onClick={() =>{ handlebtn(id)} }><i class="bi bi-reply"></i></Button>
//                     <Button className='tweetbtn share btn'><i class="bi bi-share"></i></Button>
//                   {/* </ButtonGroup> */}
//                 </Card.Body>
//               </Card> */}