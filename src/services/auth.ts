import { client } from './axios';

const login = (body: LoginBody): Promise<LoginResponse> => client.post(`/users/login`, body);

const authService = {
  login,
};
export default authService;
