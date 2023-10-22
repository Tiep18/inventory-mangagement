import httpMocks from 'node-mocks-http'
import itemListService from '~/services/itemListService'
import itemListController from '../itemList.controller'

const mockItemResultList = [
  {
    id: 1,
    name: 'Sản phẩm 1',
    code: '12356',
    unit: 'Cái'
  },
  {
    id: 2,
    name: 'Sản phẩm 2',
    code: '15356',
    unit: 'Thùng'
  }
]
const mockItemResult = mockItemResultList[0]

const mockGetAllItemsService = jest.spyOn(itemListService, 'getAll')
const mockGetItemByIdService = jest.spyOn(itemListService, 'getItemByID')

describe('itemList Controller', () => {
  it('itemList Controller should send 200 on getAll', async () => {
    const request = httpMocks.createRequest()
    const response = httpMocks.createResponse()
    const mockItems = jest.fn().mockReturnValue(mockItemResultList)
    mockGetAllItemsService.mockImplementation(mockItems)

    await itemListController.getAll(request, response)
    expect(mockGetAllItemsService).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toEqual(200)
    expect(response._getJSONData()).toEqual(mockItemResultList)
  })

  it('itemList Controller should send 200 on getItemById', async () => {
    const request = httpMocks.createRequest({ params: { id: 1 } })
    const response = httpMocks.createResponse()
    const mockItem = jest.fn().mockReturnValue(mockItemResult)
    mockGetItemByIdService.mockImplementation(mockItem)

    await itemListController.getItemById(request, response)
    expect(mockGetItemByIdService).toHaveBeenCalledTimes(1)
    expect(mockGetItemByIdService).toHaveBeenCalledWith({ id: 1 })
    expect(response.statusCode).toEqual(200)
    expect(response._getJSONData()).toEqual(mockItemResult)
  })
})
