'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Card,
  List,
  Select,
  Input,
  Row,
  Col,
  Space,
  Spin,
} from 'antd'
import {
  ShopOutlined,
  FilterOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons'
const { Title, Paragraph } = Typography
const { Option } = Select
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function ProductCatalogPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const { data: categories, isLoading: categoriesLoading } =
    Api.category.findMany.useQuery({})
  const {
    data: products,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = Api.product.findMany.useQuery({
    include: { category: true },
    where: {
      categoryId: selectedCategory || undefined,
      name: { contains: searchTerm, mode: 'insensitive' },
    },
    orderBy: { [sortBy]: sortOrder },
  })

  useEffect(() => {
    refetchProducts()
  }, [selectedCategory, searchTerm, sortBy, sortOrder])

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === 'all' ? null : value)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (value: string) => {
    const [field, order] = value.split('-')
    setSortBy(field as 'name' | 'price')
    setSortOrder(order as 'asc' | 'desc')
  }

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`)
  }

  if (categoriesLoading || productsLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Product Catalog</Title>
      <Paragraph>
        Browse our wide range of products across various categories.
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="Select a category"
              onChange={handleCategoryChange}
              defaultValue="all"
            >
              <Option value="all">All Categories</Option>
              {categories?.map(category => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={8}>
            <Input
              placeholder="Search products"
              prefix={<FilterOutlined />}
              onChange={handleSearchChange}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="Sort by"
              onChange={handleSortChange}
              defaultValue="name-asc"
            >
              <Option value="name-asc">Name (A-Z)</Option>
              <Option value="name-desc">Name (Z-A)</Option>
              <Option value="price-asc">Price (Low to High)</Option>
              <Option value="price-desc">Price (High to Low)</Option>
            </Select>
          </Col>
        </Row>

        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          dataSource={products}
          renderItem={product => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.imageUrl}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
                onClick={() => handleProductClick(product.id)}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <>
                      <Paragraph ellipsis={{ rows: 2 }}>
                        {product.description}
                      </Paragraph>
                      <Paragraph strong>
                        ${parseFloat(product.price || '0').toFixed(2)}
                      </Paragraph>
                      <Paragraph type="secondary">
                        <ShopOutlined /> {product.category?.name}
                      </Paragraph>
                    </>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </Space>
    </PageLayout>
  )
}
