import { useContext } from "react";
import { AuthContext } from "../context/auth_context/AuthState";//components can access state & funcn of authentication
import { BlogContext } from "../context/blog_context/BlogState";//components can access state & funcn of blog


//Components that import and use these hooks will have access to the 
//AuthContext and BlogContext objects that were created in their respective context files 


//a component can import and use the useAuth hook to access the currentUser and isAuthenticated state variables 
//and the loginUser, registerUser, logoutUser, and clearErrors functions defined in AuthState.js. 
export function useAuth(){
    return useContext(AuthContext);
}

//a component can import and use the useBlog hook to access the blogs state variable
//and the getBlogs, newBlog, and clearBlogErrors functions defined in BlogState.js.
export function useBlog(){
    return useContext(BlogContext);
}