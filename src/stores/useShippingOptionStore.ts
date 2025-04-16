import { getNdk } from "@/services/ndkService";
import { NDKEvent, NDKKind, NDKTag } from "@nostr-dev-kit/ndk";
import { ProductListing, ShippingOption, validateShippingOption } from "nostr-commerce-schema";
import { create } from "zustand";

interface ShippingOptionState {
    shippingOptions: Map<string, ShippingOption & { eventId?: string }>;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchShippingOptions: () => Promise<void>;
    createShippingOption: (shippingOption: Omit<ShippingOption, 'created_at'>) => Promise<void>;
    updateShippingOption: (id: string, shippingOption: Partial<ShippingOption>) => Promise<void>;
    deleteShippingOption: (id: string) => Promise<void>;
}

export const useShippingOptionStore = create<ShippingOptionState>((set, get) => ({
    shippingOptions: new Map<string, ShippingOption & { eventId?: string }>(),
    isLoading: false,
    error: null,

    fetchShippingOptions: async () => {
        set({ isLoading: true, error: null });
        try {
            const ndk = await getNdk();
            const subscription = ndk.subscribe({ kinds: [30406 as NDKKind], authors: [(await ndk.signer!.user()).pubkey] });

            subscription.on("event", (event: NDKEvent) => {
                try {
                    console.log("Received ShippingOption event:", event);
                    const rawEvent = event.rawEvent();

                    // Parse the event content and tags
                    const eventId = event.id || rawEvent.id;
                    const content = rawEvent.content;
                    const tags = rawEvent.tags;

                    const idTag = tags.find(tag => tag[0] === 'd');
                    if (!idTag || !idTag[1]) return;

                    const shippingOptionId = idTag[1];

                    const shippingOption = {
                        id: eventId,
                        kind: 30406,
                        created_at: rawEvent.created_at || Math.floor(Date.now() / 1000),
                        content,
                        tags
                    };

                    // Validate with zod schema
                    try {
                        const validatedShippingOptionZodObj = validateShippingOption(shippingOption);
                        if (!validatedShippingOptionZodObj.success) throw new Error("Invalid ShippingOption data from fetched Event: " + JSON.stringify(validatedShippingOptionZodObj.error));

                        // Add to store
                        set(state => ({
                            shippingOptions: new Map(state.shippingOptions).set(shippingOptionId, { ...validatedShippingOptionZodObj.data, eventId })
                        }));
                    } catch (validationError) {
                        console.error("Invalid ShippingOption data:", validationError);
                    }
                } catch (err) {
                    console.error("Error processing event:", err);
                }
            });

            set({ isLoading: false });
        } catch (error) {
            console.error("Failed to fetch ShippingOptions:", error);
            set({ isLoading: false, error: "Failed to fetch ShippingOptions" });
        }
    },

    createShippingOption: async (shippingOptionData) => {
        set({ isLoading: true, error: null });
        try {
            const ndk = await getNdk();

            // Create NDK event
            const event = new NDKEvent(ndk);
            const timestamp = Math.floor(Date.now() / 1000);

            // Construct shippingOption with current timestamp
            const shippingOption = {
                ...shippingOptionData,
                created_at: timestamp
            };

            console.log("Creating shippingOption:", shippingOption);

            // Validate with schema
            const validatedShippingOptionZodObj = validateShippingOption(shippingOption);
            if (!validatedShippingOptionZodObj.success) throw new Error("Issue creating shippingOption: " + JSON.stringify(validatedShippingOptionZodObj.error));

            // Set event data
            event.kind = 30406;
            event.content = shippingOption.content;
            event.tags = shippingOption.tags as NDKTag[];
            event.created_at = timestamp;

            // Sign and publish event
            await event.sign();
            await event.publish();

            // Find shippingOption ID from tags
            const idTag = shippingOption.tags.find(tag => tag[0] === 'd');
            if (!idTag || !idTag[1]) throw new Error("shippingOption ID missing");

            const shippingOptionId = idTag[1];

            // Update local store
            set(state => ({
                isLoading: false,
                shippingOptions: new Map(state.shippingOptions).set(shippingOptionId, shippingOption)
            }));
        } catch (error) {
            console.error("Failed to create shippingOption:", error);
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : "Failed to create shippingOption"
            });
        }
    },

    updateShippingOption: async (id, updatedData) => {
        set({ isLoading: true, error: null });
        try {
            const { shippingOptions } = get();
            const existingShippingOption = shippingOptions.get(id);

            if (!existingShippingOption) {
                throw new Error(`ShippingOption with ID ${id} not found`);
            }

            // Create updated ShippingOption
            const updatedShippingOption = {
                ...existingShippingOption,
                ...updatedData,
                created_at: Math.floor(Date.now() / 1000)
            };

            // Validate with schema
            const validatedShippingOptionZodObj = validateShippingOption(updatedShippingOption);
            if (!validatedShippingOptionZodObj.success) throw new Error("Issue updating ShippingOption: " + JSON.stringify(validatedShippingOptionZodObj.error));

            // Create and publish event
            const ndk = await getNdk();
            const event = new NDKEvent(ndk);

            event.kind = 30406;
            event.content = updatedShippingOption.content;
            event.tags = updatedShippingOption.tags as NDKTag[];
            event.created_at = updatedShippingOption.created_at;

            // Sign and publish
            await event.sign();
            await event.publish();

            // Update local store
            set(state => ({
                isLoading: false,
                shippingOptions: new Map(state.shippingOptions).set(id, updatedShippingOption)
            }));
        } catch (error) {
            console.error("Failed to update ShippingOption:", error);
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : "Failed to update ShippingOption"
            });
        }
    },

    deleteShippingOption: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const { shippingOptions } = get();
            const existingShippingOption = shippingOptions.get(id);

            if (!existingShippingOption) {
                throw new Error(`ShippingOption with ID ${id} not found`);
            }

            // Create deletion event
            const ndk = await getNdk();
            const event = new NDKEvent(ndk);

            const eventId = existingShippingOption.eventId!;
            event.kind = 5; // Deletion event kind
            event.content = '';
            event.tags = [
                ['e', eventId], // Event to delete
                ['k', '30406'] // Kind to delete
            ];

            // Sign and publish
            await event.sign();
            await event.publish();

            // Update local store
            set(state => {
                const newShippingOptions = new Map(state.shippingOptions);
                newShippingOptions.delete(id);
                return {
                    isLoading: false,
                    shippingOptions: newShippingOptions
                };
            });
        } catch (error) {
            console.error("Failed to delete ShippingOption:", error);
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : "Failed to delete ShippingOption"
            });
        }
    }
}))