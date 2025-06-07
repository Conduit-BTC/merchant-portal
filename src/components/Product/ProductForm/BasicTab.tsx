const BasicTab = ({ formData, handleChange, errors }: { formData: any, handleChange: any, errors: any }) => {
    return (
        <div className="space-y-6">
            {/* Title */}
            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                >
                    Product Title*
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.title ? "border-red-500" : ""
                        }`}
                    required
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.title}
                    </p>
                )}
            </div>

            {/* Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label
                        htmlFor="price.amount"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Price*
                    </label>
                    <input
                        type="text"
                        id="price.amount"
                        name="price.amount"
                        value={formData.price.amount}
                        onChange={handleChange}
                        placeholder="19.99"
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.price ? "border-red-500" : ""
                            }`}
                        required
                    />
                    {errors.price && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.price}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="price.currency"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Currency*
                    </label>
                    <select
                        id="price.currency"
                        name="price.currency"
                        value={formData.price.currency}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="CAD">CAD</option>
                        <option value="AUD">AUD</option>
                        <option value="BTC">BTC</option>
                        <option value="SAT">SAT</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="price.frequency"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Frequency (optional)
                    </label>
                    <input
                        type="text"
                        id="price.frequency"
                        name="price.frequency"
                        value={formData.price.frequency}
                        onChange={handleChange}
                        placeholder="per month"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Summary */}
            <div>
                <label
                    htmlFor="summary"
                    className="block text-sm font-medium text-gray-700"
                >
                    Summary
                </label>
                <input
                    type="text"
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    placeholder="Brief description of the product"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            {/* Content */}
            <div>
                <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                >
                    Product Description
                </label>
                <textarea
                    id="content"
                    name="content"
                    rows={5}
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Detailed description of the product"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            {/* Stock */}
            <div>
                <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700"
                >
                    Stock
                </label>
                <input
                    type="text"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Available quantity"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.stock ? "border-red-500" : ""
                        }`}
                />
                {errors.stock && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.stock}
                    </p>
                )}
            </div>
        </div>
    )
}

export default BasicTab;