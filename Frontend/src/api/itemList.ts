import axiosInstance from '.'
import Item from '../types/item.type'

const itemListApi = {
  getAll: async () => await axiosInstance.get<any, Item[]>('/api/v1/items'),
  getItemById: async (id: string) =>
    await axiosInstance.get<any, Item>(`/api/v1/items/${id}`),
}

export default itemListApi
