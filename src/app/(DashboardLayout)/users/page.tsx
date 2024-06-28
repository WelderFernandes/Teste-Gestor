'use client'
import PageContainer from '@/app/components/container/PageContainer'
import ParentCard from '@/app/components/shared/ParentCard'
import { IUser } from '@/http/sign-in-with-password'
import { Box, Grid } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import CustomTable from '../_components/CustomTable'
import Breadcrumb from '../layout/shared/breadcrumb/Breadcrumb'


export interface DataFetchType {
  count: number
  current_count: number
  next: string
  num_pages: number
  response_time: number
  results: IUser[]
}

export default function Users() {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Usuárias',
    },
  ]

  const { data: session } = useSession()

  console.log("🚀 ~ Users ~ Session:", session)

  const fetcher = (url: string) =>
    fetch(url, {
      cache: 'no-cache',
      headers: { Authorization: `Bearer ${getCookie('token-access')}` },
    }).then((res) => res.json())
  const URL = 'https://api.remax.rdweb.com.br/accounts/usuarios/'

  const { data, error, isLoading } = useSWR(URL, fetcher)
  console.log("🚀 ~ Users ~ data, error, isLoading:", data, error, isLoading)

  // const usersT = getUsers()

  const tableHeaders = [
    'Nome',
    'Email',
    'Status',
    // 'Criado',
    // 'Atualizado',
    'Ações',
  ]

  return (
    <PageContainer title="Usuárias" description="lista de Usuárias">
      <Breadcrumb title="Usuárias" items={BCrumb} />
      <ParentCard title="Usuárias">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              {!isLoading && !error && (
                <CustomTable
                  data={data?.results}
                  tableHeaders={tableHeaders}
                  pageName="Usuárias"
                />
              )}
            </Box>
            {/* <CustomTable
                data={data?}
                tableHeaders={tableHeaders}
                pageName="Usuárias"
              /> */}
            {/* </Box> */}
          </Grid>
        </Grid>
      </ParentCard>
    </PageContainer>
  )
}
