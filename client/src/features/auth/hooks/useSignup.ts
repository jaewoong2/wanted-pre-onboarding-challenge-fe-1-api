import axios, { AxiosError } from 'axios'
import React, { useCallback, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { LoginResponse, SignupResponse } from '../types'
import { emailValidate, passwordValidate } from '../utils'
import useInputForm from './useInputForm'
import useLocalstorage from './useLocalstorage'

const signupRequest = async ({ email, password }: { email: string; password: string }) => {
  const data = await axios.post<SignupResponse>('http://localhost:8080/users/create', {
    email,
    password,
  })
  return data.data
}

const useSignup = () => {
  const navigate = useNavigate()
  const { data: localData, getStorage, setStorage } = useLocalstorage()

  const {
    value: email,
    error: emailError,
    hanldeChange: handleEmailChange,
    setValue: setEmail,
  } = useInputForm('', emailValidate)

  const {
    value: password,
    error: passwordError,
    hanldeChange: handlePasswordChange,
    setValue: setPassword,
  } = useInputForm('', passwordValidate)

  const { mutate, isSuccess } = useMutation<
    LoginResponse,
    AxiosError,
    Record<'email' | 'password', string>
  >(signupRequest, {
    onSuccess: (data) => {
      setStorage('[user]', data)
    },
    onSettled: () => {
      setEmail('')
      setPassword('')
    },
  })

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (emailError && passwordError) {
        return
      }
      mutate({ email, password })
    },
    [email, password, emailError, passwordError]
  )

  useEffect(() => {
    getStorage('[user]')
  }, [isSuccess])

  useEffect(() => {
    if (localData) {
      navigate('/')
    }
  }, [localData])

  return {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  }
}

export default useSignup
