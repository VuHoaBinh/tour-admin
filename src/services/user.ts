import { client } from './axios';

const fetchUsers = (params?: UserParams): Promise<UserPaginateType> => client.get(`/users`, { params });
const updateUser = ({ id, ...body }: UpdateUserBody): Promise<UserRecordType> => client.put(`/users/${id}`, body);
const createUser = (body: UserPayloadType): Promise<UserRecordType> => client.post(`/users/`, body);
const deleteUser = ({ id }: { id: number }) => client.delete(`/users/${id}`);

const userService = {
  fetchUsers,
  updateUser,
  createUser,
  deleteUser,
};

export default userService;
