'use client'

import { Prisma } from '@prisma/client'
import { Typography, Spin, Descriptions, Tag, Space } from 'antd'
import {
  ShoppingOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function OrderDetailsPage() {
  const router = useRouter()
  const params = useParams<{ orderId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: order, isLoading } = Api.order.findUnique.useQuery({
    where: { id: params.orderId },
    include: { orderItems: { include: { product: true } }, user: true },
  })

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!order) {
    enqueueSnackbar('Order not found', { variant: 'error' })
    router.push('/orders')
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'orange'
      case 'Processing':
        return 'blue'
      case 'Shipped':
        return 'cyan'
      case 'Delivered':
        return 'green'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <ClockCircleOutlined />
      case 'Processing':
        return <ShoppingOutlined />
      case 'Shipped':
        return <ShoppingOutlined />
      case 'Delivered':
        return <CheckCircleOutlined />
      default:
        return null
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Order Details</Title>
        <Descriptions bordered>
          <Descriptions.Item label="Order ID">{order.id}</Descriptions.Item>
          <Descriptions.Item label="Date">
            {dayjs(order.dateCreated).format('MMMM D, YYYY h:mm A')}
          </Descriptions.Item>
          <Descriptions.Item label="Total Amount">
            ${parseFloat(order.totalAmount || '0').toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={getStatusColor(order.status || '')}>
              {getStatusIcon(order.status || '')} {order.status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>

        <Title level={3}>Order Items</Title>
        {order.orderItems?.map(item => (
          <Descriptions key={item.id} bordered>
            <Descriptions.Item label="Product Name">
              {item.product?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Quantity">
              {item.quantity}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              ${parseFloat(item.price || '0').toFixed(2)}
            </Descriptions.Item>
          </Descriptions>
        ))}

        <Title level={3}>Shipping Information</Title>
        <Descriptions bordered>
          <Descriptions.Item label="Name">{order.user?.name}</Descriptions.Item>
          <Descriptions.Item label="Email">
            {order.user?.email}
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </PageLayout>
  )
}
