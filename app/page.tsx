import { DashboardShell } from "@/components/dashboard-shell"
import { PortfolioList } from "@/components/portfolio-list"

export default function Home() {
  return (
    <DashboardShell>
      <PortfolioList />
    </DashboardShell>
  )
}
