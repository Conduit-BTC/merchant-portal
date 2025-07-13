import { useShippingOptionStore } from '@/stores/useShippingOptionStore'
import {
  ShippingOptionUtils as SOU,
} from 'nostr-commerce-schema'
import { useEffect } from 'preact/hooks'
import { FormState } from '.'
import { useAccountStore } from '@/stores/useAccountStore'
import Field from '@/components/Form/Field'

const ShippingTab = ({
  formData,
  setFormData
}: {
  formData: FormState
  setFormData: any
}) => {
  const { shippingOptions, fetchShippingOptions } = useShippingOptionStore()
  const { user } = useAccountStore()

  useEffect(() => {
    fetchShippingOptions()
  }, [])

  useEffect(() => {
    console.log(formData)
  }, [formData])

  // Convert shipping options to format needed for Field component
  const shippingOptionsList = [...shippingOptions.values()].map((event) => {
    const ref = `30406:${user!.pubkey}:${SOU.getShippingOptionId(event)}`
    const label =
      SOU.getShippingOptionTitle(event) +
        ' - ' +
        SOU.getShippingOptionPriceAmount(event) +
        ' ' +
        SOU.getShippingOptionPriceCurrency(event) +
        ' - ' +
        SOU.getShippingOptionCountries(event) || 'Untitled Option'
    return {
      label: label,
      value: ref
    }
  })

  const handleShippingOptionsChange = (event: {
    target: { name: string; value: string | string[] }
  }) => {
    const selectedOptions = Array.isArray(event.target.value)
      ? event.target.value
      : []
    setFormData((prev: any) => ({
      ...prev,
      shippingOptions: selectedOptions.map((ref) => ({ reference: ref }))
    }))
  }

  return (
    <div className="space-y-6">
      <h3>Available Options</h3>
      <Field
        type="tags"
        name="shippingOptions"
        placeholder="Select shipping options..."
        options={shippingOptionsList}
        value={formData.shippingOptions.map((o) => o.reference)}
        onChange={handleShippingOptionsChange}
      />
    </div>
  )
}

export default ShippingTab
