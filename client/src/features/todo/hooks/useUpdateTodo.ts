import useLocalstorage from '@/features/auth/hooks/useLocalstorage'
import { LoginResponse } from '@/features/auth/types'
import axios, { AxiosError } from 'axios'
import { useCallback } from 'react'
import { useMutation, UseMutationOptions } from 'react-query'
import { GetTodoListResponse } from '../types/index'

type UpdateRequestParams = {
  id?: string
  token?: string
  title: string
  content: string
}

const updateTodoRequest = async ({ id, token, title, content }: UpdateRequestParams) => {
  const { data } = await axios.put<GetTodoListResponse['data']>(
    `http://localhost:8080/todos/${id}`,
    { title, content },
    {
      headers: {
        Authorization: token ?? '',
      },
    }
  )

  return data
}

type MutationOptions = Omit<
  UseMutationOptions<
    GetTodoListResponse['data'],
    AxiosError<unknown, any>,
    UpdateRequestParams,
    unknown
  >,
  'mutationKey' | 'mutationFn'
>

const useUpdateTodo = (id: string, options?: MutationOptions) => {
  const { data: userData } = useLocalstorage<LoginResponse>('[user]')
  const mutation = useMutation<GetTodoListResponse['data'], AxiosError, UpdateRequestParams>(
    ['todos'],
    updateTodoRequest,
    {
      ...options,
    }
  )

  const handleUpdate = useCallback(
    ({ title, content }: Pick<UpdateRequestParams, 'title' | 'content'>) =>
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (userData?.token && id) {
          mutation.mutate({ id, token: userData?.token, title, content })
        }
      },
    [userData, id]
  )

  return { ...mutation, handleUpdate }
}
export default useUpdateTodo
