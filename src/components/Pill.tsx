import React from 'react'
import { cn } from '@/lib/utils'

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

const Pill: React.FC<PillProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'flex items-center rounded-full bg-paper/50 px-1 py-1 pr-4 gap-2 border border-base',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Pill
