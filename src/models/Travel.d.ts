type TravelRecordType = CommonRecordType & {
  name: string;
  description: string;
  price: number;
  image: string;
  domain: string;
  type: string;
};

type TravelPaginateType = PaginateType & {
  items: TravelRecordType[];
};

type TravelParams = PaginateParams;

type UpdateTravelBody = {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  domain?: string;
};

type TravelPayloadType = {
  name: string;
  description: string;
  price: number;
  image: string;
  domain: string;
};
