import httpMocks from 'node-mocks-http'
import itemsInReceiptService from '~/services/itemsInReceiptService'
import itemsInReceiptController from '../ItemsInReceipt.controller'
import omit from 'lodash/omit'

const mockItemsInReceiptResultList = [
  {
    id: 2,
    itemId: 2,
    receiptId: 1,
    quantity: 5,
    price: '40000.00',
    totalAmount: '200000.00'
  },
  {
    id: 3,
    itemId: 1,
    receiptId: 1,
    quantity: 4,
    price: '40000.00',
    totalAmount: '160000.00'
  }
]
const mockItemsInReceiptResult = [
  {
    id: 29
  },
  {
    id: 30
  }
]
const mockItemsInReceiptBody = mockItemsInReceiptResultList.reduce(
  (resultListObj, curr, index) => {
    return { ...resultListObj, [index]: omit(curr, ['id']) }
  },
  {}
)

const mockGetAllItemsInReceiptService = jest.spyOn(
  itemsInReceiptService,
  'getAll'
)
const mockInsertItemsInReceiptService = jest.spyOn(
  itemsInReceiptService,
  'insertItemsInReceipt'
)

describe('itemsInReceipt Controller', () => {
  it('itemsInReceipt Controller should send 200 on getAll', async () => {
    const request = httpMocks.createRequest()
    const response = httpMocks.createResponse()
    const mockItemsInReceipt = jest
      .fn()
      .mockReturnValue(mockItemsInReceiptResultList)
    mockGetAllItemsInReceiptService.mockImplementation(mockItemsInReceipt)

    await itemsInReceiptController.getAll(request, response)
    expect(mockGetAllItemsInReceiptService).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toEqual(200)
    expect(response._getJSONData()).toEqual(mockItemsInReceiptResultList)
  })

  it('itemsInReceipt Controller should send 201 on insertItemsInReceipt', async () => {
    const request = httpMocks.createRequest({ body: mockItemsInReceiptBody })
    const response = httpMocks.createResponse()
    const mockItemsInReceipt = jest
      .fn()
      .mockReturnValue(mockItemsInReceiptResult)
    mockInsertItemsInReceiptService.mockImplementation(mockItemsInReceipt)

    await itemsInReceiptController.insertItemsInReceipt(request, response)

    expect(mockInsertItemsInReceiptService).toHaveBeenCalledTimes(1)
    expect(mockInsertItemsInReceiptService).toHaveBeenCalledWith(
      mockItemsInReceiptBody
    )
    expect(response.statusCode).toEqual(201)
    expect(response._getJSONData()).toHaveProperty(
      'message',
      'Inserted items in receipt successfully'
    )
    expect(response._getJSONData()).toHaveProperty(
      'result',
      mockItemsInReceiptResult
    )
  })
})
