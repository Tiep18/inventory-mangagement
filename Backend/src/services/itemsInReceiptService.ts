import queries from '~/constants/queries'
import pool from '~/db'
import ItemsInReceipt, { ItemsInReceiptBody } from '~/types/itemsInReceipt.type'

const itemsInReceiptService = {
  getAll: async () => {
    const result = await pool.query<ItemsInReceipt>(
      queries.GET_ALL_ITEMS_IN_RECEIPT
    )
    return result.rows
  },

  insertItemsInReceipt: async (payload: ItemsInReceiptBody) => {
    let i = 1
    const myVariable = Object.values(payload).map((item) => {
      const variables: string[] = []
      Object.keys(item).forEach((key) => {
        variables.push(`$${i}`)
        i++
      })
      return `(${variables.join(', ')})`
    })

    const templateColumls: Exclude<keyof ItemsInReceipt, 'id'>[] = [
      'itemId',
      'receiptId',
      'quantity',
      'price',
      'totalAmount'
    ]

    const insertItmesReceiptQuery = `INSERT INTO "itemInReceipt" ${`(${templateColumls
      .map((column) => `"${column}"`)
      .join(', ')})`} VALUES ${myVariable.join(', ')} RETURNING id`

    const values: any[] | undefined = []
    Object.keys(payload).forEach((key) => {
      templateColumls.forEach((column) => {
        values.push(payload[key][column])
      })
    })

    const result = await pool.query(insertItmesReceiptQuery, values)

    return result.rows
  }
}

export default itemsInReceiptService
