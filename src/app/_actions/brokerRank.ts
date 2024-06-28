'use server'

import { api } from '@/services/api'

export async function getBrokerRankData() {
  const data = await api.get('/broker-rank').then((res) => res.data)
  console.log('🚀 ~ getAgencyRankData ~ data:', data)
  return data
}
