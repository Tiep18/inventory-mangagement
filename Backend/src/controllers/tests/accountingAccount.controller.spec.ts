import httpMocks from 'node-mocks-http'
import accountingAccountController from '../accountingAccount.controller'
import accountingAccountService from '~/services/accountingAccountService'
const mockListAccounts = [
  {
    id: 1,
    name: 'Tiền mặt',
    code: '111'
  },
  {
    id: 2,
    name: 'Tiền gửi ngân hàng',
    code: '112'
  },
  {
    id: 3,
    name: 'Các khoản tương đương tiền mặt',
    code: '113'
  }
]
const mockAccount1 = mockListAccounts[0]
const mockGetAllAccountsService = jest.spyOn(accountingAccountService, 'getAll')
const mockGetAccountsByIdService = jest.spyOn(
  accountingAccountService,
  'getAccountingAccountByID'
)

describe('accountingAccountController Controller', () => {
  it('accountingAccountController should send 200 on getAll', async () => {
    const request = httpMocks.createRequest()
    const response = httpMocks.createResponse()
    const mockAccounts = jest.fn().mockResolvedValue(mockListAccounts)
    mockGetAllAccountsService.mockImplementation(mockAccounts)

    await accountingAccountController.getAll(request, response)

    expect(mockGetAllAccountsService).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toEqual(200)
    expect(response._getJSONData()).toEqual(mockListAccounts)
  })
  it('accountingAccountController should send 200 on get accountingAccountById', async () => {
    const request = httpMocks.createRequest({ params: { id: 1 } })
    const response = httpMocks.createResponse()
    const mockAccount = jest.fn().mockResolvedValue(mockAccount1)
    mockGetAccountsByIdService.mockImplementation(mockAccount)

    await accountingAccountController.getAccountingAccountById(
      request,
      response
    )
    expect(mockGetAccountsByIdService).toHaveBeenCalledTimes(1)
    expect(mockGetAccountsByIdService).toHaveBeenCalledWith({ id: 1 })
    expect(response.statusCode).toEqual(200)
    expect(response._getJSONData()).toEqual(mockAccount1)
  })
})
