'use server'

import { api } from "@/http/api-client"
import { getCookie } from "cookies-next"


export async function getBrokerRankData() {
  const data = await api.get('/broker-rank',
    {
      headers: {
        Authorization: `Bearer ${getCookie('token-access')}`
      }
    }
  ).json()
  console.log('🚀 ~ getAgencyRankData ~ data:', data)
  return data
}
