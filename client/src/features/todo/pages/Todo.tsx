import React, { useState } from 'react'

import useTokenError from '@/features/auth/hooks/useTokenError'
import TodoForm from '../components/TodoForm'
import TodoHeader from '../components/TodoHeader'
import TodoItem from '../components/TodoItem'
import useGetTodoList from '../hooks/useGetTodoList'

const Todo = () => {
  const [updateId, setUpdateId] = useState<string | null>(null)
  const { data } = useGetTodoList({
    keepPreviousData: true,
    onSuccess: () => {
      setUpdateId(null)
    },
    enabled: true,
  })
  useTokenError()

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded p-6 m-4 w-full">
        <TodoHeader />
        <div>
          <ul>
            {data?.data.map(({ title, id, content }) =>
              updateId === id ? (
                <div className="mb-2">
                  <TodoForm title={title} content={content} id={id} />
                </div>
              ) : (
                <TodoItem
                  title={title}
                  handleUpdateButton={() => setUpdateId(id)}
                  key={id}
                  id={id}
                />
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Todo
