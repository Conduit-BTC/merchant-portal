import { getNdk } from '@/services/ndkService'
import { NDKKind, NDKEvent } from '@nostr-dev-kit/ndk'

export async function fetchReferencedEvent(
  id: string
): Promise<NDKEvent | null> {
  try {
    const ndk = await getNdk()
    const pubkey = (await ndk.signer!.user()).pubkey

    return await new Promise((resolve, _) => {
      const subscription = ndk.subscribe({
        kinds: [30406 as NDKKind],
        authors: [pubkey],
        '#d': [id],
        limit: 1
      })

      subscription.on('event', (event: NDKEvent) => {
        resolve(event)
        subscription.stop()
      })

      setTimeout(() => {
        resolve(null)
        subscription.stop()
      }, 5000)
    })
  } catch (error) {
    console.error('Failed to fetch referenced event:', error)
    return null
  }
}
