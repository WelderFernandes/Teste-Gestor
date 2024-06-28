import { Box, Button, DialogContentText, TextField } from '@mui/material'
import { useState } from 'react'

export interface DeleteItemProps {
  id: string
  name: string
}

interface ModalFormDeleteInputProps {
  items?: DeleteItemProps[]
  onDelete: () => void
  openDeleteModal?: boolean
}

export default function ModalFormDeleteInput({
  items,
  onDelete,
  openDeleteModal,
}: ModalFormDeleteInputProps) {
  console.log('🚀 ~ items:', items)
  const [value, setValue] = useState<string>('')
  const [isLoad, setIsLoad] = useState(false)
  const [closeModal, setCloseModal] = useState(openDeleteModal)

  const handleDelete = () => {
    setIsLoad(true)
    try {
      onDelete()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoad(false)
      setCloseModal(false)
    }
    console.log('🚀 ~ handleDelete ~ value:', closeModal)
  }
  return (
    <Box
      sx={{
        whiteSpace: 'nowrap',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <DialogContentText sx={{ color: 'GrayText', marginBlock: '0.1rem' }}>
        Digite
        <span
          style={{
            color: 'red',
            fontWeight: 'bold',
            padding: '0.2rem',
            marginInline: '0.2rem',
          }}
        >
          DELETAR
        </span>{' '}
        no compo abaixo
      </DialogContentText>
      <TextField
        sx={{ width: '100%' }}
        value={value}
        onChange={(e) => setValue(e.target.value.toLocaleUpperCase())}
      />
      <Button
        disabled={value !== 'DELETAR' || isLoad}
        variant="contained"
        onClick={handleDelete}
      >
        {isLoad ? 'Deletando...' : 'Deletar'}
      </Button>
    </Box>
  )
}
