import axiosInstance from '.'
import ItemsInReceipt, {
  ItemsInReceiptBody,
} from '../types/itemsInReceipt.type'

const itemsInReceiptApi = {
  getAll: async () =>
    await axiosInstance.get<ItemsInReceipt[]>('/api/v1/itemsreceipts'),
  getItemById: async (id: string) =>
    await axiosInstance.get<ItemsInReceipt>(`/api/v1/itemsreceipts/${id}`),
  insertItemsInReceipt: async (payload: ItemsInReceiptBody) =>
    await axiosInstance.post('/api/v1/itemsreceipts', payload),
}
export default itemsInReceiptApi
