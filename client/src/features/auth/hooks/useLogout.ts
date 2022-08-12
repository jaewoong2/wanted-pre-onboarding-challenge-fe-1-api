import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

type UseLogout = {
  to?: string | null
}

const useLogout = ({ to }: UseLogout) => {
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    localStorage.removeItem('[user]')
    if (to) {
      navigate(to)
    }
  }, [to])

  return handleLogout
}

export default useLogout
