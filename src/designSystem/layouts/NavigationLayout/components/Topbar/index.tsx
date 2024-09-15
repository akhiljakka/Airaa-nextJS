import { MenuOutlined } from '@ant-design/icons'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import { useUserContext } from '@/core/context'
import { Utility } from '@/core/helpers/utility'

interface Props {
  isMobile?: boolean
  isLoggedIn?: boolean
  header?: ReactNode
  items: { key: string; label: string; onClick: () => void }[]
  itemsMobile: { key: string; label: string; onClick: () => void }[]
}

export const Topbar: React.FC<Props> = ({
  isMobile = false,
  isLoggedIn = false,
  header,
  items,
  itemsMobile,
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()

  let pathnamePure = pathname

  Object.entries(params).forEach(([key, value]) => {
    pathnamePure = pathnamePure.replace(`/${value}`, `/:${key}`)
  })

  const { user, checkRole } = useUserContext()

  const isThin = items.length === 0

  if (isMobile) {
    return (
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-2">
          {header && <div>{header}</div>}

          <nav className="w-[46px]">
            <ul className="flex">
              {itemsMobile?.map(item => (
                <li key={item.key}>
                  <button
                    onClick={item.onClick}
                    className={`px-2 py-1 ${
                      pathnamePure === item.key
                        ? 'text-blue-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className={`bg-white shadow-sm ${isThin ? 'h-[60px]' : ''}`}>
      <div className={`flex items-center px-4 py-2 ${isThin ? 'h-full' : ''}`}>
        {header && <div>{header}</div>}

        <nav className="flex-1">
          <ul className="flex">
            {items?.map(item => (
              <li key={item.key}>
                <button
                  onClick={item.onClick}
                  className={`px-4 py-2 ${
                    pathnamePure === item.key
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <>
              {checkRole('admin') && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Admin
                </span>
              )}
              <button
                onClick={() => router.push('/profile')}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer"
              >
                {user?.pictureUrl ? (
                  <img
                    src={user.pictureUrl}
                    alt={user.name}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  Utility.stringToInitials(user?.name)
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
