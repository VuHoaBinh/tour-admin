import { client } from './axios';

const fetchTravels = (params?: TravelParams): Promise<TravelPaginateType> => client.get(`/travels`, { params });
const updateTravel = ({ id, ...body }: UpdateTravelBody): Promise<TravelRecordType> =>
  client.put(`/travels/${id}`, body);
const createTravel = (body: TravelPayloadType): Promise<TravelRecordType> => client.post(`/travels/`, body);
const deleteTravel = ({ id }: { id: number }) => client.delete(`/travels/${id}`);

const travelService = {
  fetchTravels,
  updateTravel,
  createTravel,
  deleteTravel,
};

export default travelService;
