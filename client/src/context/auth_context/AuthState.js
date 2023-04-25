import { createContext, useReducer } from "react";
import axios from 'axios';
import authReducer  from "./authReducer";
import * as ActionTypes from '../ContextActions';

export const AuthContext = createContext();

export default function AuthState(props){

    const initialState = { //defines the initial state of authentication context including the following properties
        token: localStorage.getItem('token'), 
        currentUser: null,
        toasts: null,
        isAuthenticated: null,
    };

    //authReducer called everytime an action is dispatched
    const [state,dispatch] = useReducer(authReducer,initialState);//dispatch func called to dispatch actions to reducer funcn which updates the 'state' accordingly

    const config = {//configuartion object used to set headers for axios request
        headers: { //contains 2 headers
            'Content-Type': 'application/json', //content being sent in the request is in JSON format.
            'x-auth-token': localStorage.getItem('token'), //used to send the authentication token in the request
        }
    }

    // #region----------------------[Actions]-------------------

    const registerUser = async (userData) => {
        try{
            const res = await axios.post('http://localhost:5000/api/users/register', userData, config);//POST req to backend server at the /api/users/register endpoint with the provided userData and config.
            dispatch({
                type: ActionTypes.REGISTER_SUCCESS, //if request successful funcn dispatches this action
                payload: res.data // with response data as payload
            })
        }
        catch(err){
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.REGISTER_FAIL,
                payload: err.response.data,
            })
        }
    }

    const loginUser = async (userData) => {
        try{
            const res = await axios.post('http://localhost:5000/api/users/login', userData, config);
            dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                payload: res.data
            })
        }
        catch(err){
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.LOGIN_FAIL,
                payload: err.response.data,
            })
        }
    }

    const logoutUser = async () =>{
        dispatch({
            type: ActionTypes.LOGOUT,
        })
    }

    const clearErrors = async () =>{
        dispatch({
            type: ActionTypes.CLEAR_ERRORS,
        })
    }

    const getProfile = async () =>{
        try{
            const res = await axios.get('http://localhost:5000/api/users/profile', config); //we are sending the config because we are also sending the token to the header
            dispatch({
                type: ActionTypes.SET_CURRENT_USER,
                payload: res.data
            })
        }
        catch(err){
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.AUTH_ERROR,
                payload: err.response.data,
            })
        }
    }

    const updateUser = async (userData) =>{
        try{
            const res = await axios.put(`http://localhost:5000/api/users/${userData._id}`,userData, config); 
            dispatch({
                type: ActionTypes.SET_CURRENT_USER,
                payload: res.data
            })
        }
        catch(err){
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.AUTH_ERROR,
                payload: err.response.data,
            })
        }
    }


    return(
        <AuthContext.Provider value={{
            token: state.token,
            currentUser: state.currentUser,
            toasts: state.toasts,
            isAuthenticated: state.isAuthenticated,
            registerUser,
            loginUser,
            logoutUser,
            clearErrors,
            getProfile,
            updateUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}