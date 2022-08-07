import React from 'react'
import useDeleteTodo from '../hooks/useDeleteTodo'
import useGetTodoList from '../hooks/useGetTodoList'

type Props = {
  title: string
  content: string
  id: string
  handleUpdateButton?: () => void
}

const TodoItem = ({ content, id, handleUpdateButton, title }: Props) => {
  const { refetch } = useGetTodoList({ enabled: false })
  const { handleDelete } = useDeleteTodo(id, {
    onSuccess: () => {
      refetch()
    },
  })

  return (
    <>
      <h3 className="text-gray-800 font-semibold border w-fit p-2 rounded-xl">{title}</h3>
      <li className="ml-2">
        <div className="flex mb-4 items-center">
          <p data-id={id} className="w-full text-grey-darkest">
            {content}
          </p>
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
    </>
  )
}

export default TodoItem
