import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";
import {GiHamburgerMenu} from "react-icons/gi" ;
import {MdClose} from "react-icons/md" ;
import NavList from "./NavList";
import axios  from "axios"

import {loginUser , setUser} from "../redux/slices/AuthSlice"
import { getCart } from "../Helper";
import { setCart } from "../redux/slices/CartSlice";


axios.defaults.withCredentials = true ;
const Navbar = () => {
  const dispatch = useDispatch() ;
  const [toggleNav , setToggleNav] = useState(false);
  const auth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  console.log("user --->>>" + user) ;
  const getUser = async() =>{
    const res = await axios.get("http://localhost:5000/api/get-user",{
      withCredentials : true
    });
    const data = await res.data;
    dispatch(setUser(data.user)) ;
    dispatch(loginUser()) ;
  }
  console.log("user from navbar" , user)
  getCart(user).then((data) => dispatch(setCart(data.cartItems)))
  useEffect(()=>{
getUser() ;
  },[])
  return ( 
    






    <nav className="flex flex-col lg:flex-row  justify-between py-3 mx-6 mb-10 ">
      <div > 
        <h3 className="text-xl font-bold text-gray-600">{new Date().toUTCString().slice(0, 16)}</h3>
        <h1 className="text-2xl font-bold">GlamourFood</h1>
      </div>

      <div>
        <input
          type="search"
          name="search"
          placeholder="Search Food....."
          autoComplete="off"
          onChange={(e) => {
            dispatch(setSearch(e.target.value))
            // console.log("your target value " , e.target.value)
          }}
          className="py-3 border-gray-800  text-md  rounded-lg
          outline-none w-full  lg:w-[25vw]"
        />
      </div>
      <GiHamburgerMenu className={`absolute top-5 right-5 lg:right-8 lg:top-6 
      text-2xl text-gray-600 cursor-pointer
      ${toggleNav && "hidden"}
      transition-all ease-in-out duration-500
      `} 
      onClick={() => setToggleNav(true)}
      />
      <MdClose className={`absolute top-5 right-5 lg:right-8 lg:top-6 
      text-2xl text-gray-600 cursor-pointer
      ${!toggleNav && "hidden"}
      transition-all ease-in-out duration-500
      `}
      onClick={() => setToggleNav(false)}
      />
       <NavList toggleNav={toggleNav} setToggleNav={setToggleNav} auth={auth}   />
    </nav>
  );
};

export default Navbar;
