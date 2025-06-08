import React, { useEffect, useState } from "react";
import { X } from 'lucide-react'
import { ProductListing, ProductListingUtils, ShippingOption } from "nostr-commerce-schema";
import { useAccountStore } from "@/stores/useAccountStore";
import DetailsTab from "./DetailsTab";
import BasicTab from "./BasicTab";
import ImagesTab from "./ImagesTab";
import FormActions from "./FormActions";
import TabNavigation from "./TabNavigation";
import ShippingTab from "./ShippingTab";
import Button from "@/components/Buttons/Button"

interface ProductFormProps {
    event?: ProductListing;
    onSubmit: (tags: string[][], content: string) => Promise<void>;
    onCancel: () => void;
}

export interface FormState {
    id: string;
    title: string;
    price: {
        amount: string;
        currency: string;
        frequency: string;
    };
    summary: string;
    content: string;
    stock: string;
    type: {
        type: "simple" | "variable" | "variation";
        physicalType: "digital" | "physical";
    };
    visibility: "hidden" | "on-sale" | "pre-order";
    images: Array<{
        url: string;
        dimensions?: string;
        order?: number;
    }>;
    specs: Array<{
        key: string;
        value: string;
    }>;
    weight: {
        value: string;
        unit: string;
    };
    dimensions: {
        dimensions: string;
        unit: string;
    };
    categories: string[];
    shippingOptions: {
        reference: string,
        extraCost?: string
    }[]
}

const initialState: FormState = {
    id: "",
    title: "",
    price: {
        amount: "",
        currency: "USD",
        frequency: "",
    },
    summary: "",
    content: "",
    stock: "",
    type: {
        type: "simple",
        physicalType: "physical",
    },
    visibility: "on-sale",
    images: [],
    specs: [],
    weight: {
        value: "",
        unit: "kg",
    },
    dimensions: {
        dimensions: "",
        unit: "cm",
    },
    categories: [],
    shippingOptions: []
};

const ProductForm: React.FC<ProductFormProps> = (
    { event, onSubmit, onCancel },
) => {
    const { user } = useAccountStore();
    if (!user) throw new Error("[ProductForm]: Not logged in!");

    const [formData, setFormData] = useState<FormState>({
        ...initialState,
        id: ProductListingUtils.generateProductId(),
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentTab, setCurrentTab] = useState("basic");

    // If an event is provided, populate form with its data
    useEffect(() => {
        if (event) {
            const id = ProductListingUtils.getProductId(event) ||
                ProductListingUtils.generateProductId();

            const title = ProductListingUtils.getProductTitle(event) || "";
            const price = ProductListingUtils.getProductPrice(event) ||
                { amount: "--", currency: "USD" };
            const summary = ProductListingUtils.getProductSummary(event) || "";
            const content = event.content || "";
            const stock =
                ProductListingUtils.getProductStock(event)?.toString() || "";
            const type = ProductListingUtils.getProductType(event) ||
                { type: "simple", physicalType: "physical" };
            const visibility =
                ProductListingUtils.getProductVisibility(event) || "on-sale";
            const images = ProductListingUtils.getProductImages(event) || [];
            const weight = ProductListingUtils.getProductWeight(event) ||
                { value: "", unit: "kg" };
            const dimensions =
                ProductListingUtils.getProductDimensions(event) ||
                { dimensions: "", unit: "cm" };
            const categories =
                ProductListingUtils.getProductCategories(event) || [];
            const shippingOptions =
                ProductListingUtils.getProductShippingOptions(event) || [];

            console.log("Shipping Options: ", event)

            // Convert specs object to array of {key, value} objects
            const specsObj = ProductListingUtils.getProductSpecs(event);
            const specs = Object.entries(specsObj).map(([key, value]) => ({
                key,
                value,
            }));

            setFormData({
                id,
                title,
                price: {
                    amount: price.amount || "",
                    currency: price.currency || "USD",
                    frequency: price.frequency || "",
                },
                summary,
                content,
                stock,
                type: {
                    type: type.type || "simple",
                    physicalType: type.physicalType || "physical",
                },
                visibility,
                images,
                specs: specs.length ? specs : [],
                weight,
                dimensions,
                categories,
                shippingOptions
            });
        }
    }, [event]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Validate required fields
        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!formData.price.amount.trim()) {
            newErrors.price = "Price is required";
        } else if (!/^\d+(\.\d{1,2})?$/.test(formData.price.amount)) {
            newErrors.price = "Price must be a valid number (e.g., 19.99)";
        }

        if (!formData.price.currency.trim()) {
            newErrors.currency = "Currency is required";
        }

        // Validate stock if provided
        if (formData.stock && !/^\d+$/.test(formData.stock)) {
            newErrors.stock = "Stock must be a whole number";
        }

        // Validate image URLs if provided
        formData.images.forEach((image, index) => {
            try {
                new URL(image.url);
            } catch (e) {
                newErrors[`image-${index}`] = "Invalid URL";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Convert form data to tags format
            const tags = ProductListingUtils.createProductTags({
                id: formData.id,
                title: formData.title,
                price: {
                    amount: formData.price.amount,
                    currency: formData.price.currency,
                    frequency: formData.price.frequency || undefined,
                },
                summary: formData.summary || undefined,
                stock: formData.stock
                    ? parseInt(formData.stock, 10)
                    : undefined,
                type: {
                    type: formData.type.type,
                    physicalType: formData.type.physicalType,
                },
                visibility: formData.visibility,
                images: formData.images.length ? formData.images : undefined,
                specs: formData.specs.length
                    ? formData.specs.reduce((acc, spec) => {
                        if (spec.key && spec.value) {
                            acc[spec.key] = spec.value;
                        }
                        return acc;
                    }, {} as Record<string, string>)
                    : undefined,
                weight: formData.weight.value
                    ? {
                        value: formData.weight.value,
                        unit: formData.weight.unit,
                    }
                    : undefined,
                dimensions: formData.dimensions.dimensions
                    ? {
                        dimensions: formData.dimensions.dimensions,
                        unit: formData.dimensions.unit,
                    }
                    : undefined,
                categories: formData.categories.length
                    ? formData.categories
                    : undefined,
                shippingOptions: formData.shippingOptions.length
                    ? formData.shippingOptions
                    : undefined
            });

            await onSubmit(tags, formData.content);
        } catch (error) {
            console.error("Error submitting product:", error);
            setErrors({ submit: "Failed to submit product" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof FormState],
                    [child]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    return (
        <div className="form-modal rounded-lg p-6 max-w-4xl mx-auto">
            <div className="absolute top-[-40px] right-10 z-[-1] pb-2 bg-accent rounded-t-full from-primary-800 to-accent/80 bg-gradient-to-t">
          <Button variant="ghost" size="icon">
            <X />
          </Button>
        </div>
            <h2 className="attention-voice">
                {event ? "Edit Product" : "Create New Product"}
            </h2>

            <p className="solid-voice">
                {formData.id}
            </p>

            <TabNavigation currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <form onSubmit={handleSubmit}>
                {currentTab === "basic" && <BasicTab formData={formData} handleChange={handleChange} errors={errors} />}
                {currentTab === "shipping" && <ShippingTab formData={formData} setFormData={setFormData} />}
                {currentTab === "details" && <DetailsTab formData={formData} setFormData={setFormData} handleChange={handleChange} />}
                {currentTab === "images" && <ImagesTab formData={formData} setFormData={setFormData} errors={errors} />}

                {/* Error message */}
                {errors.submit && (
                    <div className="mt-4 text-sm text-red-600">
                        {errors.submit}
                    </div>
                )}

                {/* Form actions */}
                <FormActions onCancel={onCancel} isSubmitting={isSubmitting} />
            </form>
        </div>
    );
};

export default ProductForm;
