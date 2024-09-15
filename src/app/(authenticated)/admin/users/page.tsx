'use client'

import { Prisma } from '@prisma/client'
import { useState, useEffect } from 'react'
import { Typography, Table, Button, Modal, Input, Form, Space } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function AdminUserManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [selectedUser, setSelectedUser] =
    useState<Prisma.UserGetPayload<{}> | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalMode, setModalMode] = useState<'reset' | 'disable'>('reset')

  const { data: users, isLoading, refetch } = Api.user.findMany.useQuery({})
  const { mutateAsync: updateUser } = Api.user.update.useMutation()

  useEffect(() => {
    if (user?.globalRole !== 'ADMIN') {
      router.push('/home')
      enqueueSnackbar('You do not have permission to access this page.', {
        variant: 'error',
      })
    }
  }, [user, router])

  const handleResetPassword = async (userId: string) => {
    try {
      await updateUser({
        where: { id: userId },
        data: { password: 'temporaryPassword123' }, // In a real scenario, generate a secure random password
      })
      enqueueSnackbar('Password reset successfully.', { variant: 'success' })
      setIsModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to reset password.', { variant: 'error' })
    }
  }

  const handleDisableAccount = async (userId: string) => {
    try {
      await updateUser({
        where: { id: userId },
        data: { status: 'DISABLED' },
      })
      enqueueSnackbar('Account disabled successfully.', { variant: 'success' })
      setIsModalVisible(false)
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to disable account.', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Prisma.UserGetPayload<{}>) => (
        <Space>
          <Button
            icon={<LockOutlined />}
            onClick={() => {
              setSelectedUser(record)
              setModalMode('reset')
              setIsModalVisible(true)
            }}
          >
            Reset Password
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              setSelectedUser(record)
              setModalMode('disable')
              setIsModalVisible(true)
            }}
          >
            Disable Account
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <UserOutlined /> User Management
      </Title>
      <Text>
        Manage user accounts, reset passwords, and disable accounts if needed.
      </Text>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        style={{ marginTop: 20 }}
      />

      <Modal
        title={modalMode === 'reset' ? 'Reset Password' : 'Disable Account'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              if (modalMode === 'reset') {
                handleResetPassword(selectedUser?.id || '')
              } else {
                handleDisableAccount(selectedUser?.id || '')
              }
            }}
          >
            Confirm
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to{' '}
          {modalMode === 'reset' ? 'reset the password' : 'disable the account'}{' '}
          for user {selectedUser?.name} ({selectedUser?.email})?
        </p>
      </Modal>
    </PageLayout>
  )
}
