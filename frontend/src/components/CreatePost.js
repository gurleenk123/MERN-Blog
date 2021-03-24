import {Form,Button,Container, Row, Col, Alert, ListGroup ,FormControl,Card} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import {useDispatch,useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom'
import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from './Footer';
import { creating } from '../redux'
export default function CreatePost() {
    const {user}=useSelector(state=>state.AuthReducer);
    const {loading,post_error,post_success}=useSelector(state=>state.PostReducer);
   
    
    //image state
    const [image,setImage]=useState('Insert Image');
    //image preview state
    const [imagepreview,setpreview]=useState('');
      //state for editor
    const [value, setValue] = useState('');
       //state for slug
    const [slug,setSlug]=useState('');
    //state for slug update button
    const [slugbutton,setslugbutton] = useState(false);

  //state for title
  const [state,setState] =useState({
    title:'',
    description:'',
    image:''
  })
    //getting image
    const filechange=e=>{
      //console.log(e.target.files[0].name);
      if(e.target.files.length!==0)
      {

      setImage(e.target.files[0].name);

      //setstate for image
      setState({
        ...state,
        [e.target.name]:e.target.files[0]
      })

      //FileReader is use for reading data from file objects

      const reader=new FileReader();
      reader.onloadend=()=>{
        setpreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    };
  

  

    //description onChange
    const desOnchange=(e)=>{
     
      setState({
        ...state,
        [e.target.name]:e.target.value
      })

    }
    

//getting button while updating slug
const slugupdate=(e)=>{
  setslugbutton(true);
  setSlug(e.target.value);
  //console.log('slug is:',slug);
}

//slug update button onclick
const slugonclick=(e)=>{
  e.preventDefault();
  setSlug(slug.trim().split(' ').join('-'));
  //console.log('slug is',slug)
}

//this is for title while writing we will get slug
    const onchange=(e)=>{
      setState({
        ...state,
        [e.target.name]:e.target.value
      });
      const createslug=e.target.value.trim().split(' ').join('-');
      setSlug(createslug);
    }

    const dispatch = useDispatch();
    //on submit form 
   
    const onsubmit=e=>{
      e.preventDefault();
     // console.log(state);
  
     const formdata=new FormData();
     const {title,description,image}=state;
     formdata.append('title',title);
     formdata.append('description',description);
     formdata.append('image',image);
     formdata.append('slug',slug);
     formdata.append('body',value);
     formdata.append('username',user[0].uname);
     formdata.append('userid',user[0]._id);

     dispatch(creating(formdata));

     // Display the key/value pairs
// for (var pair of formdata.entries()) {
//   console.log(pair[0]+ ', ' + pair[1]); 
// }



    }


    return (
        <>
        {user ? null :<Redirect to="/" /> }

        {post_success ? <Redirect to="/myposts" /> : null}
            <Helmet>
                <meta charSet="utf-8" />
                <title>Create Post</title>
            </Helmet>
            <Container fluid>
            <Row>
       
            <Col xs={10} className="mx-auto">
            <Card style={{ marginTop:'30px'}}>
 
  <Card.Body>
    <Card.Title>CREATE NEW POST</Card.Title>
    <Form onSubmit={onsubmit}>
  <Row>
  <Col>
    
    <Form.Group as={Row} controlId="formPlaintext">
    <Form.Label column sm="2" >
      Title
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" onChange={onchange} value={state.value} placeholder="Enter Post Title" name="title" />
    </Col>
  </Form.Group>

  <div className="custom-file" style={{width:'70%',marginLeft:'35px',cursor:'pointer'}}>
    <input
      type="file"
      className="custom-file-input"
      id="inputGroupFile01"
      aria-describedby="inputGroupFileAddon01"  onChange={filechange} name="image"
    />
    <label className="custom-file-label"  style={{backgroundColor: "#E2E0EC"}}htmlFor="inputGroupFile01">
      {image}
    </label>
  </div>

<br/>
<br/>
<Form.Group as={Row} controlId="formPlaintext">
    <Form.Label column sm="2">
      Body
    </Form.Label>
    <Col sm="10" >
    <ReactQuill theme="snow" value={value} onChange={setValue} placeholder="Post Body..." />

    </Col>
  </Form.Group>
 
 

</Col>
<Col>

<Form.Group as={Row} controlId="formPlaintext">
    <Form.Label column sm="2" >
     Post URL
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" value={slug} onChange={slugupdate} placeholder="Post URL...." name="slug" />
    </Col>
  </Form.Group>

  {slugbutton ? <Form.Group as={Row} controlId="formPlaintext">
  <Form.Label column sm="2">

  </Form.Label>
  <Col sm="10">
  <Button variant="secondary" style={{width: '100%'}} onClick={slugonclick} className="justify-content-lg-center">Update Slug</Button>

    </Col>

  </Form.Group> : null}

 
  {imagepreview ? 
  <Form.Group  as={Row}>
  <Form.Label column sm="2">
Image Preview
</Form.Label>
 <Col sm="10">
 <img src={imagepreview} alt="image" style={{width:'100%',height:'auto'}} />

    </Col>


  </Form.Group>
  : null}
 
 <Form.Group as={Row} controlId="formPlaintext">
    <Form.Label column sm="2" >
     Meta Description
    </Form.Label>
    <Col sm="10">
    <FormControl as="textarea" name="description" defaultValue={state.description} aria-label="With textarea" rows="8" placeholder="meta description...." onChange={desOnchange} maxLength="150" />
    <br/>
    {state.description ?<p>Word Count : {state.description.length}</p> : null}

    </Col>

  </Form.Group>
 
  
 




</Col>

</Row>
 <ListGroup style={{ marginTop: "15px" }}>
                            {post_error?
                                post_error.map((err) => (
                                    <ListGroup.Item variant="danger" style={{ borderLeft: "3px solid #8c0000" }}>{err.msg}</ListGroup.Item>
                                ))
                                : null
                            }
                        </ListGroup>
                     

<Col/>

<br/>
<Row>
<Col>
<Button variant="info" style={{width:'100%'}} type="submit" className="justify-content-lg-center">
  CREATE POST
  </Button>
</Col>

</Row>
</Form>

  
  </Card.Body>
</Card>


</Col >


</Row>
</Container>
<br/><br/>
<Footer/>
            
        </>
    )
}
