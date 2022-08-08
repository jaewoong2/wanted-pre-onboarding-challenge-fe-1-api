import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalstorage from './useLocalstorage'

const useTokenError = <A extends unknown[]>(callback: () => void, args: A) => {
  const navigate = useNavigate()
  const { getStorage } = useLocalstorage('[user]')

  useEffect(() => {
    getStorage('[user]', {
      onError: () => {
        callback()
        navigate('/404')
      },
    })
  }, [...args])
}

export default useTokenError
