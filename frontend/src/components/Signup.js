
import {Form,Button,Container, Row, Col, Alert, ListGroup } from 'react-bootstrap'
import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { signingup } from '../redux'
import logo from '../logo.png'
import {Redirect} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import Footer from './Footer';


export default function Signup(props)
{
  const [state,setState]=useState({
    name:'',
    email:'',
    password:'',
    cpassword:''
  });
  const {loading,signupErrors,signsuccess,user}=useSelector(state=>state.AuthReducer);
  const dispatch = useDispatch();
  const onchange=(e)=>{
    setState({
      ...state,
      [e.target.name]:e.target.value

    });
  }
  const signing=(e)=>{
    e.preventDefault();
    console.log(state);
    dispatch(signingup(state));
    

  }
 
    return (
      <>
      {loading ? <div class="spinner-grow" style={{width: "8rem",height: "8rem"}} role="status"/> : null}
      {user ? <Redirect to="/"/>:null }
      {signsuccess ? <Redirect to="/login"/> : null}
      <Helmet>
                <meta charSet="utf-8" />
                <title>SIGN UP</title>
            </Helmet>

        <div className="container">

        <br/><br/>
        <h1>Signup</h1>
        <Container fluid>
                <Row>
                    <Col xs={8} >
                        <img src={logo} alt="mylogo" style={{ height: "100%", width: "100%" }}></img>
                    </Col>

                    <Col >
         <Form onSubmit={signing}>
         <Form.Group controlId="formGroupUsername">

    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="Enter Username" name="name" onChange={onchange} value={state.uname} />
  </Form.Group>
  <Form.Group controlId="formGroupEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" name="email" placeholder="Enter a valid email" onChange={onchange} value={state.email} />
  </Form.Group>
  <Form.Group controlId="formGroupPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" name="password" placeholder="Enter Password" onChange={onchange} value={state.password}  />
  </Form.Group>
  <Form.Group controlId="formGroupcPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" name="cpassword" placeholder="Enter Confirm Password" onChange={onchange} value={state.cpassword}  />
  </Form.Group>

  <Button variant="warning" type="submit">
  SIGNUP
  </Button>
  
</Form>
 <ListGroup style={{ marginTop: "15px" }}>
                            {signupErrors?
                                signupErrors.map((err) => (
                                    <ListGroup.Item variant="danger" style={{ borderLeft: "3px solid #8c0000" }}>{err.msg}</ListGroup.Item>
                                ))
                                : null
                            }
                        </ListGroup>
                        {signsuccess ? <Alert variant="success" style={{ borderLeft: "3px solid green" }}>{signsuccess}</Alert> : <> </>}
            
       
        </Col>
                </Row>
            </Container>
            
            </div>
            <Footer/>
            </>
           
    )
}
