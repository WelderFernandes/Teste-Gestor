'use server'

import { api } from '@/http/api-client'
import { IUser } from '@/http/sign-in-with-password'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function getUsers() {
  const data = await api
    .get('/accounts/usuarios/', {
      headers: {
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
    }).json<IUser[]>()

  // Orderna os dados para o header da tabela
  const response = data.map((user: IUser) => {
    return {
      id: user.id,
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
      phone: user.telefone,
      status: user.is_active,
      staff: user.is_staff,
      category: user.categoria,
    }
  })
  console.log('🚀 ~ response ~ response:', response)

  return response
}
export async function getUserById(id: string) {
  console.log('🚀 ~ response ~ response:', id)
  const data = await api
    .get(`https://api.remax.rdweb.com.br/accounts/usuarios/${id}/`, {
      headers: {
        Authorization: `Bearer ${cookies().get('access_token')?.value}`,
      },
    }).json<IUser>()
  console.log('🚀 ~ getUserById ~ data:', data)

  return data
}

export async function deleteUser(id: string) {
  console.log({ id })
  try {
    await api
      .delete(`https://api.remax.rdweb.com.br/accounts/usuarios/${id}/`, {
        headers: {
          Authorization: `Bearer ${cookies().get('token')?.value}`,
        },
      }).json()
    revalidatePath('/users')
  } catch (error) {
    console.log(error)
  }
}
