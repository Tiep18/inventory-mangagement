import axiosInstance from '.'
import Receipt, { ReceiptBody } from '../types/receipt.type'

const receiptsApi = {
  getAll: async () =>
    await axiosInstance.get<any, Receipt[]>('/api/v1/receipts'),
  getItemById: async (id: string) =>
    await axiosInstance.get<any, Receipt[]>(`/api/v1/receipts/${id}`),
  insertReceipt: async (payload: ReceiptBody) =>
    await axiosInstance.post<any, { id: string }>('/api/v1/receipts', payload),
}

export default receiptsApi
