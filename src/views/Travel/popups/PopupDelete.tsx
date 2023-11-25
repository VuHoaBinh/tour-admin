import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { queryClient, travelService } from 'services';

type PopupProps = PopupController & {
  id: number;
};

const PopupDelete = ({ id, onClose }: PopupProps) => {
  const { mutate: deleteTravel, isPending } = useMutation({
    mutationFn: travelService.deleteTravel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['travelService.fetchTravels'],
      });
      onClose();
    },
  });

  const handleDelete = () => {
    deleteTravel({ id });
  };

  return (
    <>
      <DialogTitle>XÓA TOUR</DialogTitle>

      <DialogContent>
        Bạn có muốn <span className='font-bold text-red-700'>XÓA</span> tour này không ?
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
