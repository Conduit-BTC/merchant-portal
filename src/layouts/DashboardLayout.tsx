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
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from '@/components/Sidebar'
import Header from '@/components/Header'
import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

// Navigation data for merchant portal
const navData = [
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
      {
        title: 'Create Product',
        url: '/products/create',
        icon: Icon.Plus,
        pinned: true
      }
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
  const [parent] = useAutoAnimate()
  const [navDataState, setNavDataState] = useState(navData)

  // Get all pinned items for Quick Actions
  const pinnedItems = navDataState
    .flatMap((group) => group.items)
    .filter((item) => item.pinned)

  // Update Quick Actions with pinned items
  const navDataWithQuickActions = navDataState.map((group) =>
    group.title === 'Quick Actions' ? { ...group, items: pinnedItems } : group
  )

  const togglePin = (itemTitle: string) => {
    setNavDataState((prevData) =>
      prevData.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.title === itemTitle ? { ...item, pinned: !item.pinned } : item
        )
      }))
    )
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu ref={parent}>
              {pinnedItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="shrink-0" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuAction
                    onClick={() => togglePin(item.title)}
                    className="hover:bg-transparent"
                  >
                    <Icon.Pin
                      className={`h-4 w-4 transition-colors ${
                        item.pinned
                          ? 'text-secondary'
                          : 'text-base-400 opacity-50'
                      }`}
                    />
                  </SidebarMenuAction>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {navDataWithQuickActions.map((group) => (
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
                    {group.title !== 'Quick Actions' && (
                      <SidebarMenuAction
                        onClick={() => togglePin(item.title)}
                        className="hover:bg-transparent"
                      >
                        <Icon.Pin
                          className={`h-4 w-4 transition-colors ${
                            item.pinned
                              ? 'text-secondary'
                              : 'text-base-400 opacity-50'
                          }`}
                        />
                      </SidebarMenuAction>
                    )}
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
  const [navDataState, setNavDataState] = useState(navData)
  const { setOpen } = useSidebar()

  // Get all pinned items for Quick Actions
  const pinnedItems = navDataState
    .flatMap((group) => group.items)
    .filter((item) => item.pinned)

  // Update Quick Actions with pinned items and active item data
  const navDataWithQuickActions = navDataState.map((group) =>
    group.title === 'Quick Actions' ? { ...group, items: pinnedItems } : group
  )

  // Update active item to show pinned items in Quick Actions
  const activeItemWithQuickActions =
    activeItem.title === 'Quick Actions'
      ? { ...activeItem, items: pinnedItems }
      : navDataState.find((group) => group.title === activeItem.title) ||
        activeItem

  const togglePin = (itemTitle: string) => {
    setNavDataState((prevData) =>
      prevData.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.title === itemTitle ? { ...item, pinned: !item.pinned } : item
        )
      }))
    )
  }

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
                {navDataWithQuickActions.map((item) => (
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
              {activeItemWithQuickActions?.title}
            </h2>
          </div>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {activeItemWithQuickActions?.items.map((link) => (
                  <SidebarMenuItem key={link.title}>
                    <SidebarMenuButton asChild>
                      <a href={link.url}>
                        <link.icon className="shrink-0" />
                        <span>{link.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {activeItem.title !== 'Quick Actions' && (
                      <SidebarMenuAction
                        onClick={() => togglePin(link.title)}
                        className="hover:bg-transparent"
                      >
                        <Icon.Pin
                          className={`h-4 w-4 transition-colors ${
                            link.pinned
                              ? 'text-secondary'
                              : 'text-base-400 opacity-50'
                          }`}
                        />
                      </SidebarMenuAction>
                    )}
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
