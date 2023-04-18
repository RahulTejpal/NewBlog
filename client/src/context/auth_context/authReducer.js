import * as ActionTypes from '../ContextActions';

export default (state,action) => {
    switch(action.type){
        case ActionTypes.REGISTER_FAIL:
        case ActionTypes.LOGIN_FAIL:
            localStorage.removeItem('token');
            return{    //resetting the state to an initial state where the user is not logged in and has no authentication.
                ...state, //updating the state of the application
                toasts: action.payload,//payload property used to hold the data that'll be used to update the state in reducer 
                currentUser: null,
                token: null,
                isAuthenticated: false,
            }

        case ActionTypes.AUTH_ERROR:
            return{
                ...state,
                toasts: action.payload,
            }
            
        case ActionTypes.LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                currentUser: null,
                isAuthenticated: false,

            }    
        case ActionTypes.REGISTER_SUCCESS:
        case ActionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload);
            return{
                ...state,
                isAuthenticated: true
            }    

        case ActionTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload, //payload is expected to contain information about the current user, such as their username and email.
            }    
        case ActionTypes.CLEAR_ERRORS:
            return{
                ...state,
                toasts: null
            }    


        default:
            return state;
       
    }
}