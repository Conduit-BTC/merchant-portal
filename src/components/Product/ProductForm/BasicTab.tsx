const BasicTab = ({
  formData,
  handleChange,
  errors
}: {
  formData: any
  handleChange: any
  errors: any
}) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="attention-voice">
          Product Title*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`rounded-lg shadow-md hover:border-accent-500 transition-colors duration-300 bg-muted/60 border border-ink border-dashed input w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pl-10 ${
            errors.title ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Price */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="price.amount" className="attention-voice">
            Price*
          </label>
          <input
            type="text"
            id="price.amount"
            name="price.amount"
            value={formData.price.amount}
            onChange={handleChange}
            placeholder="19.99"
            className={`rounded-lg shadow-md hover:border-accent-500 transition-colors duration-300 bg-muted/60 border border-ink border-dashed input w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pl-10 ${
              errors.title ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="price.currency" className=" attention-voice">
            Currency*
          </label>
          <select
            id="price.currency"
            name="price.currency"
            value={formData.price.currency}
            onChange={handleChange}
            className={`rounded-lg shadow-md hover:border-accent-500 transition-colors duration-300 bg-muted/60 border border-ink border-dashed input w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pl-10
                        }`}
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
          <label htmlFor="price.frequency" className="attention-voice">
            Frequency
          </label>
          <input
            type="text"
            id="price.frequency"
            name="price.frequency"
            value={formData.price.frequency}
            onChange={handleChange}
            placeholder="per month"
            className={`rounded-lg shadow-md hover:border-accent-500 transition-colors duration-300 bg-muted/60 border border-ink border-dashed input w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pl-10
                        }`}
          />
        </div>
      </div>

      {/* Summary */}
      <div>
        <label htmlFor="summary" className="attention-voice">
          Summary
        </label>
        <input
          type="text"
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Brief description of the product"
          className={`rounded-lg shadow-md hover:border-accent-500 transition-colors duration-300 bg-muted/60 border border-ink border-dashed input w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pl-10
                        }`}
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="attention-voice">
          Product Description
        </label>
        <textarea
          id="content"
          name="content"
          rows={5}
          value={formData.content}
          onChange={handleChange}
          placeholder="Detailed description of the product"
          className={`rounded-lg shadow-md hover:border-accent-500 transition-colors duration-300 bg-muted/60 border border-ink border-dashed input w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pl-10
                        }`}
        />
      </div>

      {/* Stock */}
      <div>
        <label htmlFor="stock" className="attention-voice">
          Stock
        </label>
        <input
          type="text"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Available quantity"
          className={`rounded-lg shadow-md hover:border-accent-500 transition-colors duration-300 bg-muted/60 border border-ink border-dashed input w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pl-10
                        }`}
        />
        {errors.stock && (
          <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
        )}
      </div>
    </div>
  )
}

export default BasicTab
