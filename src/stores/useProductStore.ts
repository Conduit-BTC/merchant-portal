import { create } from 'zustand'
import { getNdk } from '@/services/ndkService'
import { NDKEvent, NDKTag } from '@nostr-dev-kit/ndk'
import { ProductListing, validateProductListing } from 'nostr-commerce-schema'

interface ProductState {
  products: Map<string, ProductListing & { eventId?: string }>
  isLoading: boolean
  error: string | null

  // Actions
  fetchProducts: () => Promise<void>
  createProduct: (product: Omit<ProductListing, 'created_at'>) => Promise<void>
  updateProduct: (id: string, product: Partial<ProductListing>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: new Map<string, ProductListing & { eventId?: string }>(),
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null })

    try {
      const ndk = await getNdk()

      // 🟡 Get authenticated pubkey
      const signerUser = await ndk.signer?.user()
      const pubkey = signerUser?.pubkey

      if (!pubkey) {
        throw new Error('Missing pubkey for authenticated user')
      }

      // 🟢 Subscribe to products authored by THIS user
      const subscription = ndk.subscribe({
        kinds: [30402],
        authors: [pubkey]
      })

      subscription.on('event', (event: NDKEvent) => {
        try {
          console.log('Received ProductListing event:', event)
          const rawEvent = event.rawEvent()
          const content = rawEvent.content
          const tags = rawEvent.tags
          // Find product ID tag
          const findTag = (key: string) => tags.find((tag) => tag[0] === key)
          const findAllTags = (key: string) =>
            tags.filter((tag) => tag[0] === key)

          const productId = findTag('d')?.[1]
          if (!productId) {
            console.warn("Skipping event: missing 'd' tag")
            return
          }

          const title = findTag('title')?.[1] || ''
          const summary = findTag('summary')?.[1] || ''
          const imageTag = findTag('image')
          const location = findTag('location')
          const tTags = findAllTags('t').map((tag) => tag.slice(0, 2))

          const rebuiltTags: NDKTag[] = [
            ['d', productId],
            ['title', title],
            ['price', '9.99', 'USD'],
            ['type', 'simple', 'physical'],
            ['visibility', 'on-sale'],
            ['stock', '10'],
            ['summary', summary]
            // other required tags first
          ]

          // Add optional tags at the end
          if (imageTag && imageTag.length >= 2) {
            const [_, url, alt = 'Product image'] = imageTag
            rebuiltTags.push(['image', url, alt])
          }

          if (location && location.length >= 5) {
            rebuiltTags.push(location)
          }

          rebuiltTags.push(...tTags)

          // Construct product object
          const product = {
            kind: 30402,
            created_at: rawEvent.created_at || Math.floor(Date.now() / 1000),
            content,
            tags: rebuiltTags
          }

          // 🧪 Validate with Zod
          const validated = validateProductListing(product)
          if (!validated.success) {
            console.error(
              '❌ Validation failed fetching:',
              JSON.stringify(validated.error, null, 2)
            )
            return
          }

          set((state) => ({
            products: new Map(state.products).set(productId, {
              ...validated.data,
              eventId: event.id || rawEvent.id
            })
          }))
        } catch (err) {
          console.error('Error processing event:', err)
        }
      })

      set({ isLoading: false })
    } catch (error) {
      console.error('Failed to fetch products:', error)
      set({ isLoading: false, error: 'Failed to fetch products' })
    }
  },

  createProduct: async (productData) => {
    set({ isLoading: true, error: null })

    try {
      const ndk = await getNdk()
      // Create NDK event
      const event = new NDKEvent(ndk)
      const timestamp = Math.floor(Date.now() / 1000)

      // Extract productId from 'd' tag
      const productId = productData.tags.find((tag) => tag[0] === 'd')?.[1]
      if (!productId) throw new Error("Missing 'd' tag (productId)")

      // ✅ Rebuild tags in the correct order
      const rebuiltTags: NDKTag[] = []

      rebuiltTags.push(['d', productId])

      const title = productData.tags.find((t) => t[0] === 'title')?.[1]
      if (title) rebuiltTags.push(['title', title])

      const priceTag = productData.tags.find((t) => t[0] === 'price')
      if (priceTag && priceTag.length >= 3) rebuiltTags.push(priceTag)

      const typeTag = productData.tags.find((t) => t[0] === 'type')
      if (typeTag && typeTag.length >= 3) rebuiltTags.push(typeTag)

      const visibilityTag = productData.tags.find((t) => t[0] === 'visibility')
      if (visibilityTag) rebuiltTags.push(visibilityTag)

      const stockTag = productData.tags.find((t) => t[0] === 'stock')
      if (stockTag) rebuiltTags.push(stockTag)

      const summary = productData.tags.find((t) => t[0] === 'summary')?.[1]
      if (summary) rebuiltTags.push(['summary', summary])
      const imageTag = productData.tags.find((t) => t[0] === 'image')
      if (imageTag && imageTag.length >= 2) {
        const url = imageTag[1]
        const alt = imageTag[2]
        const order = imageTag[3]
        const tag: NDKTag = ['image', url]
        if (alt) tag.push(alt)
        if (order) tag.push(order)
        rebuiltTags.push(tag.slice(0, 4)) // Enforce max 4 elements
      }

      const locationTag = productData.tags.find((t) => t[0] === 'location')
      if (locationTag && locationTag.length >= 2) {
        rebuiltTags.push(locationTag)
      }

      const tTags = productData.tags.filter((t) => t[0] === 't')
      rebuiltTags.push(...tTags)

      // ⛔ Do NOT include `custom` tag here — not part of schema

      // Construct final product
      const product = {
        ...productData,
        created_at: timestamp,
        tags: rebuiltTags
      }

      console.log('Creating product:', product)
      console.log('✅ Final rebuiltTags:', rebuiltTags) // ← so you can see what's being validated

      const validated = validateProductListing(product)
      if (!validated.success) {
        console.error('❌ Validation failed creating:', validated.error)
        set({ isLoading: false, error: 'Validation failed' })
        return
      }

      // Prepare and publish event
      event.kind = 30402
      event.content = product.content
      event.tags = rebuiltTags
      event.created_at = timestamp

      await event.sign()
      await event.publish()

      // Update local store
      set((state) => ({
        isLoading: false,
        products: new Map(state.products).set(productId, product)
      }))
    } catch (error) {
      console.error('Failed to create product:', error)
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to create product'
      })
    }
  },

  updateProduct: async (id, updatedData) => {
    set({ isLoading: true, error: null })

    try {
      const { products } = get()
      const existingProduct = products.get(id)

      if (!existingProduct) {
        throw new Error(`Product with ID ${id} not found`)
      }

      const timestamp = Math.floor(Date.now() / 1000)

      const allTags = updatedData.tags || existingProduct.tags
      if (!allTags) throw new Error('Missing tags')

      // Extract product ID from 'd' tag
      const productId = allTags.find((tag) => tag[0] === 'd')?.[1]
      if (!productId) throw new Error("Missing 'd' tag (productId)")

      // ✅ Rebuild tags cleanly — exclude any 'custom' tags
      const rebuiltTags: NDKTag[] = []

      rebuiltTags.push(['d', productId])

      const title = allTags.find((t) => t[0] === 'title')?.[1]
      if (title) rebuiltTags.push(['title', title])

      const priceTag = allTags.find((t) => t[0] === 'price')
      if (priceTag && priceTag.length >= 3) rebuiltTags.push(priceTag)

      const typeTag = allTags.find((t) => t[0] === 'type')
      if (typeTag && typeTag.length >= 3) rebuiltTags.push(typeTag)

      const visibilityTag = allTags.find((t) => t[0] === 'visibility')
      if (visibilityTag) rebuiltTags.push(visibilityTag)

      const stockTag = allTags.find((t) => t[0] === 'stock')
      if (stockTag) rebuiltTags.push(stockTag)

      const summary = allTags.find((t) => t[0] === 'summary')?.[1]
      if (summary) rebuiltTags.push(['summary', summary])

      const imageTag = allTags.find((t) => t[0] === 'image')
      if (imageTag) rebuiltTags.push(imageTag)

      const locationTag = allTags.find((t) => t[0] === 'location')
      if (locationTag) rebuiltTags.push(locationTag)

      const tTags = allTags.filter((t) => t[0] === 't')
      rebuiltTags.push(...tTags)

      // Do NOT include 'custom' tag — it breaks Zod schema
      // Create updated product
      const updatedProduct = {
        ...existingProduct,
        ...updatedData,
        created_at: timestamp,
        tags: rebuiltTags
      }

      console.log('Updating product:', updatedProduct)

      const validated = validateProductListing(updatedProduct)
      if (!validated.success) {
        console.error('❌ Validation failed:', validated.error)
        set({ isLoading: false, error: 'Validation failed' })
        return
      }
      // Create and publish event
      const ndk = await getNdk()
      const event = new NDKEvent(ndk)

      event.kind = 30402
      event.content = updatedProduct.content
      event.tags = rebuiltTags
      event.created_at = timestamp
      // Sign and publish
      await event.sign()
      await event.publish()

      set((state) => ({
        isLoading: false,
        products: new Map(state.products).set(id, updatedProduct)
      }))
    } catch (error) {
      console.error('Failed to update product:', error)
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to update product'
      })
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const { products } = get()
      const existingProduct = products.get(id)

      if (!existingProduct) {
        throw new Error(`Product with ID ${id} not found`)
      }

      if (!existingProduct.eventId) {
        throw new Error('Missing event ID for product')
      }

      const ndk = await getNdk()
      const event = new NDKEvent(ndk)

      event.kind = 5 // NIP-09 deletion event
      event.content = ''
      event.tags = [
        ['e', existingProduct.eventId],
        ['k', '30402']
      ]
      event.created_at = Math.floor(Date.now() / 1000)

      // Sign and publish
      await event.sign()
      await event.publish()

      // Update local store
      set((state) => {
        const newProducts = new Map(state.products)
        newProducts.delete(id)
        return {
          isLoading: false,
          products: newProducts
        }
      })
    } catch (error) {
      console.error('Failed to delete product:', error)
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to delete product'
      })
    }
  }
}))
