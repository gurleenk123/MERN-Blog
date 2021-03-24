import {useSelector,useDispatch} from 'react-redux';
import {Helmet} from 'react-helmet'
import React, { useEffect,useState} from "react";
import Footer from './Footer';
import {allposts} from '../redux';
import { Card,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faEye } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import {Link} from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';
import {REMOVE_LOGINSUCCESS} from '../redux/actions/Actiontypes';

import "./style.css"



const renderdata=(allpost)=>{
 


 
    return ( 
      allpost.map((post)=>(
        <>
        <Link to={"/showpost/" + post.slug} params={{ slug: post.slug }} style={{textDecoration:'none',color:'inherit'}} >
        <Card style={{ width: '50%',margin: '30px',cursor:'pointer'}} className="mx-auto" >

<Card.Img variant="top" src={process.env.PUBLIC_URL + `/images/${post.image}` } style={{height: '350px'}} alt="mypic" />
<Card.Body>
<Card.Title >

<span style={{color:'silver'}}>Published {moment(post.updatedAt).fromNow()}</span><br/>
<span style={{color:'silver'}}>By {post.username} <FontAwesomeIcon icon={faUser} /></span>
<br/><b><h1 style={{fontFamily: 'Noto Sans KR sans-serif'}} >{post.title}</h1></b>
</Card.Title>

<Card.Text>


</Card.Text>



</Card.Body>
</Card>
</Link>
</>   
      )         
))

}

export default function Home(){
    
  const {user,loginsuccess}=useSelector(state=>state.AuthReducer);
 const {allpost} = useSelector(state=>state.PostReducer);
  const dispatch = useDispatch();
  //dispatch(allposts());
   
  //console.log("all posts are",allpost)
  const [currentPage,setcurrentPage]=useState(1);
    const [itemsPerPage,setitemsPerPage]=useState(3);

    const handleclick=(event)=>{
      setcurrentPage(Number(event.target.id));
    }
    const pages=[];
    for(let i=1;i<=Math.ceil(allpost.length/itemsPerPage);i++){
        pages.push(i);

    }
    const renderPage=pages.map(number=>{
        return (
            <li key={number} id={number} onClick={handleclick} className={currentPage == number ? "active" : null} >{number}</li>
        )
    })
  const indexOfLastItem=currentPage*itemsPerPage;
  const indexOfFirstItem=indexOfLastItem-itemsPerPage;
  const currentItems=allpost.slice(indexOfFirstItem,indexOfLastItem);

 useEffect(()=>{
   dispatch(allposts());
 },[])
 
 useEffect(()=>{
   if(loginsuccess)
   { 
    toast.success(loginsuccess) 
    dispatch({type:'REMOVE_LOGINSUCCESS'})
   }
 },[])

 
const title=user ?      <Helmet>
<meta charSet="utf-8" />
<title>Blog-Home</title>
</Helmet> :     <Helmet>
                <meta charSet="utf-8" />
                <title>Blog</title>
            </Helmet>;
    return (
      <>
   
        <div>
        <br/>
        <Toaster/>
    

    { allpost.length>0 ?  renderdata(currentItems) : <h3 style={{margin:'auto'}} ><i>No posts to show</i></h3>}
            
    <div className="pageNumbers"> {renderPage}</div>
        </div>
        <br></br>
        <Footer/>
        </>
    )
}
