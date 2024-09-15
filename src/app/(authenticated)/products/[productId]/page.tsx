'use client'

import { Prisma } from '@prisma/client'
import { Typography, Card, Button, InputNumber, Spin, Row, Col } from 'antd'
import { ShoppingCartOutlined, TagOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function ProductDetailsPage() {
  const router = useRouter()
  const params = useParams<{ productId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [quantity, setQuantity] = useState(1)

  const { data: product, isLoading } = Api.product.findUnique.useQuery({
    where: { id: params.productId },
    include: { category: true },
  })

  const { data: relatedProducts, isLoading: isLoadingRelated } =
    Api.product.findMany.useQuery({
      where: { categoryId: product?.categoryId, NOT: { id: params.productId } },
      take: 4,
    })

  const { mutateAsync: addToCart } = Api.cartItem.create.useMutation()

  const handleAddToCart = async () => {
    if (!user) {
      enqueueSnackbar('Please log in to add items to your cart', {
        variant: 'info',
      })
      return
    }

    try {
      const cart = await Api.cart.findFirst.useQuery({
        where: { userId: user.id },
      }).data
      if (!cart) {
        enqueueSnackbar('Error: Cart not found', { variant: 'error' })
        return
      }

      await addToCart({
        data: {
          quantity,
          cart: { connect: { id: cart.id } },
          product: { connect: { id: product!.id } },
        },
      })
      enqueueSnackbar('Product added to cart successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to add product to cart', { variant: 'error' })
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!product) {
    return (
      <PageLayout layout="narrow">
        <Title level={2}>Product not found</Title>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Product Details</Title>
      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Title level={3}>{product.name}</Title>
            <Paragraph>{product.description}</Paragraph>
            <Text strong>
              Price: ${parseFloat(product.price || '0').toFixed(2)}
            </Text>
            <br />
            <Text>Category: {product.category?.name}</Text>
            <br />
            <Text>In Stock: {product.stock?.toString()}</Text>
            <br />
            <br />
            <InputNumber
              min={1}
              max={product.stock}
              value={quantity}
              onChange={value => setQuantity(value as number)}
            />
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              style={{ marginLeft: '10px' }}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Card>

      <Title level={3} style={{ marginTop: '20px' }}>
        Related Products
      </Title>
      {isLoadingRelated ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {relatedProducts?.map(relatedProduct => (
            <Col xs={24} sm={12} md={6} key={relatedProduct.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={relatedProduct.name}
                    src={relatedProduct.imageUrl}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                }
                onClick={() => router.push(`/products/${relatedProduct.id}`)}
              >
                <Card.Meta
                  title={relatedProduct.name}
                  description={
                    <>
                      <Text>
                        ${parseFloat(relatedProduct.price || '0').toFixed(2)}
                      </Text>
                      <br />
                      <TagOutlined /> {relatedProduct.category?.name}
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
