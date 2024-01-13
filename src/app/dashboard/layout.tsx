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
      <div className="h-full max-h-full flex flex-col">
        <DashboardNavBar role={session.user.type} />
        <Separator className="my-2" />
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </Container>
  )
}
