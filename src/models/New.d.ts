type NewRecordType = CommonRecordType & {
  name: string;
  description: string;
  image: string;
};

type NewPaginateType = PaginateType & {
  items: NewRecordType[];
};

type NewParams = PaginateParams;

type UpdateNewBody = {
  id: number;
  name?: string;
  description?: string;
  image?: string;
};

type NewPayloadType = {
  name: string;
  description: string;
  image: string;
};
