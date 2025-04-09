import OrderList from "@/components/Orders/OrderList";
import { useOrderStore } from "@/stores/useOrderStore";

const CompletedOrdersLayout: React.FC = () => {
    const { allOrders } = useOrderStore();
    return (
        <section>
            <OrderList listName="Completed Orders" orders={[...allOrders]} />
        </section>
    )
}

export default CompletedOrdersLayout;