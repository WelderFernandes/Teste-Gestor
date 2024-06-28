import { DialogContent, DialogContentText } from '@mui/material'
import { ReactNode } from 'react'

interface ModalContentProps {
  children: ReactNode
}

export default function ModalContent({ children }: ModalContentProps) {
  return (
    <DialogContent
      sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <DialogContentText id="alert-dialog-slide-description">
        {children}
      </DialogContentText>
    </DialogContent>
  )
}
