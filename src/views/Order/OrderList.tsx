import { Refresh } from '@mui/icons-material';
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
import { orderService } from 'services';
import { PopupUpdateOrder } from './popups';

const OrderList = () => {
  const [dataSearch, onSearchChange] = useSearch();

  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [itemChoice, setItemChoice] = useState<OrderRecordType>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['orderService.fetchOrders', dataSearch],
    queryFn: () => orderService.fetchOrders(dataSearch),
    placeholderData: keepPreviousData,
  });
  const { items = [], total, currentPage, pages } = data ?? {};

  return (
    <>
      <div className='flex justify-end'>
        <Button variant='outlined' color='primary' startIcon={<Refresh />} onClick={() => refetch()}>
          Làm mới
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Spinner loading={isLoading}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell>Tour</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Tiêu đề</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.travel.name}, <span className='font-bold'>{item.travel.domain}</span>
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.status}</TableCell>
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isLoading && items.length === 0} />
            </TableBody>
            <caption>{total ?? 0} Đơn</caption>
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

      <Dialog open={openUpdatePopup}>
        <PopupUpdateOrder item={itemChoice!} onClose={() => setOpenUpdatePopup(false)} />
      </Dialog>
    </>
  );
};

export default OrderList;
