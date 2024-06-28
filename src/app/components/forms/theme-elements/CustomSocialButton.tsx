import { Button, styled } from '@mui/material';

const CustomSocialButton = styled((props: any) => (
  <Button variant="outlined" size="large" color="inherit" {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,

  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export default CustomSocialButton;
