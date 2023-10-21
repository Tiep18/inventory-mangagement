import ItemsInReceipt from './itemsInReceipt.type'

export default interface Receipt {
  id: number
  deliverId: number
  warehouseId: number
  documenterId: number
  headOfAccountingId: number
  warehouseKeeperId: number
  total: number
  code: string
  createdAt: string
  debitAccountId: number
  creditAccountId: number
}

export type ReceiptBody = Omit<Receipt, 'id'>

export interface ReceiptFormValue {
  code: string
  createdAt: string
  debitAccountId: number
  creditAccountId: number
  deliverId: number
  warehouseId: number
  documenterId: number
  warehouseKeeperId: number
  headOfAccountingId: number
  items: Omit<ItemsInReceipt, 'receiptId' | 'totalAmount' | 'id'>[]
}
