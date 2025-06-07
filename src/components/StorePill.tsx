import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Pill from './Pill'
import Avatar from './Avatar'
import Sidebar from './Sidebar'
import { ChevronRight } from 'lucide-react'
import { useAccountStore } from "@/stores/useAccountStore";



interface StorePillProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    imageUrl?: string | null
    storeName: string
}

const StorePill: React.FC<StorePillProps> = ({
    imageUrl,
    storeName,
    className,
    ...props
}) => {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const { logout } = useAccountStore()

    const handleLogout = () => {
        setOpen(false)
        logout()
        console.log('Logging out...')
        // Add your actual logout logic here
    }

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className={cn('flex items-center space-x-2', className)}
                {...props}
            >
                <Pill className="w-full">
                    <Avatar imageUrl={imageUrl} alt={storeName} size="xl" fallback={storeName} />
                    <div className="flex flex-col leading-none">
                        <span className="text-xs text-muted-foreground">Logged as</span>
                        <span className="font-semibold whitespace-nowrap">{storeName}</span>
                    </div>
                    <ChevronRight className="size-5 ml-auto text-muted-foreground shrink-0" />
                </Pill>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg border z-50 w-80 p-2 max-h-[80vh] overflow-y-auto">
                    <Sidebar embedded />
                    <div className="border-t my-2" />
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 text-sm"
                    >
                        Logout
                    </button>
                </div>
            )}

        </div>
    )
}

export default StorePill
