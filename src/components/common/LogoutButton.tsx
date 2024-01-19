'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export default function LogoutButton() {
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
