'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Form,
  Input,
  Button,
  Space,
  Card,
  List,
  InputNumber,
  Divider,
} from 'antd'
import {
  ShoppingCartOutlined,
  CreditCardOutlined,
  TagOutlined,
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

export default function CheckoutPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [form] = Form.useForm()
  const [couponCode, setCouponCode] = useState('')
  const [orderSummary, setOrderSummary] = useState<any>(null)

  const {
    data: cart,
    isLoading: isCartLoading,
    refetch: refetchCart,
  } = Api.cart.findFirst.useQuery({
    where: { userId: user?.id },
    include: { cartItems: { include: { product: true } } },
  })

  const { data: address } = Api.address.findFirst.useQuery({
    where: { userId: user?.id },
  })

  const { mutateAsync: createOrder } = Api.order.create.useMutation()
  const { mutateAsync: applyCoupon } = Api.coupon.findFirst.useMutation()

  useEffect(() => {
    if (address) {
      form.setFieldsValue(address)
    }
  }, [address, form])

  useEffect(() => {
    if (cart) {
      const total =
        cart.cartItems?.reduce(
          (sum, item) =>
            sum + (item.quantity || 0) * Number(item.product?.price || 0),
          0,
        ) || 0
      setOrderSummary({ items: cart.cartItems, total })
    }
  }, [cart])

  const handleApplyCoupon = async () => {
    try {
      const coupon = await applyCoupon({ where: { code: couponCode } })
      if (coupon) {
        const discountedTotal =
          orderSummary.total * (1 - Number(coupon.discountPercentage) / 100)
        setOrderSummary({ ...orderSummary, discountedTotal, coupon })
        enqueueSnackbar('Coupon applied successfully', { variant: 'success' })
      } else {
        enqueueSnackbar('Invalid coupon code', { variant: 'error' })
      }
    } catch (error) {
      enqueueSnackbar('Error applying coupon', { variant: 'error' })
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      const orderItems = orderSummary.items.map((item: any) => ({
        quantity: item.quantity,
        price: item.product.price,
        productId: item.product.id,
      }))

      const order = await createOrder({
        data: {
          totalAmount: (
            orderSummary.discountedTotal || orderSummary.total
          ).toString(),
          status: 'PENDING',
          userId: user?.id,
          orderItems: {
            createMany: { data: orderItems },
          },
        },
      })

      enqueueSnackbar('Order placed successfully', { variant: 'success' })
      router.push(`/orders/${order.id}`)
    } catch (error) {
      enqueueSnackbar('Error placing order', { variant: 'error' })
    }
  }

  if (isCartLoading) {
    return (
      <PageLayout layout="narrow">
        <Text>Loading...</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <ShoppingCartOutlined /> Checkout
      </Title>
      <Text>
        Complete your purchase by providing shipping and payment information.
      </Text>
      <Divider />

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Card
          title={
            <Title level={4}>
              <CreditCardOutlined /> Shipping Information
            </Title>
          }
        >
          <Form.Item
            name="streetAddress"
            label="Street Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Space>
            <Form.Item name="city" label="City" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="state" label="State" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Space>
          <Space>
            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="postalCode"
              label="Postal Code"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Space>
        </Card>

        <Card
          title={
            <Title level={4}>
              <TagOutlined /> Apply Coupon
            </Title>
          }
          style={{ marginTop: 16 }}
        >
          <Space>
            <Input
              value={couponCode}
              onChange={e => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
            />
            <Button onClick={handleApplyCoupon}>Apply</Button>
          </Space>
        </Card>

        {orderSummary && (
          <Card
            title={
              <Title level={4}>
                <ShoppingCartOutlined /> Order Summary
              </Title>
            }
            style={{ marginTop: 16 }}
          >
            <List
              dataSource={orderSummary.items}
              renderItem={(item: any) => (
                <List.Item>
                  <Text>{item.product.name}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Price: ${Number(item.product.price).toFixed(2)}</Text>
                </List.Item>
              )}
            />
            <Divider />
            <Text strong>Total: ${orderSummary.total.toFixed(2)}</Text>
            {orderSummary.discountedTotal && (
              <Text strong style={{ marginLeft: 16 }}>
                Discounted Total: ${orderSummary.discountedTotal.toFixed(2)}
              </Text>
            )}
          </Card>
        )}

        <Form.Item style={{ marginTop: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<CheckCircleOutlined />}
          >
            Complete Purchase
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
