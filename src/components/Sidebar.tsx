// Sidebar.tsx
import { Link } from "wouter";
import '@/styles/typography.css'

const Sidebar = ({ embedded = false }: { embedded?: boolean }) => {
    return (
        <nav
            className={
                embedded
                    ? 'flex flex-row gap-4 w-full'
                    : 'sidebar fixed w-48 flex flex-col h-screen gap-4 justify-start items-start'
            }
            style={embedded ? {} : { padding: '30px', borderRight: '1px solid gray' }}
        >
            <LinkList>
                <NavLink href="/store" isBold>Store</NavLink>
                <NavLink href="/store">Profile</NavLink>
                <NavLink href="/store/relays">Relays</NavLink>
                <NavLink href="/store/shipping">Shipping</NavLink>
                <NavLink href="/store/checkout">Checkout</NavLink>
            </LinkList>
            <LinkList>
            <NavLink href="/products" isBold>Products</NavLink>
                <NavLink href="/products">My Products</NavLink>
                <NavLink href="/products/create">Create Product</NavLink>
            </LinkList>
            <LinkList>
            <NavLink href="/orders/completed" isBold>Orders</NavLink>
                <NavLink href="/orders/completed">Completed</NavLink>
                <NavLink href="/orders/pending">Pending</NavLink>
                <NavLink href="/orders/failed">Failed</NavLink>
                <NavLink href="/orders/cancelled">Cancelled</NavLink>
                <NavLink href="/orders/create">Create New Order</NavLink>
            </LinkList>
        </nav>
    );
};

const NavLink = ({
    href,
    isBold = false,
    children,
}: { href: string; isBold?: boolean; children: any }) => {
    return (
        <Link
            href={href}
            className={`px-4 pt-2 w-full hover:opacity-50 hover:cursor-pointer ${isBold ? 'font-bold' : ''}`}
        >
            {children}
        </Link>
    );
};

const LinkList = ({ children }: { children: any }) => {
    return (
        <div className="flex flex-col ml-2 w-full *:text-sm -mt-4 rounded-lg shadow-md hover:border-accent-500 transition-colors duration-300 bg-muted/60 border border-ink border-dashed aspect-square w-[120px]">
            {children}
        </div>
    );
};

export default Sidebar;
