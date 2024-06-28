import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel'
import CustomOutlinedInput from '@/app/components/forms/theme-elements/CustomOutlinedInput'

import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Typography,
} from '@mui/material'
import { IconMail, IconPhone, IconUser } from '@tabler/icons-react'
import { useFormik } from 'formik'
import * as yup from 'yup'

interface UserFormProps {
  formName: string
}

export default function UserForm({ formName }: UserFormProps) {
  const validationSchema = yup.object({
    name: yup
      .string()
      .min(2, 'Nome deve ter pelo menos 2 letras')
      .max(50, 'Nome deve ter no maximo 50 letras')
      .required('Nome é obrigatório'),
    email: yup
      .string()
      .email('Entre com um email válido')
      .required('Email é obrigatório'),
    phone: yup
      .number()
      .typeError('Telefone deve ser um número')
      .required('Telefone é obrigatório'),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // async function handleSubmit(values: any) {
  //   console.log('🚀 ~ handleSubmit ~ values:', values)
  //   const { name, email, phone } = values

  //   try {
  //     const response = await api.post(
  //       '/accounts/usuarios/',
  //       // formData,
  //       {
  //         first_name: name.split(' ')[0],
  //         last_name: name.split(' ')[1],
  //         email,
  //         telefone: phone,
  //         is_active: true,
  //         is_staff: false,
  //         password: '1234',
  //         categoria: 'admin',
  //       }
  //     )
  //     // toast.success('Usuário criado', {
  //     //   style: {
  //     //     background: '#2e7A57',
  //     //     color: 'white',
  //     //     border: 'none',
  //     //   },
  //     // })
  //     revalidatePath('/users')
  //     return response
  //   } catch (error) {
  //     console.log('🚀 ~ handleSubmit ~ error:', error)
  //     // toast.error('Erro ao criar o usuário', {
  //     //   style: {
  //     //     background: '#f04050',
  //     //     color: 'white',
  //     //     border: 'none',
  //     //   },
  //     // })
  //   }
  // }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2))
      // handleSubmit(values)
    },
  })

  return (
    <Box>
      <Container maxWidth="sm">
        <Grid container>
          <h1>Cadastro de {formName}</h1>
          <form
            onSubmit={formik.handleSubmit}
            autoComplete="off"
            style={{ width: '100%' }}
          >
            <Grid item xs={12} mt={4}>
              <CustomFormLabel htmlFor="bi-name" sx={{ mt: 0 }}>
                Nome
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12}>
              <CustomOutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <IconUser size="20" />
                  </InputAdornment>
                }
                id="name"
                placeholder="John Deo"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <Typography variant="body2" color="error" mt={1}>
                {formik.touched.name && formik.errors.name}
              </Typography>
            </Grid>
            {/* 2 */}
            <Grid item xs={12}>
              <CustomFormLabel htmlFor="bi-company">E-mail</CustomFormLabel>
            </Grid>
            <Grid item xs={12}>
              <CustomOutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <IconMail size="20" />
                  </InputAdornment>
                }
                id="email"
                placeholder="john.deo"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <Typography variant="body2" color="error" mt={1}>
                {formik.touched.name && formik.errors.email}
              </Typography>
            </Grid>
            {/* 4 */}
            <Grid item xs={12}>
              <CustomFormLabel htmlFor="bi-phone">Telefone</CustomFormLabel>
            </Grid>
            <Grid item xs={12}>
              <CustomOutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <IconPhone size="20" />
                  </InputAdornment>
                }
                id="phone"
                placeholder="412 2150 451"
                fullWidth
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
              <Typography variant="body2" color="error" mt={1}>
                {formik.touched.phone && formik.errors.phone}
              </Typography>
            </Grid>

            <Grid item xs={12} mt={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disableElevation
                type="submit"
              >
                Cadastrar
              </Button>
            </Grid>
          </form>
        </Grid>
      </Container>
    </Box>
  )
}
