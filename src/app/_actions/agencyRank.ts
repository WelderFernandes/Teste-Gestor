'use server'

import { api } from '@/services/api'

export async function getAgencyRankData() {
  const data = await api.get('/agency-rank').then((res) => res.data)
  console.log('🚀 ~ getAgencyRankData ~ data:', data)
  return data
}
