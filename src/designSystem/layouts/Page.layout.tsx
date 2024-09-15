import React from 'react'

type LayoutType = 'full-width' | 'narrow' | 'super-narrow'

interface Props {
  children: React.ReactNode
  layout?: LayoutType
  isCentered?: boolean
}

const getLayoutClasses = (layout: LayoutType): string => {
  const mapping: Record<LayoutType, string> = {
    'full-width': 'w-full',
    narrow: 'w-full lg:w-2/3 xl:w-1/2',
    'super-narrow': 'w-full lg:w-1/2 xl:w-1/3',
  }

  return mapping[layout] ?? mapping['full-width']
}

export const PageLayout: React.FC<Props> = ({
  children,
  layout = 'full-width',
  isCentered = false,
  ...props
}) => {
  const layoutClasses = getLayoutClasses(layout)

  return (
    <div className="w-full flex justify-center">
      <div className={`${layoutClasses} p-2`} {...props}>
        {isCentered ? (
          <div className="flex items-center justify-center min-h-full">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
