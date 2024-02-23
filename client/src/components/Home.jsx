import React from 'react'
import Navbar from './Navbar'
import Categorymenu from './Categorymenu'
import FoodItems from './FoodItems'
import Cart from './Cart'
import Footer from './Footer'
 
const Home = () => {
  return (
 <>
 
  
 <Navbar/>
 <Categorymenu/>
 <FoodItems/>
 <Cart/> 
 <Footer/>
 
 </>
  )
}

export default Home