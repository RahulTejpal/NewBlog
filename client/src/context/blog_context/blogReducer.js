import * as ActionTypes from '../ContextActions'

export default (state,action) => {
    switch (action.type){
        case ActionTypes.NEW_BLOG_SUCCESS:
            let blogs = state.blogs ? state.blogs :[]; //checks if the state.blogs array exists, and if not, sets it to an empty array.
            return{
                ...state,
                currentBlog: action.payload,
                blogs: [...blogs,action.payload]
            }
        case ActionTypes.GET_BLOGS_SUCCESS:
                return{
                    ...state,
                    blogs: action.payload
                }
        case ActionTypes.BLOG_FAIL:
                return{
                        ...state,
                        blogs: action.payload
                    }
        case ActionTypes.UPDATE_BLOG:
                return{
                            ...state,
                            currentBlog: action.payload,
                            blogs: state.blogs.map(blog => blog._id === action.payload._id ? action.payload: blog)// we're going to iterate thru our state blogs,we're gonna look for the blog thru blog._id i.e we're going to compare what we have(blog._id) vs the payload that we return, if the ids match then we update that with the new payload otherwise we'll return the blog
                        }   
                        
        case ActionTypes.BLOG_DELETE:
            return{
                ...state,
                blogs: state.blogs.filter(blog=> blog._id !== action.payload.blogId),
                toasts: action.payload.toasts
                
            } 
            
        case ActionTypes.GET_BLOG_BY_ID:
            return{
                ...state,
                currentBlog: action.payload,

            }    

        case ActionTypes.CLEAR_ERRORS:
            return{
                ...state,
                toasts: null
            }   
            
        case ActionTypes.CLEAR_BLOGS:
                return{
                    ...state,
                    blogs: null
                }    
                         
                        
        default :
            return state;                


    }
}