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

  return (
    <div className="space-y-6">
      {/* Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="type.type"
            className="block text-sm font-medium text-gray-700"
          >
            Product Type
          </label>
          <select
            id="type.type"
            name="type.type"
            value={formData.type.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="simple">Simple</option>
            <option value="variable">Variable</option>
            <option value="variation">Variation</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="type.physicalType"
            className="block text-sm font-medium text-gray-700"
          >
            Physical Type
          </label>
          <select
            id="type.physicalType"
            name="type.physicalType"
            value={formData.type.physicalType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="physical">Physical</option>
            <option value="digital">Digital</option>
          </select>
        </div>
      </div>

      {/* Visibility */}
      <div>
        <label
          htmlFor="visibility"
          className="block text-sm font-medium text-gray-700"
        >
          Visibility
        </label>
        <select
          id="visibility"
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="on-sale">On Sale</option>
          <option value="hidden">Hidden</option>
          <option value="pre-order">Pre-Order</option>
        </select>
      </div>

      {/* Specifications */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Specifications
          </label>
          <button
            type="button"
            onClick={addSpec}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Spec
          </button>
        </div>

        {formData.specs.length === 0 && (
          <p className="text-sm text-gray-500">No specifications added.</p>
        )}

        {formData.specs.map((spec: any, index: number) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              value={spec.key}
              onChange={(e) => updateSpec(index, 'key', e.target.value)}
              placeholder="Name"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={spec.value}
              onChange={(e) => updateSpec(index, 'value', e.target.value)}
              placeholder="Value"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => removeSpec(index)}
              className="inline-flex items-center p-1 border border-transparent rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Weight & Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="weight.value"
            className="block text-sm font-medium text-gray-700"
          >
            Weight
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="weight.value"
              name="weight.value"
              value={formData.weight.value}
              onChange={handleChange}
              placeholder="Weight"
              className="flex-1 min-w-0 block rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <select
              id="weight.unit"
              name="weight.unit"
              value={formData.weight.unit}
              onChange={handleChange}
              className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="lb">lb</option>
              <option value="oz">oz</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="dimensions.dimensions"
            className="block text-sm font-medium text-gray-700"
          >
            Dimensions (LxWxH)
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="dimensions.dimensions"
              name="dimensions.dimensions"
              value={formData.dimensions.dimensions}
              onChange={handleChange}
              placeholder="10x5x2"
              className="flex-1 min-w-0 block rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <select
              id="dimensions.unit"
              name="dimensions.unit"
              value={formData.dimensions.unit}
              onChange={handleChange}
              className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
            >
              <option value="cm">cm</option>
              <option value="mm">mm</option>
              <option value="in">in</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="new-category"
              placeholder="Add a category"
              className="flex-1 min-w-0 block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addCategory((e.target as HTMLInputElement).value)
                  ;(e.target as HTMLInputElement).value = ''
                }
              }}
            />
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {formData.categories.length === 0 && (
              <p className="text-sm text-gray-500">No categories added.</p>
            )}

            {formData.categories.map((category: string) => (
              <span
                key={category}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {category}
                <button
                  type="button"
                  onClick={() => removeCategory(category)}
                  className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsTab
