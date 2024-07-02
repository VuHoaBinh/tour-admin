import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { queryClient, newService } from 'services';

type PopupProps = PopupController & {
  item: NewRecordType;
};

const PopupUpdateNew = ({ item, onClose }: PopupProps) => {
  const { control, handleSubmit, setValue } = useForm({ mode: 'onChange' });

  const { mutate: updateNew, isPending } = useMutation({
    mutationFn: newService.updateNew,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['newService.fetchNews'],
      });
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      updateNew({
        id: item.id,
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
      <DialogTitle>Cập nhật tour</DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Controller
              name='name'
              defaultValue=''
              rules={{
                required: 'Tên không được để trống',
                pattern: {
                  value: /^[A-Z]{1}[^\d@#!$%^&*()]*$/,
                  message: 'Tên viết hoa chữ cái đầu, không chứa ký tự số và ký tự đặc biệt',
                },
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth label='Chủ đề thông tin' error={!!error} helperText={error?.message} />
              )}
            />
          </Grid>

          <Grid item sm={12}>
            <Controller
              name='image'
              defaultValue=''
              rules={{
                required: 'Ảnh không được để trống',
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth label='Ảnh' error={!!error} helperText={error?.message} />
              )}
            />
          </Grid>

          <Grid item sm={12}>
            <Controller
              name='description'
              defaultValue=''
              rules={{
                required: 'Mô tả không được để trống',
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  multiline
                  minRows={2}
                  {...field}
                  fullWidth
                  label='Mô tả'
                  error={!!error}
                  helperText={error?.message}
                />
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

export default PopupUpdateNew;
