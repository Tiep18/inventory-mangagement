export default interface ItemsInReceipt {
  id: number
  itemId: number
  receiptId: number
  quantity: number
  price: number
  totalAmount: number
}

export type ItemsInReceiptBody = {
  [key: string]: Omit<ItemsInReceipt, 'id'>
}
