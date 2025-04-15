import { ShippingOption, ShippingOptionUtils as SOU } from "nostr-commerce-schema";

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

export default ShippingOptionItem;