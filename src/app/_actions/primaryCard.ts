'use server'

import { api } from "@/http/api-client"
import { getCookie } from "cookies-next"


export async function getTopCardsData() {
  const data = await api.get('/top-cards',
    {
      headers: {
        Authorization: `Bearer ${getCookie('token-access')}`
      }
    }
  ).json()
  return data
}
