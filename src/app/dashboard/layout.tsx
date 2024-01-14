import { redirect } from 'next/navigation'
import Container from '../../components/common/Container'
import DashboardNavBar from '../../components/common/DashboardNavBar'
import { Separator } from '../../components/ui/separator'
import { getServerAuthSession } from '../../server/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerAuthSession()
  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <Container>
      <DashboardNavBar role={session.user.type} />
      <Separator className="my-2" />
      {children}
    </Container>
  )
}
