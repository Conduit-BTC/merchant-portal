import React from 'react'
import { useProductStore } from '@/stores/useProductStore'
import ProductForm from '@/components/Product/ProductForm'
import { useRoute, useLocation } from 'wouter'

const ProductEditorLayout: React.FC = () => {
  const [matchedRoute, params] = useRoute('/products/edit/:id')
  const [, navigate] = useLocation()
  const updateProduct = useProductStore((state) => state.updateProduct)
  const productId = params?.id
  const product = useProductStore((state) =>
    productId ? state.products.get(productId) : undefined
  )

  const handleSubmit = async (tags: string[][], content: string) => {
    if (!productId) return

    try {
      await updateProduct(productId, {
        tags,
        content,
        created_at: Math.floor(Date.now() / 1000)
      })
      navigate('/products')
    } catch (error) {
      console.error('❌ Failed to update product:', error)
      // TODO: show user-friendly error
    }
  }

  const handleCancel = () => navigate('/products')

  if (!matchedRoute || !productId) {
    return (
      <div className="text-red-600 text-center py-8">Invalid Product ID</div>
    )
  }

  if (!product) {
    return (
      <div className="text-gray-500 text-center py-8">Product not found</div>
    )
  }

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="loud-voice">Edit Product</h1>
      <ProductForm
        event={product}
        mode="edit"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  )
}

export default ProductEditorLayout
