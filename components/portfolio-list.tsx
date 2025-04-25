"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { portfolioData } from "@/lib/data"
import type { PortfolioRecord } from "@/lib/types"

export function PortfolioList() {
  const { toast } = useToast()
  const [records, setRecords] = useState<PortfolioRecord[]>(portfolioData)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRecords = records.filter(
    (record) =>
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.nantionality.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    setRecords(records.filter((record) => record.id !== id))
    toast({
      title: "Record deleted",
      description: "The profile record has been deleted successfully.",
    })
  }

  const getPrimaryPhoto = (record: PortfolioRecord) => {
    if (!record.photos || record.photos.length === 0) return null
    return record.photos.find((photo) => photo.isPrimary) || record.photos[0]
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Profile Records</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 bg-background"
            />
          </div>
          <Button asChild className="bg-gray-900 hover:bg-gray-700 text-white">
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50/50">
          <CardTitle className="text-lg">All Records</CardTitle>
          <CardDescription>Manage your profile records.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-50/50">
                <TableHead className="w-12"></TableHead>
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="font-medium">Age</TableHead>
                <TableHead className="font-medium">Nationality</TableHead>
                <TableHead className="font-medium">Height</TableHead>
                <TableHead className="font-medium">Languages</TableHead>
                <TableHead className="text-right font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No records found. Create your first profile record.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record) => {
                  const primaryPhoto = getPrimaryPhoto(record)

                  return (
                    <TableRow key={record.id} className="hover:bg-gray-50/50">
                      <TableCell>
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          {primaryPhoto ? (
                            <Image
                              src={primaryPhoto.url || "/placeholder.svg"}
                              alt={primaryPhoto.alt}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-500" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{record.name}</TableCell>
                      <TableCell>{record.age}</TableCell>
                      <TableCell>{record.nantionality}</TableCell>
                      <TableCell>{record.height} cm</TableCell>
                      <TableCell>
                        {[
                          record.langDE === "yes" && "DE",
                          record.langEN === "yes" && "EN",
                          record.langFR === "yes" && "FR",
                          record.langIT === "yes" && "IT",
                          record.langPL === "yes" && "PL",
                          record.langRO === "yes" && "RO",
                          record.langPT === "yes" && "PT",
                          record.langNL === "yes" && "NL",
                          record.langCN === "yes" && "CN",
                          record.langOTHER === "yes" && "Other",
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem asChild>
                              <Link href={`/preview/${record.id}`} className="flex items-center cursor-pointer">
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/edit/${record.id}`} className="flex items-center cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(record.id)}
                              className="text-red-600 focus:text-red-600 cursor-pointer"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
