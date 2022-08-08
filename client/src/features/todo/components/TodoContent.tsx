import useTokenError from '@/features/auth/hooks/useTokenError'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useGetTodo from '../hooks/useGetTodo'

const TodoContent = () => {
  const { id } = useParams()
  const { data } = useGetTodo(id ?? '', { enabled: !!id })
  const navigate = useNavigate()
  useTokenError(() => {}, [])

  return (
    <div className="w-full ml-4 mt-4">
      <button
        type="button"
        className="mb-2 text-blue-600 hover:text-blue-400"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="w-[calc(100%-30px)] flex justify-between border px-2 py-1 rounded-lg">
        <h1 className="text-xl">
          제목: <b>{data?.data.title}</b>
        </h1>
        <span className="">{data?.data.createdAt}</span>
      </div>
      <div className="mt-5 w-[calc(100%-30px)] border px-2 py-1 rounded-lg min-h-[500px]">
        <div className="mb-2">내용-</div>
        <section>{data?.data.content}</section>
      </div>
      <div className="w-full flex justify-between pr-[30px] mt-5">
        <div className="text-gray-400 hover:text-gray-600">
          <Link to={`/todos/${data?.data.prevId}`}>Prev</Link>
        </div>
        <div className="text-gray-400 hover:text-gray-600">
          <Link to={`/todos/${data?.data.nextId}`}>Next</Link>
        </div>
      </div>
    </div>
  )
}

export default TodoContent
