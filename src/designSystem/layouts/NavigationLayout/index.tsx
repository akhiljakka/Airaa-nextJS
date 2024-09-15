import { useUserContext } from '@/core/context'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { useDesignSystem } from '../../provider'
import { Leftbar } from './components/Leftbar'
import { Topbar } from './components/Topbar'

import { Logo } from './components/Logo'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const { authenticationStatus: isLoggedIn } = useUserContext()

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const itemsLeftbar = []

  const itemsTopbar = [
    {
      key: '/home',
      label: 'Home',
      onClick: () => goTo('/home'),
    },

    {
      key: '/catalog',
      label: 'Product Catalog',
      onClick: () => goTo('/catalog'),
    },

    {
      key: '/cart',
      label: 'Shopping Cart',
      onClick: () => goTo('/cart'),
    },

    {
      key: '/checkout',
      label: 'Checkout',
      onClick: () => goTo('/checkout'),
    },

    {
      key: '/orders',
      label: 'Order History',
      onClick: () => goTo('/orders'),
    },

    {
      key: '/rewards',
      label: 'Points and Rewards',
      onClick: () => goTo('/rewards'),
    },

    {
      key: '/admin/dashboard',
      label: 'Admin Dashboard',
      onClick: () => goTo('/admin/dashboard'),
    },

    {
      key: '/admin/products',
      label: 'Admin Product Management',
      onClick: () => goTo('/admin/products'),
    },

    {
      key: '/admin/orders',
      label: 'Admin Order Management',
      onClick: () => goTo('/admin/orders'),
    },

    {
      key: '/admin/users',
      label: 'Admin User Management',
      onClick: () => goTo('/admin/users'),
    },

    {
      key: '/admin/coupons',
      label: 'Admin Coupon Management',
      onClick: () => goTo('/admin/coupons'),
    },

    {
      key: '/pricing',
      label: 'Pricing',
      onClick: () => goTo('/pricing'),
    },
  ]

  const itemsLeftbarBottom = []

  const itemsMobile = [
    {
      key: '/profile',
      label: 'Profile',
      onClick: () => goTo('/profile'),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
    ...itemsLeftbarBottom,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                header={<Logo height={40} />}
                items={itemsLeftbar}
                itemsBottom={itemsLeftbarBottom}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              itemsMobile={itemsMobile}
              isLoggedIn={isLoggedIn === 'authenticated'}
              items={itemsTopbar}
              header={!isLeftbar && <Logo height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
