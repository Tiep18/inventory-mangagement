import httpMocks from 'node-mocks-http'
import employeeService from '~/services/employeeService'
import empployeeController from '../employee.controller'

const mockEmployeesResultList = [
  {
    id: 1,
    fullName: 'Phạm Văn Tiếp',
    email: 'tieppham@gmail.com'
  },
  {
    id: 2,
    fullName: 'Nguyễn Hoài Nam',
    email: 'namhoai@gmail.com'
  }
]
const mockEmployeeResult = mockEmployeesResultList[0]

const mockGetAllEmployeesService = jest.spyOn(employeeService, 'getAll')
const mockGetEmployeeByIdService = jest.spyOn(
  employeeService,
  'getEmployeeByID'
)

describe('employeeController', () => {
  it('employee Controller should send 200 on getAll', async () => {
    const request = httpMocks.createRequest()
    const response = httpMocks.createResponse()
    const mockEmployees = jest.fn().mockReturnValue(mockEmployeesResultList)
    mockGetAllEmployeesService.mockImplementation(mockEmployees)

    await empployeeController.getAll(request, response)
    expect(mockGetAllEmployeesService).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toEqual(200)
    expect(response._getJSONData()).toEqual(mockEmployeesResultList)
  })

  it('employee Controller should send 200 on getEmployeeById', async () => {
    const request = httpMocks.createRequest({ params: { id: 1 } })
    const response = httpMocks.createResponse()
    const mockEmployee = jest.fn().mockReturnValue(mockEmployeeResult)
    mockGetEmployeeByIdService.mockImplementation(mockEmployee)

    await empployeeController.getEmployeeById(request, response)
    expect(mockGetEmployeeByIdService).toHaveBeenCalledTimes(1)
    expect(mockGetEmployeeByIdService).toHaveBeenCalledWith({ id: 1 })
    expect(response.statusCode).toEqual(200)
    expect(response._getJSONData()).toEqual(mockEmployeeResult)
  })
})
