import useLocalstorage from '@/features/auth/hooks/useLocalstorage'
import axios, { AxiosError } from 'axios'
import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import { useCallback } from 'react'
import { TodoData } from '../types/index'
import { LoginResponse } from '../../auth/types/index'
import useGetTodoList from './useGetTodoList'

type RequestParams = {
  id: string
  token: string
}

const getTodoRequest = async ({ id, token }: RequestParams) => {
  const { data } = await axios.get<TodoData>(`http://localhost:8080/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  })

  return data
}

type QueryOptions = Omit<
  UseQueryOptions<TodoData, AxiosError<unknown, any>, TodoData, QueryKey>,
  'queryKey' | 'queryFn'
>

const useGetTodo = (id: string, options: QueryOptions) => {
  const { data: userData } = useLocalstorage<LoginResponse>('[user]')
  const { data: todolistData } = useGetTodoList({ enabled: true })
  const queryData = useQuery<TodoData, AxiosError>(
    ['todos', id],
    () => getTodoRequest({ id, token: userData?.token ?? '' }),
    {
      ...options,
      enabled: !!options.enabled && !!userData?.token,
    }
  )

  const getNextId = useCallback(() => {
    const currentIndex = todolistData?.data.findIndex(({ id: todoId }) => todoId === id)
    if (currentIndex || currentIndex === 0) {
      const length = todolistData?.data.length ?? currentIndex
      if (currentIndex + 1 === length) {
        return todolistData?.data[0]?.id
      }
      return todolistData?.data[currentIndex + 1]?.id
    }
    return todolistData?.data[0]?.id
  }, [todolistData, id])

  const getPrevId = useCallback(() => {
    const currentIndex = todolistData?.data.findIndex(({ id: todoId }) => todoId === id)
    const length = todolistData?.data.length ?? 0
    if (currentIndex) {
      if (currentIndex - 1 >= 0) {
        return todolistData?.data[currentIndex - 1]?.id
      }
      return todolistData?.data[length - 1]?.id
    }
    return todolistData?.data[length - 1]?.id
  }, [todolistData, id])

  return {
    ...queryData,
    data: {
      data: {
        ...queryData.data?.data,
        nextId: getNextId(),
        prevId: getPrevId(),
      },
    },
  }
}

export default useGetTodo
