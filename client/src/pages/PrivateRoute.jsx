import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute(){
   const isAuthenticated = localStorage.getItem('token');

   return isAuthenticated ? <Outlet/> : <Navigate to="/login" />; //if theres a token =>we are authenticated => if success then we go to outlet otherwise to login page
}