import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../auth/pages/Login'
import Signup from '../auth/pages/Signup'
import Home from '../home/pages/Home'

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
    </Routes>
  )
}

export default Routers
