import ky from 'ky'

export const api = ky.create({ prefixUrl: process.env.APP_API_URL })