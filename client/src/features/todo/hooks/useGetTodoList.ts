import useLocalstorage from '@/features/auth/hooks/useLocalstorage'
import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { LoginResponse } from '../../auth/types/index'
import { GetTodoListResponse } from '../types/index'

const getTodoRequest = async (token: string) => {
  const { data } = await axios.get<GetTodoListResponse>('http://localhost:8080/todos', {
    headers: {
      Authorization: token,
    },
  })

  return data
}

const useGetTodoList = (enabled: boolean = true) => {
  const { data: userData } = useLocalstorage<LoginResponse>('[user]')
  const queryData = useQuery<GetTodoListResponse, AxiosError>(
    ['todos'],
    () => getTodoRequest(userData?.token ?? ''),
    {
      enabled: !!enabled && !!userData?.token,
    }
  )

  return queryData
}

export default useGetTodoList
