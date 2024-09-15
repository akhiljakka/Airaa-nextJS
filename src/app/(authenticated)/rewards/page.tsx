'use client'

import {
  Typography,
  Card,
  List,
  Button,
  Space,
  Row,
  Col,
  Modal,
  InputNumber,
} from 'antd'
import {
  GiftOutlined,
  TrophyOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function PointsandRewardsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: rewardPoints,
    isLoading: isLoadingRewardPoints,
    refetch: refetchRewardPoints,
  } = Api.rewardPoint.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { dateCreated: 'desc' },
  })

  const { mutateAsync: createRewardPoint } =
    Api.rewardPoint.create.useMutation()
  const { mutateAsync: updateRewardPoint } =
    Api.rewardPoint.update.useMutation()

  const totalPoints =
    rewardPoints?.reduce((sum, point) => sum + (point.points || 0), 0) || 0

  const handleRedeemPoints = () => {
    Modal.confirm({
      title: 'Redeem Points',
      content: (
        <div>
          <p>How many points would you like to redeem?</p>
          <InputNumber min={1} max={totalPoints} defaultValue={100} />
        </div>
      ),
      onOk: async () => {
        try {
          await updateRewardPoint({
            where: { id: rewardPoints?.[0]?.id },
            data: { points: { decrement: 100 } },
          })
          enqueueSnackbar('Points redeemed successfully!', {
            variant: 'success',
          })
          refetchRewardPoints()
        } catch (error) {
          enqueueSnackbar('Failed to redeem points', { variant: 'error' })
        }
      },
    })
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Points and Rewards</Title>
      <Paragraph>
        Manage your reward points and redeem discounts for future purchases.
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>
              <TrophyOutlined /> Current Points Balance
            </Title>
            <Text style={{ fontSize: '24px' }}>
              {totalPoints.toString()} points
            </Text>
            <br />
            <Button
              type="primary"
              onClick={handleRedeemPoints}
              disabled={totalPoints === 0}
            >
              Redeem Points
            </Button>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>
              <InfoCircleOutlined /> How to Earn More Points
            </Title>
            <List
              size="small"
              dataSource={[
                'Make a purchase: 1 point per $1 spent',
                'Write a product review: 50 points',
                'Refer a friend: 100 points',
                'Birthday bonus: 200 points',
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: '16px' }}>
        <Title level={4}>
          <GiftOutlined /> Points History
        </Title>
        <List
          loading={isLoadingRewardPoints}
          dataSource={rewardPoints}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={`${item.points > 0 ? 'Earned' : 'Redeemed'} ${Math.abs(item.points || 0)} points`}
                description={dayjs(item.dateCreated).format('MMMM D, YYYY')}
              />
            </List.Item>
          )}
        />
      </Card>
    </PageLayout>
  )
}
