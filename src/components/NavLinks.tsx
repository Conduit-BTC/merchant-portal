import Button from './Buttons/Button'
import Icon from './Icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './Form/Dropdown'

const navLinks = [
  {
    header: 'QUICK ACTIONS',
    headerIcon: <Icon.Zap />,
    links: [
      {
        href: '/store',
        icon: <Icon.Plus />,
        text: 'Add product'
      }
    ]
  },
  {
    header: 'STORE',
    headerIcon: <Icon.ShoppingBag />,
    links: [
      {
        href: '/store',
        icon: <Icon.User />,
        text: 'Profile'
      },
      {
        href: '/store/relays',
        text: 'Relays'
      },
      {
        href: '/store/shipping',
        text: 'Shipping'
      },
      {
        href: '/store/checkout',
        text: 'Checkout'
      }
    ]
  },
  {
    header: 'PRODUCTS',
    headerIcon: <Icon.ShoppingCart />,
    links: [
      {
        href: '/products',
        icon: <Icon.ShoppingCart />,
        text: 'My Products'
      },
      {
        href: '/products/create',
        text: 'Create Product'
      }
    ]
  },
  {
    header: 'ORDERS',
    headerIcon: <Icon.ShoppingCart />,
    links: [
      {
        href: '/orders/completed',
        text: 'Completed'
      },
      {
        href: '/orders/pending',
        text: 'Pending'
      },
      {
        href: '/orders/failed',
        text: 'Failed'
      },
      {
        href: '/orders/cancelled',
        text: 'Cancelled'
      },
      {
        href: '/orders/create',
        text: 'Create New Order'
      }
    ]
  }
]

const NavLinks = () => {
  const handleNavigation = (href: string) => {
    window.location.href = href
  }

  return (
    <nav className="">
      {navLinks.map((linkGroup, groupIndex) => (
        <DropdownMenu key={groupIndex}>
          <DropdownMenuTrigger>
            <Button variant="link" rounded={false} className="">
              {linkGroup.headerIcon}
              <span className="">{linkGroup.header}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {linkGroup.links.map((link, linkIndex) => (
              <DropdownMenuItem
                key={linkIndex}
                onClick={() => handleNavigation(link.href)}
                className="cursor-pointer"
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                {link.text}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </nav>
  )
}

export default NavLinks
