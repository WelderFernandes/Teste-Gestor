'use server'

import { api } from '@/services/api'
import { cookies } from 'next/headers'

export interface SignInProps {
  email: string
  password: string
}

export async function signIn(values: SignInProps) {
  const token = cookies().get('token')?.value

  if (token) {
    cookies().delete('token')
  }
  return await api
    .post('auth/register/login/', values, {
      headers: {
        Authorization: '',
      },
    })
    .then((res) => {
      if (res.status === 200 && res.data.access_token) {
        cookies().set('token', res.data.access_token)
        console.log(res)
        return res.data
      } else {
        return res
      }
    })
    .catch((err) => {
      console.log(err.response.data)
      return err.response.data
    })
}
