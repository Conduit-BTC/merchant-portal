import React, { useEffect, useState } from 'react'
import {
  ProductListing,
  ProductListingUtils,
  ShippingOption
} from 'nostr-commerce-schema'
import { useAccountStore } from '@/stores/useAccountStore'
import DetailsTab from './DetailsTab'
import BasicTab from './BasicTab'
import ImagesTab from './ImagesTab'
import ShippingTab from './ShippingTab'
import Button from '@/components/Buttons/Button'
import Icon from '@/components/Icon'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/Tabs'
import { cn } from '@/lib/utils'

interface ProductFormProps {
  event?: ProductListing
  mode: 'create' | 'edit'
  onSubmit: (tags: string[][], content: string) => Promise<void>
  onCancel: () => void
  disabled?: boolean
}

export interface FormState {
  id: string
  title: string
  price: {
    amount: string
    currency: string
    frequency: string
  }
  summary: string
  content: string
  stock: string
  type: {
    type: 'simple' | 'variable' | 'variation'
    physicalType: 'digital' | 'physical'
  }
  visibility: 'hidden' | 'on-sale' | 'pre-order'
  images: Array<{
    url: string
    dimensions?: string
    order?: number
  }>
  specs: Array<{
    key: string
    value: string
  }>
  weight: {
    value: string
    unit: string
  }
  dimensions: {
    dimensions: string
    unit: string
  }
  categories: string[]
  shippingOptions: {
    reference: string
    extraCost?: string
  }[]
}

const initialState: FormState = {
  id: '',
  title: '',
  price: {
    amount: '',
    currency: 'USD',
    frequency: ''
  },
  summary: '',
  content: '',
  stock: '',
  type: {
    type: 'simple',
    physicalType: 'physical'
  },
  visibility: 'on-sale',
  images: [],
  specs: [],
  weight: {
    value: '',
    unit: 'kg'
  },
  dimensions: {
    dimensions: '',
    unit: 'cm'
  },
  categories: [],
  shippingOptions: []
}

const ProductForm: React.FC<ProductFormProps> = ({
  event,
  onSubmit,
  onCancel,
  mode,
  disabled = false
}) => {
  const { user } = useAccountStore()
  if (!user) throw new Error('[ProductForm]: Not logged in!')

  const [formData, setFormData] = useState<FormState>({
    ...initialState,
    id: ProductListingUtils.generateProductId()
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTab, setCurrentTab] = useState('basic')

  // Define tab order for navigation
  const tabOrder = ['basic', 'details', 'images', 'shipping']
  const currentTabIndex = tabOrder.indexOf(currentTab)
  const isLastTab = currentTabIndex === tabOrder.length - 1

  // If an event is provided, populate form with its data
  useEffect(() => {
    if (event) {
      const id =
        ProductListingUtils.getProductId(event) ||
        ProductListingUtils.generateProductId()

      const title = ProductListingUtils.getProductTitle(event) || ''
      const price = ProductListingUtils.getProductPrice(event) || {
        amount: '--',
        currency: 'USD'
      }
      const summary = ProductListingUtils.getProductSummary(event) || ''
      const content = event.content || ''
      const stock = ProductListingUtils.getProductStock(event)?.toString() || ''
      const type = ProductListingUtils.getProductType(event) || {
        type: 'simple',
        physicalType: 'physical'
      }
      const visibility =
        ProductListingUtils.getProductVisibility(event) || 'on-sale'
      const images = ProductListingUtils.getProductImages(event) || []
      const weight = ProductListingUtils.getProductWeight(event) || {
        value: '',
        unit: 'kg'
      }
      const dimensions = ProductListingUtils.getProductDimensions(event) || {
        dimensions: '',
        unit: 'cm'
      }
      const categories = ProductListingUtils.getProductCategories(event) || []
      const shippingOptions =
        ProductListingUtils.getProductShippingOptions(event) || []

      console.log('Shipping Options: ', event)

      // Convert specs object to array of {key, value} objects
      const specsObj = ProductListingUtils.getProductSpecs(event)
      const specs = Object.entries(specsObj).map(([key, value]) => ({
        key,
        value
      }))

      setFormData({
        id,
        title,
        price: {
          amount: price.amount || '',
          currency: price.currency || 'USD',
          frequency: price.frequency || ''
        },
        summary,
        content,
        stock,
        type: {
          type: type.type || 'simple',
          physicalType: type.physicalType || 'physical'
        },
        visibility,
        images,
        specs: specs.length ? specs : [],
        weight,
        dimensions,
        categories,
        shippingOptions
      })
    }
  }, [event])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validate required fields
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.price.amount.trim()) {
      newErrors.price = 'Price is required'
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.price.amount)) {
      newErrors.price = 'Price must be a valid number (e.g., 19.99)'
    }

    if (!formData.price.currency.trim()) {
      newErrors.currency = 'Currency is required'
    }

    // Validate stock if provided
    if (formData.stock && !/^\d+$/.test(formData.stock)) {
      newErrors.stock = 'Stock must be a whole number'
    }

    // Validate image URLs if provided
    formData.images.forEach((image, index) => {
      try {
        new URL(image.url)
      } catch (e) {
        newErrors[`image-${index}`] = 'Invalid URL'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentTabIndex < tabOrder.length - 1) {
      setCurrentTab(tabOrder[currentTabIndex + 1])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Convert form data to tags format
      const tags = ProductListingUtils.createProductTags({
        id: formData.id,
        title: formData.title,
        price: {
          amount: formData.price.amount,
          currency: formData.price.currency,
          frequency: formData.price.frequency || undefined
        },
        summary: formData.summary || undefined,
        stock: formData.stock ? parseInt(formData.stock, 10) : undefined,
        type: {
          type: formData.type.type,
          physicalType: formData.type.physicalType
        },
        visibility: formData.visibility,
        images: formData.images.length ? formData.images : undefined,
        specs: formData.specs.length
          ? formData.specs.reduce((acc, spec) => {
              if (spec.key && spec.value) {
                acc[spec.key] = spec.value
              }
              return acc
            }, {} as Record<string, string>)
          : undefined,
        weight: formData.weight.value
          ? {
              value: formData.weight.value,
              unit: formData.weight.unit
            }
          : undefined,
        dimensions: formData.dimensions.dimensions
          ? {
              dimensions: formData.dimensions.dimensions,
              unit: formData.dimensions.unit
            }
          : undefined,
        categories: formData.categories.length
          ? formData.categories
          : undefined,
        shippingOptions: formData.shippingOptions.length
          ? formData.shippingOptions
          : undefined
      })

      await onSubmit(tags, formData.content)
    } catch (error) {
      console.error('Error submitting product:', error)
      setErrors({ submit: 'Failed to submit product' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    const { name, value } = target

    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormState] as any),
          [child]: value
        }
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <div className="">
      <div className="absolute top-[-40px] right-10 z-[-1] pb-2 bg-accent rounded-t-full from-primary-800 to-accent/80 bg-gradient-to-t">
        <Button variant="ghost" size="icon">
          <Icon.X />
        </Button>
      </div>
      <h2 className="attention-voice flex items-center gap-2 mb-8">
        {mode === 'edit' ? 'Edit Product' : 'Create New Product'} 
		  
		  <Button variant="link" size="icon" className="flex items-center gap-2" onClick={() => navigator.clipboard.writeText(formData.id)}>
		  <code className="solid-voice inline-block my-2">
			{formData.id.substring(0, 8)}...{formData.id.substring(formData.id.length - 8)}
			
			</code>
				<Icon.Copy className="size-4"  />
			
			</Button>
		  

      </h2>

      <div className="border-primary-800  border rounded-lg bg-muted/10 ">
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="bg-muted/40 rounded-t-lg overflow-hidden">
          {tabOrder.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <form onSubmit={handleSubmit} className={cn( 'p-4', disabled && 'opacity-50 pointer-events-none')}>
          <TabsContent value="basic">
            <BasicTab
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          </TabsContent>

          <TabsContent value="shipping">
            <ShippingTab formData={formData} setFormData={setFormData} />
          </TabsContent>

          <TabsContent value="details">
            <DetailsTab
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
            />
          </TabsContent>

          <TabsContent value="images">
            <ImagesTab
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          </TabsContent>

          {/* Error message */}
          {errors.submit && (
            <div className="mt-4 text-sm text-red-600">{errors.submit}</div>
          )}

          {/* Form actions */}
          <div className="mt-8 flex justify-end space-x-3">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>

            {mode === 'create' ? (
              // Create mode: Next/Create Product button
              <Button
                variant="primary"
                type={isLastTab ? 'submit' : 'button'}
                onClick={isLastTab ? undefined : handleNext}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Icon.Zap className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    {isLastTab ? 'Create Product' : 'Next'}
                    {!isLastTab && <Icon.ArrowRight />}
                  </>
                )}
              </Button>
            ) : (
              // Edit mode: Update Product button
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Icon.Zap className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Product'
                )}
              </Button>
            )}
          </div>
        </form>
      </Tabs>
      </div>
    </div>
  )
}

export default ProductForm
