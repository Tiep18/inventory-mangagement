import { faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd'
import { useEffect, useMemo, useState } from 'react'
import employeeApi from '../../api/employee'
import accountingAccountApi from '../../api/accoutingAccount'
import itemListApi from '../../api/itemList'
import warehouseApi from '../../api/warehouse'
import Empployee from '../../types/employee.type'
import AccountingAccount from '../../types/accountingAccount.type'
import Item from '../../types/item.type'
import Warehouse from '../../types/warehouse.type'
import { ReceiptFormValue } from '../../types/receipt.type'
import dayjs from 'dayjs'
import { TIME_FORMAT } from '../../constant'
import { omit } from 'lodash'
import receiptsApi from '../../api/receipts'
import itemsInReceiptApi from '../../api/itemsInReceipt'
import { find } from '../../utils'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'

interface InputValue {
  employees: Empployee[]
  accountingAccounts: AccountingAccount[]
  items: Item[]
  warehouses: Warehouse[]
}
interface ItemInfo {
  fieldKey: number | null
  code: string
  unit: string
  quantity: number | null
  price: number | null
  total: number | null
}
const initItemInfo: ItemInfo = {
  code: '',
  fieldKey: null,
  price: null,
  quantity: null,
  total: null,
  unit: '',
}
const ReceiptPage = () => {
  const [inputValue, setInputValue] = useState<InputValue>()
  const [address, setAddress] = useState<string>('')
  const [itemInfoList, setItemInfoList] = useState<ItemInfo[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    const getData = async () => {
      const [employees, accountingAccounts, items, warehouses] =
        await Promise.all([
          employeeApi.getAll(),
          accountingAccountApi.getAll(),
          itemListApi.getAll(),
          warehouseApi.getAll(),
        ])
      setInputValue({
        employees,
        accountingAccounts,
        items,
        warehouses,
      })
    }
    getData()
  }, [])

  const options = useMemo(() => {
    const employeeOpt = inputValue?.employees.map((employee) => ({
      value: employee.id,
      label: employee.fullName,
    }))
    const accountOpt = inputValue?.accountingAccounts.map((account) => ({
      value: account.id,
      label: account.code,
    }))
    const warehouseOpt = inputValue?.warehouses.map((warehouse) => ({
      value: warehouse.id,
      label: warehouse.name,
      title: warehouse.address,
    }))
    const itemOpt = inputValue?.items.map((item) => ({
      value: item.id,
      label: item.name,
      key: item.code,
      title: item.unit,
    }))
    return {
      employeeOpt,
      accountOpt,
      warehouseOpt,
      itemOpt,
    }
  }, [inputValue])
  const { employeeOpt, accountOpt, warehouseOpt, itemOpt } = options

  const handleWarehouseChange = (e: number) => {
    warehouseOpt?.forEach((warehouse) => {
      if (warehouse.value === e) setAddress(warehouse.title)
      return
    })
  }

  const handleItemChange = (value: boolean, fieldKey: number) => {
    const item = find(itemOpt as any[], 'value', value)
    const isItem = find(itemInfoList, 'fieldKey', fieldKey)

    if (!isItem) {
      setItemInfoList((prev) => {
        return [
          ...prev,
          {
            ...initItemInfo,
            fieldKey,
            code: item?.key as string,
            unit: item?.title as string,
          },
        ]
      })
    }
    setItemInfoList((prev) => {
      return prev.map((itemInfo) => {
        if (itemInfo.fieldKey === fieldKey) {
          return {
            ...itemInfo,
            code: item?.key as string,
            unit: item?.title as string,
          }
        }
        return itemInfo
      })
    })
  }

  const handleQuantityChange = (e: number | null, fieldKey: number) => {
    const isItem = find(itemInfoList, 'fieldKey', fieldKey)

    if (!isItem) {
      setItemInfoList((prev) => {
        return [
          ...prev,
          {
            ...initItemInfo,
            fieldKey,
            quantity: e,
          },
        ]
      })
    }
    setItemInfoList((prev) => {
      return prev.map((itemInfo) => {
        if (itemInfo.fieldKey === fieldKey) {
          return {
            ...itemInfo,
            quantity: e,
            total: itemInfo.price ? itemInfo.price * (e as number) : 0,
          }
        }
        return itemInfo
      })
    })
  }

  const handlePriceChange = (e: number | null, fieldKey: number) => {
    const isItem = find(itemInfoList, 'fieldKey', fieldKey)

    if (!isItem) {
      setItemInfoList((prev) => {
        return [
          ...prev,
          {
            ...initItemInfo,
            fieldKey,
            price: e,
          },
        ]
      })
    }
    setItemInfoList((prev) => {
      return prev.map((itemInfo) => {
        if (itemInfo.fieldKey === fieldKey) {
          return {
            ...itemInfo,
            price: e,
            total: itemInfo.quantity ? itemInfo.quantity * (e as number) : 0,
          }
        }
        return itemInfo
      })
    })
  }

  const onFinish = async (value: ReceiptFormValue) => {
    if (!value.items) {
      toast.error('Vui lòng thêm sản phẩm')
      return
    }
    const items = value.items.map((item) => ({
      ...item,
      totalAmount: item.price * item.quantity,
    }))
    const total = items.reduce((total, item) => total + item.totalAmount, 0)
    value.createdAt = dayjs(value.createdAt).format(TIME_FORMAT)
    const receiptPayload = { ...omit(value, ['items']), total }

    try {
      const receiptId = await receiptsApi.insertReceipt(receiptPayload)
      const itemsPayload: { [key: number]: any } = {}
      items.forEach((item, key) => {
        itemsPayload[key] = { ...item, receiptId: receiptId.id }
      })
      await itemsInReceiptApi.insertItemsInReceipt(itemsPayload)
      form.resetFields()
      toast.success('Thêm phiếu nhập kho thành công')
    } catch (e) {
      toast.error('Có lỗi xảy ra, vui lòng kiểm tra lại thông tin')
    }
  }

  return (
    <div className="container py-4">
      <header className="mb-5 flex justify-between items-center">
        <NavLink to="/">
          <Button
            type="primary"
            className="font-semibold shadow-xl"
            size="large"
          >
            Trang chủ
          </Button>
        </NavLink>
      </header>
      <h1 className="text-center font-bold text-xl mb-4">PHIẾU NHẬP KHO</h1>
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{}}
      >
        <Row gutter={12} className="w-full flex">
          <Col span={6}>
            <Form.Item
              name="code"
              rules={[{ required: true, message: 'Bạn chưa nhập số phiếu' }]}
              label="Số"
            >
              <InputNumber
                min={10000}
                max={99999}
                className="w-full"
                placeholder="Số phiếu"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="createdAt"
              rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              label="Thời gian"
            >
              <DatePicker showTime onChange={() => {}} onOk={() => {}} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="debitAccountId"
              rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              label="Nợ"
            >
              <Select options={accountOpt} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="creditAccountId"
              rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              label="Có"
            >
              <Select options={accountOpt} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12} className="w-full flex">
          <Col span={8}>
            <Form.Item
              name="deliverId"
              rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              label="Người giao"
            >
              <Select options={employeeOpt} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="warehouseId"
              rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              label="Nhập tại kho"
            >
              <Select onChange={handleWarehouseChange} options={warehouseOpt} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Địa điểm">
              <Input value={address} disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12} className="w-full flex">
          <Col span={8}>
            <Form.Item
              name="documenterId"
              rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              label="Người lập phiếu"
            >
              <Select options={employeeOpt} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="warehouseKeeperId"
              rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              label="Thủ kho"
            >
              <Select options={employeeOpt} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="headOfAccountingId"
              rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              label="Kế toán trưởng"
            >
              <Select onChange={() => {}} options={employeeOpt} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12} className="w-full flex font-semibold mb-2">
          <Col span={6}>
            <h3>Tên sản phẩm</h3>
          </Col>
          <Col span={2}>
            <h3>Mã số</h3>
          </Col>
          <Col span={2}>
            <h3>Đơn vị tính</h3>
          </Col>
          <Col span={4}>
            <h3>Số lượng</h3>
          </Col>
          <Col span={4}>
            <h3>Đơn giá</h3>
          </Col>
          <Col span={4}>
            <h3>Thành tiền</h3>
          </Col>
        </Row>
        <Form.List name="items">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field) => (
                  <Row gutter={12} key={field.key} className="w-full flex">
                    <Col span={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'itemId']}
                        rules={[
                          { required: true, message: 'Bạn chưa nhập tên' },
                        ]}
                      >
                        <Select
                          onChange={(e) => handleItemChange(e, field.key)}
                          value
                          options={itemOpt}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item
                        rules={[
                          { required: true, message: 'Bạn chưa nhập mã SP' },
                        ]}
                      >
                        <Input
                          placeholder="Mã số"
                          disabled
                          value={
                            itemInfoList.find(
                              (item) => item.fieldKey === field.key
                            )?.code
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item>
                        <Input
                          placeholder="ĐVT"
                          disabled
                          value={
                            itemInfoList.find(
                              (item) => item.fieldKey === field.key
                            )?.unit
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'quantity']}
                        rules={[
                          { required: true, message: 'Bạn chưa nhập số lượng' },
                        ]}
                      >
                        <InputNumber
                          className="w-full"
                          min={1}
                          onChange={(e) => handleQuantityChange(e, field.key)}
                          placeholder="Số lượng"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'price']}
                        rules={[
                          {
                            required: true,
                            message: 'Bạn chưa nhập đơn giá',
                          },
                        ]}
                      >
                        <InputNumber
                          min={0}
                          onChange={(e) => {
                            handlePriceChange(e, field.key)
                          }}
                          className="w-full"
                          placeholder="Đơn giá"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Bạn chưa nhập tổng tiền',
                          },
                        ]}
                      >
                        <Input
                          disabled
                          value={
                            itemInfoList.find(
                              (item) => item.fieldKey === field.key
                            )?.total || 0
                          }
                          className="w-full"
                          placeholder="Thành tiền"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <div className="h-8 flex items-center">
                        <FontAwesomeIcon
                          className="text-red-500 text-lg cursor-pointer"
                          icon={faSquareMinus}
                          onClick={() => {
                            setItemInfoList((prev) => {
                              return prev.filter(
                                (item) => item.fieldKey !== field.key
                              )
                            })
                            remove(field.name)
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<FontAwesomeIcon icon={faPlus} />}
                  >
                    Thêm sản phẩm
                  </Button>
                </Form.Item>
              </>
            )
          }}
        </Form.List>
        <Form.Item>
          <Button className="bg-blue-500" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            type="default"
            className="ml-5"
            onClick={() => form.resetFields()}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ReceiptPage
