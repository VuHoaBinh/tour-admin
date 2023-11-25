import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { newService, queryClient } from 'services';

const PopupCreateNew = ({ onClose }: PopupController) => {
  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const { mutate: createNew, isPending } = useMutation({
    mutationFn: newService.createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['newService.fetchNews'],
      });
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      createNew({
        ...(values as NewPayloadType),
      });
    })();
  };

  return (
    <>
      <DialogTitle>Tạo Tin Tức</DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Controller
              name='name'
              defaultValue=''
              rules={{
                required: 'Tên không được để trống',
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth label='Tên' error={!!error} helperText={error?.message} />
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
          Tạo
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default PopupCreateNew;
