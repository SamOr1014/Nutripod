import { redirect } from 'next/navigation'
import { getServerAuthSession } from '~/server/auth'
import { UserRole } from '~/types/UserRole'

export default async function DietitianDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerAuthSession()
  session!.user.type !== UserRole.DIETITIAN && redirect('/dashboard/home')
  return <div>{children}</div>
}
