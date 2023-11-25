import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { queryClient, newService } from 'services';

type PopupProps = PopupController & {
  id: number;
};

const PopupDelete = ({ id, onClose }: PopupProps) => {
  const { mutate: deleteNew, isPending } = useMutation({
    mutationFn: newService.deleteNew,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['newService.fetchNews'],
      });
      onClose();
    },
  });

  const handleDelete = () => {
    deleteNew({ id });
  };

  return (
    <>
      <DialogTitle>XÓA TIN TỨC</DialogTitle>

      <DialogContent>
        Bạn có muốn <span className='font-bold text-red-700'>XÓA</span> tin tức này không ?
      </DialogContent>

      <DialogActions>
        <LoadingButton variant='outlined' color='inherit' onClick={onClose}>
          Hủy bỏ
        </LoadingButton>
        <LoadingButton variant='contained' loading={isPending} onClick={handleDelete}>
          Xác nhận
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default PopupDelete;
