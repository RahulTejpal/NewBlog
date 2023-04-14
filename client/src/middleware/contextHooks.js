import { useContext } from "react";
import { AuthContext } from "../context/auth_context/AuthState";

export function useAuth(){
    return useContext(AuthContext);
}  //its a middleware used in many pages instead of importing many other things ======> TAKE NOTES