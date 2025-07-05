import '@/styles/site.css'
import MainArea from './layouts/MainArea'
import { useAccountStore } from './stores/useAccountStore'
import AuthPage from './layouts/login/AuthPage.tsx'
import SimpleLayout from './layouts/SimpleLayout.tsx'
import DashboardLayout from './layouts/DashboardLayout.tsx'

console.log('delete me')

export function App() {
  const { isLoggedIn, user } = useAccountStore()

  if (!isLoggedIn || !user) {
    return (
      <SimpleLayout>
        <AuthPage />
      </SimpleLayout>
    )
  }

  return (
    <DashboardLayout>
      <MainArea />
    </DashboardLayout>
  )
}
