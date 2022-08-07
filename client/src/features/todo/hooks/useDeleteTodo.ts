import useLocalstorage from '@/features/auth/hooks/useLocalstorage'
import { LoginResponse } from '@/features/auth/types'
import axios, { AxiosError } from 'axios'
import { useCallback } from 'react'
import { useMutation, UseMutationOptions } from 'react-query'

const deleteTodoRequest = async ({ id, token }: { id: string; token: string }) => {
  const { data } = await axios.delete<{ data: null }>(`http://localhost:8080/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  })

  return data
}

type MutationOptions = Omit<
  UseMutationOptions<
    { data: null },
    AxiosError<unknown, any>,
    Record<'id' | 'token', string>,
    unknown
  >,
  'mutationKey' | 'mutationFn'
>

const useDeleteTodo = (id: string, options?: MutationOptions) => {
  const { data: userData } = useLocalstorage<LoginResponse>('[user]')
  const mutation = useMutation<{ data: null }, AxiosError, Record<'id' | 'token', string>>(
    ['todos'],
    deleteTodoRequest,
    {
      ...options,
    }
  )

  const handleDelete = useCallback(() => {
    if (userData?.token && id) {
      mutation.mutate({ id, token: userData?.token })
    }
  }, [userData, id])

  return { ...mutation, handleDelete }
}
export default useDeleteTodo
