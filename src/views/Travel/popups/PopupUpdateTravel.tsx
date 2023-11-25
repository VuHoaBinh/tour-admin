import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { InputNumber } from 'components';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { queryClient, travelService } from 'services';
import { DOMAIN_TYPES } from 'utils/enum';

type PopupProps = PopupController & {
  item: TravelRecordType;
};

const PopupUpdateTravel = ({ item, onClose }: PopupProps) => {
  const { control, handleSubmit, setValue } = useForm({ mode: 'onChange' });

  const { mutate: updateTravel, isPending } = useMutation({
    mutationFn: travelService.updateTravel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['travelService.fetchTravels'],
      });
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      updateTravel({
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
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth label='Tên' error={!!error} helperText={error?.message} />
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

          <Grid item sm={12}>
            <Controller
              name='price'
              defaultValue=''
              control={control}
              rules={{ required: 'Giá trị không được để trống' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Giá trị'
                  InputProps={{ inputComponent: InputNumber }}
                  error={!!error}
                  helperText={error?.message}
                />
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
              name='domain'
              defaultValue={DOMAIN_TYPES[0].code}
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth select label='Miền'>
                  {DOMAIN_TYPES.map((item, index) => (
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

export default PopupUpdateTravel;
