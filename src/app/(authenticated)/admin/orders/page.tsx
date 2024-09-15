'use client'

import { Prisma } from '@prisma/client'
import {
  Typography,
  Table,
  Space,
  Button,
  Modal,
  Select,
  Form,
  InputNumber,
} from 'antd'
import { ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function AdminOrderManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [selectedOrder, setSelectedOrder] = useState<Prisma.OrderGetPayload<{
    include: { user: true; orderItems: { include: { product: true } } }
  }> | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const {
    data: orders,
    isLoading,
    refetch,
  } = Api.order.findMany.useQuery({
    include: { user: true, orderItems: { include: { product: true } } },
  })

  const { mutateAsync: updateOrder } = Api.order.update.useMutation()

  const handleUpdateStatus = async (values: {
    status: string
    refundAmount?: number
  }) => {
    if (!selectedOrder) return

    try {
      await updateOrder({
        where: { id: selectedOrder.id },
        data: {
          status: values.status,
          ...(values.refundAmount && {
            totalAmount: (
              Number(selectedOrder.totalAmount) - values.refundAmount
            ).toString(),
          }),
        },
      })
      enqueueSnackbar('Order updated successfully', { variant: 'success' })
      refetch()
      setIsModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to update order', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer',
      dataIndex: ['user', 'name'],
      key: 'customerName',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: string) => `$${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (
        _: any,
        record: Prisma.OrderGetPayload<{
          include: { user: true; orderItems: { include: { product: true } } }
        }>,
      ) => (
        <Space>
          <Button
            icon={<ShoppingCartOutlined />}
            onClick={() => {
              setSelectedOrder(record)
              setIsModalVisible(true)
              form.setFieldsValue({ status: record.status })
            }}
          >
            Manage
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Admin Order Management</Title>
      <Text>
        View and manage all customer orders, update order statuses, and process
        refunds if necessary.
      </Text>

      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        style={{ marginTop: 20 }}
      />

      <Modal
        title="Manage Order"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedOrder && (
          <Form form={form} onFinish={handleUpdateStatus} layout="vertical">
            <Form.Item
              name="status"
              label="Order Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="processing">Processing</Select.Option>
                <Select.Option value="shipped">Shipped</Select.Option>
                <Select.Option value="delivered">Delivered</Select.Option>
                <Select.Option value="cancelled">Cancelled</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="refundAmount" label="Refund Amount">
              <InputNumber
                min={0}
                max={Number(selectedOrder.totalAmount)}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<DollarOutlined />}
              >
                Update Order
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </PageLayout>
  )
}
