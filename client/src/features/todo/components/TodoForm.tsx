import React from 'react'
import useGetTodoList from '../hooks/useGetTodoList'
import useInputForm from '../hooks/useInputForm'
import useSetTodoList from '../hooks/useSetTodoList'
import useUpdateTodo from '../hooks/useUpdateTodo'

type Props = {
  id?: string
  title?: string
  content?: string
}

const TodoForm = ({ id, title: prevTitle, content: prevContent }: Props) => {
  const [content, setContent, handleContentChange] = useInputForm(prevContent ?? '')
  const [title, setTitle, handleTitleChange] = useInputForm(prevTitle ?? '')
  const { refetch } = useGetTodoList({ enabled: false })

  const { handleUpdate } = useUpdateTodo(id ?? '', {
    onSuccess: () => {
      refetch()
    },
  })

  const { handleSubmit } = useSetTodoList({
    onSuccess: () => {
      refetch()
      setContent('')
      setTitle('')
    },
  })

  return (
    <form
      className="flex mt-4"
      onSubmit={!id ? handleSubmit({ title, content }) : handleUpdate({ title, content })}
    >
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
  )
}

export default TodoForm
