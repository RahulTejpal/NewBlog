import React,{useState,useEffect} from 'react'



import { useBlog } from '../middleware/contextHooks'
import MainContainer from '../components/MainContainer'
import { toast } from 'react-toastify';

export default function BlogList(){
    const {getBlogs,toasts,clearErrors,blogs} = useBlog();
    const [myBlogs,setMyBlogs] = useState([]);

    useEffect(()=> {
        if(!blogs){
            getBlogs()
        }else{
            setMyBlogs(blogs)
        }

        if(toasts){
            toasts.forEach(ele => {
                toast(ele.message, {type: ele.type})
            });
            clearErrors()
        }
    })
    return(
        <MainContainer>
            {'There are ${myBlogs.length} blogs'}
        </MainContainer>
    )
}