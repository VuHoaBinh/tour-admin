type ProfileRecordType = UserRecordType & {
  isLoggedIn: boolean;
};

type UserRecordType = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  role?: string;
  email?: string;
};

type UserPaginateType = PaginateType & {
  items: UserRecordType[];
};

type UserParams = PaginateParams;

type UpdateUserBody = {
  id: number;
  name?: string;
  role?: string;
};

type UserPayloadType = {
  email: string;
  password: string;
};
