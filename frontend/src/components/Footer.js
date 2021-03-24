import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
export default function Footer() {
    return (
        <div className="myfooter">
        <div className="footer-copyright text-center py-3" style={{backgroundColor:'#E2E0EC',color:'black'}}>
     
          &copy; {new Date().getFullYear()} Copyright: <Link to="/" style={{color:'inherit'}} > Blog.com </Link>
       
      </div>
            
        </div>
    )
}
