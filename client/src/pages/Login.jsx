import axios  from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { loginUser } from "../redux/slices/AuthSlice";
import Spinner from "../components/Spinner";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading] = useState(false) ;


  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://glamourfullstack.onrender.com/api/login", {
    email,
    password,
  });
console.log("i am here")
  console.log( "this is your data -> ",res.data.message);
  const data = await res.data;
  console.log( "this is your data message -> ",data.message);
   
      setLoading(true);
    if (res.status === 200) {
      dispatch(loginUser);
      toast.success(data.message);
      navigate("/");
    } 
 
   
    
    setLoading(false);
  };
  return (
    <div className="flex justify-center items-center h-screen">
     {
      loading ? (<Spinner/>) : (<form
        onSubmit={handleLogin}
        className="bg-white rounded-lg p-5 shadow-lg flex flex-col gap-3 w-[80vw] lg:w-[20vw] text-sm   "
      >
        <input
          type="email"
          name="email"
          id="email"
          className=" outline-none border rounded-md px-3 py-2 focus:border-green-300 text-gray-600   "
          autoComplete="off"
          placeholder="johndoe@gmail.com"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          id="password"
          className=" outline-none border rounded-md px-3 py-2 focus:border-green-300 text-gray-600   "
          autoComplete="off"
          placeholder="*******"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Link
          to="/forgot-password"
          className=" text-xs text-gray-600 hover:underline cursor-pointer -mb-1 "
        >
          forgot password
        </Link>
        <button
          type="submit"
          className="outline-none border rounded-md px-3 py-2 text-white bg-green-500 hover:bg-green-300   "
        >
          Login
        </button>
        <p className="text-xs text-gray-600 flex gap-3 -mt-1">
          <span>or</span>
          <Link to="/signup" className=" text-blue-600 font-semibold  hover:scale-105">
            Create your account
          </Link>
        </p>
      </form>)
     }
      
    </div>
  );
};

export default Login;
