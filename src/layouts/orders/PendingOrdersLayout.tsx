import OrderList from "@/components/Orders/OrderList";

const PendingOrdersLayout: React.FC = () => {
    return (
        <section>
            <OrderList listName="Pending Orders" orders={[]} />
        </section>
    )
}

export default PendingOrdersLayout;