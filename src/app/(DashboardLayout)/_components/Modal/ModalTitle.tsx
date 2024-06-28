import { DialogTitle } from '@mui/material'
import React from 'react'

interface ModalTitleProps {
  children?: React.ReactNode
}

export default function ModalTitle({ children }: ModalTitleProps) {
  return <DialogTitle>{children}</DialogTitle>
}
