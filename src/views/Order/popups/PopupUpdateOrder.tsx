import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { orderService, queryClient } from 'services';
import { ORDER_STATUS_TYPES } from 'utils/enum';

type PopupProps = PopupController & {
  item: OrderRecordType;
};

const PopupUpdateOrder = ({ item, onClose }: PopupProps) => {
  const { control, handleSubmit, setValue } = useForm({ mode: 'onChange' });

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: orderService.updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orderService.fetchOrders'],
      });
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      updateUser({
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
      <DialogTitle>Cập nhật đơn hàng</DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Controller
              name='status'
              defaultValue={ORDER_STATUS_TYPES[0].code}
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth select label='Trạng thái'>
                  {ORDER_STATUS_TYPES.map((item, index) => (
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

export default PopupUpdateOrder;
