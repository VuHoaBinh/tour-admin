import { client } from './axios';

const fetchNews = (params?: NewParams): Promise<NewPaginateType> => client.get(`/news`, { params });
const updateNew = ({ id, ...body }: UpdateNewBody): Promise<NewRecordType> => client.put(`/news/${id}`, body);
const createNew = (body: NewPayloadType): Promise<NewRecordType> => client.post(`/news/`, body);
const deleteNew = ({ id }: { id: number }) => client.delete(`/news/${id}`);

const newService = {
  fetchNews,
  updateNew,
  createNew,
  deleteNew,
};

export default newService;
