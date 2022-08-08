import useLocalstorage from '@/features/auth/hooks/useLocalstorage'
import axios, { AxiosError } from 'axios'
import { useMutation, UseMutationOptions } from 'react-query'
import { useCallback } from 'react'
import { SetTodoList, GetTodoListResponse } from '../types/index'
import { LoginResponse } from '../../auth/types/index'

const setTodoRequest = async ({ token, title, content }: SetTodoList) => {
  const { data } = await axios.post<GetTodoListResponse>(
    'http://localhost:8080/todos',
    {
      title,
      content,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  )

  return data
}

type MutationOptions = Omit<
  UseMutationOptions<
    GetTodoListResponse,
    AxiosError<unknown, any>,
    Record<'token' | 'title' | 'content', string>,
    unknown
  >,
  'mutationKey' | 'mutationFn'
>

const useSetTodoList = (options?: MutationOptions) => {
  const { data: userData } = useLocalstorage<LoginResponse>('[user]')
  const mutation = useMutation<
    GetTodoListResponse,
    AxiosError,
    Record<'token' | 'title' | 'content', string>
  >(['todos'], setTodoRequest, {
    ...options,
  })

  const handleSubmit = useCallback(
    ({ title, content }: Omit<SetTodoList, 'token'>) =>
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (userData?.token) {
          mutation.mutate({ title, content, token: userData?.token })
        }
      },
    [userData]
  )

  return { ...mutation, handleSubmit }
}

export default useSetTodoList
