import OrderList from "@/components/Orders/OrderList";

const FailedOrdersLayout: React.FC = () => {
    return (
        <section>
            <OrderList listName="Failed Orders" orders={[]} />
        </section>
    )
}

export default FailedOrdersLayout;