import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useLocalstorage from '@/features/auth/hooks/useLocalstorage'
import { SignupResponse } from '@/features/auth/types'

import TodoForm from '../components/TodoForm'
import TodoHeader from '../components/TodoHeader'
import TodoItem from '../components/TodoItem'
import useGetTodoList from '../hooks/useGetTodoList'

const Todo = () => {
  const { getStorage } = useLocalstorage<SignupResponse>('[user]')
  const navigate = useNavigate()

  const [updateId, setUpdateId] = useState<string | null>(null)
  const { data } = useGetTodoList({
    keepPreviousData: true,
    onSuccess: () => {
      setUpdateId(null)
    },
    enabled: true,
  })

  useEffect(() => {
    getStorage('[user]', {
      onError: () => {
        navigate('/404')
      },
    })
  }, [])

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded p-6 m-4 w-full">
        <TodoHeader />
        <div>
          <ul>
            {data?.data.map(({ content, title, id }) =>
              updateId === id ? (
                <TodoForm id={id} />
              ) : (
                <TodoItem
                  title={title}
                  handleUpdateButton={() => setUpdateId(id)}
                  key={id}
                  content={content}
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
