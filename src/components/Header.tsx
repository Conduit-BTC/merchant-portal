import React, { useEffect, useRef, useState } from 'react'
import { useAccountStore } from '@/stores/useAccountStore'
import { useStoreProfileStore } from '@/stores/useStoreProfileStore'
import '@/styles/typography.css'
import StorePill from './StorePill'

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

  return (
    <header
      className="header h-[var(--header-height)] bg-paper top-0 w-full flex justify-between items-center"
      style="margin-bottom:20px"
    >
      <div className="inner-column wide pt-12 flex justify-between items-center">
        {/* Logo/Title */}
        <div className="flex flex-col">
          <div className="flex">
            <h1 className="booming-voice-smaller">Merchant Portal</h1>
          </div>
          <div className="flex flex-row" style="align-items:center;">
            <h5 className="attention-voice" style="padding-right:20px;">
              Powered by
            </h5>
            <picture className="max-w-50">
              <img
                src={
                  new URL('@/assets/images/logo/logo-full.svg', import.meta.url)
                    .href
                }
                alt="Conduit Market"
              />
            </picture>
          </div>
        </div>

        <div>
          <StorePill
            storeName={displayName ? displayName : 'N'}
            imageUrl={profilePicture}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
