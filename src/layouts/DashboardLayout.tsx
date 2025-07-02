import * as React from 'react'
import Icon from '@/components/Icon'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from '@/components/Sidebar'
import Header from '@/components/Header'

// Navigation data for merchant portal
const navData = [
  {
    title: 'Quick Actions',
    icon: Icon.Zap,
    items: [{ title: 'Add Product', url: '/products/create', icon: Icon.Plus }]
  },
  {
    title: 'Store',
    icon: Icon.ShoppingBag,
    items: [
      { title: 'Profile', url: '/store', icon: Icon.User },
      { title: 'Relays', url: '/store/relays', icon: Icon.Zap },
      { title: 'Shipping', url: '/store/shipping', icon: Icon.ShoppingBag },
      { title: 'Checkout', url: '/store/checkout', icon: Icon.ShoppingCart }
    ]
  },
  {
    title: 'Products',
    icon: Icon.ShoppingCart,
    items: [
      { title: 'My Products', url: '/products', icon: Icon.ShoppingBag },
      { title: 'Create Product', url: '/products/create', icon: Icon.Plus }
    ]
  },
  {
    title: 'Orders',
    icon: Icon.ShoppingCart,
    items: [
      { title: 'Completed', url: '/orders/completed', icon: Icon.ShieldCheck },
      { title: 'Pending', url: '/orders/pending', icon: Icon.Lock },
      { title: 'Failed', url: '/orders/failed', icon: Icon.X },
      { title: 'Cancelled', url: '/orders/cancelled', icon: Icon.Minus },
      { title: 'Create New Order', url: '/orders/create', icon: Icon.Plus }
    ]
  }
]

// Simple single sidebar variant
function SimpleSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        {navData.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="shrink-0" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}

// Nested multi-sidebar variant
function NestedSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState(navData[0])
  const { setOpen } = useSidebar()

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* Icon sidebar */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {navData.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false
                      }}
                      onClick={() => {
                        setActiveItem(item)
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Links sidebar */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarContent>
          <div className="p-4 border-b">
            <h2 className="text-base font-medium text-foreground">
              {activeItem?.title}
            </h2>
          </div>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {activeItem?.items.map((link) => (
                  <SidebarMenuItem key={link.title}>
                    <SidebarMenuButton asChild>
                      <a href={link.url}>
                        <link.icon className="shrink-0" />
                        <span>{link.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}

export default function DashboardLayout({
  children,
  variant = 'simple'
}: {
  children: React.ReactNode
  variant?: 'simple' | 'nested'
}) {
  const SidebarComponent = variant === 'nested' ? NestedSidebar : SimpleSidebar

  return (
    <>
      <Header />
      <SidebarProvider
        style={
          variant === 'nested'
            ? {
                '--sidebar-width': '280px'
              }
            : undefined
        }
      >
        <SidebarComponent />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
