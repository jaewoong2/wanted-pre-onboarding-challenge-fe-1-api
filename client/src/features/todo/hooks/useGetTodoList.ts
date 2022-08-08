import useLocalstorage from '@/features/auth/hooks/useLocalstorage'
import axios, { AxiosError } from 'axios'
import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
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

type QueryOptions = Omit<
  UseQueryOptions<GetTodoListResponse, AxiosError<unknown, any>, GetTodoListResponse, QueryKey>,
  'queryKey' | 'queryFn'
>

const useGetTodoList = (options?: QueryOptions) => {
  const { data: userData } = useLocalstorage<LoginResponse>('[user]')
  const queryData = useQuery<GetTodoListResponse, AxiosError>(
    ['todos'],
    () => getTodoRequest(userData?.token ?? ''),
    {
      ...options,
      enabled: !!options?.enabled && !!userData?.token,
    }
  )

  return queryData
}

export default useGetTodoList
