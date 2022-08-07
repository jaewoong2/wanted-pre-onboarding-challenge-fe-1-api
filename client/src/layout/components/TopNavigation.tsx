import useLocalstorage from '@/features/auth/hooks/useLocalstorage'
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const TopNavigation = () => {
  const { key } = useLocation()
  const { data, getStorage } = useLocalstorage()

  useEffect(() => {
    getStorage('[user]')
  }, [key])

  return (
    <nav className="rounded mt-2">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-slate-600">
            Home
          </span>
        </Link>
        <ul className="flex flex-row space-x-8 text-sm font-medium ">
          <li>
            <Link to="/todos" className="block text-gray-700 rounded hover:text-blue-700">
              투두 리스트
            </Link>
          </li>
          {!data ? (
            <>
              <li>
                <Link to="/auth/login" className="block text-gray-700 rounded hover:text-blue-700">
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/auth/signup" className="block text-gray-700 rounded hover:text-blue-700">
                  회원가입
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link className="block text-gray-700 rounded hover:text-blue-700" to="/auth/logout">
                로그아웃
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default TopNavigation
