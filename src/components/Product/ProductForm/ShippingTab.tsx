import ShippingOptionItem from "@/layouts/store/shipping/ShippingOptionItem";
import { useShippingOptionStore } from "@/stores/useShippingOptionStore";
import { ShippingOption, ShippingOptionUtils as SOU, validateShippingOption } from "nostr-commerce-schema";
import { useEffect } from "preact/hooks";
import { FormState } from ".";
import { useAccountStore } from "@/stores/useAccountStore";
// import { fetchReferencedEvent } from "@/utils/shippingUtils";
// import { NDKEvent } from "@nostr-dev-kit/ndk";

const ShippingTab = ({ formData, setFormData }: { formData: FormState, setFormData: any }) => {
    const { shippingOptions, fetchShippingOptions } = useShippingOptionStore();
    const { user } = useAccountStore();

    useEffect(() => {
        fetchShippingOptions();
    }, []);

    useEffect(() => {
        console.log(formData)
    }, [formData]);

    const addOption = (ref: string) => {
        const alreadyExists = formData.shippingOptions.some(
            (o: any) => o.reference === ref
        );
        if (!alreadyExists) {
            setFormData((prev: any) => ({
                ...prev,
                shippingOptions: [...prev.shippingOptions, { reference: ref }],
            }));
        }
    };

    const removeOption = (ref: string) => {
        setFormData((prev: any) => ({
            ...prev,
            shippingOptions: prev.shippingOptions.filter((o: any) => o.reference !== ref),
        }));
    };

    const isOptionSelected = (ref: string) => {
        return formData.shippingOptions.some((o: any) => o.reference === ref);
    };

    return (
        <div className="space-y-6">
            <h3>Available Options</h3>
            {[...shippingOptions.values()].map((event) => {
                const ref = `30406:${user!.pubkey}:${SOU.getShippingOptionId(event)}`
                const isSelected = isOptionSelected(ref);

                return (
                    <div
                        id={SOU.getShippingOptionId(event)!}
                        className={`cursor-pointer ${isSelected ? 'bg-green-500/50' : ''}`}
                        onClick={() => {
                            isSelected ? removeOption(ref) : addOption(ref);
                        }}
                    >
                        <ShippingOptionItem
                            event={event}
                            onEdit={(e: ShippingOption) => {
                                console.log(JSON.stringify(e));
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ShippingTab;
