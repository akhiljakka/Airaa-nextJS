'use client'

import { Typography, Card, Row, Col, Statistic, Button } from 'antd'
import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  GiftOutlined,
} from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function AdminDashboardPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: users, isLoading: usersLoading } = Api.user.findMany.useQuery(
    {},
  )
  const { data: orders, isLoading: ordersLoading } =
    Api.order.findMany.useQuery({})
  const { data: products, isLoading: productsLoading } =
    Api.product.findMany.useQuery({})
  const { data: coupons, isLoading: couponsLoading } =
    Api.coupon.findMany.useQuery({})

  const totalRevenue =
    orders?.reduce(
      (sum, order) => sum + parseFloat(order.totalAmount || '0'),
      0,
    ) || 0
  const activeUsers =
    users?.filter(user => user.status === 'active').length || 0
  const lowStockProducts =
    products?.filter(product => (product.stock || 0) < 10).length || 0

  const navigateTo = (path: string) => {
    router.push(path)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Admin Dashboard</Title>
      <Paragraph>
        Welcome to the admin dashboard. Here you can view key metrics and access
        management tools.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={activeUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={orders?.length || 0}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Low Stock Products"
              value={lowStockProducts}
              prefix={<GiftOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card title="Management Tools">
            <Button
              block
              style={{ marginBottom: '8px' }}
              onClick={() => navigateTo('/admin/products')}
            >
              Manage Products
            </Button>
            <Button
              block
              style={{ marginBottom: '8px' }}
              onClick={() => navigateTo('/admin/orders')}
            >
              Manage Orders
            </Button>
            <Button
              block
              style={{ marginBottom: '8px' }}
              onClick={() => navigateTo('/admin/users')}
            >
              Manage Users
            </Button>
            <Button block onClick={() => navigateTo('/admin/coupons')}>
              Manage Coupons
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card title="Recent Activity">
            <Paragraph>
              {ordersLoading
                ? 'Loading...'
                : `${orders?.length || 0} orders in the last 30 days`}
            </Paragraph>
            <Paragraph>
              {usersLoading
                ? 'Loading...'
                : `${users?.filter(u => dayjs(u.dateCreated).isAfter(dayjs().subtract(30, 'day'))).length || 0} new users in the last 30 days`}
            </Paragraph>
            <Paragraph>
              {couponsLoading
                ? 'Loading...'
                : `${coupons?.filter(c => dayjs(c.validTo).isAfter(dayjs())).length || 0} active coupons`}
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
