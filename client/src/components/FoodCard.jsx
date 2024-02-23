import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCart } from "../Helper";
import toast from "react-hot-toast";
import { setCart } from "../redux/slices/CartSlice";

const FoodCard = ({ id, name, price, desc, img, rating, handleToast }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // console.log("this is User " ,user)



  const addToCart = async ({ id, name, img, price, rating, quantity }) => {
    const res = await axios.post(
      `http://localhost:5000/api/add-to-cart/${user._id}`,
      {
        id,
        name,
        image: img,
        price,
        rating,
        quantity,
      }
    );
    const data = await res.data;

    toast.success(data.message);
    console.log("before get cart func calling " , user) ;
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
    console.log("after get cart func calling ") ;
  };

  return (
    <div className="font-bold rounded-lg  w-[250px] bg-white p-5 flex flex-col gap-2">
      <img
        src={img}
        alt=""
        className="w-auto h-[130px] hover:scale-110 cursor-grab transition-all duration-500 ease-in-out"
      />
      <div className="text-sm flex justify-between ">
        <h2>{name}</h2>
        <span className="text-green-500 ">₹{price}</span>
      </div>

      <p className="text-sm font-normal ">{desc.slice(0, 50)}...</p>

      <div className="flex justify-between ">
        <span className="flex justify-center items-center">
          <AiFillStar className="mr-1 text-yellow-400" />
          {rating}
        </span>
        <button
          onClick={() => {
            console.log("clicked on Addtocart button");
            !user
              ? toast.error("please login to add to cart")
              : addToCart({ id, name, img, price, rating, quantity: 1 });
          }}
          className="p-1 text-white bg-green-500 hover:bg-green-600 rounded-lg"
        >
          {" "}
          Cart to Eat
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
