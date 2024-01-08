'use client'

import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
  const router = useRouter()
  const handleLogout = () => router.replace(`/api/auth/signout`)
  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      size={'sm'}
      className="gap-2"
    >
      Sign Out
      <LogOut />
    </Button>
  )
}

export default LogoutButton
