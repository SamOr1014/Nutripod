import { redirect } from 'next/navigation'
import { getServerAuthSession } from '~/server/auth'
import { UserRole } from '~/types/UserRole'

export default async function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerAuthSession()
  session!.user.type !== UserRole.USER && redirect('/dashboard/dietitian-home')
  return <div>{children}</div>
}
