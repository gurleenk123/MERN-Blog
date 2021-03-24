import axios from 'axios';
import {LOGOUT,SET_TOKEN,SIGN_UP,SIGNUP_DONE,SIGNUP_ERROR,LOGIN,LOGIN_ERROR,LOGIN_DONE} from './Actiontypes.js';

export const signingup=(user)=>{
  //console.log(user)
    return function (dispatch){
        dispatch(signup())
        var config = {
            method: 'post',
            url: 'http://localhost:5000/signup',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : user
          };
          
          axios(config).then(function (response) {
            console.log(response);
            dispatch(signupdone(response.data.message));
          }).catch(function (error) {
            console.log(error.response);
            dispatch(signuperror(error.response.data.errors))
          });
          

    }
}

export const login=(user) => {
  //console.log(user);
  return function(dispatch) {
    dispatch(loging())
    var config = {
      method: 'post',
      url: 'http://localhost:5000/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : user
    };
    
    axios(config).then(function (response) {

      //console.log(response);
      //console.log("data",response.data.token);
      localStorage.setItem('mytoken',response.data.token);
      dispatch(logindone(response.data.message));
      dispatch(settoken(response.data.token));
    }).catch(function (error) {
      console.log(error.response);
     dispatch(loginerror(error.response.data.errors))

    });


  }

}

const signup=()=>{
    return{
    type:SIGN_UP
    }

}
const signupdone=(success)=>{
    return {
        type:SIGNUP_DONE,
        payload: success
    }
  
}
const signuperror=(error)=>{
    return {
        type:SIGNUP_ERROR,
        payload: error
    }

}
//login actions
const loging=()=>{
  return{
  type:LOGIN
  }

}
const logindone=(success)=>{
  return {
      type:LOGIN_DONE,
      payload: success
  }

}
const loginerror=(error)=>{
  return {
      type:LOGIN_ERROR,
      payload: error
  }

}
const settoken=(token)=>{
  return{
    type:SET_TOKEN,
    payload:token
  }
}

export const logout=()=>{
  return{
    type:LOGOUT,

  }
}