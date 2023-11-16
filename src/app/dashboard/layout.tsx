import { getServerAuthSession } from "../../server/auth";
import { redirect } from "next/navigation";
import Container from "../../components/common/Container";
import LogoutButton from "../../components/common/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <Container>
      <nav className="w-full border-b border-slate-800 p-3">
        <LogoutButton />
      </nav>

      {children}
    </Container>
  );
}
