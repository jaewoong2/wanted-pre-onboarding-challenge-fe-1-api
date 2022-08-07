import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../auth/pages/Login'
import Logout from '../auth/pages/Logout'
import Signup from '../auth/pages/Signup'
import Home from '../home/pages/Home'
import Todo from '../todo/pages/Todo'

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todos" element={<Todo />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/logout" element={<Logout />} />
    </Routes>
  )
}

export default Routers
