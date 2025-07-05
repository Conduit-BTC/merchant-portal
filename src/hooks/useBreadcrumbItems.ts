// hooks/useBreadcrumbItems.ts
import { useLocation } from 'wouter'

interface UseBreadcrumbItemsOptions {
  labelMap?: Record<string, string>
  rootName?: string
  rootPath?: string
  includeRoot?: boolean
}

interface BreadcrumbItem {
  label: string
  path: string
  isActive?: boolean
}

export const useBreadcrumbItems = ({
  labelMap = {},
  rootName = 'Home',
  rootPath = '/',
  includeRoot = true
}: UseBreadcrumbItemsOptions = {}): BreadcrumbItem[] => {
  const [location] = useLocation()

  const segments = location.split('/').filter(Boolean)

  const items: BreadcrumbItem[] = []

  // Add root first
  if (includeRoot) {
    items.push({
      label: labelMap[''] || rootName,
      path: rootPath
    })
  }

  segments.forEach((seg, i) => {
    const path = '/' + segments.slice(0, i + 1).join('/')
    const isLast = i === segments.length - 1

    items.push({
      label: labelMap[seg] || capitalize(seg),
      path,
      isActive: isLast
    })
  })

  return items
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
