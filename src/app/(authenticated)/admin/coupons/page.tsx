'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
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

export default function AdminCouponManagementPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<any>(null)
  const [form] = Form.useForm()

  const { data: coupons, isLoading, refetch } = Api.coupon.findMany.useQuery({})
  const { mutateAsync: createCoupon } = Api.coupon.create.useMutation()
  const { mutateAsync: updateCoupon } = Api.coupon.update.useMutation()
  const { mutateAsync: deleteCoupon } = Api.coupon.delete.useMutation()

  useEffect(() => {
    if (editingCoupon) {
      form.setFieldsValue({
        ...editingCoupon,
        validFrom: dayjs(editingCoupon.validFrom),
        validTo: dayjs(editingCoupon.validTo),
      })
    } else {
      form.resetFields()
    }
  }, [editingCoupon, form])

  const showModal = (coupon?: any) => {
    setEditingCoupon(coupon || null)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingCoupon(null)
  }

  const handleSubmit = async (values: any) => {
    try {
      if (editingCoupon) {
        await updateCoupon({
          where: { id: editingCoupon.id },
          data: {
            ...values,
            validFrom: values.validFrom.toISOString(),
            validTo: values.validTo.toISOString(),
          },
        })
        enqueueSnackbar('Coupon updated successfully', { variant: 'success' })
      } else {
        await createCoupon({
          data: {
            ...values,
            validFrom: values.validFrom.toISOString(),
            validTo: values.validTo.toISOString(),
          },
        })
        enqueueSnackbar('Coupon created successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      refetch()
    } catch (error) {
      enqueueSnackbar('Error saving coupon', { variant: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCoupon({ where: { id } })
      enqueueSnackbar('Coupon deleted successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Error deleting coupon', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Discount (%)',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      render: (text: string) => `${text}%`,
    },
    {
      title: 'Valid From',
      dataIndex: 'validFrom',
      key: 'validFrom',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Valid To',
      dataIndex: 'validTo',
      key: 'validTo',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: 8 }}
          />
        </>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Coupon Management</Title>
      <Text>
        Create, edit, and delete discount coupons. Set coupon rules and
        expiration dates.
      </Text>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginTop: 16, marginBottom: 16 }}
      >
        Add New Coupon
      </Button>

      <Table
        dataSource={coupons}
        columns={columns}
        rowKey="id"
        loading={isLoading}
      />

      <Modal
        title={editingCoupon ? 'Edit Coupon' : 'Create Coupon'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="code"
            label="Coupon Code"
            rules={[
              { required: true, message: 'Please input the coupon code!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="discountPercentage"
            label="Discount Percentage"
            rules={[
              {
                required: true,
                message: 'Please input the discount percentage!',
              },
            ]}
          >
            <InputNumber
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value!.replace('%', '')}
            />
          </Form.Item>
          <Form.Item
            name="validFrom"
            label="Valid From"
            rules={[
              { required: true, message: 'Please select the start date!' },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="validTo"
            label="Valid To"
            rules={[{ required: true, message: 'Please select the end date!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCoupon ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
