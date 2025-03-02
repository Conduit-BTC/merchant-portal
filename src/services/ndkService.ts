import { DEFAULT_RELAYS } from "@/utils/constants";
import NDK, { NDKNip07Signer } from "@nostr-dev-kit/ndk";

export class NDKService {
    private static instance: NDKService | null = null;
    private ndk: NDK | null = null;

    private constructor() {
        // Private constructor to prevent direct construction calls with 'new'
    }

    public static getInstance(): NDKService {
        if (!NDKService.instance) NDKService.instance = new NDKService();
        return NDKService.instance;
    }

    public initialize(relayPool: string[]): Promise<NDK> {
        if (this.ndk) return Promise.resolve(this.ndk);

        this.ndk = new NDK({
            explicitRelayUrls: relayPool,
            signer: new NDKNip07Signer(),
        });

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Connection timeout'));
            }, 10000);

            const checkConnection = () => {
                const stats = this.ndk!.pool.stats();
                if (stats.connected > 0) {
                    clearTimeout(timeout);
                    resolve(this.ndk!);
                } else if (stats.disconnected === stats.total) {
                    clearTimeout(timeout);
                    reject(new Error('All relays disconnected'));
                }
            };

            this.ndk!.pool.on('relay:connect', (a) => {
                console.log(`[NDK] Connected to relay: ${a.url}`);
                checkConnection();
            });

            this.ndk!.pool.on('relay:disconnect', (relay) => {
                console.log(`[NDK] Disconnected from relay: ${relay.url}`);
            });

            this.ndk!.connect().catch(reject);
        });
    }

    // Method to reset the instance (mainly for testing purposes)
    public static reset(): void {
        NDKService.instance = null;
    }
}

export async function getNdk(relayPool: string[] = DEFAULT_RELAYS): Promise<NDK> {
    const service = NDKService.getInstance();
    return await service.initialize(relayPool);
}
