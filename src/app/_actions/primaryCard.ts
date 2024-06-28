'use server'

import { api } from '@/services/api'

export async function getTopCardsData() {
  const data = await api.get('/top-cards').then((res) => res.data)
  return data
}
