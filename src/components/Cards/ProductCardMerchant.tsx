import React, { useMemo, useState } from 'react'
import {
  type ProductListing,
  ProductListingUtils,
  validateProductListing
} from 'nostr-commerce-schema'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './CardComponents'
import { Star } from 'lucide-react'
import { Badge } from '@/components/Badge.tsx'
import { cn, formatPrice } from '@/lib/utils.ts'
import Button from '@/components/Buttons/Button'
import { DeleteIcon, EditIcon } from '@/assets/images/icons/icons'

const PLACEHOLDER_IMAGE = 'https://prd.place/600/400'

interface ProductCardProps {
  event: ProductListing
  onEdit: (event: ProductListing) => void
  onDelete: (id: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  event,
  onEdit,
  onDelete
}) => {
  // #todo: remove this once we have a real event

  // Memoize the validation check so it only runs when the event changes
  const validationMemo = useMemo(() => {
    const validationResult = validateProductListing(event)

    if (!validationResult.success) {
      console.warn('Invalid product event:', validationResult.error)
      return { valid: false, productEvent: null }
    }

    // Now we can safely treat it as a ProductListing
    return {
      valid: true,
      productEvent: event as unknown as ProductListing
    }
  }, [event.id, event.tags, event.content, event.pubkey]) // Dependencies that should trigger revalidation

  // Early return if validation failed
  if (!validationMemo.valid) {
    return null
  }

  const productEvent = validationMemo.productEvent!

  const [imageError, setImageError] = useState(false)

  // Use schema functions to extract data
  const id = ProductListingUtils.getProductId(event)
  const title = ProductListingUtils.getProductTitle(productEvent)
  const price = ProductListingUtils.getProductPrice(productEvent)
  const images = ProductListingUtils.getProductImages(productEvent)
  const stock = ProductListingUtils.getProductStock(productEvent)
  const summary = ProductListingUtils.getProductSummary(productEvent)
  const visibility = ProductListingUtils.getProductVisibility(productEvent)

  //   const storeName = ProductListingUtils.getStoreName(productEvent) #fixme
  const storeName = 'Example Store'

  // If any required field is missing, don't render the card
  if (!id || !title || !price) {
    console.warn('Product missing required fields:', {
      id,
      title,
      price
    })
    return null
  }
  // if price is not set, return 'Price not set'
  if (!price) return 'Price not set'

  // Format price with currency

  const mainImage =
    images.length > 0 && !imageError ? images[0].url : PLACEHOLDER_IMAGE

  // --- BADGE & PRICE LOGIC ---
  const isOutOfStock = stock !== null && stock === 0
  const isOnSale = stock !== null && stock > 5 && visibility === 'on-sale'
  const isLowStock = stock !== null && stock <= 5 && stock > 0
  const discountPercent = 10 // mock value
  const originalPrice = formatPrice(parseFloat(price.amount), price.currency)
  const discountedPrice = formatPrice(
    parseFloat(price.amount) * (1 - discountPercent / 100),
    price.currency
  )

  let badge = null
  if (isOutOfStock) {
    badge = <Badge variant="destructive">Out of stock</Badge>
  } else if (isLowStock) {
    badge = <Badge variant="warning">Only {stock} left</Badge>
  } else if (isOnSale) {
    badge = <Badge variant="success">-{discountPercent}%</Badge>
  }

  const handleEdit = () => {
    onEdit(event)
  }

  const handleDelete = () => {
    if (id && window.confirm('Are you sure you want to delete this product?')) {
      onDelete(id)
    }
  }

  return (
    <Card
      className={cn(
        'w-full max-w-sm overflow-hidden',
        isOutOfStock && 'grayscale'
      )}
    >
      <div className="relative">
        {/* floating indicators */}
        <div className="w-full absolute top-0 p-4 flex items-center justify-between">
          {/* left */}
          <div>{badge}</div>
          {/* right */}
        </div>

        {/* image */}
        <picture className={cn('bg-ink', 'aspect-video')}>
          <img
            src={mainImage}
            alt={title}
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        </picture>
      </div>
      <CardHeader className="flex gap-1 items-start justify-between">
        <CardTitle className={cn('line-clamp-2')}>{title}</CardTitle>

        {/* rating */}
        <div className="flex items-center gap-1">
          <Star
            className="size-4 text-transparent"
            fill="var(--color-primary-400)"
          />
          <p className="calm-voice font-bold">4.5</p>
        </div>
      </CardHeader>
      <CardContent className="relative pb-0">
        {/* pubkey */}
        {/* <p className="whisper-voice">{pubkey}</p> */}

        {/* summary #todo*/}
        {summary && false && (
          <CardDescription className="line-clamp-2">{summary}</CardDescription>
        )}

        {/* in Satoshis */}
        <div className="flex items-center gap-1">
          <p className={cn('firm-voice font-bold')}>{discountedPrice} SAT</p>
          {isOnSale && (
            <p className={cn('text-base-600 line-through notice-voice')}>
              {originalPrice}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0">
        <div className="flex flex-col">
          {/* in Dollars */}
          <p className="whisper-voice">{discountedPrice}</p>
          {storeName && (
            <p className="whisper-voice text-base-600">{storeName}</p>
          )}
        </div>
        <div className="flex">
          <Button size="sm" onClick={handleEdit}>
            <EditIcon className="w-4 h-4 mr-2" />
          </Button>
          <Button size="sm" onClick={handleDelete}>
            <DeleteIcon className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
