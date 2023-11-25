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
import { newService } from 'services';
import { PopupCreateNew, PopupDelete, PopupUpdateNew } from './popups';

const TravelList = () => {
  const [dataSearch, onSearchChange] = useSearch();

  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDelete, setOpenDeletePopup] = useState(false);
  const [itemChoice, setItemChoice] = useState<NewRecordType>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['newService.fetchNews', dataSearch],
    queryFn: () => newService.fetchNews(dataSearch),
    placeholderData: keepPreviousData,
  });
  const { items = [], total, currentPage, pages } = data ?? {};

  return (
    <>
      <div className='flex items-start justify-between gap-10'>
        <div className='flex items-center justify-end gap-3'>
          <Button variant='contained' color='success' startIcon={<Add />} onClick={() => setOpenCreatePopup(true)}>
            Thêm mới
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
                <TableCell>Ảnh</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <img src={item.image} alt={item.name} className='h-40' />
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
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
            <caption>{total ?? 0} Tours</caption>
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
        <PopupCreateNew onClose={() => setOpenCreatePopup(false)} />
      </Dialog>

      <Dialog open={openUpdatePopup}>
        <PopupUpdateNew item={itemChoice!} onClose={() => setOpenUpdatePopup(false)} />
      </Dialog>

      <Dialog open={openDelete}>
        <PopupDelete id={itemChoice?.id!} onClose={() => setOpenDeletePopup(false)} />
      </Dialog>
    </>
  );
};

export default TravelList;
