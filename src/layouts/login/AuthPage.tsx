import Button from '@/components/Buttons/Button'
import React from 'react'
import PageSection from '@/layouts/PageSection'
import { useAccountStore } from '@/stores/useAccountStore'

export const useInitializeAuth = () => {
  const fetchUser = useAccountStore((state) => state.fetchUser)
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn)

  React.useEffect(() => {
    if (isLoggedIn) {
      fetchUser()
    }
  }, [fetchUser, isLoggedIn])
}

const AuthPage: React.FC = () => {
  useInitializeAuth()
  const { login } = useAccountStore()

  const handleLogin = () => {
    login().catch((err) => console.error('Login error:', err))
  }

  return (
    <PageSection
      width="xNarrow"
      sectionClassName="relative overflow-hidden h-full"
      className="h-full grid place-content-center"
    >
      <div className="flex gap-2 items-center justify-center text-center text-balance">
        <h1 className="voice-5l">Sign in with Nostr Account</h1>
      </div>
      <p className="voice-base text-center text-balance">
        To use the Merchant Experience client, you need to log in with a Nostr
        account.
      </p>

      <Button
        onClick={handleLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Login with Nostr
      </Button>

      {/* <form className="grid gap-4 mt-4">
        <h2 className="voice-lg">Sign in</h2>
        <Button
          variant="outline"
          size="lg"
          className="border-primary"
          rounded={false}
        >
          <Icon.Lock />
          Nostr Signer
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-primary"
          rounded={false}
        >
          <Icon.Mail />
          Email Sign in
        </Button>
        <Field label="Paste Nsec" name="nsec" type="text" leftIcon="Paste" />
      </form> */}
      {/* <div className="grid gap-4 mt-16 border-t border-muted pt-8">
        <h2 className="voice-lg">Sign up</h2>
        <p className="voice-base">
          You can create a profile (nsec) per transaction
        </p>
        <Button variant="primary" size="lg" rounded={false}>
          <Icon.UserPlus />
          Create Nsec
        </Button>
      </div> */}

      <picture className="absolute w-auto h-full rotate-y-180  -left-1/6  top-1/2 translate-x-1/2 -translate-y-1/2 -z-10 hidden lg:block 3xl:left-1">
        <img
          src="/images/sprites/acea-sprite.png"
          alt="Acea sprite"
          className="object-contain w-auto h-full"
        />
      </picture>

      {/* Eric sprite on the right */}
      <picture className="absolute w-auto h-full -right-1/6  top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 hidden lg:block 3xl:right-1">
        <img
          src="/images/sprites/eric-sprite.png"
          alt="Eric sprite"
          className="object-contain w-auto h-full"
        />
      </picture>
    </PageSection>
  )
}

export default AuthPage
