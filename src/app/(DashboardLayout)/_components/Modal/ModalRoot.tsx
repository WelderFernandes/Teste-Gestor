import { Dialog, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { ReactElement, ReactNode, forwardRef } from 'react'

interface DeleteModalProps {
  children: ReactNode
  isOpen: boolean
}

export default function ModalRoot({ children, isOpen }: DeleteModalProps) {
  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: ReactElement<any, any>
    },
    ref: React.Ref<unknown>,
  ) {
    return (
      <Slide direction="up" ref={ref} {...props} appear={isOpen} in={isOpen} />
    )
  })
  console.log('🚀 ~ ModalRoot ~ Transition:', Transition)
  return (
    <Dialog
      open={isOpen}
      // TransitionComponent={Transition}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="sm"
    >
      {children}
    </Dialog>
  )
}
