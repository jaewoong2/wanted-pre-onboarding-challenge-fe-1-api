import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="w-full h-full min-h-[700px] flex justify-center items-center flex-col">
      <h1 className="text-red-400 font-semibold text-2xl">로그인한 유저만 접근 가능 합니다.</h1>
      <Link to="/auth/login" className="mt-4 text-blue-600 hover:text-blue-300">
        로그인 하러가기
      </Link>
    </div>
  )
}

export default ErrorPage
