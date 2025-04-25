"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { PortfolioForm } from "@/components/portfolio-form"
import { useToast } from "@/hooks/use-toast"
import { portfolioData } from "@/lib/data"
import type { PortfolioRecord } from "@/lib/types"

export default function EditPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { toast } = useToast()
  const [record, setRecord] = useState<PortfolioRecord | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundRecord = portfolioData.find((item) => item.id === id)

    if (foundRecord) {
      setRecord(foundRecord)
    } else {
      toast({
        title: "Record not found",
        description: "The requested portfolio record could not be found.",
        variant: "destructive",
      })
      router.push("/")
    }

    setLoading(false)
  }, [id, router, toast])

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Loading...</h1>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Edit Profile</h1>
      </div>
      {record && <PortfolioForm initialData={record} />}
    </DashboardShell>
  )
}
