import React from 'react'

import TodoForm from './TodoForm'

const TodoHeader = () => {
  return (
    <div className="mb-4">
      <h1 className="text-gray-500 text-xl">Todo List</h1>
      <TodoForm />
    </div>
  )
}

export default TodoHeader
