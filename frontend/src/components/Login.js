import {Form,Button,Container, Row, Col, Alert, ListGroup } from 'react-bootstrap'
import logo from '../logo.png'
import {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { login } from '../redux'
import {Redirect} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import Footer from './Footer';
import toast,{Toaster} from 'react-hot-toast';
import {REMOVE_SIGNSUCCESS} from '../redux/actions/Actiontypes';


export default function Login(props){
  const [state,setState]=useState({
    
    email:'',
    password:''
  });
      
  const dispatch = useDispatch();
  const onchange=(e)=>{
    setState({
      ...state,
      [e.target.name]:e.target.value

    });
  }
  const {loading,loginError,loginsuccess,user,signsuccess}=useSelector(state=>state.AuthReducer);

  useEffect(()=>{
    if(signsuccess)
    {
      
          toast.success(signsuccess) 
          dispatch({ type: REMOVE_SIGNSUCCESS})

      
    }
  },[])
  const loging=(e)=>{
    e.preventDefault();
    console.log(state);
   dispatch(login(state));
    
  }
  return (
     <>

      {user ? <Redirect to="/" />:null }
      {loading ? <div class="spinner-grow" style={{width: "8rem",height: "8rem"}} role="status"/> : null}

      <Helmet>
                <meta charSet="utf-8" />
                <title>LOGIN</title>
            </Helmet>
            <Toaster/>
        <div className="container">
        <br/><br/>
        <h1>Login</h1>
        <Container fluid>
                <Row>
                    <Col xs={8} >
                        <img src={logo} alt="mylogo" style={{ height: "100%", width: "100%" }}></img>
                    </Col>

                    <Col >
        <Form onSubmit={loging}>
  <Form.Group controlId="formGroupEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" name="email" onChange={onchange} value={state.email} placeholder="Enter email" />
  </Form.Group>
  <Form.Group controlId="formGroupPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password"  onChange={onchange} name="password" value={state.password} placeholder="Password" />
  </Form.Group>
  <Button variant="warning" type="submit">
  {loading ? "Logging.." :"Login" }
  </Button>
</Form>
   <ListGroup style={{ marginTop: "15px" }}>
      {  loginError ?
          loginError.map((err,i) => (
              <ListGroup.Item variant="danger" key={i} style={{ borderLeft: "3px solid #8c0000" }}>{err.msg}</ListGroup.Item>
          ))
          : null
      }
    </ListGroup> 

{loginsuccess ? <Alert variant="success" style={{ borderLeft: "3px solid green" }}>{loginsuccess}</Alert> : <> </>}


</Col>
                </Row>
                
            </Container>
           
        </div>
        <Footer/>
        </>
    )
}
