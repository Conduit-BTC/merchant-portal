import { Order } from "nostr-commerce-schema";
import { Link } from "wouter";

const OrderList = ({ listName, orders }: { listName: string, orders: Order[] }) => {
    return (
        <section className='border-2 rounded-md border-white/50'>
            <div className='w-full border-b-2 border-white/50 p-2 font-bold'>
                <h2>{listName}</h2>
            </div>
            <div className="p-2">
                <ul>
                    {orders.length
                        ? orders.map((order: Order) => {
                            <li>{order.content}</li>
                        })
                        : <>
                            <>{`No ${listName.toLowerCase()} found on `}</>
                            <Link href="~/store/relays" className='underline'>selected relays</Link>
                        </>
                    }
                </ul>
            </div>
        </section>
    )
}

export default OrderList;