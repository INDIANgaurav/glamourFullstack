import React, { useEffect, useState } from 'react'
import { PropagateLoader} from "react-spinners";
import axios from "axios" ;
import toast from "react-hot-toast";
axios.defaults.withCredentials = true;




const Success = () => {

  const [loading , setLoading ] = useState(true) ;
  useEffect( () => {
    setTimeout( () => {
        setLoading(false)
    }, 3000)
  },[]);

  const clearCart = async () => { 
    const res = await axios.get("https://glamourfullstack.onrender.com/api/clear-cart") ;
    const data = await res.data ;
    toast.success(data.message)
  }

  useEffect( () => { 

clearCart();

  },[])


  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {
        loading ? <PropagateLoader color='#36d7b7' /> : <div>

      
        <h2 className='text-3xl font-semibold mb-4 text-center '>Order Successfull!!</h2>
        <p>your order has been Successfully placed</p>
        </div>
      }
      
    </div>
  )
}

export default Success