import { FormState } from '@/components/Product/ProductForm'
import Field from '../../Form/Field'
import Repeater from '../../Form/Repeater'
import { useState } from 'react'

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
  // Track input method for each image (url or file)
  const [inputMethods, setInputMethods] = useState<
    Record<number, 'url' | 'file'>
  >({})

  const addImage = () => {
    const newIndex = formData.images.length
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { url: '', dimensions: '', order: undefined }]
    }))
    // Default to URL input for new images
    setInputMethods((prev) => ({ ...prev, [newIndex]: 'url' }))
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
    // Clean up input method tracking
    setInputMethods((prev) => {
      const newMethods = { ...prev }
      delete newMethods[index]
      // Reindex remaining items
      const reindexed: Record<number, 'url' | 'file'> = {}
      Object.entries(newMethods).forEach(([key, value]) => {
        const numKey = parseInt(key)
        if (numKey > index) {
          reindexed[numKey - 1] = value
        } else {
          reindexed[numKey] = value
        }
      })
      return reindexed
    })
  }

  const handleInputMethodChange = (index: number, method: 'url' | 'file') => {
    setInputMethods((prev) => ({ ...prev, [index]: method }))
    // Clear the URL when switching to file upload
    if (method === 'file') {
      updateImage(index, 'url', '')
    }
  }

  const handleFileUpload = (index: number, file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    // Convert file to data URL
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      updateImage(index, 'url', dataUrl)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      <Repeater
        title="Product Images"
        items={formData.images}
        onAdd={addImage}
        onRemove={removeImage}
        addButtonText="Add Image"
        emptyMessage="No images added yet."
        renderItem={(image: any, index: number) => {
          const inputMethod = inputMethods[index] || 'url'

          return (
            <div className="grid grid-cols-1 gap-4 pr-8">
              {/* Input Method Selection */}
              <div>
                <label className="voice-sm font-bold mb-2 block">
                  Image Source
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`input-method-${index}`}
                      value="url"
                      checked={inputMethod === 'url'}
                      onChange={() => handleInputMethodChange(index, 'url')}
                      className="mr-2"
                    />
                    URL
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`input-method-${index}`}
                      value="file"
                      checked={inputMethod === 'file'}
                      onChange={() => handleInputMethodChange(index, 'file')}
                      className="mr-2"
                    />
                    Upload File
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
                {/* Image Input - URL or File */}
                {inputMethod === 'url' ? (
                  <Field
                    label="Image URL"
                    name={`image-url-${index}`}
                    type="text"
                    value={image.url}
                    onChange={(e) =>
                      updateImage(
                        index,
                        'url',
                        (e.target as HTMLInputElement).value
                      )
                    }
                    placeholder="https://example.com/image.jpg"
                    error={errors[`image-${index}`]}
                  />
                ) : (
                  <Field
                    label="Upload Image"
                    name={`image-file-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) {
                        handleFileUpload(index, file)
                      }
                    }}
                    error={errors[`image-${index}`]}
                    help="Max size: 5MB. Supported formats: JPG, PNG, GIF, WebP"
                  />
                )}

                <Field
                  label="Order"
                  name={`image-order-${index}`}
                  type="number"
                  value={image.order ?? ''}
                  onChange={(e) =>
                    updateImage(
                      index,
                      'order',
                      (e.target as HTMLInputElement).value
                    )
                  }
                  placeholder="Optional order"
                />
              </div>
            </div>
          )
        }}
      />

      {formData.images.length > 0 && (
        <div className="mt-4">
          <h3 className="voice-sm font-bold mb-2">Preview</h3>
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
                {!image.url && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                    No image
                  </div>
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
