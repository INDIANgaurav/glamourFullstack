
import React from 'react'
import {BrowserRouter , Route , Routes } from 'react-router-dom'
import Success from './components/Success'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ResetPassword from './pages/ResetPassword'
import VerifyOtp from './pages/VerifyOtp'
const App = () => {
  return (
    < >
      
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>  
        <Route path='/success' element={ <Success/>}/>   
        <Route path='/*' element={<h1>page not found</h1>}/>   
        <Route path='/login' element={<Login/>}/>   
        <Route path='/signup' element={<Signup/>}/>   
        <Route path='/forgot-password' element={<ResetPassword/>}/>   
        <Route path='/verify-otp' element={<VerifyOtp/>}/>   
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
