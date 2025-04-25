"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { ProfilePreview } from "@/components/profile-preview"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { portfolioData } from "@/lib/data"
import type { PortfolioRecord } from "@/lib/types"

export default function PreviewPage({ params }: { params: { id: string } }) {
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

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Profile Preview</h1>
        </div>
        <Button variant="outline" onClick={() => router.push(`/edit/${id}`)}>
          Edit Profile
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      ) : record ? (
        <ProfilePreview record={record} />
      ) : null}
    </DashboardShell>
  )
}
