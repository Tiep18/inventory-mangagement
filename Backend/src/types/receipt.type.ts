export default interface Receipt {
  id: number
  deliverId: number
  warehouseId: number
  documenterId: number
  headOfAccountingId: number
  warehouseKeeperId: number
  total: number
  code: string
  createdAt: Date
  debitAccountId: number
  creditAccountId: number
}

export type ReceiptBody = Omit<Receipt, 'id'>
