import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import receiptsApi from '../../api/receipts'
import employeeApi from '../../api/employee'
import warehouseApi from '../../api/warehouse'

interface DataSource {
  code: string
  createdAt: string
  warehouse: string
  total: number
  documenter: string
}

const ListCar = () => {
  const [dataSource, setDataSource] = useState<DataSource[]>()
  useEffect(() => {
    const getdata = async () => {
      const [receipts, employees, warehouses] = await Promise.all([
        receiptsApi.getAll(),
        employeeApi.getAll(),
        warehouseApi.getAll(),
      ])
      const dataSource = receipts.map((receipt) => {
        return {
          code: receipt.code,
          createdAt: receipt.createdAt,
          warehouse: warehouses.find(
            (warehouse) => warehouse.id === receipt.warehouseId
          )?.name as string,
          total: receipt.total,
          documenter: employees.find(
            (employee) => employee.id === receipt.documenterId
          )?.fullName as string,
        }
      })
      setDataSource(dataSource)
    }
    getdata()
  }, [])
  return (
    <div className="p-6 rounded-xl bg-white shadow-lg">
      <header className="mb-5 flex justify-between items-center">
        <NavLink to="receipts">
          <Button
            type="primary"
            className="font-semibold shadow-xl"
            size="large"
          >
            Thêm phiếu nhập kho
          </Button>
        </NavLink>
      </header>
      <Table
        className="-mx-6 max-w-none"
        columns={[
          {
            title: 'Số phiếu',
            dataIndex: 'code',
            render: (text, record) => (
              <Link
                to={record.code}
                state={{
                  breadcrumb: record.code,
                }}
              >
                {text}
              </Link>
            ),
          },
          {
            title: 'Ngày giờ',
            dataIndex: 'createdAt',
          },
          {
            title: 'Nhập tại kho',
            dataIndex: 'warehouse',
          },
          {
            title: 'Tổng tiền',
            dataIndex: 'total',
          },
          {
            title: 'Người lập phiếu',
            dataIndex: 'documenter',
          },
        ]}
        rowKey={(row) => row.code}
        dataSource={dataSource}
        pagination={{
          pageSize: 10,
        }}
      />
    </div>
  )
}

export default ListCar
