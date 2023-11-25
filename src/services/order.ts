import { client } from './axios';

const fetchOrders = (params?: OrderParams): Promise<OrderPaginateType> => client.get(`/orders`, { params });
const updateOrder = ({ id, ...body }: UpdateOrderBody): Promise<OrderRecordType> => client.put(`/orders/${id}`, body);

const orderService = {
  fetchOrders,
  updateOrder,
};

export default orderService;
