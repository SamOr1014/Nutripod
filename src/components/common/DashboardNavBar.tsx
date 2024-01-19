'use client'
import { UserRole } from '~/types/UserRole'
import LogoutButton from './LogoutButton'
import NavButtons from './NavButtons'

type Props = {
  role: UserRole
}

export default function DashboardNavBar({ role }: Props) {
  return (
    <nav className="w-full p-3">
      <div className="flex">
        <div className="flex flex-1 gap-2">
          <NavButtons role={role} />
        </div>
        <LogoutButton />
      </div>
    </nav>
  )
}
