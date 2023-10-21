import axiosInstance from '.'
import AccountingAccount from '../types/accountingAccount.type'

const accountingAccountApi = {
  getAll: async () =>
    await axiosInstance.get<any, AccountingAccount[]>(
      '/api/v1/accounting-accounts'
    ),
  getAccountingAccountById: async (id: string) =>
    await axiosInstance.get<AccountingAccount>(
      `/api/v1/accounting-accounts/${id}`
    ),
}

export default accountingAccountApi
