import { DeleteForever } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { ReactElement, forwardRef, useState } from 'react'

interface ItemProps {
  id: string
  name: string
}

interface DeleteModalProps {
  items: ItemProps[]
  onDelete: (id: string) => void
  onClose: () => void
  isOpen: boolean
}

export default function DeleteModal({
  items,
  onClose,
  isOpen,
}: DeleteModalProps) {
  const [value, setValue] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  console.log('🚀 ~ DeleteModal ~ isOpen:', isOpen)
  console.log('🚀 ~ DeleteModal ~ items:', items)
  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: ReactElement<any, any>
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  if (value === 'DELETAR') {
    setIsDisabled(false)
  }

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Tem certeza que deseja deletar esse item?</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <DialogContentText id="alert-dialog-slide-description">
          O item não poderar ser recuperado!
        </DialogContentText>
        <Box sx={{ whiteSpace: 'nowrap' }}>
          <DialogContentText sx={{ color: 'GrayText', marginBlock: '0.1rem' }}>
            Digite{' '}
            <div
              style={{
                color: 'red',
                fontWeight: 'bold',
                background: 'white !important',
                padding: '0 5px',
                width: 'fit-content',
                height: 'fit-content',
              }}
            >
              DELETAR
            </div>{' '}
            no compo abaixo
          </DialogContentText>
          <TextField
            sx={{ width: '100%' }}
            value={value}
            onChange={(e) => setValue(e.target.value.toLocaleUpperCase())}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="outlined"
          disabled={isDisabled}
          sx={{
            color: 'red',
          }}
          onClick={onClose}
          startIcon={<DeleteForever />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
