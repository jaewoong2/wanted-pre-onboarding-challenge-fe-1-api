import React from 'react'
import TodoHeader from '../components/TodoHeader'
import TodoItem from '../components/TodoItem'
import useGetTodoList from '../hooks/useGetTodoList'

const Todo = () => {
  const { data } = useGetTodoList()

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded p-6 m-4 w-full">
        <TodoHeader />
        <div>
          {data?.data.map(({ content, title, id }) => (
            <ul>
              <h3 className="text-gray-800 font-semibold border w-fit p-2 rounded-xl">{title}</h3>
              <li className="ml-2">
                <TodoItem key={id} content={content} id={id} />
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Todo
