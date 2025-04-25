"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { portfolioData } from "@/lib/data"
import type { Photo, PortfolioRecord } from "@/lib/types"
import { ImageUpload } from "./image-upload"
import { AIRewriteButton } from "./ai-rewrite-button"
import { AIInfoTooltip } from "./ai-info-tooltip"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.coerce.number().min(18, {
    message: "Age must be at least 18.",
  }),
  height: z.coerce.number().min(140, {
    message: "Height must be at least 140 cm.",
  }),
  weight: z.coerce.number().min(40, {
    message: "Weight must be at least 40 kg.",
  }),
  haircolour: z.string().min(1, {
    message: "Hair colour is required.",
  }),
  eyecolour: z.string().min(1, {
    message: "Eye colour is required.",
  }),
  bust: z.string().min(1, {
    message: "Bust size is required.",
  }),
  "breast-type": z.string().min(1, {
    message: "Breast type is required.",
  }),
  Konfektion: z.coerce.number().min(1, {
    message: "Konfektion is required.",
  }),
  schoesize: z.coerce.number().min(1, {
    message: "Shoe size is required.",
  }),
  privatehair: z.string().min(1, {
    message: "Private hair style is required.",
  }),
  tattoo: z.string().min(1, {
    message: "Tattoo information is required.",
  }),
  smoker: z.string().min(1, {
    message: "Smoker information is required.",
  }),
  nantionality: z.string().min(1, {
    message: "Nationality is required.",
  }),
  escort: z.string().min(1, {
    message: "Escort information is required.",
  }),
  langDE: z.string().default("no"),
  langFR: z.string().default("no"),
  langEN: z.string().default("no"),
  langIT: z.string().default("no"),
  langPL: z.string().default("no"),
  langRO: z.string().default("no"),
  langPT: z.string().default("no"),
  langNL: z.string().default("no"),
  langCN: z.string().default("no"),
  langOTHER: z.string().default("no"),
  descDE: z.string().min(10, {
    message: "German description must be at least 10 characters.",
  }),
  descEN: z.string().min(10, {
    message: "English description must be at least 10 characters.",
  }),
  descFR: z.string().optional(),
  descIT: z.string().optional(),
  serviceincl_kiss: z.string().default("no"),
  serviceincl_schmusen: z.string().default("no"),
  serviceincl_tonguekiss: z.string().default("no"),
  serviceincl_privatemassage: z.string().default("no"),
  serviceincl_b2bmassage: z.string().default("no"),
  serviceincl_erotic: z.string().default("no"),
  serviceincl_massage: z.string().default("no"),
  serviceincl_lickballs: z.string().default("no"),
  serviceincl_girlfriendsex: z.string().default("no"),
  serviceincl_sexinallpositions: z.string().default("no"),
  serviceincl_69: z.string().default("no"),
  serviceincl_Reizwäsche: z.string().default("no"),
  serviceincl_bathplay: z.string().default("no"),
  serviceincl_showerplay: z.string().default("no"),
  serviceincl_bjwith: z.string().default("no"),
  serviceincl_bjwithout: z.string().default("no"),
  serviceincl_deepthroat: z.string().default("no"),
  serviceincl_cumonbody: z.string().default("no"),
  serviceincl_cummultiple: z.string().default("no"),
  serviceincl_spanish: z.string().default("no"),
  serviceincl_strapon: z.string().default("no"),
  serviceincl_masturbation: z.string().default("no"),
  serviceincl_dildo: z.string().default("no"),
  serviceincl_games: z.string().default("no"),
  serviceincl_dirtytalk: z.string().default("no"),
  serviceincl_roleplay: z.string().default("no"),
  serviceincl_facesitting: z.string().default("no"),
  serviceincl_footfetish: z.string().default("no"),
  serviceincl_striptease: z.string().default("no"),
  serviceincl_passivtongueanal: z.string().default("no"),
  serviceextra_bjcuminmouth: z.coerce.number().optional(),
  serviceextra_bjcuminmouthswallow: z.coerce.number().optional(),
  serviceextra_cumonbody: z.coerce.number().optional(),
  serviceextra_natursektactive: z.coerce.number().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface PortfolioFormProps {
  initialData?: PortfolioRecord
}

export function PortfolioForm({ initialData }: PortfolioFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>(initialData?.photos || [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          age: 18,
          height: 160,
          weight: 50,
          haircolour: "",
          eyecolour: "",
          bust: "",
          "breast-type": "",
          Konfektion: 36,
          schoesize: 36,
          privatehair: "",
          tattoo: "no",
          smoker: "no",
          nantionality: "",
          escort: "yes",
          langDE: "no",
          langFR: "no",
          langEN: "no",
          langIT: "no",
          langPL: "no",
          langRO: "no",
          langPT: "no",
          langNL: "no",
          langCN: "no",
          langOTHER: "no",
          descDE: "",
          descEN: "",
          descFR: "",
          descIT: "",
          serviceincl_kiss: "no",
          serviceincl_schmusen: "no",
          serviceincl_tonguekiss: "no",
          serviceincl_privatemassage: "no",
          serviceincl_b2bmassage: "no",
          serviceincl_erotic: "no",
          serviceincl_massage: "no",
          serviceincl_lickballs: "no",
          serviceincl_girlfriendsex: "no",
          serviceincl_sexinallpositions: "no",
          serviceincl_69: "no",
          serviceincl_Reizwäsche: "no",
          serviceincl_bathplay: "no",
          serviceincl_showerplay: "no",
          serviceincl_bjwith: "no",
          serviceincl_bjwithout: "no",
          serviceincl_deepthroat: "no",
          serviceincl_cumonbody: "no",
          serviceincl_cummultiple: "no",
          serviceincl_spanish: "no",
          serviceincl_strapon: "no",
          serviceincl_masturbation: "no",
          serviceincl_dildo: "no",
          serviceincl_games: "no",
          serviceincl_dirtytalk: "no",
          serviceincl_roleplay: "no",
          serviceincl_facesitting: "no",
          serviceincl_footfetish: "no",
          serviceincl_striptease: "no",
          serviceincl_passivtongueanal: "no",
        },
  })

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      if (initialData) {
        // Update existing record
        const index = portfolioData.findIndex((item) => item.id === initialData.id)
        if (index !== -1) {
          portfolioData[index] = {
            ...values,
            id: initialData.id,
            photos: photos,
          }
        }

        toast({
          title: "Record updated",
          description: "The profile record has been updated successfully.",
        })
      } else {
        // Create new record
        const newRecord: PortfolioRecord = {
          ...values,
          id: uuidv4(),
          photos: photos,
        }

        portfolioData.push(newRecord)

        toast({
          title: "Record created",
          description: "The profile record has been created successfully.",
        })
      }

      // Redirect to the list page
      router.push("/")
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-5 mb-4 bg-gray-100/50">
                <TabsTrigger value="basic" className="data-[state=active]:bg-white">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="photos" className="data-[state=active]:bg-white">
                  Photos
                </TabsTrigger>
                <TabsTrigger value="languages" className="data-[state=active]:bg-white">
                  Languages
                </TabsTrigger>
                <TabsTrigger value="descriptions" className="data-[state=active]:bg-white">
                  Descriptions
                </TabsTrigger>
                <TabsTrigger value="services" className="data-[state=active]:bg-white">
                  Services
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" min="18" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" min="140" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input type="number" min="40" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="haircolour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hair Color</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select hair color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="brown">Brown</SelectItem>
                            <SelectItem value="blonde">Blonde</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eyecolour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Eye Color</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select eye color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="brown">Brown</SelectItem>
                            <SelectItem value="hazel">Hazel</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bust"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bust Size</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 85d" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="breast-type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Breast Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select breast type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="natural">Natural</SelectItem>
                            <SelectItem value="silicon">Silicon</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Konfektion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfektion</FormLabel>
                        <FormControl>
                          <Input type="number" min="32" max="50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="schoesize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shoe Size</FormLabel>
                        <FormControl>
                          <Input type="number" min="34" max="45" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privatehair"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Private Hair</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="natural">Natural</SelectItem>
                            <SelectItem value="trimmed">Trimmed</SelectItem>
                            <SelectItem value="shaved">Shaved</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tattoo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tattoo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="smoker"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Smoker</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nantionality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. DE, FR, TR" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="escort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Escort</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="photos" className="space-y-6">
                <ImageUpload photos={photos} onPhotosChange={setPhotos} maxPhotos={10} />
              </TabsContent>

              <TabsContent value="languages" className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="langDE"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value === "yes"}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? "yes" : "no")
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>German</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="langEN"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value === "yes"}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? "yes" : "no")
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>English</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="langFR"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value === "yes"}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? "yes" : "no")
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>French</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="langIT"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value === "yes"}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? "yes" : "no")
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Italian</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="langPL"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value === "yes"}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? "yes" : "no")
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Polish</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="langRO"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value === "yes"}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? "yes" : "no")
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Romanian</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="langPT"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value === "yes"}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? "yes" : "no")
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Portuguese</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="langNL"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value === "yes"}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? "yes" : "no")
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Dutch</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="langCN"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value === "yes"}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? "yes" : "no")
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Chinese</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="langOTHER"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value === "yes"}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? "yes" : "no")
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Other Languages</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="descriptions" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="descDE"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>German Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="German description..." className="min-h-[200px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descEN"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <FormLabel>English Description</FormLabel>
                            <AIInfoTooltip />
                          </div>
                          <AIRewriteButton
                            originalText={field.value}
                            onRewriteComplete={(results) => {
                              // Update all description fields with the AI results
                              form.setValue("descEN", results.english)
                              form.setValue("descDE", results.german)
                              form.setValue("descFR", results.french)
                              form.setValue("descIT", results.italian)
                            }}
                          />
                        </div>
                        <FormControl>
                          <Textarea placeholder="English description..." className="min-h-[200px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descFR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>French Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="French description..." className="min-h-[200px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descIT"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Italian Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Italian description..." className="min-h-[200px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Included Services</h3>

                    <FormField
                      control={form.control}
                      name="serviceincl_kiss"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value === "yes"}
                              onCheckedChange={(checked) => {
                                field.onChange(checked ? "yes" : "no")
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Kiss</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceincl_schmusen"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value === "yes"}
                              onCheckedChange={(checked) => {
                                field.onChange(checked ? "yes" : "no")
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Cuddling</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceincl_tonguekiss"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value === "yes"}
                              onCheckedChange={(checked) => {
                                field.onChange(checked ? "yes" : "no")
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Tongue Kiss</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceincl_massage"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value === "yes"}
                              onCheckedChange={(checked) => {
                                field.onChange(checked ? "yes" : "no")
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Massage</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceincl_erotic"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value === "yes"}
                              onCheckedChange={(checked) => {
                                field.onChange(checked ? "yes" : "no")
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Erotic</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Extra Services (Price in €)</h3>

                    <FormField
                      control={form.control}
                      name="serviceextra_bjcuminmouth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>BJ with Finish in Mouth</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" placeholder="Price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceextra_bjcuminmouthswallow"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>BJ with Swallow</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" placeholder="Price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceextra_cumonbody"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cum on Body</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" placeholder="Price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceextra_natursektactive"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Natursekt Active</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" placeholder="Price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
                disabled={isSubmitting}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-gray-900 hover:bg-gray-700 text-white">
                {isSubmitting ? "Saving..." : initialData ? "Update Record" : "Create Record"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
