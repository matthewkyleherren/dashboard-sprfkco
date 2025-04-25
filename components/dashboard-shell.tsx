"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Command, ImageIcon, LayoutDashboard, Menu, PlusCircle, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// Update the DashboardShell component to use a light sidebar
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Create New",
      icon: PlusCircle,
      href: "/create",
      active: pathname === "/create",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: pathname === "/analytics",
    },
    {
      label: "Media",
      icon: ImageIcon,
      href: "/media",
      active: pathname === "/media",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-50 border-r border-gray-200">
        <div className="flex flex-col space-y-4 h-full">
          <div className="px-6 py-5 flex items-center border-b border-gray-200">
            <Command className="h-5 w-5 mr-2 text-gray-800" />
            <h1 className="text-lg font-semibold text-gray-800">Portfolio Manager</h1>
          </div>
          <div className="flex-1 flex flex-col px-3 py-2 space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-x-2 text-sm font-medium px-3 py-2 rounded-md transition-colors",
                  route.active ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </div>
          <div className="px-3 py-4 border-t border-gray-200">
            <div className="flex items-center gap-x-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:px-6 md:px-8">
          <Button variant="ghost" size="icon" className="md:hidden" asChild>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 bg-gray-50">
                <div className="flex flex-col space-y-4 h-full">
                  <div className="px-6 py-5 flex items-center border-b border-gray-200">
                    <Command className="h-5 w-5 mr-2 text-gray-800" />
                    <h1 className="text-lg font-semibold text-gray-800">Portfolio Manager</h1>
                  </div>
                  <div className="flex-1 flex flex-col px-3 py-2 space-y-1">
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-x-2 text-sm font-medium px-3 py-2 rounded-md transition-colors",
                          route.active
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                        )}
                      >
                        <route.icon className="h-4 w-4" />
                        {route.label}
                      </Link>
                    ))}
                  </div>
                  <div className="px-3 py-4 border-t border-gray-200">
                    <div className="flex items-center gap-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-gray-800">Admin User</p>
                        <p className="text-xs text-gray-500">admin@example.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </Button>
          <div className="flex flex-1 items-center justify-end md:gap-x-6">
            <div className="flex items-center gap-x-4">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center md:hidden">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
        <main className="p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
