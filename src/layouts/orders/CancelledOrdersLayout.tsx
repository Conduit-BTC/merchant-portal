import OrderList from "@/components/Orders/OrderList";

const CancelledOrdersLayout: React.FC = () => {
    return (
        <section>
            <OrderList listName="Cancelled Orders" orders={[]} />
        </section>
    )
}

export default CancelledOrdersLayout;