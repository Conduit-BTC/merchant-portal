import Field from '../../Form/Field'
import Repeater from '../../Form/Repeater'

const DetailsTab = ({
  formData,
  setFormData,
  handleChange
}: {
  formData: any
  setFormData: any
  handleChange: any
}) => {
  const addSpec = () => {
    setFormData((prev: any) => ({
      ...prev,
      specs: [...prev.specs, { key: '', value: '' }]
    }))
  }

  const updateSpec = (index: number, field: 'key' | 'value', value: string) => {
    setFormData((prev: any) => {
      const newSpecs = [...prev.specs]
      newSpecs[index] = { ...newSpecs[index], [field]: value }
      return { ...prev, specs: newSpecs }
    })
  }

  const removeSpec = (index: number) => {
    setFormData((prev: any) => {
      const newSpecs = [...prev.specs]
      newSpecs.splice(index, 1)
      return { ...prev, specs: newSpecs }
    })
  }

  const addCategory = (category: string) => {
    if (category && !formData.categories.includes(category)) {
      setFormData((prev: any) => ({
        ...prev,
        categories: [...prev.categories, category]
      }))
    }
  }

  const removeCategory = (category: string) => {
    setFormData((prev: any) => ({
      ...prev,
      categories: prev.categories.filter((c: string) => c !== category)
    }))
  }

  const categoryOptions = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Toys',
    'Beauty',
    'Automotive',
    'Health',
    'Food & Beverages',
    'Art & Crafts',
    'Music',
    'Gaming',
    'Office Supplies',
    'Pet Supplies'
  ]

  return (
    <div className="space-y-6">
      {/* Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Product Type"
          name="type.type"
          type="dropdown"
          value={formData.type.type}
          onChange={handleChange}
          options={[
            { label: 'Simple', value: 'simple' },
            { label: 'Variable', value: 'variable' },
            { label: 'Variation', value: 'variation' }
          ]}
        />

        <Field
          label="Physical Type"
          name="type.physicalType"
          type="dropdown"
          value={formData.type.physicalType}
          onChange={handleChange}
          options={[
            { label: 'Physical', value: 'physical' },
            { label: 'Digital', value: 'digital' }
          ]}
        />
      </div>

      {/* Visibility */}
      <Field
        label="Visibility"
        name="visibility"
        type="dropdown"
        value={formData.visibility}
        onChange={handleChange}
        options={[
          { label: 'On Sale', value: 'on-sale' },
          { label: 'Hidden', value: 'hidden' },
          { label: 'Pre-Order', value: 'pre-order' }
        ]}
      />

      {/* Specifications */}
      <Repeater
        title="Specifications"
        items={formData.specs}
        onAdd={addSpec}
        onRemove={removeSpec}
        addButtonText="Add Spec"
        emptyMessage="No specifications added yet."
        renderItem={(spec: any, index: number) => (
          <div className="flex space-x-2 pr-8">
            <Field
              name={`spec-key-${index}`}
              type="text"
              value={spec.key}
              onChange={(e) =>
                updateSpec(index, 'key', (e.target as HTMLInputElement).value)
              }
              placeholder="Name"
              className="flex-1"
            />
            <Field
              name={`spec-value-${index}`}
              type="text"
              value={spec.value}
              onChange={(e) =>
                updateSpec(index, 'value', (e.target as HTMLInputElement).value)
              }
              placeholder="Value"
              className="flex-1"
            />
          </div>
        )}
      />

      {/* Weight & Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="voice-sm font-bold">Weight</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <Field
              name="weight.value"
              type="text"
              value={formData.weight.value}
              onChange={handleChange}
              placeholder="Weight"
              className="flex-1 min-w-0 block"
              inputWrapperClassName="rounded-none rounded-l-md rounded-r-none"
            />
            <Field
              name="weight.unit"
              type="dropdown"
              value={formData.weight.unit}
              onChange={handleChange}
              options={['kg', 'g', 'lb', 'oz']}
              className="text-sm"
              inputWrapperClassName="rounded-none rounded-r-md"
            />
          </div>
        </div>

        <div>
          <label className="voice-sm font-bold">Dimensions (LxWxH)</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <Field
              name="dimensions.dimensions"
              type="text"
              value={formData.dimensions.dimensions}
              onChange={handleChange}
              placeholder="10x5x2"
              className="flex-1 min-w-0 block "
              inputWrapperClassName="rounded-none rounded-l-md"
            />
            <Field
              name="dimensions.unit"
              type="dropdown"
              value={formData.dimensions.unit}
              onChange={handleChange}
              options={['cm', 'mm', 'in']}
              inputWrapperClassName="rounded-none rounded-r-md"
            />
          </div>
        </div>

        {/* Categories */}
        <Field
          label="Categories"
          name="categories"
          type="tags"
          value={formData.categories}
          onChange={handleChange}
          onAddTag={addCategory}
          onRemoveTag={removeCategory}
          allowNewTags={true}
          options={categoryOptions}
          placeholder="Type to search or add new categories"
          help="Choose categories or create new ones for your product"
        />
      </div>
    </div>
  )
}

export default DetailsTab
