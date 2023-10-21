import axiosInstance from '.'
import Warehouse from '../types/warehouse.type'

const warehouseApi = {
  getAll: async () =>
    await axiosInstance.get<any, Warehouse[]>('/api/v1/warehouses'),
  getWarehouseById: async (id: string) =>
    await axiosInstance.get<Warehouse>(`/api/v1/warehouses/${id}`),
}

export default warehouseApi
