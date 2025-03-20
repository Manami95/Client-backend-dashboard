import { SessionCheck } from "@/components/auth/session-check"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SessionCheck />
      {children}
    </>
  )
}