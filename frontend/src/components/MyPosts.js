import {Helmet} from 'react-helmet'
import {useDispatch,useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom'
import React, {useEffect,useState} from "react";
import Footer from './Footer';
import toast,{Toaster} from 'react-hot-toast';
import {REMOVE_REDIRECT} from '../redux/actions/PostTypes';
import {myposts,deletepost} from '../redux';
import { Card,Button,Row,Col} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEye } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import {Link} from 'react-router-dom';
export default function Myposts(){
    const {user }=useSelector(state=>state.AuthReducer);
    const {posts}=useSelector(state=>state.PostReducer);
    const {post_success,del_success} =useSelector(state=>state.PostReducer);
    const dispatch = useDispatch();
    
   
    //console.log("posts are:",posts);
    const deleting=(id)=>{
      const confirm=window.confirm('Are you sure you want to delete');
      if(confirm)
      {
            dispatch(deletepost(id));
            dispatch(myposts(user[0]._id));       
      }
    
    }
    const showing=(slug)=>{
        
    }
   
    useEffect(()=>{

        if(post_success)
        {
            toast.success(post_success) 
            dispatch({ type: REMOVE_REDIRECT})

        }
     
        dispatch(myposts(user[0]._id));
    },[])
    useEffect(()=>{
        if(del_success)
        {
            toast.success(del_success) 
            dispatch({ type: REMOVE_REDIRECT})

        }

    },[])
  
    return (
        <>
        {user ? null :<Redirect to="/" /> }
        
        
        <Helmet>
                <meta charSet="utf-8" />
                <title>My Posts</title>
            </Helmet>
            <Toaster /><br/> 
            <h1>MY POSTS</h1>
         <Row>
         
            { posts.length>0 ? 
                 
               
                 posts.map((post)=>{ 
                    return ( 
                        <>
                       
                       <Col xl="4" style={{margin:'auto'}}>
                       
                      
                       <Card style={{width:'70%',margin:'auto',height:'100%'}} >

  <Card.Img variant="top" src={process.env.PUBLIC_URL + `/images/${post.image}` } style={{}} alt="mypic" />
  <Card.Body>
  <span style={{color:'silver'}}>Published {moment(post.updatedAt).fromNow()}</span>
    <Card.Title><h1>{post.title}</h1></Card.Title>
    <hr/>
    <Card.Text>
    <h3>{post.description}</h3>
    </Card.Text>
    <Link to={"/showpost/" + post.slug} params={{ slug: post.slug }} style={{textDecoration:'none',color:'inherit'}} ><Button variant="info" onClick={()=>showing(post.slug)}  style={{margin:'20px'}}><FontAwesomeIcon icon={faEye} /> Click To See Post</Button></Link>

    <Button variant="danger" onClick={()=>deleting(post._id)}> <FontAwesomeIcon icon={faTrash} /> Delete Post</Button>
  </Card.Body>
</Card>

</Col>


           </>            
            )})

                :<><br/><h3 style={{margin:'auto'}}><i>You don't have posts</i></h3></>
            }

            </Row>
            
        
           
            <br/><br/>
            <Footer/>
        </>
    )
}
