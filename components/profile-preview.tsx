"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PortfolioRecord } from "@/lib/types"

interface ProfilePreviewProps {
  record: PortfolioRecord
}

export function ProfilePreview({ record }: ProfilePreviewProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const photos = record.photos || []

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="bg-gray-50/50">
        <CardTitle className="text-xl flex items-center gap-2">
          {record.name}, {record.age}
          <Badge variant="outline" className="ml-2">
            {record.nantionality}
          </Badge>
        </CardTitle>
        <CardDescription>
          {record.height} cm • {record.weight} kg • {record.bust}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {photos.length > 0 ? (
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto">
            <Image
              src={photos[currentPhotoIndex].url || "/placeholder.svg"}
              alt={photos[currentPhotoIndex].alt}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            {photos.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevPhoto}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextPhoto}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {photos.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 w-1.5 rounded-full ${index === currentPhotoIndex ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="aspect-[3/4] w-full max-w-md mx-auto bg-gray-100 flex items-center justify-center rounded-md">
            <User className="h-16 w-16 text-gray-400" />
          </div>
        )}

        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Hair Color</h3>
                <p>{record.haircolour}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Eye Color</h3>
                <p>{record.eyecolour}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Bust</h3>
                <p>
                  {record.bust} ({record["breast-type"]})
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Konfektion</h3>
                <p>{record.Konfektion}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Shoe Size</h3>
                <p>{record.schoesize}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Smoker</h3>
                <p>{record.smoker === "yes" ? "Yes" : "No"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tattoo</h3>
                <p>{record.tattoo === "yes" ? "Yes" : "No"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Languages</h3>
                <p>
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
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="description">
            <div className="space-y-4">
              {record.descEN && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">English</h3>
                  <p className="whitespace-pre-line text-sm">{record.descEN}</p>
                </div>
              )}
              {record.descDE && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">German</h3>
                  <p className="whitespace-pre-line text-sm">{record.descDE}</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500">Included Services</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(record)
                  .filter(([key, value]) => key.startsWith("serviceincl_") && value === "yes")
                  .map(([key]) => (
                    <Badge key={key} variant="outline" className="justify-start">
                      {key
                        .replace("serviceincl_", "")
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()}
                    </Badge>
                  ))}
              </div>

              {(record.serviceextra_bjcuminmouth ||
                record.serviceextra_bjcuminmouthswallow ||
                record.serviceextra_cumonbody ||
                record.serviceextra_natursektactive) && (
                <>
                  <h3 className="text-sm font-medium text-gray-500 mt-4">Extra Services</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {record.serviceextra_bjcuminmouth && (
                      <div className="flex justify-between border rounded p-2">
                        <span>BJ with finish in mouth</span>
                        <span>€{record.serviceextra_bjcuminmouth}</span>
                      </div>
                    )}
                    {record.serviceextra_bjcuminmouthswallow && (
                      <div className="flex justify-between border rounded p-2">
                        <span>BJ with swallow</span>
                        <span>€{record.serviceextra_bjcuminmouthswallow}</span>
                      </div>
                    )}
                    {record.serviceextra_cumonbody && (
                      <div className="flex justify-between border rounded p-2">
                        <span>Cum on body</span>
                        <span>€{record.serviceextra_cumonbody}</span>
                      </div>
                    )}
                    {record.serviceextra_natursektactive && (
                      <div className="flex justify-between border rounded p-2">
                        <span>Natursekt active</span>
                        <span>€{record.serviceextra_natursektactive}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
