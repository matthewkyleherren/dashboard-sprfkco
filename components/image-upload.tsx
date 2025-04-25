"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Trash2, Upload, Star, StarOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { uploadImage, deleteImage } from "@/app/actions"
import type { Photo } from "@/lib/types"

interface ImageUploadProps {
  photos: Photo[]
  onPhotosChange: (photos: Photo[]) => void
  maxPhotos?: number
}

export function ImageUpload({ photos = [], onPhotosChange, maxPhotos = 10 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    // Check if we've reached the maximum number of photos
    if (photos.length >= maxPhotos) {
      alert(`You can only upload a maximum of ${maxPhotos} photos.`)
      return
    }

    setIsUploading(true)

    try {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append("file", file)

      const photo = await uploadImage(formData)

      if (photo) {
        // If this is the first photo, make it primary
        if (photos.length === 0) {
          photo.isPrimary = true
        }

        onPhotosChange([...photos, photo])
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleDelete = async (photoId: string) => {
    const photoToDelete = photos.find((p) => p.id === photoId)
    if (!photoToDelete) return

    try {
      const success = await deleteImage(photoToDelete.url)

      if (success) {
        const updatedPhotos = photos.filter((p) => p.id !== photoId)

        // If we deleted the primary photo, make the first remaining photo primary
        if (photoToDelete.isPrimary && updatedPhotos.length > 0) {
          updatedPhotos[0].isPrimary = true
        }

        onPhotosChange(updatedPhotos)
      }
    } catch (error) {
      console.error("Error deleting image:", error)
      alert("Failed to delete image. Please try again.")
    }
  }

  const handleSetPrimary = (photoId: string) => {
    const updatedPhotos = photos.map((photo) => ({
      ...photo,
      isPrimary: photo.id === photoId,
    }))

    onPhotosChange(updatedPhotos)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Photos ({photos.length}/{maxPhotos})
        </h3>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            className="hidden"
            disabled={isUploading || photos.length >= maxPhotos}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || photos.length >= maxPhotos}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Photo
              </>
            )}
          </Button>
        </div>
      </div>

      {photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">No photos uploaded yet</p>
          <p className="text-xs text-gray-400 mt-1">Upload photos to showcase this profile</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={photo.url || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              <CardContent className="p-2 flex justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSetPrimary(photo.id)}
                  disabled={photo.isPrimary}
                  title={photo.isPrimary ? "Primary Photo" : "Set as Primary"}
                >
                  {photo.isPrimary ? <Star className="h-4 w-4 text-yellow-500" /> : <StarOff className="h-4 w-4" />}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(photo.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
