import React from 'react'
import useGetTodoList from '../hooks/useGetTodoList'
import useInputForm from '../hooks/useInputForm'
import useSetTodoList from '../hooks/useSetTodoList'

const TodoHeader = () => {
  const [content, setContent, handleContentChange] = useInputForm('')
  const [title, setTitle, handleTitleChange] = useInputForm('')
  const { refetch } = useGetTodoList(false)
  const { handleSubmit } = useSetTodoList({
    onSuccess: () => {
      refetch()
      setContent('')
      setTitle('')
    },
  })

  return (
    <div className="mb-4">
      <h1 className="text-gray-500 text-xl">Todo List</h1>
      <form className="flex mt-4" onSubmit={handleSubmit({ title, content })}>
        <input
          value={title}
          onChange={handleTitleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="Title"
        />
        <input
          value={content}
          onChange={handleContentChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="Content"
        />
        <button
          type="submit"
          className="flex-shrink-0 p-2 border-2 rounded text-teal-400 border-teal-400 hover:text-white hover:bg-teal-500"
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default TodoHeader
