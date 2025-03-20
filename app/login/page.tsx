"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { LoginPage } from "@/components/auth/login-page"

export default function Page() {
  const { data: session } = useSession()

  if (session) {
    redirect("/dashboard")
  }

  return <LoginPage />
<<<<<<< HEAD
}
=======
}
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
