import React from 'react'
import {useParams} from "react-router-dom";
import Footer from './Footer'
import { useEffect} from "react";
import {Helmet} from 'react-helmet'
import {Card} from 'react-bootstrap'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'

import {useSelector,useDispatch} from 'react-redux';
import {showpost} from '../redux';
export default function ShowPost() {
    const {showPost} = useSelector(state=>state.PostReducer);
    const {user}=useSelector(state=>state.AuthReducer);
    let { slug } = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(showpost(slug));

    },[])
    console.log("show post console",showPost);

    return (
        <><Helmet>
        <meta charSet="utf-8" />
        <title>Show Post</title>
    </Helmet>
    {showPost.map((post)=>(
        <>
    <Card className="text-center">
  <Card.Header><h4>{post.username } <FontAwesomeIcon icon={faUser} /></h4></Card.Header>
  <Card.Body>
    <Card.Title>{post.title}</Card.Title>
    <Card.Img variant="top" src={process.env.PUBLIC_URL + `/images/${post.image}` } style={{height: '350px',width:'auto'}} alt="mypic" />

    <Card.Text>
     {post.description}<br/>
     <div className="container "
  dangerouslySetInnerHTML={{
    __html: post.body
  }}></div>

    </Card.Text>
     
  </Card.Body>
  <Card.Footer className="text-muted">Published {moment(post.updatedAt).fromNow()}</Card.Footer>
</Card>
</>
        ))}

  <Footer/>
            
        </>
        
    )
}
