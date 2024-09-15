'use client'

import { Typography, List, Card, Tag, Space } from 'antd'
import { ShoppingOutlined, ClockCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function OrderHistoryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: orders, isLoading } = Api.order.findMany.useQuery({
    where: { userId: user?.id },
    include: { orderItems: { include: { product: true } } },
    orderBy: { dateCreated: 'desc' },
  })

  const handleOrderClick = (orderId: string) => {
    router.push(`/orders/${orderId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'orange'
      case 'Shipped':
        return 'blue'
      case 'Delivered':
        return 'green'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Order History</Title>
        <Text>View and manage your past orders</Text>

        {isLoading ? (
          <Text>Loading orders...</Text>
        ) : (
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
            dataSource={orders}
            renderItem={order => (
              <List.Item>
                <Card
                  hoverable
                  onClick={() => handleOrderClick(order.id)}
                  title={
                    <Space>
                      <ShoppingOutlined />
                      <Text strong>Order #{order.id.slice(0, 8)}</Text>
                    </Space>
                  }
                  extra={
                    <Tag color={getStatusColor(order.status || '')}>
                      {order.status}
                    </Tag>
                  }
                >
                  <Space direction="vertical">
                    <Text>
                      Total Amount: $
                      {parseFloat(order.totalAmount || '0').toFixed(2)}
                    </Text>
                    <Text>
                      <ClockCircleOutlined />{' '}
                      {dayjs(order.dateCreated).format('MMMM D, YYYY')}
                    </Text>
                    <Text>Items: {order.orderItems?.length || 0}</Text>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        )}
      </Space>
    </PageLayout>
  )
}
