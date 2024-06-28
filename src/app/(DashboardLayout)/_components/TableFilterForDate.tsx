import DashboardCard from '@/app/components/shared/DashboardCard'
import {
  Avatar,
  AvatarOwnProps,
  Box,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React, { ComponentProps } from 'react'
import CustomSelect from './CustomSelect'

export interface TableFilterForDateProps {
  id: string
  imageUrl: string
  name: string
  post: string
  values: number
}

interface Props extends ComponentProps<'div'> {
  data: TableFilterForDateProps[]
  title: string
  type?: AvatarOwnProps['variant']
  width?: number
  height?: number
}

export function TableFilterForDate({
  data,
  title,
  type,
  width,
  height,
  ...rest
}: Props) {
  const [month, setMonth] = React.useState('1')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value)
  }

  const avatarSizes =
    width && height ? { width, height } : { width: 40, height: 40 }

  return (
    <DashboardCard
      {...rest}
      title={title}
      action={
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small"
          value={month}
          onChange={handleChange}
        >
          <MenuItem value={1}>Março 2023</MenuItem>
          <MenuItem value={2}>Abril 2023</MenuItem>
          <MenuItem value={3}>Maio 2023</MenuItem>
        </CustomSelect>
      }
    >
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Agência
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  N° de acessos
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((basic: TableFilterForDateProps) => (
              <TableRow key={basic.id}>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      variant={type}
                      src={basic.imageUrl}
                      alt={basic.name}
                      sx={{ ...avatarSizes }}
                    />

                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {basic.name}
                      </Typography>

                      <Typography
                        color="textSecondary"
                        fontSize="12px"
                        variant="subtitle2"
                      >
                        {basic.post}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Typography variant="subtitle2">{basic.values}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  )
}
