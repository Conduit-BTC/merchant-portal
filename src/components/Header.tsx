import React, { useEffect, useState } from 'react'
import { useAccountStore } from '@/stores/useAccountStore'
import { useStoreProfileStore } from '@/stores/useStoreProfileStore'
import '@/styles/typography.css'
import PageSection from '@/layouts/PageSection'
import Breadcrumbs from './Breadcrumbs'
import Logo from './Logo'
import { useBreadcrumbItems } from '@/hooks/useBreadcrumbItems'
import UserDropdown from './UserDropdown'

const Header: React.FC = () => {
  const { user, isLoggedIn } = useAccountStore()
  const { profile, fetchProfile } = useStoreProfileStore()
  const [displayName, setDisplayName] = useState<string>('')

  const profileDisplayName = profile?.display_name || profile?.name || null
  const profilePicture = profile?.picture || null

  const formatNpub = (npub: string): string =>
    `${npub.substring(0, 8)}...${npub.substring(npub.length - 8)}`

  // Innitial load
  useEffect(() => {
    ;(async () => {
      if (isLoggedIn && user?.pubkey) {
        await fetchProfile(user.pubkey)
      }
    })()
  }, [isLoggedIn, user?.pubkey, fetchProfile])

  useEffect(() => {
    if (profileDisplayName) {
      setDisplayName(profileDisplayName)
    } else if (user?.npub) {
      setDisplayName(formatNpub(user.npub))
    }
  }, [profileDisplayName, user?.npub])

  const items = useBreadcrumbItems({
    labelMap: {
      store: 'Store',
      products: 'My Products',
      create: 'Create Product'
    },
    includeRoot: false
  })

  return (
    <header className="relative bg-sidebar">
      <PageSection className="p-4" width="full">
        <div className="flex justify-between items-center gap-4">
          <div className="grid gap-1">
            <Logo className="max-w-50" variant="full" />
            <Breadcrumbs items={items} />
          </div>
          {/* <MobileMenu /> */}
          {isLoggedIn && displayName && (
            <UserDropdown imageUrl={profilePicture} userName={displayName} />
          )}
        </div>
        {/* <Breadcrumbs /> */}
      </PageSection>
    </header>
  )
}

export default Header
