import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../auth/pages/Login'
import Signup from '../auth/pages/Signup'
import ErrorPage from '../home/pages/404'
import Home from '../home/pages/Home'
import TodoContent from '../todo/components/TodoContent'
import Todo from '../todo/pages/Todo'

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todos" element={<Todo />} />
      <Route path="/todos/:id" element={<TodoContent />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/404" element={<ErrorPage />} />
    </Routes>
  )
}

export default Routers
