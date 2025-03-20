"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export function SessionCheck() {
  const { status } = useSession()

  if (status === "unauthenticated") {
    redirect("/login")
  }

  return null
}