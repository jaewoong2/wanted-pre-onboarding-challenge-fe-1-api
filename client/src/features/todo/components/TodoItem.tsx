import React from 'react'
import { Link } from 'react-router-dom'
import useDeleteTodo from '../hooks/useDeleteTodo'
import useGetTodoList from '../hooks/useGetTodoList'

type Props = {
  title: string
  id: string
  handleUpdateButton?: () => void
}

const TodoItem = ({ id, handleUpdateButton, title }: Props) => {
  const { refetch } = useGetTodoList({ enabled: false })
  const { handleDelete } = useDeleteTodo(id, {
    onSuccess: () => {
      refetch()
    },
  })

  return (
    <div className="w-full flex justify-between">
      <Link to={`${id}`} className="h-fit">
        <h3 className="m-0 text-gray-800 font-semibold border w-fit justify-center items-center flex px-2 py-2 rounded-xl hover:bg-blue-400 hover:text-white">
          {title}
        </h3>
      </Link>
      <li className="ml-2">
        <div className="flex mb-4 items-center">
          <button
            onClick={handleUpdateButton}
            type="button"
            className="flex-shrink-0 p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-400 border-green-400 hover:bg-green-500"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex-shrink-0 p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500"
          >
            Remove
          </button>
        </div>
      </li>
    </div>
  )
}

export default TodoItem
