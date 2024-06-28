import { Box, CardContent, Grid, Typography } from '@mui/material'
import Image from 'next/image'

export interface TopCardDataProps {
  id: string
  icon: string
  title: string
  digits: number
  bgcolor: string
}

export interface TopCardProps {
  cardData?: TopCardDataProps[]
}

// const topcards: TopCardDataProps[] = [
//   {
//     id: uniqueId(),
//     icon: '/images/svgs/icon-user-male.svg',
//     title: 'Employees',
//     digits: '96',
//     bgcolor: 'primary',
//   },
//   {
//     id: uniqueId(),
//     icon: '/images/svgs/icon-briefcase.svg',
//     title: 'Clients',
//     digits: '3,650',
//     bgcolor: 'warning',
//   },
//   {
//     id: uniqueId(),
//     icon: '/images/svgs/icon-mailbox.svg',
//     title: 'Projects',
//     digits: '356',
//     bgcolor: 'secondary',
//   },
//   {
//     id: uniqueId(),
//     icon: '/images/svgs/icon-favorites.svg',
//     title: 'Events',
//     digits: '696',
//     bgcolor: 'error',
//   },
//   {
//     id: uniqueId(),
//     icon: '/images/svgs/icon-speech-bubble.svg',
//     title: 'Payroll',
//     digits: '$96k',
//     bgcolor: 'success',
//   },
//   {
//     id: uniqueId(),
//     icon: '/images/svgs/icon-connect.svg',
//     title: 'Reports',
//     digits: '59',
//     bgcolor: 'info',
//   },
// ]

export function TopCards({ cardData }: TopCardProps) {
  // if (!cardData) {
  //   cardData = topcards
  // }

  return (
    <Grid container spacing={3} mt={1}>
      {cardData?.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2} key={i}>
          <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
            <CardContent>
              <Image
                src={topcard.icon}
                alt={'topcard.icon'}
                width="50"
                height="50"
              />
              <Typography
                color={topcard.bgcolor + '.main'}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography
                color={topcard.bgcolor + '.main'}
                variant="h4"
                fontWeight={600}
              >
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
