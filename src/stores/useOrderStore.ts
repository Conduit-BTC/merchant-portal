import { create } from 'zustand';
import { getNdk } from '@/services/ndkService';
import { Order, validateOrder } from 'nostr-commerce-schema';
import { NDKEvent, NDKFilter, NDKKind, NDKUser } from '@nostr-dev-kit/ndk';
import { useAccountStore } from './useAccountStore';

interface OrderStoreState {
    allOrders: Set<Order>;
    isLoading: boolean;
    error: string | null;

    fetchOrders: () => {};
}

export const useOrderStore = create<OrderStoreState>((set, get) => ({
    allOrders: new Set<Order>(),
    isLoading: false,
    error: null,

    fetchOrders: async () => {
        set({ isLoading: true, error: null });
        try {
            const ndk = await getNdk();
            const filter: NDKFilter = {
                kinds: [1059 as NDKKind],
                '#p': [useAccountStore.getState().user!.pubkey] // TODO: Unsafe. Make it safer.
            }
            const subscription = ndk.subscribe(filter);

            subscription.on("event", async (event: NDKEvent) => {
                console.log("Received NIP-17 DM:", event);

                // NIP-17 Decryption + Validation
                const seal: string = await ndk.signer!.decrypt(new NDKUser({ pubkey: event.pubkey }), event.content)
                const sealJson = JSON.parse(seal)
                const rumor: string = await ndk.signer!.decrypt(new NDKUser({ pubkey: sealJson.pubkey }), sealJson.content)
                const rumorJson: NDKEvent = JSON.parse(rumor)

                // TODO: Check rumorJson's kind and tags to determine which kind of event it is, then handle accordingly

                const order = validateOrder(rumorJson)

                if (order.success) set(state => ({
                    allOrders: new Set(state.allOrders).add(order.data)
                }));
            })
        }
        catch (err) { }
    }
}))