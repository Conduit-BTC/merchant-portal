import Field from '../../Form/Field'

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
      <Field
        label="Product Title"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      {/* Price */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field
          label="Price"
          name="price.amount"
          type="text"
          value={formData.price.amount}
          onChange={handleChange}
          placeholder="19.99"
          error={errors.price}
          required
        />

        <Field
          label="Currency"
          name="price.currency"
          type="dropdown"
          value={formData.price.currency}
          onChange={handleChange}
          options={['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'BTC', 'SAT']}
          required
        />

        <Field
          label="Frequency"
          name="price.frequency"
          type="text"
          value={formData.price.frequency}
          onChange={handleChange}
          placeholder="per month"
        />
      </div>

      {/* Summary */}
      <Field
        label="Summary"
        name="summary"
        type="text"
        value={formData.summary}
        onChange={handleChange}
        placeholder="Brief description of the product"
      />

      {/* Content */}
      <Field
        label="Product Description"
        name="content"
        type="textarea"
        value={formData.content}
        onChange={handleChange}
        placeholder="Detailed description of the product"
        rows={5}
      />

      {/* Stock */}
      <Field
        label="Stock"
        name="stock"
        type="text"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Available quantity"
        error={errors.stock}
      />
    </div>
  )
}

export default BasicTab
