'use client'
import { deleteUser } from '@/app/_actions/user'
import { Close } from '@mui/icons-material'
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { Modal } from './Modal'
import ModalFormDeleteInput from './Modal/formDeleteInput'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CustomMenu(user: any) {
  console.log('🚀 ~ CustomMenu ~ user:', user)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const open = Boolean(anchorEl)

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  function handleDeleteUser() {
    // deleteUser(id)
    setOpenDeleteModal(true)
    setAnchorEl(null)
  }

  function deleteUS() {
    deleteUser(user.user.id)
  }

  return (
    <Box>
      <Modal.Root isOpen={openDeleteModal}>
        <Modal.Action typeMode="icon" onClick={() => setOpenDeleteModal(false)}>
          <Close />
        </Modal.Action>
        <Modal.Title>Tem certeza que deseja deletar esse item?</Modal.Title>
        <Modal.Content>
          <List>
            <ListItem sx={{ marginBottom: 'none' }}>{user.user.name}</ListItem>
          </List>

          <ModalFormDeleteInput onDelete={deleteUS} />
        </Modal.Content>
      </Modal.Root>
      <Tooltip title="Edit">
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickMenu}
        >
          <IconDotsVertical width={18} />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <IconEdit width={18} />
          </ListItemIcon>
          Editar
        </MenuItem>
        <MenuItem onClick={handleDeleteUser}>
          <ListItemIcon>
            <IconTrash width={18} />
          </ListItemIcon>
          Deletar
        </MenuItem>
      </Menu>
    </Box>
  )
}
