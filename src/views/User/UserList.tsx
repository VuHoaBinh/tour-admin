import { Add, Refresh } from '@mui/icons-material';
import {
  Button,
  Dialog,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Spinner, TableRowEmpty } from 'components';
import { useSearch } from 'hooks';
import { useState } from 'react';
import { userService } from 'services';
import { PopupCreateUser, PopupDelete, PopupUpdateUser } from './popups';

const UserList = () => {
  const [dataSearch, onSearchChange] = useSearch();

  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDelete, setOpenDeletePopup] = useState(false);
  const [itemChoice, setItemChoice] = useState<UserRecordType>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['userService.fetchUsers', dataSearch],
    queryFn: () => userService.fetchUsers(dataSearch),
    placeholderData: keepPreviousData,
  });
  const { items = [], total, currentPage, pages } = data ?? {};

  return (
    <>
      <div className='flex items-start justify-between gap-10'>
        <div className='flex items-center justify-end gap-3'>
          <Button variant='contained' color='success' startIcon={<Add />} onClick={() => setOpenCreatePopup(true)}>
            Thêm tài khoản
          </Button>
          <Button variant='outlined' color='primary' startIcon={<Refresh />} onClick={() => refetch()}>
            Làm mới
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Spinner loading={isLoading}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell align='center'>
                    <div className='flex items-center gap-x-4'>
                      <Button
                        variant='outlined'
                        color='secondary'
                        size='small'
                        onClick={() => {
                          setItemChoice(item);
                          setOpenUpdatePopup(true);
                        }}
                      >
                        Cập nhật
                      </Button>
                      <Button
                        variant='outlined'
                        color='error'
                        size='small'
                        onClick={() => {
                          setItemChoice(item);
                          setOpenDeletePopup(true);
                        }}
                      >
                        Xóa
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isLoading && items.length === 0} />
            </TableBody>
            <caption>{total ?? 0} Người dùng</caption>
          </Table>
        </Spinner>
      </TableContainer>

      <div className='flex justify-center'>
        <Pagination
          page={currentPage ?? 1}
          count={pages}
          onChange={(event, value) => onSearchChange({ page: value })}
        />
      </div>

      <Dialog open={openCreatePopup}>
        <PopupCreateUser onClose={() => setOpenCreatePopup(false)} />
      </Dialog>

      <Dialog open={openUpdatePopup}>
        <PopupUpdateUser item={itemChoice!} onClose={() => setOpenUpdatePopup(false)} />
      </Dialog>

      <Dialog open={openDelete}>
        <PopupDelete id={itemChoice?.id!} onClose={() => setOpenDeletePopup(false)} />
      </Dialog>
    </>
  );
};

export default UserList;
