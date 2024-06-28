'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox'
import CustomSwitch from '@/app/components/forms/theme-elements/CustomSwitch'
import { fetchProducts } from '@/store/apps/eCommerce/ECommerceSlice'
import { useDispatch } from '@/store/hooks'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import {
  IconFilter,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

import PageContainer from '@/app/components/container/PageContainer'
import { Close } from '@mui/icons-material'
import { Button, Drawer, List, ListItem } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'

import { IUser } from '@/http/sign-in-with-password'
import CustomMenu from './CustomMenu'
import { Modal } from './Modal'
import UserForm from './forms/UserForm'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}
function stableSort<T>(array: IUser[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
}

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: MouseEvent<unknown>, property: any) => void
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

interface EnhancedTableToolbarProps {
  numSelected: number
  handleSearch: ChangeEvent<HTMLInputElement> | any
  search: string
  pageName?: string
  itemsSelected: readonly string[]
}

interface TableProps {
  data: IUser[]
  tableHeaders: string[]
  pageName: string
}
const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, handleSearch, search } = props
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  console.log('🚀 ~ EnhancedTableToolbar ~ search:', search)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  function toggleModal(value: boolean) {
    setOpenModal(value)
  }

  function DrawerContent() {
    return (
      <Box sx={{ width: 500 }} role="presentation">
        <Box sx={{ textAlign: 'right', padding: '10px' }}>
          <IconButton onClick={toggleDrawer(false)}>
            <Close />
          </IconButton>
        </Box>
        <PageContainer
          title="Form Vertical"
          description="this is Form Vertical"
        >
          <UserForm formName={props.pageName as string} />
        </PageContainer>
      </Box>
    )
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      <Modal.Root isOpen={openModal}>
        <Modal.Action typeMode="icon" onClick={() => toggleModal(false)}>
          <Close />
        </Modal.Action>
        <Modal.Title>Tem certeza que deseja deletar esse item?</Modal.Title>
        <Modal.Content>
          <List>
            {props.itemsSelected.map((item) => (
              <ListItem key={item} sx={{ marginBottom: 'none' }}>
                {item}
              </ListItem>
            ))}
          </List>

          {/* <ModalFormDeleteInput /> */}
        </Modal.Content>
      </Modal.Root>
      <Drawer open={open} anchor="right">
        <DrawerContent />
      </Drawer>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle2"
          component="div"
        >
          {numSelected}{' '}
          {numSelected === 1 ? 'Item Selecionado' : 'Items Selecionados'}
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flex: '1 1 100%', gap: '1rem' }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="1.1rem" />
                </InputAdornment>
              ),
            }}
            placeholder="Buscar por nome..."
            size="small"
            onChange={handleSearch}
            value={search}
          />
          <Tooltip title="Add">
            <Button
              component="label"
              color="primary"
              variant="contained"
              endIcon={<IconPlus />}
              onClick={toggleDrawer(true)}
            >
              Adicionar
            </Button>
          </Tooltip>
        </Box>
      )}{' '}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              toggleModal(true)
            }}
          >
            <IconTrash width="18" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <IconFilter size="1.2rem" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}
export default function CustomTable({
  pageName,
  data,
  tableHeaders,
}: TableProps) {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<any>('calories')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rows, setRows] = useState<IUser[]>(data)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const headCells2: HeadCell[] = []

  for (let i = 0; i < tableHeaders.length; i++) {
    headCells2.push({
      id: tableHeaders[i],
      numeric: false,
      disablePadding: false,
      label: tableHeaders[i],
    })
  }

  const headCells = tableHeaders.map((header: string) => {
    if (header !== 'imageUrl') {
      return {
        id: header,
        numeric: false,
        disablePadding: false,
        label: header,
      }
    }
    return null
  })

  function EnhancedTableHead(props: EnhancedTableProps) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props
    const createSortHandler =
      (property: any) => (event: MouseEvent<unknown>) => {
        onRequestSort(event, property)
      }

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <CustomCheckbox
              color="primary"
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell?.id}
              align={headCell?.numeric ? 'right' : 'left'}
              padding={headCell?.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell?.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell?.id}
                direction={orderBy === headCell?.id ? order : 'asc'}
                onClick={createSortHandler(headCell?.id)}
              >
                {headCell?.label}
                {orderBy === headCell?.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  // Fetch Products
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch, selected])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value.length)
    // if (event.target.value.length >= 3) {
    const filteredRows: IUser[] = data.filter((row) => {
      return row.first_name.toLowerCase().includes(event.target.value)
    })
    setSearch(event.target.value)
    setRows(filteredRows)
    // }
  }

  // This is for the sorting
  const handleRequestSort = (event: MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  // This is for select all the row
  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows?.map((n: any) => n.name)
      console.log('🚀 ~ handleSelectAllClick ~ newSelecteds:', newSelecteds)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
  }

  // This is for the single row sleect
  const handleClick = (event: MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      console.log(selected)
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const theme = useTheme()
  const borderColor = theme.palette.divider

  return (
    <Box>
      <Box>
        <EnhancedTableToolbar
          pageName={pageName}
          numSelected={selected.length}
          search={search}
          handleSearch={(event: any) => handleSearch(event)}
          itemsSelected={selected}
        />

        <Paper
          variant="outlined"
          sx={{ mx: 2, mt: 1, border: `1px solid ${borderColor}` }}
        >
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              lang="pt-BR"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index) => {
                    const isItemSelected = isSelected(row.first_name)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <CustomCheckbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => handleClick(event, row.name)}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>

                        <TableCell
                          onClick={(event) =>
                            handleClick(event, row.first_name)
                          }
                        >
                          <Box display="flex" alignItems="center">
                            <Avatar
                              src={row.foto}
                              alt="product"
                              sx={{ width: 56, height: 56 }}
                            />
                            <Box
                              sx={{
                                ml: 2,
                              }}
                            >
                              <Typography variant="body1" fontWeight="400">
                                {row.first_name + ' ' + row.last_name}
                              </Typography>
                              <Typography
                                color="textSecondary"
                                variant="subtitle2"
                              >
                                {row.categoria}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography>{row.email}</Typography>
                        </TableCell>

                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Box
                              sx={{
                                backgroundColor:
                                  row.is_active === true
                                    ? (theme) => theme.palette.success.main
                                    : (theme) => theme.palette.error.main,
                                borderRadius: '100%',
                                animationDuration: '550ms',
                                height: '10px',
                                width: '10px',
                              }}
                            />
                            <Typography
                              color="textSecondary"
                              variant="subtitle2"
                              sx={{
                                ml: 1,
                              }}
                            >
                              {row.is_active === true ? 'Ativo' : 'Inativo'}
                            </Typography>
                          </Box>
                        </TableCell>
                        {/* <TableCell>
                          <Tooltip
                            title={dayjs(row.createdAt).format('DD/MM/YYYY')}
                          >
                            <Typography>{dayjs().to(row.createdAt)}</Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Tooltip
                            title={dayjs(row.updatedAt).format('DD/MM/YYYY')}
                          >
                            <Typography>{dayjs().to(row.updatedAt)}</Typography>
                          </Tooltip>
                        </TableCell> */}
                        <TableCell>
                          <CustomMenu user={row} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Linhas por página"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Box ml={2}>
          <FormControlLabel
            control={
              <CustomSwitch checked={dense} onChange={handleChangeDense} />
            }
            label="Dense padding"
          />
        </Box>
      </Box>
    </Box>
  )
}
