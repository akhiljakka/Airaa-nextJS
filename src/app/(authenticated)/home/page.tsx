'use client'

import { ShoppingOutlined, TagOutlined, FireOutlined } from '@ant-design/icons'
import { useUserContext } from '@/core/context'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
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
      <h1 className="text-4xl font-bold mb-2">Welcome to Our Store</h1>
      <p className="text-gray-600 mb-8">
        Discover our featured products, categories, and frequently bought items.
      </p>

      <h2 className="text-2xl font-semibold mb-4 mt-8">
        <TagOutlined className="mr-2" /> Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {productsLoading ? (
          <div className="col-span-full">Loading featured products...</div>
        ) : (
          featuredProducts?.map(product => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                className="w-full h-48 object-cover"
                alt={product.name}
                src={product.imageUrl || 'https://via.placeholder.com/150'}
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 mb-2">${product.price}</p>
                <p className="text-sm text-gray-500">
                  {product.category?.name}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4 mt-8">
        <ShoppingOutlined className="mr-2" /> Featured Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {categoriesLoading ? (
          <div className="col-span-full">Loading categories...</div>
        ) : (
          categories?.map(category => (
            <div
              key={category.id}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleCategoryClick(category.id)}
            >
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4 mt-8">
        <FireOutlined className="mr-2" /> Frequently Bought Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {frequentLoading ? (
          <div className="col-span-full">
            Loading frequently bought products...
          </div>
        ) : (
          frequentlyBoughtProducts?.map(product => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                className="w-full h-48 object-cover"
                alt={product.name}
                src={product.imageUrl || 'https://via.placeholder.com/150'}
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 mb-2">${product.price}</p>
                <p className="text-sm text-gray-500">
                  {product.category?.name}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          className="bg-black text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
          onClick={() => router.push('/catalog')}
        >
          View All Products
        </button>
      </div>
    </PageLayout>
  )
}
