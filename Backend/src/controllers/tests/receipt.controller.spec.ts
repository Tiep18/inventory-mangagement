import httpMocks from 'node-mocks-http'
import omit from 'lodash/omit'
import receiptController from '../receipt.controller'
import receiptService from '~/services/receiptService'

const mockReceiptResultList = [
  {
    id: 1,
    deliverId: 3,
    warehouseId: 2,
    documenterId: 4,
    headOfAccountingId: 1,
    warehouseKeeperId: 4,
    total: '50000000.00',
    code: 54234,
    createdAt: '2023-09-11T17:00:00.000Z',
    debitAccountId: 3,
    creditAccountId: 1
  },
  {
    id: 6,
    deliverId: 3,
    warehouseId: 3,
    documenterId: 4,
    headOfAccountingId: 1,
    warehouseKeeperId: 4,
    total: '50000000.00',
    code: 58475,
    createdAt: '2023-10-11T10:00:00.000Z',
    debitAccountId: 3,
    creditAccountId: 1
  }
]
const mockGetReceiptByIdResult = mockReceiptResultList[0]
const mockInsertReceiptBody = omit(mockGetReceiptByIdResult, ['id'])
const mockInsertReceiptResult = { id: 1 }

const mockGetAllReceiptService = jest.spyOn(receiptService, 'getAll')
const mockGetReceiptByIdService = jest.spyOn(receiptService, 'getReceiptById')
const mockInsertReceiptService = jest.spyOn(receiptService, 'insertReceipt')

describe('receipt Controller', () => {
  it('receipt Controller should send 200 on getAll', async () => {
    const request = httpMocks.createRequest()
    const response = httpMocks.createResponse()
    const mockReceipt = jest.fn().mockReturnValue(mockReceiptResultList)
    mockGetAllReceiptService.mockImplementation(mockReceipt)

    await receiptController.getAll(request, response)
    expect(mockGetAllReceiptService).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toEqual(200)
    expect(response._getJSONData()).toEqual(mockReceiptResultList)
  })

  it('receipt Controller should send 200 on getReceiptById', async () => {
    const request = httpMocks.createRequest({ params: { id: 1 } })
    const response = httpMocks.createResponse()
    const mockGetReceiptById = jest
      .fn()
      .mockReturnValue(mockGetReceiptByIdResult)
    mockGetReceiptByIdService.mockImplementation(mockGetReceiptById)

    await receiptController.getReceiptById(request, response)
    expect(mockGetReceiptByIdService).toHaveBeenCalledTimes(1)
    expect(mockGetReceiptByIdService).toHaveBeenCalledWith({ id: 1 })
    expect(response.statusCode).toEqual(200)
    expect(response._getJSONData()).toEqual(mockGetReceiptByIdResult)
  })

  it('receipt Controller should send 201 on insertItemsInReceipt', async () => {
    const request = httpMocks.createRequest({ body: mockInsertReceiptBody })
    const response = httpMocks.createResponse()
    const mockItemsInReceipt = jest
      .fn()
      .mockReturnValue(mockInsertReceiptResult)
    mockInsertReceiptService.mockImplementation(mockItemsInReceipt)

    await receiptController.insertReceipt(request, response)

    expect(mockInsertReceiptService).toHaveBeenCalledTimes(1)
    expect(mockInsertReceiptService).toHaveBeenCalledWith(mockInsertReceiptBody)
    expect(response.statusCode).toEqual(201)
    expect(response._getJSONData()).toHaveProperty(
      'message',
      'Inserted receipt successfully'
    )
    expect(response._getJSONData()).toHaveProperty(
      'result',
      mockInsertReceiptResult
    )
  })
})
