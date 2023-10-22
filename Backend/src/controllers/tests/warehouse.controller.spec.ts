import httpMocks from 'node-mocks-http'
import warehouseService from '~/services/warehouseService'
import warehouseController from '../warehouse.controller'

const mockWarehouseResultList = [
  {
    id: 1,
    name: 'Kho 1',
    address: 'Thanh Xuân'
  },
  {
    id: 2,
    name: 'Kho 2',
    address: 'Cầu Giấy'
  }
]
const mockWarehouseResult = mockWarehouseResultList[0]

const mockGetAllWarehousesService = jest.spyOn(warehouseService, 'getAll')
const mockGetWarehouseByIdService = jest.spyOn(
  warehouseService,
  'getWarehouseByID'
)

describe('warehouse Controller', () => {
  it('warehouse Controller should send 200 on getAll', async () => {
    const request = httpMocks.createRequest()
    const response = httpMocks.createResponse()
    const mockWarehouses = jest.fn().mockReturnValue(mockWarehouseResultList)
    mockGetAllWarehousesService.mockImplementation(mockWarehouses)

    await warehouseController.getAll(request, response)
    expect(mockGetAllWarehousesService).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toEqual(200)
    expect(response._getJSONData()).toEqual(mockWarehouseResultList)
  })

  it('warehouse Controller should send 200 on getWarehouseByID', async () => {
    const request = httpMocks.createRequest({ params: { id: 1 } })
    const response = httpMocks.createResponse()
    const mockItem = jest.fn().mockReturnValue(mockWarehouseResult)
    mockGetWarehouseByIdService.mockImplementation(mockItem)

    await warehouseController.getWarehouseById(request, response)
    expect(mockGetWarehouseByIdService).toHaveBeenCalledTimes(1)
    expect(mockGetWarehouseByIdService).toHaveBeenCalledWith({ id: 1 })
    expect(response.statusCode).toEqual(200)
    expect(response._getJSONData()).toEqual(mockWarehouseResult)
  })
})
