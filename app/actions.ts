"use server"

import { v4 as uuidv4 } from "uuid"
import { put } from "@vercel/blob"
import type { Photo } from "@/lib/types"

export async function uploadImage(formData: FormData): Promise<Photo | null> {
  try {
    const file = formData.get("file") as File

    if (!file || file.size === 0) {
      return null
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image")
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size must be less than 5MB")
    }

    // Generate a unique filename
    const filename = `${uuidv4()}-${file.name.replace(/\s/g, "_")}`

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    })

    // Return the photo object
    return {
      id: uuidv4(),
      url: blob.url,
      alt: file.name,
      isPrimary: false,
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    return null
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  try {
    // In a real app, you would delete the image from Vercel Blob
    // For now, we'll just return true
    return true
  } catch (error) {
    console.error("Error deleting image:", error)
    return false
  }
}
