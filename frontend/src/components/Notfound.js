import React from 'react'
import {Helmet} from 'react-helmet'
export default function Notfound() {
    return (
        <div className="Notfound">
            
            <Helmet>
                <meta charSet="utf-8" />
                <title>NOT FOUND</title>
            </Helmet>
            
       <div className="notfound_container">
           <h1 style={{color:'green'}}>404</h1>
           <p>OOPs That Page could not be found</p>
       </div>

        </div>
    )
}
