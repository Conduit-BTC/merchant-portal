import { useShippingOptionStore } from "@/stores/useShippingOptionStore";
import { ShippingOption, ShippingOptionUtils as SOU } from "nostr-commerce-schema";
import { useEffect } from "preact/hooks";
import { Link } from "wouter";

const ShippingOptionsLayout: React.FC = () => {
    const { shippingOptions, isLoading, error, fetchShippingOptions, createShippingOption } = useShippingOptionStore();

    const handleCreateSampleClick = async () => {
        const data: ShippingOption = {
            kind: 30406,
            content: "Calculated Shipping - USA",
            tags: [
                ["d", "calculated-us-shipping"],
                ["title", "Calculated Shipping - USA"],
                ["price", "0", "USD"],
                ["country", "US"],
                ["service", "standard"]
            ],
            created_at: Math.floor(Date.now() / 1000),
        };
        await createShippingOption(data);
    }

    useEffect(() => {
        fetchShippingOptions()
    }, [])

    return (
        <div className="mx-auto px-4 py-8">
            <Link
                href={'/store/shipping/create'}
                className="inline-flex items-center px-4 py-2 mb-2 border border-transparent text-sm font-medium rounded-md shadow-sm  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <svg
                    className="mr-2 -ml-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
                Create Shipping Option
            </Link>
            <button
                onClick={handleCreateSampleClick}
                className="inline-flex items-center px-4 py-2 mb-2 border border-transparent text-sm font-medium rounded-md shadow-sm  bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <svg
                    className="mr-2 -ml-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
                Create SAMPLE Shipping Option
            </button>

            {isLoading && (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500">
                    </div>
                    <span className="ml-3 text-lg text-gray-700">
                        Loading shipping options...
                    </span>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-red-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">
                                {error}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {!isLoading && shippingOptions.size === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                        No shipping options have been created
                    </h3>
                </div>
            )}

            <div className="">
                {[...shippingOptions.values()].map((event) => (
                    <ShippingOptionItem
                        event={event}
                        onEdit={(e: ShippingOption) => { console.log(JSON.stringify(e)) }}
                    />
                ))}
            </div>
        </div>
    )
};

const ShippingOptionItem = ({ event, onEdit }: { event: ShippingOption, onEdit: (e: ShippingOption) => void }) => {
    return (
        <div className='w-full p-4 rounded-md border-2 flex justify-between'>
            <div>
                <h2>{SOU.getShippingOptionTitle(event)}</h2>
                <h4>Base Price: {SOU.getShippingOptionPriceAmount(event)} {SOU.getShippingOptionPriceCurrency(event)}</h4>
                <h4>Countries: {SOU.getShippingOptionCountries(event)}</h4>
            </div>
            <button onClick={() => onEdit(event)}>EDIT</button>
        </div>
    )
}

export default ShippingOptionsLayout;
