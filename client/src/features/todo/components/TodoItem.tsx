import React from 'react'
import useDeleteTodo from '../hooks/useDeleteTodo'
import useGetTodoList from '../hooks/useGetTodoList'

type Props = {
  content: string
  id: string
}

const TodoItem = ({ content, id }: Props) => {
  const { refetch } = useGetTodoList(false)
  const { handleDelete } = useDeleteTodo(id, {
    onSuccess: () => {
      refetch()
    },
  })

  return (
    <div className="flex mb-4 items-center">
      <p data-id={id} className="w-full text-grey-darkest">
        {content}
      </p>
      <button
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
  )
}

export default TodoItem
