import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { queryClient, userService } from 'services';

type PopupProps = PopupController & {
  id: number;
};

const PopupDelete = ({ id, onClose }: PopupProps) => {
  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userService.fetchUsers'],
      });
      onClose();
    },
  });

  const handleDelete = () => {
    deleteUser({ id });
  };

  return (
    <>
      <DialogTitle>XÓA NGƯỜI DÙNG</DialogTitle>

      <DialogContent>
        Bạn có muốn <span className='font-bold text-red-700'>XÓA</span> người dùng này không ?
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
