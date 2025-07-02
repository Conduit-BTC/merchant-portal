import React from 'react'
import { cn } from '@/lib/utils'
import Avatar from './Avatar'
import { ChevronDown } from 'lucide-react'
import { useAccountStore } from '@/stores/useAccountStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './Form/Dropdown'

// Navigation items for the user dropdown
const userDropdownItems = [
  {
    label: 'Profile',
    href: '/profile',
    type: 'link' as const
  },
  {
    label: 'Logout',
    action: 'logout' as const,
    type: 'action' as const
  }
]

interface UserDropdownProps {
  imageUrl?: string | null
  userName: string
  className?: string
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  imageUrl,
  userName,
  className
}) => {
  const { logout } = useAccountStore()

  const handleLogout = async () => {
    await logout()
    console.log('Logging out...')
  }

  const handleItemClick = (item: typeof userDropdownItems[0]) => {
    if (item.type === 'action' && item.action === 'logout') {
      handleLogout()
    } else if (item.type === 'link' && item.href) {
      // Navigate to the link - you can implement navigation logic here
      console.log(`Navigating to ${item.href}`)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex items-center gap-2 p-2 h-auto bg-transparent text-ink-foreground hover:bg-ink/20 transition-colors rounded-full cursor-pointer',
            className
          )}
        >
          <Avatar
            imageUrl={imageUrl}
            alt={userName}
            size="lg"
            fallback={userName}
          />
          <div className="flex flex-col leading-none text-left">
            <span className="text-xs text-muted-foreground">Logged as</span>
            <span className="font-semibold whitespace-nowrap">{userName}</span>
          </div>
          <ChevronDown className="size-4 ml-auto text-muted-foreground shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {userDropdownItems.map((item, index) => (
          <React.Fragment key={item.label}>
            {index > 0 && item.type === 'action' && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={() => handleItemClick(item)}
              className={cn(
                'cursor-pointer',
                item.type === 'action' &&
                  item.action === 'logout' &&
                  'text-destructive-foreground'
              )}
            >
              {item.label}
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
