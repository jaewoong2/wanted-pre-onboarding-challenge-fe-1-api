import React from 'react'
import Form from '../components/Form'
import Input from '../components/Input'
import useLogin from '../hooks/useLogin'

const Login = () => {
  const {
    email,
    emailError,
    password,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin()

  return (
    <div className="flex flex-col w-full h-full items-center px-10 mt-40 lg:px-[200px] pt-2">
      <h1 className="text-2xl mb-20 text-gray-500 font-semibold">로그인</h1>
      <Form
        onSubmit={handleSubmit}
        isValidate={!emailError && !passwordError}
        link={{ to: '/auth/signup', message: '아이디가 없으신가요?' }}
        buttonMessage="로그인"
      >
        <div className="mb-4">
          <Input
            value={email}
            onChange={handleEmailChange}
            label="이메일"
            id="email"
            type="email"
            placeholder="이메일"
            required
          />
        </div>
        <div className="mb-6">
          <Input
            value={password}
            onChange={handlePasswordChange}
            label="비밀번호"
            id="password"
            type="password"
            placeholder="***********"
            required
          />
        </div>
      </Form>
    </div>
  )
}

export default Login
