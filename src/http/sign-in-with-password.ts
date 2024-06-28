import { HTTPError } from "ky"
import { api } from "./api-client"

interface SignInWithPasswordProps {
  email: string
  password: string
}

interface SignInWithPasswordResponse {
  message: string
  access_token: string
  refresh_token: string
}

interface CheckResponse {
	message: string
	user: string
	user_id: string
	type: string
}

export interface IUser {
  id: string
  nivel: any[]
  last_login: string
  first_name: string
  last_name: string
  email: string
  telefone: string
  foto: string
  is_active: boolean
  is_staff: boolean
  categoria: string
}


export async function SignInWithPassword({ email, password }: SignInWithPasswordProps) {

  try {
    const result = await api.post('auth/register/login/', {
      json: {
          email,
          password
      }
  }).json<SignInWithPasswordResponse>()

  console.log({result})
  const check = await api.post('auth/register/check/', {
    json: {
        token: result.access_token
    }
    
  }).json<CheckResponse>()
  
  console.log("🚀 ~ SignInWithPassword ~ Check:", check)

    const user = await api.get(`accounts/usuarios/${check.user_id}`, {
      headers: {
        Authorization: `Bearer ${result.access_token}`
      }
    }).json<IUser>()

  return { user }

  } catch (error: HTTPError | any) {
    if (error instanceof HTTPError) {
    console.log(error.response.status, error.response.body)
      if (error.response.status === 401) {
        return {status: error.response.status , error: error.response.body?.getReader()}
      }
    }
    console.log("🚀 ~ SignInWithPassword ~ error:", error.response.status)

    return  {error: error.response.body}
  }
  }
