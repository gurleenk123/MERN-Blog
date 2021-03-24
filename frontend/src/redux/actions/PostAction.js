import axios from 'axios';

import {
  CREATE_POST,
  POST_ERROR,
  POST_SUCCESS,
  GET_POSTS,
  FETCH_SUCCESS,
   NOT_FETCHED,
   START_LOAD,
   LOADED,
  DEL_POST,
DEL_SUCCESS,
DEL_ERROR,
SHOW_POST,
} from './PostTypes.js';


export const creating=(post)=>{
  
      return function (dispatch,getState) {
          //const check=getState();
          //console.log("check ",check);
          const {AuthReducer :{ token}}=getState();
          //console.log(token);
          dispatch(create());
          var config = {
            method: 'post',
            url: 'http://localhost:5000/post/createpost',
            headers: { 
             Authorization: `Bearer ${token}`,
             'Content-Type': 'multipart/form-data'
             
            },
            data : post
          };
      
          axios(config).then(function (response) { 
            console.log("response:",response);
            dispatch(createdone(response.data.message));
          })
         
          .catch(function (error) {
            
            console.log("errors are:",error.response);
           dispatch(createerror(error.response.data.errors));
          });


      }

}

export const myposts=(id)=>{
    return function(dispatch,getState) {
     
        const {AuthReducer :{ token}}=getState();
        dispatch(getting());
        var config = {
            method: 'get',
            url: `http://localhost:5000/post/myposts/${id}`,
            headers: { 
                Authorization: `Bearer ${token}`,
                

            }
           
          };
   
          axios(config).then(function (response) {
          const {data }=response.data
            //console.log("response", data);
            dispatch(fetched(data))
          })
          .catch(function (error) {
            console.log(error);
            dispatch({type:NOT_FETCHED})
          });
      
    }

}

export const showpost=(slug)=>{
  return function (dispatch){
    dispatch(getting());
    var config = {
      method: 'get',
      url: `http://localhost:5000/post/showpost/${slug}`,
      
    };
    
    axios(config).then(function (response) {
      const {data}=response.data
      //console.log("showpost data is:",data);
      dispatch(showPost(data));

    })
    .catch(function (error) {
      console.log(error);
      dispatch({type:NOT_FETCHED})
    });
    

  }
}

export const allposts=()=>{
    return function(dispatch) {

    dispatch({type:START_LOAD});
    var config = {
        method: 'get',
        url: 'http://localhost:5000/post/allposts',
        
      };
      
      axios(config).then(function (response) {
         const {resp}=response.data
      // console.log("response is:",resp);
        dispatch(loaded(resp));
      })
      .catch(function (error) {
        console.log(error);
        dispatch({type:NOT_FETCHED})

      });
    }
}
export const deletepost=(id)=>{
  return function(dispatch,getState) {
     
    const {AuthReducer :{ token}}=getState();
    dispatch(deleting());
    var config = {
        method: 'delete',
        url: `http://localhost:5000/post/deletepost/${id}`,
        headers: { 
            Authorization: `Bearer ${token}`,
            

        }
       
      };
      axios(config).then(function (response) 
       {
              //console.log("this is data",response);
              dispatch(deleted(response.data.message));
       })
      .catch(function (error) 
       {
        console.log("errors are:",error.response);
        dispatch(delerror(error.response.data.errors));
       });
  }

}

const showPost=(post)=>{
  return {
    type:SHOW_POST,
    payload:post
  }

}
const create=()=>{
    return{
    type:CREATE_POST
    }

}
const createdone=(success)=>{
    return {
        type:POST_SUCCESS,
        payload: success
    }
  
}
const createerror=(error)=>{
    return {
        type:POST_ERROR,
        payload: error
    }

}
const getting=()=>{

    return{
        type:GET_POSTS
        }
}
const fetched=(posts)=>{
    return {
        type:FETCH_SUCCESS,
        payload: posts

    }
}

const loaded=(posts)=>{
    return{
        type:LOADED,
        payload: posts
    }
}
const deleting=()=>{

  return{
      type:DEL_POST
      }
}
const deleted=(success)=>{
  return{
    type:DEL_SUCCESS,
    payload:success
  }
}
const delerror=(error)=>{
  return{
    type:DEL_ERROR,
    payload:error
  }

}