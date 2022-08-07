import useLocalstorage from '@/features/auth/hooks/useLocalstorage'
import axios, { AxiosError } from 'axios'
import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import { LoginResponse } from '../../auth/types/index'
import { GetTodoListResponse } from '../types/index'

type RequestParams = {
  id: string
  token: string
}

const getTodoRequest = async ({ id, token }: RequestParams) => {
  const { data } = await axios.get<GetTodoListResponse['data']>(
    `http://localhost:8080/todos/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  )

  return data
}

type QueryOptions = Omit<
  UseQueryOptions<
    { title: string; content: string; id: string; createdAt: string; updatedAt: string }[],
    AxiosError<unknown, any>,
    { title: string; content: string; id: string; createdAt: string; updatedAt: string }[],
    QueryKey
  >,
  'queryKey' | 'queryFn'
>

const useGetTodo = (id: string, options: QueryOptions) => {
  const { data: userData } = useLocalstorage<LoginResponse>('[user]')
  const queryData = useQuery<GetTodoListResponse['data'], AxiosError>(
    ['todos', id],
    () => getTodoRequest({ id, token: userData?.token ?? '' }),
    {
      ...options,
      enabled: !!options.enabled && !!userData?.token,
    }
  )

  return queryData
}

export default useGetTodo
