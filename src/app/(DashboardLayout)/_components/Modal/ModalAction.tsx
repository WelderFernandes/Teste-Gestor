import { Box, Button, IconButton } from '@mui/material'
import { ComponentProps, ReactNode } from 'react'

enum typeMode {
  icon = 'icon',
}
interface ModalActionProps extends ComponentProps<typeof Button> {
  children: ReactNode
  typeMode?: keyof typeof typeMode
}

export default function ModalAction({
  children,
  onClick,
  typeMode,
  ...props
}: ModalActionProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      {typeMode === 'icon' ? (
        <IconButton
          {...props}
          onClick={onClick}
          size="small"
          sx={{
            p: 0,
            width: '1rem',
            height: '1rem',
            padding: '10px',
            right: '0.5rem',
            top: '0.5rem',
          }}
        >
          {children}
        </IconButton>
      ) : (
        <Button {...props} onClick={onClick}>
          {children}
        </Button>
      )}
    </Box>
  )
}
