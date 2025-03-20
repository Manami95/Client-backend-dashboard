import { SignUpPage } from "@/components/auth/signup-page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up - HEEPL Dashboard",
  description: "Create a new account for HEEPL Dashboard",
}

export default function Page() {
  return <SignUpPage />
}