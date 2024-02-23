import axios from "axios";

export const getCart = async(user) => {
  // console.log("user object from helper" , user._id) ;
  const res = await axios.get(`https://glamourfullstack.onrender.com/api/get-cart/${user._id}`);
  const data = await res.data;
  return data;
};