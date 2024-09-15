'use client'

import { Prisma } from '@prisma/client'
import { useState, useEffect } from 'react'
import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function AdminProductManagementPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingProduct, setEditingProduct] =
    useState<Prisma.ProductGetPayload<{ include: { category: true } }> | null>(
      null,
    )
  const [form] = Form.useForm()

  const {
    data: products,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = Api.product.findMany.useQuery({
    include: { category: true },
  })

  const { data: categories, isLoading: categoriesLoading } =
    Api.category.findMany.useQuery({})

  const { mutateAsync: createProduct } = Api.product.create.useMutation()
  const { mutateAsync: updateProduct } = Api.product.update.useMutation()
  const { mutateAsync: deleteProduct } = Api.product.delete.useMutation()

  useEffect(() => {
    if (user?.globalRole !== 'ADMIN') {
      router.push('/home')
      enqueueSnackbar('You do not have permission to access this page.', {
        variant: 'error',
      })
    }
  }, [user, router])

  const handleAddEdit = (
    product: Prisma.ProductGetPayload<{ include: { category: true } }> | null,
  ) => {
    setEditingProduct(product)
    if (product) {
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        price: parseFloat(product.price || '0'),
        stock: product.stock,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
      })
    } else {
      form.resetFields()
    }
    setIsModalVisible(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct({ where: { id } })
      enqueueSnackbar('Product deleted successfully', { variant: 'success' })
      refetchProducts()
    } catch (error) {
      enqueueSnackbar('Failed to delete product', { variant: 'error' })
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingProduct) {
        await updateProduct({
          where: { id: editingProduct.id },
          data: { ...values, price: values.price.toString() },
        })
        enqueueSnackbar('Product updated successfully', { variant: 'success' })
      } else {
        await createProduct({
          data: { ...values, price: values.price.toString() },
        })
        enqueueSnackbar('Product created successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      refetchProducts()
    } catch (error) {
      enqueueSnackbar('Failed to save product', { variant: 'error' })
    }
  }

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => `$${parseFloat(price).toFixed(2)}`,
    },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    { title: 'Category', dataIndex: ['category', 'name'], key: 'category' },
    {
      title: 'Created At',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (
        _: any,
        record: Prisma.ProductGetPayload<{ include: { category: true } }>,
      ) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleAddEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Product Management</Title>
      <Text>
        Manage your product catalog here. You can add, edit, and delete
        products.
      </Text>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleAddEdit(null)}
        style={{ marginBottom: 16, marginTop: 16 }}
      >
        Add New Product
      </Button>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={productsLoading}
      />

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="imageUrl" label="Image URL">
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select loading={categoriesLoading}>
              {categories?.map(category => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
