import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faSignInAlt,faPen,faList} from '@fortawesome/free-solid-svg-icons'
import {useDispatch,useSelector} from 'react-redux';
import { logout } from '../redux/actions/AuthAction'
import {Link } from 'react-router-dom';
import logo from '../logo.jpg';
export default function MyNavbar() {
  const {user}=useSelector(state=>state.AuthReducer);
  const dispatch=useDispatch();
  const onclick=(e)=>{
     e.preventDefault();
    //console.log(state);
    localStorage.removeItem('mytoken');
    dispatch(logout());

  }
const links=user ? 
<>
<Nav.Link><Link to="/myposts"  style={{color:'black'}}>My Posts  <FontAwesomeIcon icon={faList} /></Link>   </Nav.Link>

<Nav.Link><Link to="/createpost"  style={{color:'black'}}>Create Post <FontAwesomeIcon icon={faPen} /></Link>  </Nav.Link>
<Nav.Link><Link to="/"  style={{color:'black'}}>{user[0].uname} <FontAwesomeIcon icon={faUser} /></Link> </Nav.Link>
<Nav.Link   onClick={onclick}  style={{color:'black'}}>Logout <FontAwesomeIcon icon={faSignInAlt} /></Nav.Link>
</>
: 
<>
<Nav.Link><Link to="/signup" style={{ color: 'black' }}>Signup </Link><FontAwesomeIcon icon={faUser} /></Nav.Link>
<Nav.Link><Link to="/login"  style={{color:'black'}}>Login </Link><FontAwesomeIcon icon={faSignInAlt} /></Nav.Link>
</>;
    return (
        
         <Navbar style={{backgroundColor:'white'}} className="myNavbar">
         <Link to="/">
           <img
        alt=""
        src={logo}
        width="100"
        height="90"
        
        className="d-inline-block align-top "
      /> </Link>
    <Nav className="ml-auto"  >
      
      {links}
    </Nav>
 
  </Navbar>
        
            
        
    )
}
