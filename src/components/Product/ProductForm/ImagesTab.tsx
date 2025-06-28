import { FormState } from '@/components/product/ProductForm'

type ImageEntry = FormState['images'][number]

interface ImagesTabProps {
  formData: FormState
  setFormData: React.Dispatch<React.SetStateAction<FormState>>
  errors: Record<string, string>
}

const ImagesTab: React.FC<ImagesTabProps> = ({
  formData,
  setFormData,
  errors
}) => {
  const addImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { url: '', dimensions: '', order: undefined }]
    }))
  }

  const updateImage = (
    index: number,
    field: keyof ImageEntry,
    value: string
  ) => {
    setFormData((prev) => {
      const newImages = [...prev.images]
      const updatedImage = { ...newImages[index] }

      if (field === 'order') {
        updatedImage.order = value === '' ? undefined : parseInt(value, 10)
      } else {
        updatedImage[field] = value
      }

      newImages[index] = updatedImage
      return { ...prev, images: newImages }
    })
  }

  const removeImage = (index: number) => {
    setFormData((prev) => {
      const newImages = [...prev.images]
      newImages.splice(index, 1)
      return { ...prev, images: newImages }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Product Images
        </label>
        <button
          type="button"
          onClick={addImage}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {formData.images.map((image: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border p-4 rounded-md shadow-sm"
          >
            <div>
              <label className="block text-sm font-medium">Image URL</label>
              <input
                type="text"
                value={image.url}
                onChange={(e) => updateImage(index, 'url', e.target.value)}
                placeholder="Image URL"
                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                  errors[`image-${index}`] ? 'border-red-500' : ''
                }`}
              />
              {errors[`image-${index}`] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[`image-${index}`]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Order</label>
              <input
                type="number"
                value={image.order ?? ''}
                onChange={(e) => updateImage(index, 'order', e.target.value)}
                placeholder="Optional order"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="md:col-span-3 text-right mt-2">
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {formData.images.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.images.map((image: any, index: number) => (
              <div
                key={index}
                className="relative pb-[100%] bg-gray-100 rounded-md overflow-hidden"
              >
                {image.url && (
                  <img
                    src={image.url}
                    alt={`Product image ${index + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      // Show a placeholder for broken images
                      ;(e.target as HTMLImageElement).src =
                        'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%25%22%20height%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22xMidYMid%22%3E%3Cpath%20fill%3D%22%23f3f4f6%22%20d%3D%22M0%200h100v100H0z%22%2F%3E%3Cpath%20fill%3D%22%23d1d5db%22%20d%3D%22M40%2035l20%2030l15-15l25%2030V0H0v80l25-25z%22%2F%3E%3Ccircle%20cx%3D%2275%22%20cy%3D%2225%22%20r%3D%228%22%20fill%3D%22%23d1d5db%22%2F%3E%3C%2Fsvg%3E'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImagesTab
