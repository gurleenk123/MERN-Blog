import {CREATE_POST,POST_ERROR,POST_SUCCESS,REMOVE_REDIRECT,GET_POSTS,FETCH_SUCCESS, NOT_FETCHED,START_LOAD,LOADED,  DEL_POST,
    DEL_SUCCESS,
    DEL_ERROR,SHOW_POST} from '../actions/PostTypes.js';

const initialState={
    loading:false,
    post_error:[],
    post_success:'',
    redirect:false,
    posts:[],
    allpost:[],
    del_error:[],
    del_success:'',
    showPost:[]
  

}

const PostReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case CREATE_POST:return{
            ...state,
            loading:true

        }

        case POST_SUCCESS:return{
            ...state,
            loading:false,
            post_error:[],
            post_success:action.payload,
            redirect:true

        }
        case POST_ERROR:return{
            ...state,
            loading:false,
            post_error:action.payload,
            post_success:'',
            redirect:false

        }
        case REMOVE_REDIRECT:return{
            ...state,
            loading:false,
            post_error:[],
            post_success:'',
            redirect:false,
            del_success:''

        }
        case GET_POSTS:return{
            ...state,
            loading:true
        }
        case FETCH_SUCCESS:return{
            ...state,
            loading:false,
            posts:action.payload,
        }
        case NOT_FETCHED:return{
            ...state,
            loading:false,
        }
        case START_LOAD:return{
            ...state,
            loading:true
        }
        case LOADED:return{
            ...state,
            allpost:action.payload,
    
        }
        case DEL_POST:return{
            ...state,
            loading:true,
        }
        case DEL_SUCCESS:return{
            ...state,
            loading:false,
            del_success:action.payload
        }
        case DEL_ERROR:return{
            ...state,
            loading:false,
            del_error:action.payload
        }
        case SHOW_POST:return{
            ...state,
            loading:false,
            showPost:action.payload
        }
     
        default:return state;
    }

}
export default PostReducer;