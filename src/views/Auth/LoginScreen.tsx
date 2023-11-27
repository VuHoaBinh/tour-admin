import { LoadingButton } from '@mui/lab';
import { Container, Paper, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { InputPassword } from 'components';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signIn, signOut } from 'reducers/profileSlice';
import { authService } from 'services';
import { RoleEnum } from 'utils/enum';
import { useState } from "react";


const LoginScreen = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState('admindev');  // Default email
  const [password, setPassword] = useState('123123');

  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const { mutate: login, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (data: LoginResponse) => {
      if (data.role !== RoleEnum.ADMIN && data.role !== RoleEnum.USER) {
        enqueueSnackbar('Bạn không có quyền truy cập', { variant: 'error' });
        dispatch(signOut({}));
        return;
      }

      dispatch(signIn(data));
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleClickSubmit();
    }
  };

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      login({ email, password } as LoginBody);
      login(values as LoginBody);
    })();
    
  };

  return (
    <Container maxWidth='sm'>
      <Paper className='flex flex-col gap-10 p-8'>
        <Controller
          name='email'
          defaultValue=''
          control={control}
          rules={{
            required: 'Email không được để trống',
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              variant='standard'
              label='Email'
              error={!!error}
              helperText={error?.message}
              placeholder = "tk:admindev"
              onChange={(e) => {
                field.onChange(e);  
                setEmail(e.target.value);  
              }}
            />
          )}
        />
        <Controller
          name='password'
          defaultValue=''
          control={control}
          rules={{
            required: 'Mật khẩu không được để trống',
          }}
          render={({ field, fieldState: { error } }) => (
            <InputPassword
              {...field}
              fullWidth
              variant='standard'
              label='Mật khẩu'
              onKeyDown={handleKeyDown}
              error={!!error}
              helperText={error?.message}
              placeholder = "pass:123123"
              onChange={(e) => {
                field.onChange(e);  
                setPassword(e.target.value);  
              }}
            />
          )}
        />

        <LoadingButton fullWidth variant='contained' loading={isPending} onClick={handleClickSubmit}>
          Đăng nhập
        </LoadingButton>
      </Paper>
    </Container>
  );
};

export default LoginScreen;
