'use client'

import { Typography, Row, Col, Card, Button } from 'antd'
import { ShoppingOutlined, TagOutlined, FireOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: featuredProducts, isLoading: productsLoading } =
    Api.product.findMany.useQuery({
      where: { stock: { gt: 0 } },
      take: 4,
      orderBy: { dateCreated: 'desc' },
      include: { category: true },
    })

  const { data: categories, isLoading: categoriesLoading } =
    Api.category.findMany.useQuery({
      take: 4,
      orderBy: { dateCreated: 'desc' },
    })

  const { data: frequentlyBoughtProducts, isLoading: frequentLoading } =
    Api.product.findMany.useQuery({
      where: { stock: { gt: 0 } },
      take: 4,
      orderBy: { cartItems: { _count: 'desc' } },
      include: { category: true },
    })

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`)
  }

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/catalog?category=${categoryId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={1}>Welcome to Our Store</Title>
      <Text>
        Discover our featured products, categories, and frequently bought items.
      </Text>

      <Title level={2} style={{ marginTop: '2rem' }}>
        <TagOutlined /> Featured Products
      </Title>
      <Row gutter={[16, 16]}>
        {productsLoading ? (
          <Col span={24}>Loading featured products...</Col>
        ) : (
          featuredProducts?.map(product => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.imageUrl || 'https://via.placeholder.com/150'}
                  />
                }
                onClick={() => handleProductClick(product.id)}
              >
                <Card.Meta
                  title={product.name}
                  description={`$${product.price}`}
                />
                <Text type="secondary">{product.category?.name}</Text>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Title level={2} style={{ marginTop: '2rem' }}>
        <ShoppingOutlined /> Featured Categories
      </Title>
      <Row gutter={[16, 16]}>
        {categoriesLoading ? (
          <Col span={24}>Loading categories...</Col>
        ) : (
          categories?.map(category => (
            <Col xs={24} sm={12} md={6} key={category.id}>
              <Card hoverable onClick={() => handleCategoryClick(category.id)}>
                <Card.Meta
                  title={category.name}
                  description={category.description}
                />
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Title level={2} style={{ marginTop: '2rem' }}>
        <FireOutlined /> Frequently Bought Products
      </Title>
      <Row gutter={[16, 16]}>
        {frequentLoading ? (
          <Col span={24}>Loading frequently bought products...</Col>
        ) : (
          frequentlyBoughtProducts?.map(product => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.imageUrl || 'https://via.placeholder.com/150'}
                  />
                }
                onClick={() => handleProductClick(product.id)}
              >
                <Card.Meta
                  title={product.name}
                  description={`$${product.price}`}
                />
                <Text type="secondary">{product.category?.name}</Text>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Row justify="center" style={{ marginTop: '2rem' }}>
        <Col>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push('/catalog')}
          >
            View All Products
          </Button>
        </Col>
      </Row>
    </PageLayout>
  )
}
