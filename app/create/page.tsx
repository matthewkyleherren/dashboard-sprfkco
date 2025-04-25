import { DashboardShell } from "@/components/dashboard-shell"
import { PortfolioForm } from "@/components/portfolio-form"

export default function CreatePage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Create New Profile</h1>
      </div>
      <PortfolioForm />
    </DashboardShell>
  )
}
