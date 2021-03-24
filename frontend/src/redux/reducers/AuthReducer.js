import {LOGOUT,SIGN_UP,SIGNUP_DONE,SIGNUP_ERROR,LOGIN,LOGIN_ERROR,LOGIN_DONE,SET_TOKEN,REMOVE_LOGINSUCCESS,REMOVE_SIGNSUCCESS} from '../actions/Actiontypes.js';

import jwt_decode from "jwt-decode";
const initialState={
    loading: false,
    signupErrors:[],
    signsuccess:'',
    loginError:[],
    loginsuccess:'',
    token:'',
    user:''
}
const verifytoken=token=>{
    const decodedtoken=jwt_decode(token);
   // console.log("user is",decodedtoken);
    const expires=new Date(decodedtoken.exp*1000);
    if(new Date()> expires)
    {
    localStorage.removeItem('mytoken');
    return null;

    }
    else
    {
        return decodedtoken;
    }
}
const token=localStorage.getItem('mytoken');
if(token)
{
    const decoded=verifytoken(token);
    if(decoded)
    {
        initialState.token=token;
        const {user}=decoded;
        //console.log("here is decoded user",user[0].uname);
        initialState.user=user;
    }
  

}



const AuthReducer=(state=initialState,action)=>{
   switch(action.type)
   {
       case SIGN_UP:return{
           ...state,
           loading:true
       }
       case SIGNUP_DONE:return{
           ...state,
           loading:false,
           signupErrors:[],
           signsuccess:action.payload
       }
       case SIGNUP_ERROR:return{
           ...state,
           loading:false,
           signupErrors:action.payload,
           signsuccess:''
       }
       case LOGIN:return{
        ...state,
        loading:true

       }
       case LOGIN_DONE:return{
        ...state,
        loading:false,
        loginError:[],
        loginsuccess:action.payload

       }
       case LOGIN_ERROR:return{ 
           ...state,
        loading:false,
        loginError:action.payload,
        loginsuccess:''
    }
    case SET_TOKEN:
        const decoded=verifytoken(action.payload);
        const {user} =decoded;
        console.log('userrr',user);
        return{
            ...state,
            token:action.payload,
            user:user
        }
     case LOGOUT:return{
            ...state,
            token:'',
            user:'',
            signsuccess:'',
            loginsuccess:''

        }
        case REMOVE_LOGINSUCCESS:return{
            ...state,
            loginsuccess:'',
            
        }
        case REMOVE_SIGNSUCCESS:return{
            ...state,
            signsuccess:'',
            
        }
       default: return state;
   }
  
}
export default AuthReducer;