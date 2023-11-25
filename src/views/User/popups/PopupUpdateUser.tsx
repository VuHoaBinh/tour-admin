import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { queryClient, userService } from 'services';
import { USER_TYPES } from 'utils/enum';

type PopupProps = PopupController & {
  item: UserRecordType;
};

const PopupUpdateUser = ({ item, onClose }: PopupProps) => {
  const { control, handleSubmit, setValue } = useForm({ mode: 'onChange' });

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userService.fetchUsers'],
      });
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      updateUser({
        id: item.id!,
        ...values,
      });
    })();
  };

  useEffect(() => {
    if (item) {
      Object.entries(item).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [setValue, item]);

  return (
    <>
      <DialogTitle>Cập nhật tài khoản</DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Controller
              name='name'
              defaultValue=''
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Tên'
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item sm={12}>
            <Controller
              name='role'
              defaultValue='Admin'
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth select label='Vai trò'>
                  {USER_TYPES.map((item, index) => (
                    <MenuItem key={index} value={item.code}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <LoadingButton variant='outlined' color='inherit' onClick={onClose}>
          Hủy
        </LoadingButton>
        <LoadingButton variant='contained' color='success' loading={isPending} onClick={handleClickSubmit}>
          Cập nhật
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default PopupUpdateUser;
