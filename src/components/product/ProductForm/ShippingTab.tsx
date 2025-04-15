import ShippingOptionItem from "@/layouts/store/shipping/ShippingOptionItem";
import { useShippingOptionStore } from "@/stores/useShippingOptionStore";
import { ShippingOption } from "nostr-commerce-schema";
import { useEffect, useState } from "preact/hooks";

const ShippingTab = ({ formData, setFormData }: { formData: any, setFormData: any }) => {
    const { shippingOptions, isLoading, error, fetchShippingOptions } = useShippingOptionStore();
    const [selectedOptions, setSelectedOptions] = useState([])

    useEffect(() => {
        fetchShippingOptions()
    }, [])

    const addOption = (option: any) => {
        setFormData((prev: any) => ({
            ...prev,
            shippingOptions: [...prev.shippingOptions, option],
        }));
    };

    const removeOption = (option: any) => {
        setFormData((prev: any) => {
            return prev.reduce((e: any) => e.reference !== option.reference)
        });
    };

    return (
        <div className="space-y-6">
            <h3>Available Options</h3>
            <div className="" data-selected="false">
                {[...shippingOptions.values()].map((event) => (
                    <ShippingOptionItem
                        event={event}
                        onEdit={(e: ShippingOption) => { console.log(JSON.stringify(e)) }}
                    />
                ))}
            </div>
        </div>
    )
}

export default ShippingTab;