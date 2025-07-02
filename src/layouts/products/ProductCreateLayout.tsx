import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'wouter'
import ProductForm from '@/components/Product/ProductForm'
import { useProductStore } from '@/stores/useProductStore'
import { ProductListing } from 'nostr-commerce-schema'
import { v4 as uuidv4 } from 'uuid'

const useSampleProduct = () => {
  const id = `product_id_${uuidv4()}`
  return useMemo<ProductListing>(
    () => ({
      tags: [
        ['d', id],
        ['title', 'Sample Product'],
        ['summary', 'This is a sample product'],
        ['price', '9.99', 'USD'],
        ['stock', '10'],
        ['type', 'simple', 'physical'],
        ['visibility', 'on-sale'],
        ['weight', '1', 'lb'],
        ['dim', '4x4x4', 'in'],
        [
          'image',
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F006%2F091%2F020%2Foriginal%2Fsample-stamp-in-rubber-style-red-round-grunge-sample-sign-rubber-stamp-on-white-illustration-free-vector.jpg&f=1&nofb=1&ipt=0ed9b68dde1c3789001129742d49d207a6473d1fde85ea3242fd8124f6352a7a',
          'Sample'
        ]
      ],
      content: 'This is a sample product description.',
      created_at: Math.floor(Date.now() / 1000),
      kind: 30402
    }),
    []
  )
}

const ProductCreateLayout: React.FC = () => {
  const { createProduct } = useProductStore()
  const sampleProduct = useSampleProduct()
  const [productData, setProductData] = useState<ProductListing | undefined>()
  const [, navigate] = useLocation()
  const [submitting, setSubmitting] = useState(false)

  // Auto-fill sample data if ?sample=true
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.get('sample') === 'true') {
      setProductData(sampleProduct)
    }
  }, [sampleProduct])

  const handleFillSample = () => {
    setProductData(sampleProduct)
  }

  const handleSubmit = async (tags: string[][], content: string) => {
    console.log('🧪 Tags received from form:', tags)
    setSubmitting(true)
    try {
      await createProduct({
        kind: 30402,
        tags,
        content
      })
      navigate('/products')
    } catch (err) {
      console.error('❌ Failed to create product:', err)
      // TODO: Add user-facing error message
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    setProductData(undefined)
    navigate('/products')
  }

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="loud-voice">Create Product</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleFillSample}
          className="btn-secondary"
          disabled={submitting}
          style={'background: red'}
        >
          Fill with Sample Data
        </button>
      </div>

      <ProductForm
        key={productData ? productData.created_at : 'new-product-form'}
        event={productData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        disabled={submitting}
      />

      {submitting && (
        <div className="text-center mt-4 text-sm text-gray-600">
          Submitting product...
        </div>
      )}
    </div>
  )
}

export default ProductCreateLayout
