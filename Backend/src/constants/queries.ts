const queries = {
  GET_ALL_RECEIPT: 'SELECT * FROM receipts',
  GET_RECEIPT_BY_ID: 'SELECT * FROM receipts WHERE id = $1',
  GET_RECEIPT_BY_CODE: 'SELECT * FROM receipts WHERE Code = $1',
  INSERT_RECEIP:
    'INSERT INTO receipts ("deliverId", "warehouseId", "documenterId", "headOfAccountingId", "warehouseKeeperId", "total", "code", "createdAt", "debitAccountId", "creditAccountId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
  GET_ALL_ITEMS_IN_RECEIPT: 'SELECT * FROM "itemInReceipt"'
}

export default queries
