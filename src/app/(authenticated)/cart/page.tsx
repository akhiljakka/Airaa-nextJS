'use client'

import { Prisma } from '@prisma/client'
import { useState, useEffect } from 'react'
import { Typography, Table, InputNumber, Button, Space } from 'antd'
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function ShoppingCartPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [cart, setCart] = useState<Prisma.CartGetPayload<{
    include: { cartItems: { include: { product: true } } }
  }> | null>(null)

  const {
    data: cartData,
    isLoading,
    refetch,
  } = Api.cart.findFirst.useQuery({
    where: { userId: user?.id },
    include: { cartItems: { include: { product: true } } },
  })

  const { mutateAsync: updateCartItem } = Api.cartItem.update.useMutation()
  const { mutateAsync: deleteCartItem } = Api.cartItem.delete.useMutation()

  useEffect(() => {
    if (cartData) {
      setCart(cartData)
    }
  }, [cartData])

  const handleQuantityChange = async (cartItemId: string, quantity: number) => {
    try {
      await updateCartItem({ where: { id: cartItemId }, data: { quantity } })
      refetch()
      enqueueSnackbar('Cart updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update cart', { variant: 'error' })
    }
  }

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await deleteCartItem({ where: { id: cartItemId } })
      refetch()
      enqueueSnackbar('Item removed from cart', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to remove item from cart', { variant: 'error' })
    }
  }

  const handleCheckout = () => {
    router.push('/checkout')
  }

  const columns = [
    {
      title: 'Product',
      dataIndex: ['product', 'name'],
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: ['product', 'price'],
      key: 'price',
      render: (price: string) => `$${parseFloat(price).toFixed(2)}`,
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (text: any, record: any) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={value => handleQuantityChange(record.id, value as number)}
        />
      ),
    },
    {
      title: 'Total',
      key: 'total',
      render: (text: any, record: any) =>
        `$${(parseFloat(record.product.price) * record.quantity).toFixed(2)}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record.id)}
          danger
        />
      ),
    },
  ]

  const totalAmount =
    cart?.cartItems?.reduce((acc, item) => {
      return acc + parseFloat(item.product.price) * item.quantity
    }, 0) || 0

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>
          <ShoppingCartOutlined /> Shopping Cart
        </Title>
        <Text>Review and update your items before checkout.</Text>

        {isLoading ? (
          <Text>Loading cart...</Text>
        ) : cart?.cartItems && cart.cartItems.length > 0 ? (
          <>
            <Table
              dataSource={cart.cartItems}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
            <Space direction="vertical" align="end" style={{ width: '100%' }}>
              <Text strong>Total: ${totalAmount.toFixed(2)}</Text>
              <Button type="primary" size="large" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </Space>
          </>
        ) : (
          <Text>Your cart is empty.</Text>
        )}
      </Space>
    </PageLayout>
  )
}
