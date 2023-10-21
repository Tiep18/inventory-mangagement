import axiosInstance from '.'
import Empployee from '../types/employee.type'

const employeeApi = {
  getAll: async () =>
    await axiosInstance.get<any, Empployee[]>('/api/v1/employees'),
  getEmployeeById: async (id: string) =>
    await axiosInstance.get<any, Empployee>(`/api/v1/employees/${id}`),
}

export default employeeApi
